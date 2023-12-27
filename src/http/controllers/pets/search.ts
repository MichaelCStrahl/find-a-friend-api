import { makeSearchPetsService } from '@/http/services/factories/make-search-pets-service'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchPetsQuerySchema = z.object({
    city: z.string(),
    state: z.string(),
    age: z.enum(['cub', 'adult', 'elderly']).optional(),
    energy: z.enum(['low', 'moderate', 'high', 'very_high']).optional(),
    size: z.enum(['small', 'medium', 'big']).optional(),
    indepence: z.enum(['low', 'high', 'medium']).optional(),
    type: z.enum(['dog', 'cat']).optional(),
    page: z.coerce.number().min(1).default(1),
  })

  const { city, state, age, energy, size, indepence, type, page } =
    searchPetsQuerySchema.parse(request.query)

  const searchPetsUseCase = makeSearchPetsService()

  const query = { city, state, filter: { age, energy, size, indepence, type } }

  const { pets } = await searchPetsUseCase.execute({
    query,
    page,
  })

  return reply.status(200).send({ pets })
}
