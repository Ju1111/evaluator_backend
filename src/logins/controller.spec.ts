import 'jest'
import * as request from 'supertest'
import { app } from '../app'
import setupDb from '../db'
import Teacher from '../teachers/entity'

beforeAll(async () => {
  await setupDb()
  Teacher.create
})

describe('LoginController', () => {
  test('/logins', async () => {
    await request(await app.callback())
    .post('/logins')
    .send({
      email: 'me@me.com',
      password: 'mypassword'
    })
    .expect(302)
  })
})
