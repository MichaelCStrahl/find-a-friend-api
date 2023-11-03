import { OrgsRepository } from '@/http/repositories/orgs-repository'
import { hash } from 'bcryptjs'
import { OrgAlreadyExistsError } from './errors/org-already-exists-error'
import { Org } from '@prisma/client'

interface RegisterUseCaseRequest {
  name: string
  email: string
  cep: string
  state: string
  city: string
  address: string
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
    cep,
    state,
    city,
    address,
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
      state,
      city,
      whatsapp,
      password_hash,
    })

    return { org }
  }
}
