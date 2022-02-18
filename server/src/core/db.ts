import dotenv from 'dotenv'
import { Client } from 'pg'

dotenv.config()

const db = new Client({
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT)
})

export default db