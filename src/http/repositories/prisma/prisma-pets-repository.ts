import { Prisma } from '@prisma/client'
import { PetsRepository } from '../pets-repository'
import { prisma } from '@/lib/prisma'
import { SearchPetsProps } from '@/http/services/search-pets'

export class PrismaPetsRepository implements PetsRepository {
  async findById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
    })

    return pet
  }

  async searchMany(data: SearchPetsProps, page: number, orgsId: string[]) {
    const pets = await prisma.pet.findMany({
      where: {
        org_id: {
          in: orgsId,
        },
        age: data.age,
        energy: data.energy,
        size: data.size,
        indepence: data.indepence,
        type: data.type,
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return pets
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }
}
