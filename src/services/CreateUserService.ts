import { UserRepositories } from '../repositories/UserRepositories'

interface IUserReq {
  name: string
  email: string
  admin?: boolean
}

class CreateUserService {
  async execute({ name, email, admin }: IUserReq) {
    const usersRepository = new UserRepositories()

    if (!email) {
      throw new Error('Email incorrect')
    }

    const userAlreadyExists = await usersRepository.findOne({
      email,
    })

    if (userAlreadyExists) {
      throw new Error('User already exists')
    }

    const user = usersRepository.create({
      name,
      email,
      admin,
    })

    await usersRepository.save(user)

    return user
  }
}

export { CreateUserService }
