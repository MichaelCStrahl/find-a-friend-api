import { Org, Prisma } from '@prisma/client'
import { OrgsRepository } from '../orgs-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryOrgsRepository implements OrgsRepository {
  public items: Org[] = []

  async create(data: Prisma.OrgCreateInput) {
    const org = {
      id: data.id ?? randomUUID(),
      name: data.name,
      email: data.email,
      cep: data.cep,
      state: data.state,
      city: data.city,
      address: data.address,
      whatsapp: data.whatsapp,
      password_hash: data.password_hash,
      pets: data.pets,
    }

    this.items.push(org)

    return org
  }

  async findByEmail(email: string) {
    const org = this.items.find((item) => item.email === email)

    if (!org) return null

    return org
  }

  async findById(orgId: string) {
    const org = this.items.find((item) => item.id === orgId)

    if (!org) return null

    return org
  }

  async findByCityAndState(city: string, state: string) {
    const orgs = this.items.filter(
      (item) => item.city === city && item.state === state,
    )

    if (!orgs) return null

    return orgs
  }
}
