import mongoose, { model, Schema } from 'mongoose';


const UrlSchema = new Schema({
    full:{
        type:String,
        required:true
    },
    short:{
        type:String,
        required:true,
        unique:true,
        index:true
    },
    redirect:{
        type:String,
        required:true,
        unique:true,
        index:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    click:{
        type:Number,
        default:0
    }
})


const UrlModel =  model('url',UrlSchema)

export default UrlModel;