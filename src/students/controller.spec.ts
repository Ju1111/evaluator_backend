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

describe('StudentController', () => {
  test('/students', async () => {
    await request(await app.callback())
    .get('/students')
    .set('Authorization', `Bearer ${jwt}`)
    .expect(200)
  })

  test('/students/:id([0-9]+)', async() => {
    await request(await app.callback())
    .get('/students/1')
    .set('Authorization', `Bearer ${jwt}`)
    .expect(200)
  })

  test('/students', async() => {

    const target = {
      firstName: 'Julia',
      lastName: 'Schneider',
      picture: 'https://ca.slack-edge.com/T0DK39WAJ-U93K8PRTL-7f96d583abdc-512'
    }

    const response = await request(await app.callback())
    .post('/students')
    .set('Authorization', `Bearer ${jwt}`)
    .send(target)
    .expect(201)
  })

  test('/students/:id', async() => {

    const tar = {
      firstName: 'Ju'
    }

    const res = await request(await app.callback())
    .put('/students/4')
    .set('Authorization', `Bearer ${jwt}`)
    .send(tar)
    .expect(201)
  })

  test('/students/id', async() => {
    await request(await app.callback())
    .delete('/students/2')
    .set('Authorization', `Bearer ${jwt}`)
    .expect(201)
  })

})
