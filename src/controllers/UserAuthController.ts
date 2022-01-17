import { Request, Response } from 'express'
import { UserAuthService } from '../services/UserAuthService'

class UserAuthController {
  async handle(req: Request, res: Response) {
    const { user_id } = req

    const userAuthService = new UserAuthService()

    const user = await userAuthService.execute(user_id)

    return res.json(user)
  }
}

export { UserAuthController }
