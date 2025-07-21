const mongoose=require('mongoose');
const newMenu=new mongoose.Schema({
    item:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        require:true
    },
    taste:{
        type:String,
        enum:['sweet','sour','spicy','salty'],
        required:true
    },
    ingrediants:{
        type:String
    },
    is_drink:{
        type:Boolean,
        required:true
    }
});
const Menu=mongoose.model('Menu',newMenu);
module.exports=Menu;