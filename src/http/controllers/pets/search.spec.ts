import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateOrg } from '@/http/utils/test/create-and-authenticate-org'
import { prisma } from '@/lib/prisma'

describe('Search Pets (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to searth pets', async () => {
    const { token } = await createAndAuthenticateOrg()

    const org = await prisma.org.findFirstOrThrow()

    for (let i = 0; i < 10; i++) {
      await prisma.pet.create({
        data: {
          name: `Pet Name ${i}`,
          age: i % 2 === 0 ? 'cub' : 'adult',
          energy: 'low',
          size: 'small',
          indepence: 'low',
          type: 'dog',
          habitat_size: 'medium',
          org_id: org.id,
        },
      })
    }

    const response = await request(app.server)
      .get('/pets/search')
      .query({
        city: 'City',
        state: 'State',
        age: 'adult',
      })
      .set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toEqual(200)
    expect(response.body.pets).toHaveLength(5)
  })
})
