import { prisma } from '../config/connection'

export const tokenServices = {
  addToken: async (token: { id_usuario: string, token: string }) => {
    const userExiste = await prisma.usuarios.findUnique({
      where: {
        id_username: token.id_usuario
      }
    })

    if (!userExiste) throw new Error('Usuario no encontrado')

    await prisma.tokens.create({
      data: {
        id_usuario: token.id_usuario,
        token: token.token
      }
    })

    return "Token guardado"
  }
}