import server from './server'
import supertest from 'supertest'

jest.useFakeTimers()

const request = supertest(server)

describe('[GET] /api should be welcome message', () => {
  test('Status code 200 at base URL', () => {
    request
      .get('/api')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body.data).toEqual('Server is up!')
        expect(res.body).toMatchSnapshot()
      })
  })
})

describe('[GET] /some/very/bad_url should be be 404', () => {
  test('Status code 404 at bad URL', () => {
    request
      .get('/some/very/bad_url')
      .expect('Content-Type', /json/)
      .expect(404)
      .then((res) => {
        expect(res.body.data).toEqual('Server is up!')
        expect(res.body).toMatchSnapshot()
      })
  })

  test('Bad URL should produce message', () => {
    request
      .get('/some/very/bad_url')
      .expect('Content-Type', /json/)
      .expect(404)
      .then((res) => {
        expect(res.body.data).toEqual('Not Found.')
        expect(res.body).toMatchSnapshot()
      })
  })
})
