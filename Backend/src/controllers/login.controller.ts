import { Request, Response } from 'express'
import { loginService } from '../services/login.service'
import { schemaLogin } from '../schemas/login.schemas'
import { formatError } from '../utils/formError'
import { UsernameLogin } from '../types/username.types'
import { generateToken } from '../utils/generateToken'
import { tokenServices } from '../services/tokens.service'

export const login = async (req: Request, res: Response) => {
  try {
    const response = schemaLogin.safeParse(req.body)
    if (!response.success) throw new Error('Error de validacion ' + response.error.errors.map(e => e.message).join(', '))

    const { email, password }: UsernameLogin = response.data

    const usuario = await loginService.login({ email, password })

    const token = generateToken({ id_usuario: usuario.id_username, email: usuario.email })

    await tokenServices.addToken({ id_usuario: usuario.id_username as string, token: token })

    res.cookie('access_token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 24 * 7
    })

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