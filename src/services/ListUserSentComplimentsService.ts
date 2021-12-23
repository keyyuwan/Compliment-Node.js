import { getCustomRepository } from 'typeorm'
import { ComplimentsRepositories } from '../repositories/ComplimentsRepositories'

class ListUserSentComplimentsService {
  async execute(user_id: string) {
    const complimentsRepositories = getCustomRepository(ComplimentsRepositories)

    const compliments = await complimentsRepositories.find({
      where: {
        user_sender: user_id,
      },
      relations: ['userReceiver', 'tag'],
    })

    return compliments
  }
}

export { ListUserSentComplimentsService }
