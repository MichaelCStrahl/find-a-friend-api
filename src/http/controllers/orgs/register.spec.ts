import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Register Org (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register', async () => {
    const response = await request(app.server).post('/orgs').send({
      name: 'Org Name',
      email: 'johndoe@example.com',
      cep: '99999-999',
      state: 'State',
      city: 'City',
      address: 'Address',
      whatsapp: '55 99999 9999',
      password: '123456',
    })

    expect(response.statusCode).toEqual(201)
  })
})
