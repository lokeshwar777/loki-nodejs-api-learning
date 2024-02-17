// A web server using express

const express = require('express')

const app = express()

app.get('/', (req, res) => {
  return res.send('This is Home Page')
})

app.get('/loki', (req, res) => {
  return res.send('God of Mischief')
})

app.get('/god', (req, res) => {
  return res.send(`You are god of ${req.query.name}`)
})

app.listen(8000, () => console.log('Server Started'))