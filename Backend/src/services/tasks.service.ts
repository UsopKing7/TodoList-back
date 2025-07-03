import { prisma } from '../config/connection'

export const tasksService = {
  // Endpoint para mostrar todas las tareas que tiene el usuario
  getAllTaksById: async ( id_usuario: string ) => {
    const usuarioExiste = await prisma.usuarios.findUnique({
      where: {
        id_username: id_usuario
      }
    })

    if (!usuarioExiste) throw new Error('No se encontro el usuario')

    const tasksUsuario = await prisma.tasks.findMany({
      where: {
        id_usuario: id_usuario
      }
    })

    if (!tasksUsuario) throw new Error('El usuario no tiene tareas')

    return {
      id_usuario: id_usuario,
      message: `tareas de ${id_usuario}`,
      tareas: tasksUsuario
    }
  },

  // enpoind para crear una tarea por usuario
  createTaskById: async(tasks: { title: string, description: string, id_usuario: string }) => {
    const usuarioExiste = await prisma.usuarios.findUnique({
      where: {
        id_username: tasks.id_usuario
      }
    })

    if (!usuarioExiste) throw new Error ('Usuario no encontrado')

    const newTask = await prisma.tasks.create({
      data: {
        title: tasks.title,
        description: tasks.description,
        id_usuario: tasks.id_usuario
      }
    })

    if (!newTask) throw new Error('No hay datos en el body')

    return newTask
  },

  // enpoind para marcar como completado, pendiente o en progreso ==> default progreso
  taskModifiStateComplete: async(tasks: { id_task: string, id_usuario: string, state: boolean }) => {
    const usuarioExiste = await prisma.usuarios.findUnique({
      where: {
        id_username: tasks.id_usuario
      }
    })

    if (!usuarioExiste) throw new Error('No se encontro el usuario')

    const tareaExiste = await prisma.tasks.findFirst({
      where: {
        id_tarea: tasks.id_task,
        id_usuario: tasks.id_usuario
      }
    })

    if (!tareaExiste) throw new Error('No se encontro la tarea del usuario')

    const taskComplete = await prisma.tasks.update({
      data: {
        state: tasks.state
      },
      where: {
        id_tarea: tasks.id_task
      },
      select: {
        id_tarea: true,
        title: true,
        state: true,
        apdated_in: true,
        created_in: true,
      }
    })

    return taskComplete
  },

  updateTask: async (task: { id_task: string, title?: string, description?: string, id_usuario: string }) => {
    const usuarioExiste = await prisma.usuarios.findUnique({
      where: {
        id_username: task.id_usuario
      }
    })

    const tareaExiste = await prisma.tasks.findFirst({
      where: {
        id_tarea: task.id_task,
        id_usuario: task.id_usuario
      }
    })

    if (!usuarioExiste) throw new Error('El usuario no existe')
    if (!tareaExiste) throw new Error('La tarea no existe')

    const data: { title?: string, description?: string } = {}

    if (task.title !== undefined) data.title = task.title
    if (task.description !== undefined) data.description = task.description
    
    const taskUpdate = await prisma.tasks.update({
      data,
      where: {
        id_tarea: task.id_task,
        id_usuario: task.id_usuario
      }
    })

    if (!taskUpdate) throw new Error('No se encontraron datos en el body')

    return taskUpdate 
  }
}
