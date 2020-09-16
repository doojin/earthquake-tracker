import express from 'express'
import helloWorldHandler from './handler/hello-world'

const PORT = 3000
const app = express()

app.get('/', helloWorldHandler)

app.listen(PORT, () => console.log(`App started: http://localhost:${PORT}`))
