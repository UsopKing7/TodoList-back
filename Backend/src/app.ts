import express from 'express'
import { router } from './routes/username.routes'
import { PORT } from './config/env'
import cookieParser from 'cookie-parser'

export const app = express()

app.use(express.json())
app.use(cookieParser())
app.use('/api', router)

app.listen(PORT, '0.0.0.0', () => {
  console.table({
    URL: `http://localhost:${PORT}`
  })
})
