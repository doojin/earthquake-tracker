import express from 'express'
import helloWorldHandler from './handler/hello-world'
import earthquakes from './handler/earthquakes'

const PORT = 3000
const app = express()

app.get('/', helloWorldHandler)
app.get('/earthquakes', earthquakes)

app.listen(PORT, () => console.log(`App started: http://localhost:${PORT}`))
