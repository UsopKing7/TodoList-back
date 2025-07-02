import { Request, Response } from 'express'
import { formatError } from '../utils/formError'
import { tasksService } from '../services/tasks.service'
import { schemaCreateTask } from '../schemas/tasks.schemas'

export const getAllTaksById = async (req: Request, res: Response) => {
  try {
    const { id_usuario } = req.params
    if (!id_usuario) throw new Error('Error al obtener el id del usuario')
    
    const tasksUsuario = await tasksService.getAllTaksById(id_usuario)

    res.status(200).json(tasksUsuario)
  } catch (error) {
    res.status(500).json({
      message: 'algo salio mal',
      error: formatError(error)
    })
  }
}

export const createTaskById = async (req: Request, res: Response) => {
  try {
    const { id_usuario } = req.params
    const result = schemaCreateTask.safeParse(req.body)

    if (!id_usuario) throw new Error('Error al obtener el id del usauario')
    if (!result.success) throw new Error('Error de validacion: ' + result.error.errors.map(e => e.message).join(', '))

    const { title, description } = await result.data
    const newTask = await tasksService.createTaskById({ id_usuario, description, title })

    res.status(200).json(newTask)
  } catch (error) {
    res.status(500).json({
      message: 'Algo salio mal',
      error: formatError(error)
    })
  }
}