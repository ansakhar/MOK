const config = require('./utils/config')
const express = require('express')
var cors = require('cors')
require('express-async-errors')
const app = express()
app.use(cors())

const loginRouter = require('./controllers/login')
const ownersRouter = require('./controllers/owners')
const todosRouter = require('./controllers/todos')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')

app.use(middleware.requestLogger)
app.use(express.json())
app.use('/login', loginRouter)
app.use('/owners', ownersRouter)
app.use('/todos', todosRouter)
app.use(middleware.errorHandler)

const mongoose = require('mongoose')
logger.log('Connecting to MongoDB')

mongoose.connect(config.MONGODB_URI, 
  { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    //useFindAndModify: false,
    //useCreateIndex: true
  })
  .then(() => {
    logger.log('Connected to MongoDB')
  })
  .catch((error) => {
    logger.error('Error connection to MongoDB:', error.message)
  })

/*app.get('/', (request, response) => {
  response.send('Hello Express!')
})*/

app.listen(config.PORT, () => {
    logger.info(`Todos app listening on port ${config.PORT}`)
})