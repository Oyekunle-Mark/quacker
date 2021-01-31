import faker from 'faker'
import { testServer, getUserCreds } from '../../testHelpers'
import { Question } from './question.model'

jest.useFakeTimers()

beforeAll(async () => {
  await Question.destroy({ where: {} })
})

describe('/api/questions Question Route', () => {
  let user: { id: string; token: string }
  let bookId: string

  test('[POST] / Status code 201 upon creation', async () => {
    user = await getUserCreds()

    testServer
      .post('/api/questions')
      .send({
        title: faker.commerce.productName(),
        description: faker.address.direction(false),
      })
      .set('Authorization', `Bearer ${user.token}`)
      .expect('Content-Type', /json/)
      .expect(201)
      .then((res) => {
        expect(res.body.data).toMatchSnapshot()
        bookId = res.body.data.id
      })
  })

  test('[GET] /question/:id Get one book', () => {
    testServer
      .get(`/api/questions/${bookId}`)
      .set('Authorization', `Bearer ${user.token}`)
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body.data.id).toEqual(bookId)
      })
  })

  test('[GET] / Get all books', () => {
    testServer
      .get('/api/questions')
      .set('Authorization', `Bearer ${user.token}`)
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body.data.length).toEqual(1)
      })
  })

  test('[GET] /user Get users books', () => {
    testServer
      .get('/api/questions/user')
      .set('Authorization', `Bearer ${user.token}`)
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body.data.length).toEqual(1)
      })
  })
})
