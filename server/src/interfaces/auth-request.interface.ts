import { Request } from 'express'
import { ParsedQs } from 'qs'
import { User } from '../users/user.interface'

export interface AuthRequest<
  Params = Record<string, string>,
  ResBody = any,
  ReqBody = any,
  ReqQuery = ParsedQs,
  Locals = Record<string, any>
> extends Request<Params, ResBody, ReqBody, ReqQuery, Locals> {
  user?: User
}