const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy; //username-password strategy
const Person=require('./models/person');

passport.use(new LocalStrategy(async(USERNAME,PASSWORD,done)=>{
    try{
        
          
            const user=await Person.findOne({username:USERNAME});
            console.log('Received Credentials :' ,USERNAME,user.password);
            //done callback function (error,user,info)
            
            if(!user){
                return done(null,false,{message:"Incorrect Username"});
            }
            
            // if(user.password!==PASSWORD){
            //     return done(null,false);
            // }
            const isPasswordMatch=await user.comparePassword(PASSWORD);
            if(!isPasswordMatch){
                return done(null,false,{message:"Incorrect Password"});
            }
            return done(null, user);
    }catch(err){
        return done(err);
    }
}))
module.exports=passport;