import { getCustomRepository } from 'typeorm'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { UserRepositories } from '../repositories/UserRepositories'

interface IAuthenticateReq {
  email: string
  password: string
}

class AuthenticateUserService {
  async execute({ email, password }: IAuthenticateReq) {
    const userRepositories = getCustomRepository(UserRepositories)

    const user = await userRepositories.findOne({
      email,
    })

    if (!user) {
      throw new Error('Email/Password incorrect')
    }

    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) {
      throw new Error('Email/Password incorrect')
    }

    const token = sign(
      {
        email: user.email,
      },
      'a06ab6b81aeef0ba49c203fe564b0983',
      {
        subject: user.id,
        expiresIn: '1d',
      }
    )

    return token
  }
}

export { AuthenticateUserService }
