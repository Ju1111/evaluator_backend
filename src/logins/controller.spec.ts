import 'jest'
import * as request from 'supertest'
import { app } from '../app'
import setupDb from '../db'
import Teacher from '../teachers/entity'

const email= 'me@me.com'
const password= 'mypassword'

beforeAll(async () => {
  await setupDb()
  const entity = Teacher.create({ email })
  await entity.setPassword(password)
  return entity.save()
})

describe('LoginController', () => {
  test('/logins', async () => {
    await request(await app.callback())
    .post('/logins')
    .send({
      email,
      password
    })
    .expect(200)
  })
})
