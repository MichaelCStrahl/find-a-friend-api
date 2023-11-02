import { OrgsRepository } from '@/repositories/orgs-repository'
import { hash } from 'bcryptjs'
import { OrgAlreadyExistsError } from './errors/org-already-exists-error'
import { Org } from '@prisma/client'

interface RegisterUseCaseRequest {
  name: string
  email: string
  address: string
  cep: string
  whatsapp: string
  password: string
}

interface RegisterUseCaseResponse {
  org: Org
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
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const orgWithSameEmail = await this.orgsRepository.findByEmail(email)

    if (orgWithSameEmail) {
      throw new OrgAlreadyExistsError()
    }

    const org = await this.orgsRepository.create({
      name,
      email,
      address,
      cep,
      whatsapp,
      password_hash,
    })

    return { org }
  }
}
