import express from 'express'
import cors from 'cors'

import loadAllDependencies from './init'
import { PORT } from './env'
import { router as appRoutes } from './routes'

const app = express()
app.use(cors({allowedHeaders: '*'}))

app.use('', appRoutes)

loadAllDependencies().then(() => {
  app.listen(PORT, () => {
    process.stdout.write(`server running on port ${PORT}`)
  })
}).catch(console.error)
