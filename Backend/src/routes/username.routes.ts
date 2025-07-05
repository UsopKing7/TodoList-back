import { Router } from 'express'
import { register } from '../controllers/register.controller'
import { login } from '../controllers/login.controller'
//import { routerProtected } from '../middleware/verificarToken'
import { getAllTaksById, createTaskById, taskCompleteState, taskUpdate, taskDelete, getTaskComplete, getTaskPending } from '../controllers/tasks.controller'

export const router = Router()

router.post('/register', register) // ruta del registro
router.post('/login', login) // ruta para el login
router.get('/tareas/:id_usuario', getAllTaksById) // obtener todas las tareas del usuario
router.post('/tareas/:id_usuario/create_tarea', createTaskById) // Crear tarea por usuario
router.patch('/tareas/:id_usuario/stado/:id_task', taskCompleteState) // Actualizar el estado del usuario 
router.patch('/tareas/:id_usuario/update/:id_task', taskUpdate) // Actualizar la tarea del usuario
router.delete('/tareas/:id_usuario/delete/:id_task', taskDelete) // Eliminar estado de la tarea
router.get('/tareas/:id_usuario/completas', /* routerProtected, */ getTaskComplete) // filtrar por tareas completas del usuario
router.get('/tareas/:id_usuario/pendientes', getTaskPending)

// agraga routerProtected para proteger las rutas