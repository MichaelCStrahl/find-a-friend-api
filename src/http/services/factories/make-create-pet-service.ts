import { PrismaOrgsRepository } from '@/http/repositories/prisma/prisma-orgs-repository'
import { PrismaPetsRepository } from '@/http/repositories/prisma/prisma-pets-repository'
import { CreatePetUseCase } from '../create-pet'

export function makeCreatePetService() {
  const petsRepository = new PrismaPetsRepository()
  const orgsRepository = new PrismaOrgsRepository()
  const createPetUseCase = new CreatePetUseCase(petsRepository, orgsRepository)

  return createPetUseCase
}
