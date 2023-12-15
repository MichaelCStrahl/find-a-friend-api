import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryOrgsRepository } from '@/http/repositories/in-memory/in-memory-orgs-repository'
import { InMemoryPetsRepository } from '../repositories/in-memory/in-memory-pets-repository'
import { SearchPetsUseCase } from './search-pets'
import { hash } from 'bcryptjs'
import { Age } from '@prisma/client'

let orgRepository: InMemoryOrgsRepository
let petsRepository: InMemoryPetsRepository
let sut: SearchPetsUseCase

describe('Search Pets Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    orgRepository = new InMemoryOrgsRepository()
    sut = new SearchPetsUseCase(petsRepository, orgRepository)
  })

  it('should be able to search a pet', async () => {
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

    const org1 = await orgRepository.findByEmail('johndoe@example.com')

    if (!org1) return

    await petsRepository.create({
      name: 'New Pet',
      age: 'adult',
      energy: 'low',
      habitat_size: 'medium',
      size: 'small',
      type: 'dog',
      indepence: 'medium',
      org_id: org1.id,
    })

    await petsRepository.create({
      name: 'New Pet 2',
      age: 'cub',
      energy: 'low',
      habitat_size: 'small',
      size: 'small',
      type: 'dog',
      indepence: 'medium',
      org_id: org1.id,
    })

    await orgRepository.create({
      name: 'John Doe 2',
      email: 'johndoe2@example.com',
      address: 'Address',
      state: 'State',
      city: 'City',
      cep: '99999-999',
      whatsapp: '55 99999 9999',
      password_hash: await hash('12212121', 6),
    })

    const org2 = await orgRepository.findByEmail('johndoe2@example.com')

    if (!org2) return

    await petsRepository.create({
      name: 'New Pet',
      age: 'adult',
      energy: 'low',
      habitat_size: 'medium',
      size: 'small',
      type: 'dog',
      indepence: 'medium',
      org_id: org2.id,
    })

    await petsRepository.create({
      name: 'New Pet 2',
      age: 'cub',
      energy: 'low',
      habitat_size: 'small',
      size: 'small',
      type: 'dog',
      indepence: 'medium',
      org_id: org2.id,
    })

    const query = {
      city: 'City',
      state: 'State',
      filter: {
        age: 'cub' as Age,
      },
    }

    const { pets } = await sut.execute({
      query,
      page: 1,
    })

    expect(pets).toHaveLength(2)
  })
})
