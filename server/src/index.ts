import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { logErrorMiddleware } from './middleware/log-error.middleware'
import { sendErrorMiddleware } from './middleware/send-error.middleware'
import { authRouter } from './auth/auth.router'
import { usersRouter } from './users/users.router'
import { orgsRouter } from './orgs/orgs.router'
import { agreementsRouter } from './agreements/agreements.router'
import { agreementCommentsRouter } from './agreement-comments/agreement-comments.router'
import { skziUnitsRouter } from './skzi-units/skzi-units.router'
import { actsRouter } from './acts/acts.router'

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
app.use('/api/agreement-comments', agreementCommentsRouter)
app.use('/api/skzi-units', skziUnitsRouter)
app.use('/api/acts', actsRouter)

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

// TODO пагинация
// TODO фильтры в req.query