const express=require('express');
const router=express.Router();
const Menu=require('../models/menu');

router.get('/',async(req,res)=>{
    try{
        const response=await Menu.find();
        console.log("data fetched");
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(404).json({error:"Data not found"});
    }
})
router.get('/:taste',async(req,res)=>{
   
    try{
         const dishTaste=req.params.taste;
        if(dishTaste=='sweet'||dishTaste=='salty'||dishTaste=='spicy'||dishTaste=='sour'){
            const response=await Menu.find({taste:dishTaste});
            console.log("data fetched");
            res.status(200).json(response);
        }
        else{
            console.log("data not found");
            res.status(404).json({error:"data not found"});
        }
    }catch(err){
        console.log(err);
        res.status(501).json({error:"Internal server error"});
    }
})
router.post('/',async(req,res)=>{
   try{
     const data=req.body;
    const newMenu=new Menu(data);
    const response=await newMenu.save();
    console.log("data saved");
    res.status(200).json(response);
}catch(err){
     console.log(err);
        res.status(501).json({error:"Internal server error"});
}
})
//comment added for testing purposes
module.exports=router;