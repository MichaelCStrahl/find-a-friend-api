import { app } from '@/app'
import request from 'supertest'

export async function createAndAuthenticateOrg() {
  await request(app.server).post('/orgs').send({
    name: 'Org Name',
    email: 'johndoe@example.com',
    cep: '99999-999',
    state: 'State',
    city: 'City',
    address: 'Address',
    whatsapp: '55 99999 9999',
    password: '123456',
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'johndoe@example.com',
    password: '123456',
  })

  const { token } = authResponse.body

  return { token }
}
