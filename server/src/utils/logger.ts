import fs from 'fs'
import path from 'path'
import { AuthRequest } from '../interfaces/auth-request.interface'

class Logger {
  log({ fileName, data, req }: {
    fileName: string
    data: object
    req: AuthRequest
  }) {
    const dir = 'logs'

    if(!fs.existsSync(dir)) {
      fs.mkdirSync(dir)
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
      path.join(dir, `${fileName}.log`),
      JSON.stringify({ ...info, ...data }, null, 2) + '\n'
    )
  }
}

export const logger = new Logger()