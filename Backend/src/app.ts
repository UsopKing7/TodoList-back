import express from 'express'
import { router } from './routes/username.routes'
import { PORT } from './config/env'

const app = express()

app.use(express.json())
app.use('/api', router)

app.listen(PORT, '0.0.0.0', () => {
  console.table({
    URL: `http://localhost:${PORT}`
  })
})
