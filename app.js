const express = require('express')
const app = express()
const port = process.env.PORT || 8080
const morgan = require('morgan')

app.use(morgan('dev'))

const party = [
  { id: 1, name: 'Mario' },
  { id: 2, name: 'Lemon' },
  { id: 3, name: 'Pool' }
]

app.get('/ping', (req, res) => {
  throw Error('What the fuck!')
  // res.json({ message: 'pong!' })
})

app.use((req, res, next) => {
  console.log('I am a middleware!')
  next()
})

app.get('/party', (req, res) => {
  res.json(party)
})

app.get('/party/:id', (req, res, next) => {
  const id = Number(req.params.id)
  const result = party.find(item => item.id === id)
  if(result) {
    res.json(result)
  } 
  next({ error: { status: 404, message: 'Party not found' }})
})

app.get('/hello/friend', (req, res) => {
  res.json({ message: `Hi there, friend!!` })
})

app.get('/hello/:name', (req, res) => {
  const { name } = req.params
  res.json({ message: `Hello ${name}!` })
})

app.use((err, req, res, next) => {
  console.log(err)
  const status = err.status || 500
  res.status(status).json({ error: err.message })
})

const listener = () => console.log(`Listening on port ${port}!`)
app.listen(port, listener)