import 'jest'
import * as request from 'supertest'
import { app } from '../app'
import setupDb from '../db'
import Student from '../students/entity'

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

describe('EvaluationController', () => {
  test('/students/:id/evaluations', async () => {
    await request(await app.callback())
    .get('students/2/evaluations')
    .set('Authorization', `Bearer ${jwt}`)
    .expect(200)
  })

  test('/evaluations/:id', async() => {
    await request(await app.callback())
    .get('/evaluations/4')
    .set('Authorization', `Bearer ${jwt}`)
    .expect(200)
  })

  test('/evaluations', async() => {

    const target = {
      colour: 'green'
    }

    const response = await request(await app.callback())
    .post('/evaluations')
    .set('Authorization', `Bearer ${jwt}`)
    .send(target)
    .expect(201)
  })

  test('/evaluations/:id', async() => {

    const tar = {
      colour: 'red'
    }

    const res = await request(await app.callback())
    .put('/evaluations/3')
    .set('Authorization', `Bearer ${jwt}`)
    .send(tar)
    .expect(201)
  })

})
