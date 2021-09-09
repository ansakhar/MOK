// 1. Import the mongoose module
const mongoose = require('mongoose')
//const url = 'mongodb+srv://fullstackas:143080Mongo@cluster0.mrl4q.mongodb.net/database'
const url = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_DATABASE}`
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => {
    console.log('Connected to MongoDB')
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB : ', error.message)
  })

// 2. Define a schema
const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  phone: String
})

// 3. Export Model
module.exports = mongoose.model('Person', personSchema, 'persons')

const Person = mongoose.model('Person', personSchema, 'persons')
  //
  /*Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person)
    })
    mongoose.connection.close()
  })*/

  /*const person = new Person({ 
    name: 'Pekka Peloton', 
    age: 50, 
    phone: '234234234' 
  })

  person.save().then(response => {
    console.log('person saved!')
    mongoose.connection.close()
  })*/

  