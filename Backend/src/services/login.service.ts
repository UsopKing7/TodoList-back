import { prisma } from '../config/connection'
import bcrypt from 'bcrypt'

export const loginService = {
  login: async (usuario: { email: string, password: string }) => {
    const emailExiste = await prisma.usuarios.findUnique({
      where: { email: usuario.email },
      select: {
        id_username: true,
        username: true,
        email: true,
        password: true
       }
    })

    if (!emailExiste) throw new Error('Email not exist to database')

    const validaciónPassword = await bcrypt.compare(usuario.password, emailExiste.password)
    if(!validaciónPassword) throw new Error('Contraseña incorrecta')

    return {
      id_username: emailExiste.id_username,
      username: emailExiste.username,
      email: emailExiste.email
    }
  }
}
