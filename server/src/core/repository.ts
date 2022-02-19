import { db } from './db'

type Entity = Record<string, string | number | boolean>

type Fields = Record<string, string>

type Filters<F extends Fields> = Partial<Record<keyof F, string | number | boolean>>

type Sort<F extends Fields> = Partial<Record<keyof F, 'desc' | 'asc'>>

type Exclude<F extends Fields> = Array<keyof F>

interface RepositoryConstructor<F extends Fields> {
  table: string
  fields: F
}

interface RepositorySearchParams<F extends Fields> {
  filters?: Filters<F>
  sort?: Sort<F>
  exclude?: Exclude<F>
}

export class Repository<E = Entity, F extends Fields = Record<keyof E, string>> {
  private table
  private fields

  constructor({ table, fields }: RepositoryConstructor<F>) {
    this.table = table
    this.fields = fields
  }

  async getAll({ filters, sort, exclude }: RepositorySearchParams<F> = {}) {
    const parsedFields = this.parseFields(exclude)
    const parsedFilters = filters ? this.parseFilters(filters) : ''
    const parsedSort = sort ? this.parseSort(sort) : ''

    const { rows } = await db.query<E>(`
      SELECT ${parsedFields}
      FROM ${this.table}
      ${parsedFilters ? `WHERE ${parsedFilters}` : ''}
      ${parsedSort ? `ORDER BY ${parsedSort}` : ''}
    `, this.getValues(filters))
    return rows
  }

  async getById(id: number, { exclude }: RepositorySearchParams<F> = {}) {
    const parsedFields = this.parseFields(exclude)

    const { rows } = await db.query<E>(`
      SELECT ${parsedFields}
      FROM ${this.table}
      WHERE id = $1
    `, [id])
    return rows[0]
  }

  async getOne(filters: Filters<F>, { exclude }: RepositorySearchParams<F> = {}) {
    const parsedFields = this.parseFields(exclude)
    const parsedFilters = filters ? this.parseFilters(filters) : ''

    const { rows } = await db.query<E>(`
      SELECT ${parsedFields}
      FROM ${this.table}
      ${parsedFilters ? `WHERE ${parsedFilters}` : ''}
    `, this.getValues(filters))
    return rows[0]
  }

  async create(data: Partial<Omit<E, 'id'>>, { exclude }: RepositorySearchParams<F> = {}) {
    const parsedKeys = Object.keys(data).map(key => this.getKey(key)).join(', ')
    const parsedIndexes = Object.keys(data).map((_, index) => `$${index + 1}`).join(', ')
    const parsedFields = this.parseFields(exclude)

    const { rows } = await db.query<E>(`
      INSERT INTO ${this.table} (${parsedKeys})
      VALUES (${parsedIndexes})
      RETURNING ${parsedFields}
    `, this.getValues(data))
    return rows[0]
  }

  async update(id: number, data: Partial<Omit<E, 'id'>>, { exclude }: RepositorySearchParams<F> = {}) {
    const filteredData = this.filterObjectFromUndefined(data)
    const parsedColumns = this.parseFieldsEqualsIndexes(filteredData, ', ')
    const parsedFields = this.parseFields(exclude)
    const values = this.getValues(filteredData)

    const { rows } = await db.query<E>(`
      UPDATE ${this.table}
      SET ${parsedColumns}
      WHERE id = $${values.length + 1}
      RETURNING ${parsedFields}
    `, [...values, id])
    return rows[0]
  }

  async remove(id: number) {
    await db.query(`
      DELETE FROM ${this.table}
      WHERE id = $1
    `, [id])
  }

  private getKey(key: string) {
    return this.fields[key]
  }

  private getValues(data: object = {}) {
    return Object.values(data)
  }

  private parseFields(exclude: Exclude<F> = []) {
    return Object.entries(this.fields).reduce<string[]>((acc, [key, value]) => {
      const field = [...acc, `${value} AS "${key}"`]

      if(!exclude.length) {
        return field
      }

      return !exclude.includes(key) ? field : acc
    }, []).join(', ')
  }

  private parseFieldsEqualsIndexes(obj: object, separator: string) {
    return Object.keys(obj).map((key, index) => (
      `${this.getKey(key)} = $${index + 1}`
    )).join(separator)
  }

  private parseFilters(filters: Filters<F>) {
    return this.parseFieldsEqualsIndexes(filters, ' AND ')
  }

  private parseSort(sort: Sort<F>) {
    return Object.entries(sort).map(([key, value]) => (
      `${this.getKey(key)} ${value?.toUpperCase()}`
    )).join(', ')
  }

  private filterObjectFromUndefined(obj: object) {
    return Object.entries(obj).reduce((acc, [key, value]) => (
      value !== undefined
        ? { ...acc, [key]: value }
        : acc
    ), {})
  }
}