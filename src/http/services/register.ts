import { OrgsRepository } from '@/repositories/orgs-repository'
import { hash } from 'bcryptjs'

interface RegisterUseCaseRequest {
  name: string
  email: string
  address: string
  cep: string
  whatsapp: string
  password: string
}

export class RegisterUseCase {
  private orgsRepository: OrgsRepository

  constructor(orgsRepository: OrgsRepository) {
    this.orgsRepository = orgsRepository
  }

  async execute({
    name,
    email,
    address,
    cep,
    whatsapp,
    password,
  }: RegisterUseCaseRequest) {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.orgsRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new Error('E-mail already exists.')
    }

    await this.orgsRepository.create({
      name,
      email,
      address,
      cep,
      whatsapp,
      password_hash,
    })
  }
}
