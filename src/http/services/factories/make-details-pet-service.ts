import { PrismaPetsRepository } from '@/http/repositories/prisma/prisma-pets-repository'
import { PetDetailsUseCase } from '../pet-details'

export function makeDetailsPetService() {
  const petsRepository = new PrismaPetsRepository()
  const petDetailsUseCase = new PetDetailsUseCase(petsRepository)

  return petDetailsUseCase
}
