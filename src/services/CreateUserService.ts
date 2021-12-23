import { getCustomRepository } from 'typeorm'
import { hash } from 'bcryptjs'
import { UserRepositories } from '../repositories/UserRepositories'

interface IUserReq {
  name: string
  email: string
  admin?: boolean
  password: string
}

class CreateUserService {
  async execute({ name, email, admin = false, password }: IUserReq) {
    const usersRepository = getCustomRepository(UserRepositories)

    if (!email) {
      throw new Error('Email incorrect')
    }

    const userAlreadyExists = await usersRepository.findOne({
      email,
    })

    if (userAlreadyExists) {
      throw new Error('User already exists')
    }

    const passwordHash = await hash(password, 8)

    const user = usersRepository.create({
      name,
      email,
      admin,
      password: passwordHash,
    })

    await usersRepository.save(user)

    return user
  }
}

export { CreateUserService }
