import express from 'express'
import earthquakes from './handler/earthquakes'
import handleErrors from './handler/error'

const PORT = 3000
const app = express()

app.get('/earthquakes', handleErrors(earthquakes))

app.listen(PORT, () => console.log(`App started: http://localhost:${PORT}/earthquakes`))
