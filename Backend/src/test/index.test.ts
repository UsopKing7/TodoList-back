import { describe, test, expect } from '@jest/globals'
import { app } from '../app'
import request from 'supertest'

const id_usuario = '5b816466-d38d-47bb-a3bc-81949937a2ff'
const id_task = 'f3d37164-efc9-42c1-adf1-0e830b8c6630'

// ====> Testear ruta /api/register

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

// =====> Testear ruta /api/login

describe('POST /api/login', () => {
  test('Se esperaba un codigo de estado 200', async () => {
    const response = await request(app).post('/api/login').send({
      email: 'dasdadaw@gmail.com',
      password: 'Nicolas_9090'
    })

    expect(response.statusCode).toBe(200)
  }),
    test('Se espera que sea un object lo recivido', async () => {
      const response = await request(app).post('/api/login').send({
        email: 'dasdadaw@gmail.com',
        password: 'Nicolas_9090'
      })
      expect(typeof response.body).toBe('object')
    }),
    test('Se esperaba que sea un content type json', async () => {
      const response = await request(app).post('/api/login').send({
        email: 'dasdadaw@gmail.com',
        password: 'Nicolas_9090'
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
        password: 'Nicolas_9090'
      })

      expect(response.body).toHaveProperty('usuario')
    }),
    test('No admite otros datos que no esten en la base de datos', async () => {
      const response = await request(app).post('/api/login').send({
        email: 'adminadmin@gmail.com',
        password: '123admin_123'
      })
      expect(response.statusCode).toBe(500)
    })
})

// =====> Testear ruta /api/tareas/:id_usuario

describe('GET /api/tareas/:id_usuario', () => {
  test('Verificar que el estado del codigo es 200', async () => {
    const response = await request(app).get(`/api/tareas/${id_usuario}`)
    expect(response.statusCode).toBe(200)
  }),
    test('Verificar que lo recibido sea un objeto', async () => {
      const response = await request(app).get(`/api/tareas/${id_usuario}`)
      expect(typeof response.body).toBe('object')
    }),
    test('Cada tarea debe tener un id_usuario igual al del parámetro', async () => {
      const response = await request(app).get(`/api/tareas/${id_usuario}`)

      response.body.tareas.forEach((tarea: any) => {
        expect(tarea).toHaveProperty('id_usuario')
        expect(tarea.id_usuario).toBe(id_usuario)
      })
    })
})

// =====> Testear ruta /api/tareas/:id_usuario/create_tarea
describe('POST /api/tareas/:id_usuario/create_tarea', () => {
  test('Verificar que el codigo de estado sea 201', async () => {
    const response = await request(app)
      .post(`/api/tareas/${id_usuario}/create_tarea`)
      .send({
        title: 'Primer test',
        description: 'este es el primer test de prueba'
      })

    expect(response.statusCode).toBe(201)
  }),
    test('Verificar que el content-type sea application json', async () => {
      const response = await request(app)
        .post(`/api/tareas/${id_usuario}/create_tarea`)
        .send({
          title: 'test deprueba de content type application json',
          description: 'esta es una prueba de content type json'
        })

      expect(response.headers['content-type']).toMatch('json')
    }),
    test('Verificar que sea un objeto el enviado', async () => {
      const response = await request(app)
        .post(`/api/tareas/${id_usuario}/create_tarea`)
        .send({
          title: 'test deprueba de content type application json',
          description: 'esta es una prueba de content type json'
        })

      expect(typeof response.body).toBe('object')
    }),
    test('Verificar que el envio no este vacio', async () => {
      const response = await request(app)
        .post(`/api/tareas/${id_usuario}/create_tarea`)
        .send({
          title: '',
          description: ''
        })

      expect(response.statusCode).toBe(500)
      const message = expect(response.body).toHaveProperty('message')
      console.log(message)
    }),
    test('Verificar que el title no este vacio', async () => {
      const response = await request(app)
        .post(`/api/tareas/${id_usuario}/create_tarea`)
        .send({
          description: 'sin title'
        })

      expect(response.statusCode).toBe(500)
      expect(response.body).toHaveProperty('message')
    }),
    test('Verificar que la description no este vacio', async () => {
      const response = await request(app)
        .post(`/api/tareas/${id_usuario}/create_tarea`)
        .send({
          title: 'sin description'
        })
      expect(response.statusCode).toBe(500)
      expect(response.body).toHaveProperty('message')
    })
})

// =====> Test para la ruta /tareas/:id_usuario/stado/:id_task

describe('PATCH /api/tareas/:id_usuario/stado/:id_task', () => {
  test('esperar que el codigo de estado sea 200', async () => {
    const response = await request(app)
      .patch(`/api/tareas/${id_usuario}/stado/${id_task}`)
      .send({
        state: true
      })

    expect(response.statusCode).toBe(200)
  }),
    test('Verificar que sea un content-type application json', async () => {
      const response = await request(app)
        .patch(`/api/tareas/${id_usuario}/stado/${id_task}`)
        .send({
          state: true
        })

      expect(response.headers['content-type']).toMatch('json')
    }),
    test('Verificar que sea un objeto lo mandado', async () => {
      const response = await request(app)
        .patch(`/api/tareas/${id_usuario}/stado/${id_task}`)
        .send({
          state: true
        })

      expect(typeof response.body).toBe('object')
    }),
    test('Verificar que lo recivido es un booleno', async () => {
      const response = await request(app)
        .patch(`/api/tareas/${id_usuario}/stado/${id_task}`)
        .send({
          state: true
        })

      expect(typeof response.body.state).toBe('boolean')
    })
})

// =====> Test para la ruta
describe('/api/tareas/:id_usuario/update/:id_task', () => {
  test('Verificar que el codigo de estado sea un 200', async () => {
    const response = await request(app)
      .patch(`/api/tareas/${id_usuario}/update/${id_task}`)
      .send({
        title: 'hola test patch',
        description: 'prueba cambiada en el test'
      })

    expect(response.statusCode).toBe(200)
  }),
    test('Verificar que el content-type sea application json', async () => {
      const response = await request(app)
        .patch(`/api/tareas/${id_usuario}/update/${id_task}`)
        .send({
          title: 'hola test patch',
          description: 'prueba cambiada en el test'
        })

      expect(response.headers['content-type']).toMatch('json')
    }),
    test('Verificar que sea un object lo enviado or recivido', async () => {
      const response = await request(app)
        .patch(`/api/tareas/${id_usuario}/update/${id_task}`)
        .send({
          title: 'hola test patch',
          description: 'prueba cambiada en el test'
        })

      expect(typeof response.body).toBe('object')
    }),
    test('Verificar que no este vacio el title y description', async () => {
      const response = await request(app)
        .patch(`/api/tareas/${id_usuario}/update/${id_task}`)
        .send({
          title: '',
          description: ''
        })

      expect(response.statusCode).toBe(500)
    })
})

// =====> Testear la ruta /api/tareas/:id_usuario/delete/:id_task
/* describe('DELETE /api/tareas/:id_usuario/delete/:id_task', () => {
  const id_taskDelete = '11c20b71-9629-4aaf-9d21-6eefe50937b9'
  const id_userDelete = '5b816466-d38d-47bb-a3bc-81949937a2ff'

  test('Verificar que el codigo de estado sea 200', async () => {
    const response = await request(app).delete(`/api/tareas/${id_userDelete}/delete/${id_taskDelete}`)

    expect(response.statusCode).toBe(200)
  })
}) */

// =====> Test para la ruta /api/tareas/:id_usuario/completas
describe('GET /api/tareas/:id_usuario/completas', () => {
  
  test('Verificar que el codigo de estado es 200', async () => {
    const response = await request(app).get(`/api/tareas/${id_usuario}/completas`)

    expect(response.statusCode).toBe(200)
  }),

  test('Verificar que lo recivido es un objeto', async () => {
    const response = await request(app).get(`/api/tareas/${id_usuario}/completas`)

    expect(typeof response.body).toMatch('object')
  })
})

// =====> Test para la ruta /apitareas/:id_usuario/pendientes

describe('GET /api/tareas/:id_usuario/pendientes', () => {

  test('Verificar que el codigo de estado sea 200', async () => {
    const response = await request(app).get(`/api/tareas/${id_usuario}/pendientes`)

    expect(response.statusCode).toBe(200)
  }),

  test('Verificar que lo recivido sea un object', async () => {
    const response = await request(app).get(`/api/tareas/${id_usuario}/completas`)

    expect(typeof response.body).toMatch('object')
  })
})
