const mongoose = require('mongoose');

const dataSchema = mongoose.Schema({
    title:{type:String,required:true},
    description:{type:String,required:true},
    price:{type:Number,required:true},
    userId:{ required:true, type: mongoose.Schema.Types.ObjectId, ref: 'user' },


    

},{
        versionKey: false,
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    })
const DataModel = mongoose.model('data',dataSchema);
module.exports = DataModel;