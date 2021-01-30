import faker from 'faker'
import { testServer, getUserAndQuestionDetails } from '../../testHelpers'
import { Answer } from './answer.model'

jest.useFakeTimers()

beforeAll(async () => {
  await Answer.destroy({ where: {} })
})

describe('/api/answers Answer Route', () => {
  let cred: { questionId: string; token: string }

  test('[POST] /api/answers Status code 201 upon creation', async () => {
    cred = await getUserAndQuestionDetails()

    testServer
      .post('/api/answers')
      .send({
        questionId: cred.questionId,
        content: faker.address.direction(false),
      })
      .set('Authorization', `Bearer ${cred.token}`)
      .expect('Content-Type', /json/)
      .expect(201)
  })

  test('[POST] /api/answers returns correct details', async () => {
    testServer
      .post('/api/answers')
      .send({
        questionId: cred.questionId,
        content: faker.address.direction(false),
      })
      .set('Authorization', `Bearer ${cred.token}`)
      .expect('Content-Type', /json/)
      .expect(201)
      .then((res) => {
        expect(res.body.data.questionId).toEqual(cred.questionId)
      })
  })
})
