import mongoose, { Schema } from 'mongoose';

const UserSchema = Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        index:true
    },
    password:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    }
})


const UserModel = mongoose.model('User',UserSchema)

export default UserModel;