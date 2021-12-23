import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import 'express-async-errors'
import 'reflect-metadata'
import { router } from './routes'

import './database'

const app = express()

app.use(cors())

app.use(express.json())

app.use(router)

// middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error) {
    return res.status(400).json({ error: err.message })
  }

  return res
    .status(500)
    .json({ status: 'error', message: 'Internal server error' })
})

app.listen(3333, () => console.log('Server running on port 3333'))
