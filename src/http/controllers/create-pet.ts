import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { ResourceNotFoundError } from '../services/errors/resource-not-found-error'
import { makeCreatePetService } from '../services/factories/make-create-pet-service'

export async function createPet(request: FastifyRequest, reply: FastifyReply) {
  const createPetBodySchema = z.object({
    name: z.string(),
    about: z.string().optional(),
    age: z.enum(['puppy', 'adult']),
    energy: z.enum(['low', 'moderate', 'high', 'very_high']),
    size: z.enum(['little', 'average', 'large']),
    indepence: z.enum(['low', 'high', 'medium']),
    specie: z.enum(['dog', 'cat']),
    habitatSize: z.enum(['medium', 'small', 'wide']),
    orgId: z.string(),
  })

  const {
    name,
    about,
    age,
    energy,
    size,
    indepence,
    specie,
    habitatSize,
    orgId,
  } = createPetBodySchema.parse(request.body)

  try {
    const createPetUseCase = makeCreatePetService()

    await createPetUseCase.execute({
      name,
      about,
      age,
      energy,
      size,
      indepence,
      specie,
      habitatSize,
      orgId,
    })
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(400).send({ message: error.message })
    }

    throw error
  }

  return reply.status(201).send()
}
