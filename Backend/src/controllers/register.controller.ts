import { Request, Response } from 'express'
import { formatError } from '../utils/formError'
import { registerServices } from '../services/register.service'
import { schemaRegister } from '../schemas/register.schema'
import { Username } from '../types/username.types'

export const register = async (req: Request, res: Response) => {
  try {
    const result = schemaRegister.safeParse(req.body)
    
    if (!result.success) throw new Error('Error de validacion: ' + result.error.errors.map(e => e.message).join(', '))

    const { username, email, password }: Username = result.data
    const newUser = await registerServices.register({ username, email, password })

    res.status(201).json(newUser)
  } catch (error) {
    res.status(500).json({
      message: 'algo salio mal',
      error: formatError(error)
    })
  }
}