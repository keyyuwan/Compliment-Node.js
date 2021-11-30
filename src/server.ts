import express from 'express'
import 'reflect-metadata'

import './database'

const app = express()

app.get('/message', (req, res) => {
  return res.send('Hello World')
})

app.post('/compliment', (req, res) => {
  return res.send('Obrigado')
})

app.listen(3000, () => console.log('Server running on port 3000'))
