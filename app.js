
//mongoose
const mongoose = require('mongoose');
//this way either we connect with the DB or we create the DB call as we saw as the last word in the URL
// in this case fruitsDB
mongoose.connect("mongodb://localhost:27017/fruitsDB" , { useNewUrlParser: true , useUnifiedTopology: true  });

//crwating schema with mongoose
const fruitSchema = new mongoose.Schema ({
  name: {
    //validating name, making it required
    type: String,
    required: true
  },
  rating: {
    //validation data, rating can not be grather than 10 neither smaller than 1
    type: Number,
    min: 1 ,
    max: 10


  },
  review: String
});

//model
//by doing this we will have create a new collection/table in Ruby ,call Fruits. because I'll make plural the string we passs in as a first argument.

const Fruit = mongoose.model("Fruit", fruitSchema );

const fruit = new Fruit({

  rating: 10,
  review: "watermelons are awesome"

});

//fruit.save();



//creatinf person schema
const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  profession: String,
  sking: String,
//stablish relationship between personSchema and fruitSchmea
  favoriteFruit: fruitSchema
});

//creating the person model
const Person = mongoose.model("Person", personSchema);

//crating a new fruit with relationship with person
//this pineapple is related with line 49
const pineapple = new Fruit({
  name: "pineapple",
  rating: 8,
  review: "good fruit"
});

pineapple.save();

//creating new person
const person = new Person({
  name: "Amy",
  age: 22,
  profession: "developer",
  color: "white",
  //related with line 49 and line 57
  favoriteFruit: pineapple
});

//deleting many objects with the same matchin name/condition

Person.deleteMany({name: "juan" }, function(err){err ? err : console.log("deleteMany method working") })
person.save();

//creating several instances of our Furuit model and inserte them all togheter

//const kiwi = new Fruit({
  //name: "kiwi",
 // rating: 4,
  //review: "good kiwi"
//});



//const banana = new Fruit({
  //name: "banana",
 // rating: 4,
  //review: "good banana"
//});


//const orange = new Fruit({
  //name: "orange",
 // rating: 4,
  //review: "good orange"
//});

//this is the way of inserting many instance into our model
//Fruit.insertMany([kiwi, orange, banana], function(err) {
  //if (err){
    //console.log(err)
  //} else {
    //console.log("all good");
  //}
//})

// Reading from the DB
Fruit.find(function(err, fruits){
  if(err){
    console.log(err);
  } else {
    //console.log(fruits); // fruits is an array of objects
    fruits.forEach(fruit => console.log(fruit.name))
    mongoose.connection.close(); // instead of using control C
     }

});

//taken from the  mongoose docs
Fruit.updateOne({_id: "5e56b4ce38a8dc743a08b7d6" }, {name: "watermelon"}, function(err){
  if(err){
    console.log(err);
  } else {
    console.log("all good");
  }
});

//deleting one Record from the Fruit collection/Table.
Fruit.deleteOne({name: "watermelon"}, function(err){err ? err : console.log("deleteOne deleted")})

console.log("working")
