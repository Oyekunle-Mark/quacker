import supertest from 'supertest'
import faker from 'faker'
import server from '../server'
import { User } from '../modules/user/user.model'

export const testServer = supertest(server)

export const getUserCreds = async (): Promise<{ id: string, token: string }> => {
  const user = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  }

  const res = await testServer.post('/api/auth/register').send(user)

  return {
    id: res.body.data.id,
    token: res.body.data.token,
  }
}
