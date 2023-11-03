import { OrgsRepository } from '@/repositories/orgs-repository'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { compare } from 'bcryptjs'
import { Org } from '@prisma/client'

interface AuthenticateRequest {
  email: string
  password: string
}
interface AuthenticateResponse {
  org: Org
}

export class AuthenticateUseCase {
  private orgsRepository: OrgsRepository

  constructor(orgsRepository: OrgsRepository) {
    this.orgsRepository = orgsRepository
  }

  async execute({
    email,
    password,
  }: AuthenticateRequest): Promise<AuthenticateResponse> {
    const org = await this.orgsRepository.findByEmail(email)

    if (!org) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatches = await compare(password, org.password_hash)

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return { org }
  }
}
