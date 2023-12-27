import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateOrg } from '@/http/utils/test/create-and-authenticate-org'

describe('Register Pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a new pet', async () => {
    const { token } = await createAndAuthenticateOrg()

    const response = await request(app.server)
      .post('/pets')
      .send({
        name: 'Pet Name',
        age: 'cub',
        energy: 'low',
        size: 'small',
        indepence: 'low',
        type: 'dog',
        habitatSize: 'medium',
      })
      .set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toEqual(201)
  })
})
