const mongoose=require('mongoose');
require('dotenv').config();

//define the mongo db connection url
const mongoURL='mongodb://localhost:27017/hotels';
//const mongoURL=process.env.DB_URL_LOCAL;
//const mongoURL=process.env.DB_URL;


mongoose.connect(mongoURL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
});

const db=mongoose.connection;

db.on('connected',()=>{
    console.log("Connected to MongoDB Server");
});
db.on('disconnected',()=>{
    console.log("MongoDB disconnected");
})

module.exports=db;