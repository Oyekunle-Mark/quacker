import supertest from 'supertest'
import faker from 'faker'
import server from '../server'

export const testServer = supertest(server)

export const getUserCreds = async (): Promise<{
  id: string
  token: string
}> => {
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

export const getUserAndQuestionDetails = async (): Promise<{
  token: string
  questionId: string
}> => {
  const userCreds = await getUserCreds()

  const res = await testServer
    .post('/api/questions')
    .send({
      title: faker.commerce.productName(),
      description: faker.address.direction(false),
    })
    .set('Authorization', `Bearer ${userCreds.token}`)

  return {
    token: userCreds.token,
    questionId: res.body.data.id,
  }
}
