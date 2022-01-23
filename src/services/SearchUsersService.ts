import { getCustomRepository, Like } from 'typeorm'
import { UserRepositories } from '../repositories/UserRepositories'

class SearchUsersService {
  async execute(name: string) {
    const usersRepositories = getCustomRepository(UserRepositories)

    const user = await usersRepositories.find({
      name: Like(`%${name}%`),
    })

    return user
  }
}

export { SearchUsersService }
