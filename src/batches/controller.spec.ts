import 'jest'
import * as request from 'supertest'
import { app } from '../app'
import setupDb from '../db'

beforeAll(async () => {
  await setupDb()
})

describe('BatchController', () => {
  test('/batches', async () => {
    await request(await app.callback())
    .get('/batches')
    .set('Accept', 'application/json')
    .expect(200)
  })

  test('/batches/:id([0-9]+)', async() => {
    await request(await app.callback())
    .get('/batches/1')
    .set('Accept', 'application/json')
    .expect(200)
  })

  test('/batches', async() => {

    const target = {
      batchNumber: 1,
      startDate: '2018-02-12',
      endDate: '2018-04-20'
    }

    const response = await request(await app.callback())
    .post('/batches')
    .set('Accept', 'application/json')
    .send(target)
    .expect(201)
  })

})
