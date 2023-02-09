const express = require('express');
const Authmiddleware = require('../middlewares/Authmiddleware');
const DataRouter = express.Router();
const {DataModel} = require('../models');
DataRouter.get('/',Authmiddleware,async(req,res)=>{
    try {
        console.log(req.userId);
        let datas = await DataModel.find({userId:req.userId});
        res.send(datas);
    } catch (error) {
        res.status(501).send(error.message)
    }
})

DataRouter.post('/',Authmiddleware,async(req,res)=>{
    try {
       
            const newData  = new DataModel({...req.body,userId:req.userId});
            await newData.save();
            res.send(newData);
    } catch (error) {
        res.status(501).send(error.message);
    }
})
DataRouter.patch('/:id',Authmiddleware,async(req,res)=>{
    try { 
        const {id} = req.params;
        try{ 
        const data = await DataModel.findByIdAndUpdate(id,req.body);
        res.send({msg:"Updated Successfully"});
        }catch(e){
            console.log(e)
            res.status(501).send(e);
        }
    } catch (error) {
        res.status(501).send(error.message);
    }
})
DataRouter.delete('/:id',Authmiddleware,async(req,res)=>{
    try { 
        const {id} = req.params;
        try{ 
        const data = await DataModel.findByIdAndDelete(id);
        res.send({msg:"Deleted Successfully"});
        }catch(e){
            console.log(e)
            res.status(501).send(e);
        }
    } catch (error) {
        res.status(501).send(error.message);
    }
})
module.exports = DataRouter;