import { describe, test, expect } from '@jest/globals'
import { app } from '../app'
import request from 'supertest'

// Testear ruta /api/register
/* describe('POST /api/register', () => {
  test('Se espera un codigo de estado 201', async () => {
    const response = await request(app).post('/api/register').send({
      username: "ajfaoifnaadasdasdasdas",
      email: "adasddasdasadasdadaw@gmail.com",
      password: "Nicolas_9090"
    })
    expect(response.statusCode).toBe(201)
  }),

  test('Se espera que sea un object los datos', async () => {
    const response = await request(app).post('/api/register').send({
      username: "ajfadadasdasaoifna",
      email: "dasdadawadsadasadqdqdqdq@gmail.com",
      password: "Nicolas_9090"
    })

    expect(typeof response.body).toBe('object')
  })
}) */


// Testear ruta /api/login
describe('POST /api/login', () => {
  test('Se esperaba un codigo de estado 200', async () => {
    const response = await request(app).post('/api/login').send({
      email: 'dasdadaw@gmail.com',
      password: "Nicolas_9090"
    })

    expect(response.statusCode).toBe(200)
  }),

  test('Se espera que sea un object lo recivido', async () => {
    const response = await request(app).post('/api/login').send({
      email: 'dasdadaw@gmail.com',
      password: "Nicolas_9090"
    })
    expect(typeof response.body).toBe('object')
  }),

  test('Se esperaba que sea un content type json', async () =>{
    const response = await request(app).post('/api/login').send({
      email: 'dasdadaw@gmail.com',
      password: "Nicolas_9090"
    })

    expect(response.headers['content-type']).toMatch('json')
  }),

/*   test('Se esperaba que tenga un token', async () => {
    const response = await request(app).post('/api/login').send({
      email: 'dasdadaw@gmail.com',
      password: "Nicolas_9090"
    })

    expect(response.body).toHaveProperty('access_token')
  }), */

  test('Se esperaba que tenga usuario', async () => {
    const response = await request(app).post('/api/login').send({
      email: 'dasdadaw@gmail.com',
      password: "Nicolas_9090"
    })

    expect(response.body).toHaveProperty('usuario')
  }),

  test('No admite otros datos que no esten en la base de datos', async () => {
    const response = await request(app).post('/api/login').send({
      email: 'adminadmin@gmail.com',
      password: "123admin_123"
    })
    expect(response.statusCode).toBe(500)
  })
})

describe('GET /api/tareas/:id_usuario', () => {
  const id_usuario = '22d71e2c-49a7-4e52-a252-d443218cd43c'
  test('Verificar que el estado del codigo es 200', async () => {
    const response = await request(app).get(`/api/tareas/${id_usuario}`)
    expect(response.statusCode).toBe(200)
  }),
  test('Verificar que lo recibido sea un objeto', async () => {
    const response = await request(app).get(`/api/tareas/${id_usuario}`)
    expect(typeof response.body).toBe('object')
  })
})