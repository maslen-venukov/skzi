import fs from 'fs'
import path from 'path'
import { AuthRequest } from '../interfaces/auth-request.interface'

export const logData = ({ fileName, data, req }: {
  fileName: string
  data: object
  req: AuthRequest
}) => {
  const logsDir = 'logs'

  if(!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir)
  }

  const info = {
    time: new Date(),
    url: req.originalUrl,
    method: req.method,
    headers: req.headers,
    body: req.body,
    params: req.params,
    query: req.query,
    user: req.user
  }

  fs.appendFileSync(
    path.join(logsDir, `${fileName}.log`),
    JSON.stringify({ ...info, ...data }, null, 2) + '\n'
  )
}