// var prompt= require('prompt-sync')();



// console.log("Server is running");


// //method 1
// function add(a,b){
//     return a+b;
// }
// console.log(add(6,6));


// //method 2
// var subtract= function(a,b){
//     return (a-b);
// }
// console.log(subtract(9,6));


// //method 3  Arrow function
// var multiply= (a,b)=>{
//     return a*b;
// }
// console.log(multiply(6,10));

// //method 4
// var divide=(a,b)=>a/b;
// console.log(divide(90/15));

// var a=Number(prompt("a: "));
// var b=Number(prompt("b: "));
// (function(){
//     console.log(a+b);
// })();

// function callback(){
//     return ("Goode");
// }
// function add(a,b,callback){
//     var sum= a+b;
//     console.log(sum);
//     console.log(callback()); //when a function is called inside another function it is callback function
// }
// add(8,6,callback);

/*var fs=require('fs');
var os=require('os');
var user=os.userInfo();
console.log(user.username);
fs.appendFile("greetings.txt","Hello "+user.username+"\n",()=>{
    console.log('file is crated');
});*/

/*const nodes=require('./notes.js');
console.log("it is server.js");
console.log(nodes.age);
console.log(nodes.addNumber(5,7));

var _=require('lodash');
var data=["person","person",1,1,1,"name","name","age","2"];
var filter=_.uniq(data);
console.log(filter);

console.log(_.isString(7));*/

//jsonstring to object
/*const jsonString='{"name":"john","age":23,"city":"New York"}';
const convert_jsonstring_into_object=JSON.parse(jsonString);
console.log(convert_jsonstring_into_object);
console.log(typeof(jsonString));
console.log(typeof(convert_jsonstring_into_object));*/

//object to json string
/*const object={
    name:'John',
    age:23,
    city:"New York"
};
console.log(typeof(object));

const convert_object_into_JSONstring=JSON.stringify(object);
console.log(convert_object_into_JSONstring);
console.log(typeof(convert_object_into_JSONstring));
*/
//Express intial run 
const cors=require('cors');
const express=require('express');
const app=express();
const db=require('./db');
// const Person=require('./models/person');
// const Menu=require('./models/menu');
const personRoutes=require('./routes/personRoutes');
const menuItemRoutes=require('./routes/menuItemRoutes');


app.use(cors());
app.use(express.json());
app.use('/person',personRoutes);
app.use('/menu',menuItemRoutes);

app.get('/',function(req,res){
    res.send("Hello Sneha");
})

//can use bodyParser also to parse data from body of http request
//npm i body-parser
//const bodyParser=require('body-parser');
//app.use(bodyParser.json());   //stores in req.body


app.get('/cake',function(req,res){
    res.send("Cake is ready");
})
app.get('/pasta',(req,res)=>{
    res.send("Pasta is on the way");
})
app.get('/paneer',function(req,res){
   var varieties={
        Variety:"Shahi Paneer",
        Cost:230,
        Taste:"Sweet",
        Spice:"No"
   }
   res.send(varieties);
});
app.post('/items',(req,res)=>{
    res.send("Sending the data");
})
app.post('/order',(req,res)=>{
   const { item, spice } = req.body;
     console.log("Order received:", item, spice);
  res.send(`Your ${item} with ${spice} spice is being prepared!`);
})
/*app.post('/person',(req,res)=>{
    const data=req.body;*/
    // const newPerson=new Person();
    /*newPerson.name=data.name;
    newPerson.age=data.age;
    newPerson.mobile=data.mobile;
    newPerson.email=data.email;
    newPerson.address=data.address;*/

    /*const newPerson=new Person(data);
    newPerson.save((error,savedPerson)=>{
        if(error){
            console.log("Error saving person",error);
            res.status(500).json({error:'Internal server error'})
        }
        else{
            console.log("data saved successfully");
            res.status(200).json(savedPerson);
        }
    })*/

     /*   app.post('/person',async(req,res)=>{

        
   try{
        const data=req.body;
        const newPerson=new Person(data);
        const response=await newPerson.save();
        console.log("data saved");
        res.status(200).json(response);
   }
   catch(err){
    console.log(err);
    res.status(500).json({error:"Internal server error"});
   }
})*/
/*app.get('/person',async(req,res)=>{
   try{ 
    const data=await Person.find();
    console.log("data fetched");
    res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Internal server error"});
    }
})*/
app.get('/manager',async(req,res)=>{
    try{
    const data=await Person.find({work:"manager"});
     console.log("data fetched");
    res.status(200).json(data);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"Internal server error"});
    }
})
 //if so many roles are there than it is not possible to make so many endpoints
    //use parametrized api's
   /* app.get('/person/:workType',async(req,res)=>{
        try{
            const workType=req.params.workType;
            if(workType=="waiter"||workType=="chef"||workType=="manager"){
                const response=await Person.find({work:workType});
            console.log("data fetched");
            res.status(200).json(response);
            }
            else{
                res.status(404).json({error:"Invalid Work type"});
            }
        }catch(err){
            console.log(err);
            res.status(401).json({error:"Internal server error"});
        }
    });*/
app.listen(4000,function(){
    console.log("Server is listening on port 4000");
});



