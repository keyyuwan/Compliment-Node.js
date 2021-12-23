import { getCustomRepository } from 'typeorm'
import { UserRepositories } from '../repositories/UserRepositories'

class ListUsersService {
  async execute() {
    const usersRepositories = getCustomRepository(UserRepositories)

    const users = await usersRepositories.find()

    return users
  }
}

export { ListUsersService }
