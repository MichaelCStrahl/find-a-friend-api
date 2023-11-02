import { prisma } from '@/lib/prisma'
import { PrismaOrgsRepository } from '@/repositories/prisma-orgs-repository'
import { hash } from 'bcryptjs'

interface RegisterUseCaseRequest {
  name: string
  email: string
  address: string
  cep: string
  whatsapp: string
  password: string
}

export async function registerUseCase({
  name,
  email,
  address,
  cep,
  whatsapp,
  password,
}: RegisterUseCaseRequest) {
  const password_hash = await hash(password, 6)

  const userWithSameEmail = await prisma.org.findUnique({ where: { email } })

  if (userWithSameEmail) {
    throw new Error('E-mail already exists.')
  }

  const prismaOrgsRepository = new PrismaOrgsRepository()

  await prismaOrgsRepository.create({
    name,
    email,
    address,
    cep,
    whatsapp,
    password_hash,
  })
}
