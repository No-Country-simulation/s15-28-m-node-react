import cors from 'cors'
import express from 'express'
import example from './routes/example.routes'
import Task from './routes/task.routes'
import Invoice from './routes/invoice.routes'
import morgan from 'morgan'
import { router } from './routes'

const app = express()

// Middlewares
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))
app.disable('x-powered-by')

// Routes

app.use('/api', example)
app.use('/api', Task)
app.use('/api', Invoice)
app.use(router)

export default app
