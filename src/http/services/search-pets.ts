import { Age, Energy, Indepence, Pet, Size, Type } from '@prisma/client'
import { PetsRepository } from '../repositories/pets-repository'
import { OrgsRepository } from '../repositories/orgs-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

export interface SearchPetsProps {
  age?: Age
  energy?: Energy
  size?: Size
  indepence?: Indepence
  type?: Type
}

export interface SearchOrgsProps {
  city: string
  state: string
  filter: SearchPetsProps
}

interface SearchPetsUseCaseRequest {
  query: SearchOrgsProps
  page: number
}

interface SearchPetsUseCaseResponse {
  pets: Pet[]
}

export class SearchPetsUseCase {
  private petsRepository: PetsRepository
  private orgsRepository: OrgsRepository

  constructor(petsRepository: PetsRepository, orgsRepository: OrgsRepository) {
    this.petsRepository = petsRepository
    this.orgsRepository = orgsRepository
  }

  async execute({
    query,
    page,
  }: SearchPetsUseCaseRequest): Promise<SearchPetsUseCaseResponse> {
    const { city, state } = query

    const orgs = await this.orgsRepository.findByCityAndState(city, state)

    if (!orgs) {
      throw new ResourceNotFoundError()
    }

    const orgsId = orgs.map((org) => org.id)

    const pets = await this.petsRepository.searchMany(
      query.filter,
      page,
      orgsId,
    )

    return { pets }
  }
}
