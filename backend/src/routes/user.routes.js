const express = require('express');
const UserRouter = express.Router();
const {UserModel} = require('../models');
const jwt = require('jsonwebtoken');
const otp = (Math.random()*1000000).toFixed(0);
UserRouter.get('/',(req,res)=>res.send("Welcome to user route"));
UserRouter.post('/signup',async(req,res)=>{
    const {email} = req.body;
    try{
        const user = await UserModel.findOne({email});
        if(user){
           return  res.status(409).send("User is already signup")
        };
        const newUser =  new UserModel(req.body);
        await newUser.save();
        res.send(newUser);
    }catch(e){
        return res.status(500).send({error:e.message});
    }
})

/*************   LOGIN ROUTE    ********** */
UserRouter.post('/login',async(req,res)=>{
    const {email,password,contact} = req.body;
    try{
        const user = await UserModel.findOne({email,password,contact});
        if(!user){
            return res.status(404).send("Please signup first");
        };
        const token = jwt.sign(
            {id:user._id,email:user.email,name:user.name},
            process.env.MAIN_TOKEN,
            {
                expiresIn:"10 days"
            }
        );
        res.send({token,otp});
    }catch(e){
        console.log(e)
        res.status(501).send(e.message);
    }
});
UserRouter.post('/checkotp',async(req,res)=>{
    console.log(otp,'checking',req.body);
    try{
        if(otp==req.body.otp){
            res.send("Correct OTP")
        }else{
            res.status(401).send("Incorrect OTP")
        }
    }catch(e){
        console.log(e)
        res.status(501).send(e.message);
    }
});


module.exports = UserRouter;