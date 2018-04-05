import 'jest'
import * as request from 'supertest'
import { app } from '../app'
import setupDb from '../db'

let jwt

const email= 'me@me.com'
const password= 'mypassword'

beforeAll(async () => {
  await setupDb()
  jwt = await request(await app.callback())
    .post('/logins')
    .send({ email, password })
    .then(response => response.body.jwt)
})

describe('BatchController', () => {
  test('/batches', async () => {
    await request(await app.callback())
    .get('/batches')
    .set('Authorization', `Bearer ${jwt}`)
    .expect(200)
  })

  test('/batches/:id([0-9]+)', async() => {
    await request(await app.callback())
    .get('/batches/1')
    .set('Authorization', `Bearer ${jwt}`)
    .expect(200)
  })

  test('/batches', async() => {

    const target = {
      batchNumber: 5,
      startDate: '2018-02-12',
      endDate: '2018-04-20'
    }

    const response = await request(await app.callback())
    .post('/batches')
    .set('Authorization', `Bearer ${jwt}`)
    .send(target)
    .expect(201)
  })

})
