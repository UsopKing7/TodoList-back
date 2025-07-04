import jwt from 'jsonwebtoken'
import { SECRET } from '../config/env'

export const generateToken = (payload: { id_usuario: string, email: string }) => {
  return jwt.sign(payload, SECRET, {
    expiresIn: '7d'
  })
}