import { Pet, Prisma } from '@prisma/client'
import { PetsRepository } from '../pets-repository'
import { randomUUID } from 'node:crypto'

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
      specie: data.specie,
      habitat_size: data.habitat_size,
      org_id: data.org_id,
    }

    this.items.push(pet)

    return pet
  }
}
