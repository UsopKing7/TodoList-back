import { Router } from 'express'
import { register } from '../controllers/register.controller'
import { login } from '../controllers/login.controller'
import { getAllTaksById, createTaskById, taskCompleteState } from '../controllers/tasks.controller'

export const router = Router()

router.post('/register', register) // ruta del registro
router.post('/login', login) // ruta para el login
router.get('/tareas/:id_usuario', getAllTaksById) // obtener todas las tareas del usuario
router.post('/tareas/:id_usuario/create_tarea', createTaskById) // Crear tarea por usuario
router.patch('/tareas/:id_usuario/stado/:id_task', taskCompleteState) // Actualizar tarea del usuario 
router.patch('/tareas/:id_usuario/update/:id_task')