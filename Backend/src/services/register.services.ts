import { prisma } from '../config/connection'
import { SAL } from '../config/env'
import bcrypt from 'bcrypt'

export const registerServices = {
  register: async (usuario: { username: string, email: string, password: string }) => {
    const hashPassword = await bcrypt.hash(usuario.password, SAL)
    const response = await prisma.usuarios.create({
      data: {
        username: usuario.username,
        email: usuario.email,
        password: hashPassword
      }
    })
    return { 
      username: response.username,
      email: response.email,
      password: response.password 
    }
  }
}
