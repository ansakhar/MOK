db.persons.insertOne(
    {
      "name":"Kirsi Kernel", 
      "age":40, 
      "phone":"040-12345678"
    }
  )

db.persons.insertMany( [
      { "name":"Bob Black", 
      "age":40, 
      "phone":"040-12345678" },
      { "name":"Jack Kernel", 
      "age":35, 
      "phone":"040-12345678"},
      { "name":"Helena Kernel", 
      "age":20, 
      "phone":"040-12345678" }
   ] )

   db.persons.find({})

db.persons.find( { name: "Kirsi Kernel" } )