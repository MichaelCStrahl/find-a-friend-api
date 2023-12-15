import { FastifyInstance } from 'fastify'
import { register } from './register'
import { authenticate } from './authenticate'

export async function appRoutes(app: FastifyInstance) {
  app.post('/orgs', register)
  app.post('/sessions', authenticate)
}
