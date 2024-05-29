import cors from 'cors'
import express from 'express'
import morgan from 'morgan'
import { router } from './routes'
import { isApiKey } from './middlewares/apiKey.middleware'
import { excludeRoutes } from './utils/helpers'

const app = express()

// Middlewares
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))
app.disable('x-powered-by')

// Routes

app.use(excludeRoutes(['/api/v1/docs', '/api/docs'], isApiKey))
app.use(router)

export default app
