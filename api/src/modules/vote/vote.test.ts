import faker from 'faker'
import { testServer, getUserAndQuestionDetails } from '../../testHelpers'
import { Vote } from './vote.model'

jest.useFakeTimers()

beforeAll(async () => {
  await Vote.destroy({ where: {} })
})

describe('/api/votes Vote Route', () => {
  let cred: { questionId: string; token: string }
  const voteType = { up: 'up', down: 'down' }

  test('[POST] /api/votes status 200 for first votes', async () => {
    cred = await getUserAndQuestionDetails()

    testServer
      .post('/api/votes')
      .send({
        questionId: cred.questionId,
        voteType: voteType.up,
      })
      .set('Authorization', `Bearer ${cred.token}`)
      .expect('Content-Type', /json/)
      .expect(200)
  })

  test('[POST] /api/votes vote successful message', async () => {
    cred = await getUserAndQuestionDetails()

    testServer
      .post('/api/votes')
      .send({
        questionId: cred.questionId,
        voteType: voteType.down,
      })
      .set('Authorization', `Bearer ${cred.token}`)
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body.data).toEqual('Vote successful')
      })
  })

  test('[POST] /api/votes 422 for bad vote type', async () => {
    testServer
      .post('/api/votes')
      .send({
        questionId: cred.questionId,
        voteType: faker.random.alpha(),
      })
      .set('Authorization', `Bearer ${cred.token}`)
      .expect('Content-Type', /json/)
      .expect(422)
  })
})
