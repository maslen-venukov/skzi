import { User } from '../users/user.interface'

interface CoreComment {
  id: number
  comment: string
  addDate: Date
}

export interface RawComment extends CoreComment {
  addUserId: number
}

export interface Comment extends CoreComment {
  addUser: User
}