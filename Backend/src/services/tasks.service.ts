import { prisma } from '../config/connection'

export const tasksService = {
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
  }
}
