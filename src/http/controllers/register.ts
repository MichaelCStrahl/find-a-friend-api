import { z } from 'zod'

import { FastifyRequest, FastifyReply } from 'fastify'
import { OrgAlreadyExistsError } from '../services/errors/org-already-exists-error'
import { makeRegisterService } from '../services/factories/make-register-service'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    address: z.string(),
    cep: z.string(),
    whatsapp: z.string(),
    password: z.string().min(6),
  })

  const { name, email, address, cep, whatsapp, password } =
    registerBodySchema.parse(request.body)

  try {
    const registerUseCase = makeRegisterService()

    await registerUseCase.execute({
      name,
      email,
      address,
      cep,
      whatsapp,
      password,
    })
  } catch (error) {
    if (error instanceof OrgAlreadyExistsError) {
      return reply.status(409).send({ message: error.message })
    }

    throw error
  }

  return reply.status(201).send()
}
