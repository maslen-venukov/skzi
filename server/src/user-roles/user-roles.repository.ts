import db from '../core/db'
import { UserRole } from './user-role.interface'
import getOneEntity from '../utils/getOneEntity'

export class UserRolesRepository {
  private static selectQuery = 'SELECT * FROM s_user_role'

  static async getById(id: number) {
    const { rows } = await db.query<UserRole>(`${this.selectQuery} WHERE id = $1`, [id])
    return rows[0]
  }

  static async getOne(params: Partial<UserRole>) {
    return await getOneEntity(params, this.selectQuery)
  }
}