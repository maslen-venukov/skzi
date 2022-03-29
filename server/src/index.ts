import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { logErrorMiddleware } from './middleware/log-error.middleware'
import { sendErrorMiddleware } from './middleware/send-error.middleware'
import { authRouter } from './auth/auth.router'
import { usersRouter } from './users/users.router'
import { userRolesRouter } from './user-roles/user-roles.router'
import { orgsRouter } from './orgs/orgs.router'
import { agreementsRouter } from './agreements/agreements.router'
import { agreementTypesRouter } from './agreement-types/agreement-types.router'
import { agreementCommentsRouter } from './agreement-comments/agreement-comments.router'
import { skziUnitsRouter } from './skzi-units/skzi-units.router'
import { skziTypesRouter } from './skzi-types/skzi-types.router'
import { actsRouter } from './acts/acts.router'
import { platformTypesRouter } from './platform-types/platform-types.router'
import { signTypesRouter } from './sign-types/sign-types.router'
import { vipnetLansRouter } from './vipnet-lans/vipnet-lans.router'

dotenv.config()

const port = process.env.PORT

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/auth', authRouter)
app.use('/api/users', usersRouter)
app.use('/api/roles', userRolesRouter)
app.use('/api/orgs', orgsRouter)
app.use('/api/agreements', agreementsRouter)
app.use('/api/agreement-types', agreementTypesRouter)
app.use('/api/agreement-comments', agreementCommentsRouter)
app.use('/api/skzi-units', skziUnitsRouter)
app.use('/api/skzi-types', skziTypesRouter)
app.use('/api/acts', actsRouter)
app.use('/api/platform-types', platformTypesRouter)
app.use('/api/sign-types', signTypesRouter)
app.use('/api/vipnet-lans', vipnetLansRouter)

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