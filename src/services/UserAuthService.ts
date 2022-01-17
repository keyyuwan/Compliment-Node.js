import { getCustomRepository } from 'typeorm'
import { UserRepositories } from '../repositories/UserRepositories'

class UserAuthService {
  async execute(userId: string) {
    const usersRepositories = getCustomRepository(UserRepositories)

    const user = await usersRepositories.findOne(userId)

    return user
  }
}

export { UserAuthService }
