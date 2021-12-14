import { getCustomRepository } from 'typeorm'
import { ComplimentsRepositories } from '../repositories/ComplimentsRepositories'
import { UserRepositories } from '../repositories/UserRepositories'

interface IComplimentReq {
  tag_id: string
  user_sender: string
  user_receiver: string
  message: string
}

class CreateComplimentService {
  async execute({
    tag_id,
    user_sender,
    user_receiver,
    message,
  }: IComplimentReq) {
    const complimentsRepository = getCustomRepository(ComplimentsRepositories)
    const usersRepository = getCustomRepository(UserRepositories)

    if (user_sender === user_receiver) {
      throw new Error('You cannot give compliments to yourself')
    }

    const userReceiverExists = await usersRepository.findOne(user_receiver)

    if (!userReceiverExists) {
      throw new Error('User receiver does not exists')
    }

    const compliment = complimentsRepository.create({
      tag_id,
      user_sender,
      user_receiver,
      message,
    })

    await complimentsRepository.save(compliment)

    return compliment
  }
}

export { CreateComplimentService }
