import express from 'express'
import earthquakes from './handler/earthquakes'

const PORT = 3000
const app = express()

app.get('/earthquakes', earthquakes)

app.listen(PORT, () => console.log(`App started: http://localhost:${PORT}/earthquakes`))
