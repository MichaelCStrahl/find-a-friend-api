import { describe, expect, it } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { OrgAlreadyExistsError } from './errors/org-already-exists-error'

describe('Register Use Case', () => {
  it('should be able to register', async () => {
    const orgRepository = new InMemoryOrgsRepository()
    const registerUseCase = new RegisterUseCase(orgRepository)

    const { org } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      address: 'Address',
      cep: '99999-999',
      whatsapp: '55 99999 9999',
      password: '123456',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should hash org password upon registration', async () => {
    const orgRepository = new InMemoryOrgsRepository()
    const registerUseCase = new RegisterUseCase(orgRepository)

    const { org } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      address: 'Address',
      cep: '99999-999',
      whatsapp: '55 99999 9999',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await compare('123456', org.password_hash)

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able create org with same email twice', async () => {
    const orgRepository = new InMemoryOrgsRepository()
    const registerUseCase = new RegisterUseCase(orgRepository)

    const email = 'johndoe@example.com'

    await registerUseCase.execute({
      name: 'John Doe',
      email,
      address: 'Address',
      cep: '99999-999',
      whatsapp: '55 99999 9999',
      password: '123456',
    })

    await expect(() =>
      registerUseCase.execute({
        name: 'John Doe',
        email,
        address: 'Address',
        cep: '99999-999',
        whatsapp: '55 99999 9999',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(OrgAlreadyExistsError)
  })
})
