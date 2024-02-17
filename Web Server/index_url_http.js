// A web server with url, fs, http (explicit usage) 

// import http from 'node:http'
const http = require('http') //built-in module in nodejs
const fs = require('fs')
const url = require('url')
const { error } = require('console')

const myServer = http.createServer((req, res) => {
  if (req.url === '/favicon.ico') return res.end()
  const log = `${Date.now()}: ${req.method} ${req.url} New Request received\n`
  const myUrl = url.parse(req.url, true)
  //console.log(myUrl)
  fs.appendFile('log.txt', log, (error, data) => {
    // non-blocking request
    switch (myUrl.pathname) {
      case '/':
        console.log(req.url)
        res.end('Home Page')
        break
      case '/loki':
        console.log(req.url)
        res.end('God of Mischief')
        break
      case '/thor':
        console.log(req.url)
        res.end('God of Thunder')
        break
      case '/hela':
        console.log(req.url)
        res.end('God of Death')
        break
      case '/god':
        console.log(req.url)
        res.end(myUrl.query.godName)
        break
      case '/signup':
        if (req.method === 'GET') res.end('This is a signup form')
        else if (req.method === 'POST') res.end('success')
      default:
        res.end('Page Not Found')
        console.log(req.url)
    }
  })
})

myServer.listen(8000, () => console.log('server started'))