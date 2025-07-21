const express=require('express');
const Person = require('./../models/person');
const { findByIdAndUpdate } = require('../models/menu');
const router=express.Router();

const app=express();
app.use(express.json())

router.post('/',async(req,res)=>{
    try{
    const data=req.body;
    const newPerson= new Person(data);
    const response=await newPerson.save();
    console.log("data saved");
    res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(501).json({error:"Internal server error"});
    }
    })
router.get('/',async(req,res)=>{
    try{
        const response=await Person.find();
        console.log("data fetched");
        res.status(200).json(response);

    }catch(err){
        console.log(err);
        res.status(501).json({error:"Internal server error"});
    }
})
router.get('/:workType',async(req,res)=>{
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