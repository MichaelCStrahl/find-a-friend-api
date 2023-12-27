import { makeDetailsPetService } from '@/http/services/factories/make-details-pet-service'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function details(request: FastifyRequest, reply: FastifyReply) {
  const detailsPetParamsSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = detailsPetParamsSchema.parse(request.params)

  const detailsPetUseCase = makeDetailsPetService()

  const { pet } = await detailsPetUseCase.execute({
    id,
  })

  return reply.status(200).send({ pet })
}
