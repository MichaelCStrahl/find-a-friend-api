import { Pet } from '@prisma/client'
import { PetsRepository } from '../repositories/pets-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface PetDetailsUseCaseRequest {
  id: string
}

interface PetDetailsUseCaseResponse {
  pet: Pet
}

export class PetDetailsUseCase {
  private petsRepository: PetsRepository
  constructor(petsRepository: PetsRepository) {
    this.petsRepository = petsRepository
  }

  async execute({
    id,
  }: PetDetailsUseCaseRequest): Promise<PetDetailsUseCaseResponse> {
    const pet = await this.petsRepository.findById(id)

    if (!pet) {
      throw new ResourceNotFoundError()
    }

    return { pet }
  }
}
