const { Schema, model } = require('mongoose');
const schema=new Schema({
    id:{
       type: Number,
       autoincrement: true,
       unique: true,
       createindex: true,
       required: true
    },
    name:{
        type: String,
        required: true,
        minlength: 3,
        maxlength:100,
        default: null
    },
    email:{
        type: String,
        required: true,
        unique: true,
        default: null,
        minlength: 3,
        maxlength:150
    },
    password:{
        type: String,
        default: null,
        required: true
    },
    createdAt:{
        type: Date,
        default:()=>Date.now()
    },
    updatedAt:{
        type: Date,
        default:()=>Date.now()
    }
});

module.exports=model("adminlogins", schema);