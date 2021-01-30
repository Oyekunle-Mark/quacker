import { testServer } from './testHelpers'

jest.useFakeTimers()

describe('/ Base URL', () => {
  test('[GET] /api Status code 200 and message at base URL', () => {
    testServer
      .get('/api')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body.data).toEqual('Server is up!')
        expect(res.body).toMatchSnapshot()
      })
  })
})

describe('/some/very/bad_url 404 Endpoint', () => {
  test('[GET] /some/very/bad_url Status code 404 at bad URL', () => {
    testServer
      .get('/some/very/bad_url')
      .expect('Content-Type', /json/)
      .expect(404)
      .then((res) => {
        expect(res.body.data).toEqual('Server is up!')
        expect(res.body).toMatchSnapshot()
      })
  })

  test('[GET] /some/very/bad_url Bad URL should produce message', () => {
    testServer
      .get('/some/very/bad_url')
      .expect('Content-Type', /json/)
      .expect(404)
      .then((res) => {
        expect(res.body.data).toEqual('Not Found.')
        expect(res.body).toMatchSnapshot()
      })
  })
})
