const mongoose=require('mongoose');
const bcrypt=require('bcrypt'); 
//describe person schema
const personSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number
    },
    work:{
    type:String,
    enum:["chef","waiter","manager"],
    required:true
    },
    mobile:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    address:{
        type:String
    },
    salary:{
        type:Number,
        required:true
    },
    username:{
        required:true,
        type:String
    },
    password:{
        required:true,
        type:String
    }
})
personSchema.pre('save',async function(next){
    const person=this;
    //if password is not touched other things are updated
    if(person.isModified('password')==false){
        return next();
    }
    try{
        //generate password
       // const salt="This is salt";
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(person.password,salt);
        person.password=hashedPassword;
        //hash password generate
        next();
    }catch(err){
        return next(err);
    }
})
personSchema.methods.comparePassword=async function (candidatePassword) {
    try{
        const isMatch=await bcrypt.compare(candidatePassword,this.password);
        return isMatch;
    }
    catch(err){
        throw err;
    }
}
const Person=mongoose.model('Person',personSchema);
module.exports=Person;