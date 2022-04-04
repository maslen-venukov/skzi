import { Roles } from '../enums/roles.enum'

const queue = [Roles.User, Roles.Operator, Roles.Admin, Roles.System]

const getIndex = (role: Roles) => queue.findIndex(queueRole => queueRole === role)

const isRoleMatch = (role: Roles, roleToMatch: Roles) => (
  getIndex(role) >= getIndex(roleToMatch)
)

export default isRoleMatch