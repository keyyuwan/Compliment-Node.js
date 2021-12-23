import { NextFunction, Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import { UserRepositories } from '../repositories/UserRepositories'

export async function ensureAdmin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { user_id } = req

  const usersRepositories = getCustomRepository(UserRepositories)

  const { admin } = await usersRepositories.findOne(user_id)

  if (admin) {
    return next()
  }

  return res.status(401).json({ error: 'To create a tag you must be an admin' })
}
