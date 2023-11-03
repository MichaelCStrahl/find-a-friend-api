import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryOrgsRepository } from '@/http/repositories/in-memory/in-memory-orgs-repository'
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let orgRepository: InMemoryOrgsRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    orgRepository = new InMemoryOrgsRepository()
    sut = new AuthenticateUseCase(orgRepository)
  })

  it('should be able to authenticate', async () => {
    await orgRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      address: 'Address',
      state: 'State',
      city: 'City',
      cep: '99999-999',
      whatsapp: '55 99999 9999',
      password_hash: await hash('123456', 6),
    })

    const { org } = await sut.execute({
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should be not able to authenticate with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'johndoe@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should be not able to authenticate with wrong password', async () => {
    await orgRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      address: 'Address',
      state: 'State',
      city: 'City',
      cep: '99999-999',
      whatsapp: '55 99999 9999',
      password_hash: await hash('123456', 6),
    })

    await expect(() =>
      sut.execute({
        email: 'johndoe@example.com',
        password: 'wrong password',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
