import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { SECRET } from '../config/env'
import { formatError } from '../utils/formError'
import { RequestUser } from '../types/request.types'

export const routerProtected = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.access_token

  if (!token) throw new Error('Token no proporcionado')

  try {
    const decoded = jwt.verify(token, SECRET)
    req.user = decoded as RequestUser
    next()
  } catch (error) {
    res.status(500).json({
      message: 'Algo salio mal',
      error: formatError(error)
    })
  }
}