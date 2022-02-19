import { Knex } from 'knex'
import { db } from './db'
import { caseTransform } from '../utils/case-transform'

interface User {
  id: number
  name: string
  realName: string
  passHash: string
  roleId: number
  isActive: number
}

type Entity = Record<string, Knex.Value>
type Columns<E = Entity> = Record<keyof E, string>
type Filters<E = Entity> = Partial<Record<keyof E, Knex.Value>>
type Sort<E = Entity> = Partial<Record<keyof E, 'desc' | 'asc'>>
type Exclude<E = Entity> = Array<keyof E>

interface RepositoryConstructor<E = Entity> {
  table: string
  columns: Array<keyof E>
}

interface RepositorySearchOneParams<E = Entity> {
  exclude?: Exclude<E>
}

interface RepositorySearchParams<E = Entity> extends RepositorySearchOneParams<E> {
  filters?: Filters<E>
  sort?: Sort<E>
}

export class Repository<E = Entity> {
  private table: string
  private columns: Columns<E>

  constructor({ table, columns }: RepositoryConstructor<E>) {
    this.table = table
    this.columns = caseTransform.camelArrayToSnakeCaseObject(columns as string[])
  }

  async getAll({ filters = {}, sort = {}, exclude = [] }: RepositorySearchParams<E> = {}) {
    const order = this.getOrder(sort)
    const where = this.getWhere(filters)
    const select = this.getSelect(exclude)

    return await db.select<E[]>(select).from(this.table).orderBy(order).where(where)
  }

  async getById(id: number, { exclude = [] }: RepositorySearchOneParams<E> = {}) {
    const select = this.getSelect(exclude)

    return await db.select<E>(select).from(this.table).where({ id }).first()
  }

  async getOne(filters: Filters<E> = {}, { exclude = [] }: RepositorySearchOneParams<E> = {}) {
    const select = this.getSelect(exclude)

    return await db.select<E>(select).from(this.table).where(filters).first()
  }

  async create(data: Partial<Omit<E, 'id'>>, { exclude = [] }: RepositorySearchOneParams<E> = {}) {
    const insert = this.getRawColumns(data)
    const returning = this.getReturning(exclude)

    const created = await db.insert(insert)
      .into(this.table)
      .returning(returning)
    return created[0] as E
  }

  async update(id: number, data: Partial<Omit<E, 'id'>>, { exclude = [] }: RepositorySearchOneParams<E> = {}) {
    const update = this.getRawColumns(data)
    const returning = this.getReturning(exclude)

    const updated = await db.update(update)
      .into(this.table)
      .where({ id })
      .returning(returning)
    return updated[0] as E
  }

  async remove(id: number) {
    const removed = await db(this.table).where({ id }).first().del()
    return Boolean(removed)
  }

  private getColumnKey(key: string) {
    return this.columns[key as keyof E]
  }

  private getSelect(exclude: Exclude<E>) {
    return Object.entries(this.columns).reduce((acc, [key, value]) => (
      !exclude.includes(key as keyof E)
        ? { ...acc, [key]: value }
        : acc
    ), {})
  }

  private getWhere(filters: Filters<E>) {
    return Object.entries(filters).reduce((acc, [key, value]) => ({
      ...acc,
      [this.getColumnKey(key)]: value as Knex.Value
    }), {})
  }

  private getOrder(sort: Sort<E>) {
    return Object.entries(sort).reduce<{
      column: string,
      order: 'desc' | 'asc'
    }[]>((acc, [key, value]) => ([
      ...acc,
      {
        column: key,
        order: value as 'desc' | 'asc'
      }
    ]), [])
  }

  private getRawColumns(data: Partial<Omit<E, 'id'>>) {
    return Object.entries(data).reduce((acc, [key, value]) => {
      return {
        ...acc,
        [this.getColumnKey(key)]: value
      }
    }, {})
  }

  private getReturning(exclude: Exclude<E>) {
    return Object.keys(this.columns).reduce<string[]>((acc, key) => (
      !exclude.includes(key as keyof E)
        ? [...acc, `${this.getColumnKey(key)} as ${key}`]
        : acc
    ), [])
  }
}