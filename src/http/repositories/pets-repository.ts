import { Pet, Prisma } from '@prisma/client'
import { SearchPetsProps } from '../services/search-pets'

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findById(id: string): Promise<Pet | null>
  searchMany(
    data: SearchPetsProps,
    page: number,
    orgsId: string[],
  ): Promise<Pet[]>
}
