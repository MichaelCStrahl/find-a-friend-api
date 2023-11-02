import { z } from 'zod'

import { FastifyRequest, FastifyReply } from 'fastify'
import { registerUseCase } from '../services/register'

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
    await registerUseCase({ name, email, address, cep, whatsapp, password })
  } catch (error) {
    return reply.status(409).send()
  }

  return reply.status(201).send()
}
