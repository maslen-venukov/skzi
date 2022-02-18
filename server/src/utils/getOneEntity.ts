import db from '../core/db'

const getOneEntity = async <T>(params: Partial<T>, query: string, fields?: Record<keyof T, string>) => {
  const search = (Object.keys(params) as Array<keyof T>)
    .map((key, index) => `${fields ? fields[key] : key} = $${index + 1}`)
    .join(' and ')
  const { rows } = await db.query<T>(`${query} WHERE ${search}`, Object.values(params))
  return rows[0]
}

export default getOneEntity