import express from 'express'
import earthquakes from './handler/earthquakes'
import handleErrors from './handler/error'

const PORT = process.env.NODE_ENV === 'production' ? 80 : 3000
const app = express()

app.get('/earthquakes', handleErrors(earthquakes))

// TODO: for testing purposes, remove this later!
app.get('/', (req, res) => {
  res.json({ message: 'hello, world 1' })
})

app.listen(PORT, () => console.log(`App started: http://localhost:${PORT}/earthquakes`))
