import { Org, Prisma } from '@prisma/client'
import { OrgsRepository } from '../orgs-repository'

export class InMemoryOrgsRepository implements OrgsRepository {
  public items: Org[] = []

  async create(data: Prisma.OrgCreateInput) {
    const org = {
      id: 'org-01',
      name: data.name,
      email: data.email,
      address: data.address,
      cep: data.cep,
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
}
