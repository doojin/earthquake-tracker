import path from 'path'
import express from 'express'
import earthquakes from './handler/earthquakes'
import handleErrors from './handler/error'
import handleUi from './handler/ui'

const PORT = process.env.NODE_ENV === 'production' ? 81 : 3000
const app = express()

app.use('/static', express.static(path.resolve(__dirname, '../frontend/build/static')))

app.get('/earthquakes', handleErrors(earthquakes))
app.get('/', handleErrors(handleUi))

app.listen(PORT, () => console.log(`App started: http://localhost:${PORT}`))
