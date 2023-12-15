import {
  Pet,
  Age,
  Size,
  HabitatSize,
  Energy,
  Indepence,
  Type,
} from '@prisma/client'
import { PetsRepository } from '../repositories/pets-repository'
import { OrgsRepository } from '../repositories/orgs-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface CreatePetUseCaseRequest {
  name: string
  about?: string
  age: Age
  energy: Energy
  size: Size
  indepence: Indepence
  type: Type
  habitatSize: HabitatSize
  orgId: string
}

interface CreatePetUseCaseResponse {
  pet: Pet
}

export class CreatePetUseCase {
  private petsRepository: PetsRepository
  private orgsRepository: OrgsRepository

  constructor(petsRepository: PetsRepository, orgsRepository: OrgsRepository) {
    this.petsRepository = petsRepository
    this.orgsRepository = orgsRepository
  }

  async execute({
    name,
    about,
    age,
    energy,
    size,
    indepence,
    type,
    habitatSize,
    orgId,
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    const org = await this.orgsRepository.findById(orgId)

    if (!org) {
      throw new ResourceNotFoundError()
    }

    const pet = await this.petsRepository.create({
      name,
      about,
      age,
      energy,
      size,
      indepence,
      type,
      habitat_size: habitatSize,
      org_id: orgId,
    })

    return { pet }
  }
}
