import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryOrgsRepository } from '@/http/repositories/in-memory/in-memory-orgs-repository'
import { hash } from 'bcryptjs'
import { InMemoryPetsRepository } from '../repositories/in-memory/in-memory-pets-repository'
import { CreatePetUseCase } from './create-pet'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let orgRepository: InMemoryOrgsRepository
let petRepository: InMemoryPetsRepository
let sut: CreatePetUseCase

describe('Create pet Use Case', () => {
  beforeEach(() => {
    orgRepository = new InMemoryOrgsRepository()
    petRepository = new InMemoryPetsRepository()
    sut = new CreatePetUseCase(petRepository, orgRepository)
  })

  it('should be able to create a new pet', async () => {
    const org = await orgRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      address: 'Address',
      state: 'State',
      city: 'City',
      cep: '99999-999',
      whatsapp: '55 99999 9999',
      password_hash: await hash('123456', 6),
    })

    const { pet } = await sut.execute({
      name: 'New Pet',
      age: 'adult',
      energy: 'low',
      habitatSize: 'medium',
      size: 'little',
      specie: 'dog',
      indepence: 'medium',
      orgId: org.id,
    })

    expect(pet.id).toEqual(expect.any(String))
  })

  it('should not be able to create a new pet without the org', async () => {
    await expect(() =>
      sut.execute({
        name: 'New Pet',
        age: 'adult',
        energy: 'low',
        habitatSize: 'medium',
        size: 'little',
        specie: 'dog',
        indepence: 'medium',
        orgId: 'org-01',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
