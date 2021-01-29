import supertest from 'supertest'
import server from '../server'

export const testServer = supertest(server)
