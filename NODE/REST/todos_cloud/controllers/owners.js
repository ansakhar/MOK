const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const ownersRouter = require('express').Router()
const Owner = require('../models/owner')


ownersRouter.post('/', async (request, response, next) => {
  const body = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const owner = new Owner({
    name: body.name,
    passwordHash
  })

  try {
    const savedOwner = await owner.save()
    response.json(savedOwner)
  } catch(error) {
    next(error)
  }
})

ownersRouter.get('/', async (request, response) => {
    const owners = await Owner
      .find({})
      .populate('todos')
  
    response.json(owners)
  })

  ownersRouter.get('/:id', async (request, response) => {
    const token = getTokenFrom(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    console.log(decodedToken);
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'Owners stoken missing or invalid!' })
    }
    
    const owners = await Owner
      .findById(decodedToken.id)
      .populate('todos')
  
    response.json(owners)
  })

  const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      return authorization.substring(7)
    }
    return null
  }

module.exports = ownersRouter