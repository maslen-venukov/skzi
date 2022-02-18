import db from '../core/db'
import { RawUser } from './user.interface'
import getOneEntity from '../utils/getOneEntity'

export class UsersRepository {
  private static selectQuery = 'SELECT id, name, real_name AS "realName", pass_hash AS "passHash", role_id AS "roleId", is_active AS "isActive" FROM users'

  private static fields = {
    id: 'id',
    name: 'name',
    realName: 'real_name',
    passHash: 'pass_hash',
    roleId: 'role_id',
    isActive: 'is_active'
  }

  static async getAll() {
    const { rows } = await db.query<RawUser>(this.selectQuery)
    return rows
  }

  static async getById(id: number) {
    const { rows } = await db.query<RawUser>(`${this.selectQuery} WHERE id = $1`, [id])
    return rows[0]
  }

  static async getOne(params: Partial<RawUser>) {
    return await getOneEntity(params, this.selectQuery, this.fields)
  }

  static async create(data: Omit<RawUser, 'id' | 'isActive'>) {
    const { name, realName, passHash, roleId } = data
    const query = `
      INSERT INTO users (name, real_name, pass_hash, role_id)
      VALUES ($1, $2, $3, $4)
      RETURNING id, name, real_name AS "realName", pass_hash AS "passHash", role_id AS "roleId", is_active AS "isActive"
    `
    const { rows } = await db.query<RawUser>(query, [name, realName, passHash, roleId])
    return rows[0]
  }
}