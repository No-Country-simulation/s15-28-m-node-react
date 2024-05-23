import cors from 'cors'
import express from 'express'
import example from './routes/example.routes'
import Task from './routes/task.routes'

const app = express()

// Middlewares
app.use(express.json())
app.use(cors())
app.disable('x-powered-by')

// Routes

app.use('/api', example)
app.use('/api', Task)

export default app
