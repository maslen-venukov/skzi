import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { logErrorMiddleware } from './middleware/log-error.middleware'
import { sendErrorMiddleware } from './middleware/send-error.middleware'
import { authRouter } from './auth/auth.router'
import { usersRouter } from './users/users.router'
import { orgsRouter } from './orgs/orgs.router'
import { agreementsRouter } from './agreements/agreements.router'

dotenv.config()

const port = process.env.PORT

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/auth', authRouter)
app.use('/api/users', usersRouter)
app.use('/api/orgs', orgsRouter)
app.use('/api/agreements', agreementsRouter)

app.use(sendErrorMiddleware)
app.use(logErrorMiddleware)

const start = async () => {
  try {
    app.listen(port, () => console.log(`server started on ${port}`))
  } catch(e) {
    console.log(e)
  }
}

start()