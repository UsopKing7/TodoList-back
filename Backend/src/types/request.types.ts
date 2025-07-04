export interface RequestUser {
  id_usuario: string
  email: string
  iat: number
  exp: number
}

declare global {
  namespace Express {
    interface Request {
      user: RequestUser
    }
  }
}