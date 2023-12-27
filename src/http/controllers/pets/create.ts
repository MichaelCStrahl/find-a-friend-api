import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { ResourceNotFoundError } from '../../services/errors/resource-not-found-error'
import { makeCreatePetService } from '../../services/factories/make-create-pet-service'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createPetBodySchema = z.object({
    name: z.string(),
    about: z.string().optional(),
    age: z.enum(['cub', 'adult', 'elderly']),
    energy: z.enum(['low', 'moderate', 'high', 'very_high']),
    size: z.enum(['small', 'medium', 'big']),
    indepence: z.enum(['low', 'high', 'medium']),
    type: z.enum(['dog', 'cat']),
    habitatSize: z.enum(['medium', 'small', 'wide']),
  })

  const { name, about, age, energy, size, indepence, type, habitatSize } =
    createPetBodySchema.parse(request.body)

  try {
    const createPetUseCase = makeCreatePetService()

    await createPetUseCase.execute({
      name,
      about,
      age,
      energy,
      size,
      indepence,
      type,
      habitatSize,
      orgId: request.user.sub,
    })

    return reply.status(201).send()
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(400).send({ message: error.message })
    }

    throw error
  }
}
