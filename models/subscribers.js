const { Schema, model } = require('mongoose');

const subscriber_schema= new Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true
    },
    age:{
        type: Number,
        min: 10,
        max: 40,
        default: null
    },
    createdAt:{
        type: Date,
        immutable: true,
        default:()=>Date.now()
    },
    updatedAt:{
        type: Date,
        immutable: true,
        default:()=>Date.now()
    }
});

module.exports=model("subscribers", subscriber_schema);