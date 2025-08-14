const express=require('express');
const Person = require('./../models/person');
const passport = require('../auth');
const {jwtAuthMiddleware,generateToken} = require('../jwt');


const router=express.Router();

const app=express();
app.use(express.json())

router.post('/signup',async(req,res)=>{
    try{
    const data=req.body;
    const newPerson= new Person(data);
    const response=await newPerson.save();
    console.log("data saved");
    const payload={
        id:response._id,
        username:response.username,
    }
    const token=generateToken(payload);
    console.log("token generated is : ", token);
    res.status(200).json({response:response,token:token,payload:payload});
    }
    catch(err){
        console.log(err);
        res.status(501).json({error:"Internal server error"});
    }
    })

//     router.post('/login',passport.authenticate('local',{session:false}),
// (req,res)=>{
//     res.status(200).json({ message: 'Login successful',
//       user: req.user});
// })
router.post('/login',passport.authenticate('local',{session:false}),async(req,res)=>{
    try{
        //extract username and password from request body
        const {username,password}=req.body;
        //Find user by username
        const user=await Person.findOne({username:username});
        if(!user||user.comparePassword(password)===false){
            return res.status(401).json({error:"Invalid username or password"});
        }
        //Generate JWT token
        const payload={
            id:user._id,
            username:user.username, 
        }
        const token=generateToken(payload);
        console.log("token generated is : ", token); 
        res.status(200).json({token:token});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({error:"Internal server error"});
    }   
})
router.get('/',jwtAuthMiddleware,async(req,res)=>{
    try{
        const response=await Person.find();
        console.log("data fetched");
        res.status(200).json(response);

    }catch(err){
        console.log(err);
        res.status(501).json({error:"Internal server error"});
    }
})
router.get('/profile',jwtAuthMiddleware,async(req,res)=>{
    try{
        const userData=req.user;
        console.log("User Data: ",userData);
        const userId=userData.id;
        const user=await Person.findById(userId);
        console.log(user);
        res.status(200).json(user);
    }catch(err){
        console.log(err);
        res.status(501).json({error:"Internal server error"});
   
    }
})
router.get('/:workType',jwtAuthMiddleware,async(req,res)=>{
    try{
        const workType=req.params.workType;
        if(workType=='chef'||workType=='manager'||workType=='waiter'){
            const response=await Person.find({work:workType});
            console.log("data fetched");
            res.status(200).json(response);
        }
        else{
            console.log("data fetched");
            res.status(404).send("data not found");
        }
    }catch(err){
        console.log(err);
        res.status(404).json({error:"Data not found"});
    }
})
router.patch('/:id',async(req,res)=>{   //put and patch are just same
    try{
    const personId=req.params.id;
    const updatedData=req.body;
    const response= await Person.findByIdAndUpdate(personId,updatedData,{
        new:true,
        runValidators:true,
    });
    console.log("data updated");
    res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(501).json({error:"Internal server error"});
    }
})
router.delete('/:id',async(req,res)=>{
    try{
    const personId=req.params.id;
    const response=await Person.findByIdAndDelete(personId);
    if(!response){
        res.status(404).json({error:"data not found"});
    }
    console.log("data deleted");
    res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(501).json({error:"Internal server error"});
    }
})
module.exports=router;