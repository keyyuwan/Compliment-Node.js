import { Request, Response } from 'express'
import { SearchUsersService } from '../services/SearchUsersService'

class SearchUsersController {
  async handle(req: Request, res: Response) {
    const { name } = req.query

    const searchUsersService = new SearchUsersService()

    const user = await searchUsersService.execute(String(name))

    return res.json(user)
  }
}

export { SearchUsersController }
