import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { OrgsRepository } from '../orgs-repository'

export class PrismaOrgsRepository implements OrgsRepository {
  findById(orgId: string): Promise<{
    id: string
    name: string
    email: string
    cep: string
    state: string
    city: string
    address: string
    whatsapp: string
    password_hash: string
  } | null> {
    throw new Error('Method not implemented.')
  }

  async findByEmail(email: string) {
    const org = await prisma.org.findFirst({
      where: {
        email,
      },
    })

    return org
  }

  async create({
    name,
    address,
    cep,
    city,
    email,
    password_hash,
    state,
    whatsapp,
  }: Prisma.OrgCreateInput) {
    const org = await prisma.org.create({
      name,
      address,
      cep,
      city,
      email,
      password_hash,
      state,
      whatsapp,
    })

    return org
  }
}
