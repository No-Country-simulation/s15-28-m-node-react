import cors from 'cors'
import express from 'express'
import morgan from 'morgan'
import { router } from './routes'
import { isApiKey } from './middlewares/apiKey.middleware'

const app = express()

// Middlewares
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))
app.disable('x-powered-by')

// Routes
app.use(isApiKey)
app.use(router)

export default app
