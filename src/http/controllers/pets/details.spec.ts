import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateOrg } from '@/http/utils/test/create-and-authenticate-org'
import { prisma } from '@/lib/prisma'

describe('Pet Details (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get details of a pet', async () => {
    const { token } = await createAndAuthenticateOrg()

    const org = await prisma.org.findFirstOrThrow()

    const pet = await prisma.pet.create({
      data: {
        name: 'Pet Name',
        age: 'cub',
        energy: 'low',
        size: 'small',
        indepence: 'low',
        type: 'dog',
        habitat_size: 'medium',
        org_id: org.id,
      },
    })

    const response = await request(app.server)
      .get(`/pets/${pet.id}/details`)
      .set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toEqual(200)
    expect(response.body.pet).toEqual(
      expect.objectContaining({
        name: 'Pet Name',
        age: 'cub',
        energy: 'low',
        size: 'small',
        indepence: 'low',
        type: 'dog',
        habitat_size: 'medium',
      }),
    )
  })
})
