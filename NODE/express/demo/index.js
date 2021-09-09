const express = require('express') 
const app = express()
const port = 3000
const salasana = "salainen" //mongo
const morgan = require('morgan')
//käyttään express json middlewarea
app.use(express.json())

// app level
const logger = (request, response, next) => {
    const date = new Date()
    const lDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
    const log = `${lDate}: ${request.method} ${request.url}\n`
    console.log(log)
    next()
}

//app.use(logger)
app.use(morgan('tiny'))

app.get('/dogs', (req, res, next) => {
    console.log(new Date().toISOString())
    next()
  },
  (req, res) => {
    console.log('response dogs')
    res.status(200).end()
  }
)

app.get('/', (request, response, next) => {
    console.log('Executing the 1st callback function')
    next()
  }, (request, response) => {
    console.log('Executing the 2nd callback function')
    response.send('Hello Express!')
  })
  /*
app.get('/', (request, response) => {
    response.send('<h1>Root</h1>')
  })*/

app.get('/hello', (request, response) => {
    response.send('<h1>Hello Express!</h1>')
  })

  app.get('/secret', (request, response) => {
    res.status(404).end()
  })

  app.get('/jumi', (request, response) => {
    //???
  })

  let person = {'name':'Kirsi Kernel'}

app.get('/testi', (request, response) => {
  response.json(person)
})

  app.get('/users/:userId/todos/:todoId', (request, response) => {
    // code here... now only send request params back to the caller
    response.send(request.params)
  })

  app.post('/person', (req, res) => {
      console.log(req.body)
      console.log(req.headers)
    res.send('POST HTTP received!')
  });
  
  app.put('/', (req, res) => {
    res.send('PUT HTTP received!')
  });
  
  app.delete('/', (req, res) => {
    res.send('DELETE HTTP received!')
  })
  
app.listen(port, () => {
  console.log('Example app listening on port 3000')
})