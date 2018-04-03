import 'jest'
import * as request from 'supertest'
import { app } from '../app'
import setupDb from '../db'

beforeAll(async () => {
  await setupDb()
})

describe('EvaluationController', () => {
  test('/evaluations', async () => {
    await request(await app.callback())
    .get('/evaluations')
    .set('Accept', 'application/json')
    .expect(200)
  })

  test('/evaluations/:id([0-9]+)', async() => {
    await request(await app.callback())
    .get('/evaluations')
    .set('Accept', 'application/json')
    .expect(200)
  })

  test('/evaluations', async() => {

    const target = {
      colour: 'green',
      date: '2018-04-02'
    }

    const response = await request(await app.callback())
    .post('/evaluations')
    .set('Accept', 'application/json')
    .send(target)
    .expect(201)
  })

})
