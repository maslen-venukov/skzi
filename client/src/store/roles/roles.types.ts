import { Roles } from '../../enums/Roles'

export interface Role {
  id: number
  role: Roles
}

export interface RolesState {
  isLoading: boolean
  roles: Role[]
}

export interface GetRolesResponse {
  roles: Role[]
}