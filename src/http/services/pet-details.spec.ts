import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryPetsRepository } from '../repositories/in-memory/in-memory-pets-repository'
import { PetDetailsUseCase } from './pet-details'

let petsRepository: InMemoryPetsRepository
let sut: PetDetailsUseCase

describe('Pet Details Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new PetDetailsUseCase(petsRepository)
  })

  it('should be able to get pet details', async () => {
    const petRegistered = await petsRepository.create({
      name: 'New Pet',
      age: 'adult',
      energy: 'low',
      habitat_size: 'medium',
      size: 'small',
      type: 'dog',
      indepence: 'medium',
      org_id: 'org-id',
    })

    const { pet } = await sut.execute({
      id: petRegistered.id,
    })

    expect(pet).toEqual(
      expect.objectContaining({
        name: 'New Pet',
      }),
    )
  })
})
