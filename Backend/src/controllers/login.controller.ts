import { Request, Response } from 'express'
import { loginService } from '../services/login.service'
import { schemaLogin } from '../schemas/login.schemas'
import { formatError } from '../utils/formError'
import { UsernameLogin } from '../types/username.types'

export const login = async (req: Request, res: Response) => {
  try {
    const response = schemaLogin.safeParse(req.body)
    if (!response.success) throw new Error('Error de validacion ' + response.error.errors.map(e => e.message).join(', '))

    const { email, password }: UsernameLogin = response.data

    const usuario = await loginService.login({ email, password })

    res.status(200).json({
      message: 'Login exitoso',
      usuario
    })    
  } catch (error) {
    res.status(500).json({
      message: 'Algo salio mal',
      error: formatError(error)
    })
  }
}