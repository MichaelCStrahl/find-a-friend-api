import { Pet, Prisma } from '@prisma/client'
import { PetsRepository } from '../pets-repository'
import { randomUUID } from 'node:crypto'
import { SearchPetsProps } from '@/http/services/search-pets'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: data.id ?? randomUUID(),
      name: data.name,
      about: data.about ?? null,
      age: data.age,
      energy: data.energy,
      size: data.size,
      indepence: data.indepence,
      type: data.type,
      habitat_size: data.habitat_size,
      org_id: data.org_id,
    }

    this.items.push(pet)

    return pet
  }

  async searchMany(data: SearchPetsProps, page: number, orgsId: string[]) {
    const orgsFiltered = this.items.filter((item) =>
      orgsId.includes(item.org_id),
    )

    const pets = orgsFiltered
      .filter((item) => {
        for (const key in data) {
          if (data[key as keyof typeof data] !== item[key as keyof typeof item])
            return false
        }
        return true
      })
      .slice((page - 1) * 20, page * 20)

    return pets
  }
}
