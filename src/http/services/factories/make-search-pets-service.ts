import { PrismaOrgsRepository } from '@/http/repositories/prisma/prisma-orgs-repository'
import { PrismaPetsRepository } from '@/http/repositories/prisma/prisma-pets-repository'
import { SearchPetsUseCase } from '../search-pets'

export function makeSearchPetsService() {
  const petsRepository = new PrismaPetsRepository()
  const orgsRepository = new PrismaOrgsRepository()

  const searchPetsServce = new SearchPetsUseCase(petsRepository, orgsRepository)

  return searchPetsServce
}
