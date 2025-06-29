import { Router } from 'express'
import { register } from '../controllers/register.controllers'

export const router = Router()

router.post('/register', register)
