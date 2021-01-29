import faker from 'faker'
import { testServer } from '../../testHelpers'
import { User } from './user.model'

jest.useFakeTimers()

beforeAll(async () => {
  await User.destroy({ where: {} })
})

describe('/api/auth Auth Route', () => {
  const user = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  }

  test('[POST] /register Status code 201 upon creation', () => {
    testServer
      .post('/api/auth/register')
      .send(user)
      .expect('Content-Type', /json/)
      .expect(201)
      .then((res) => {
        expect(res.body.data).toMatchSnapshot()
      })
  })

  test('[POST] /login Log in with correct auth', () => {
    testServer
      .post('/api/auth/login')
      .send(user)
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body.data).toMatchSnapshot()
      })
  })

  test('[POST] /login Fail login with bad auth', () => {
    testServer
      .post('/api/auth/login')
      .send({
        email: 'whoknows@whoknows.com',
        password: '123455password',
      })
      .expect('Content-Type', /json/)
      .expect(401)
      .then((res) => {
        expect(res.body.data).toMatchSnapshot()
      })
  })
})
