const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { db } = require('../../models/admin/user');
const Admin = require('../../models/admin/user');
const { SALT, JWT_SIGN, JWT_EXPIRE } = process.env;

const register =async (req, res)=>{
    const { name, password, email }=req.body;
    if(!(name && password, email)){
      return res.status(404).json({
        success: false,
        message: 'Mandatory fields are missing!'
      });
    } 

    const registeradm = new Admin ({ name, email });
    try {
      const hashed = await bcryptjs.hash('test', SALT*1);
      if(hashed)
      {
        registeradm.password = hashed;
        registeradm.id=await db.collection('adminlogins').countDocuments()+1;
        const result = await registeradm.save();
        console.log(result._id);
        console.log(JWT_SIGN + ' '+ JWT_EXPIRE);
        const access_token = jwt.sign({id:result._id}, JWT_SIGN, { expiresIn: JWT_EXPIRE} );
        
        const refresh_token = jwt.sign({id:result._id}, JWT_SIGN);
        if(access_token && refresh_token){
          console.log(access_token);
          registeradm.token = access_token;
          registeradm.refrestoken = refresh_token;
          await registeradm.save();
          return res.status(201).json(result);
        }else{
          throw new Error("Token not generated");
        }
      } 
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
          });
    }
};

const getnextsequence=async (type, res)=>{
  try {
    var counter = await db.collection("counters").findOneAndUpdate({_id: type },{ $inc: { seq_value: 1 }}, { returnNewDocument: true, upsert : true});
     console.log(counter);
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message
    });
  }
 
}



module.exports = { register };