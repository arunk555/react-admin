const bcryptjs = require('bcryptjs');
const { db } = require('../../models/admin/user');
const Admin = require('../../models/admin/user');

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
      const hashed = await bcryptjs.hash('test', process.env.SALT*1);
      if(hashed)
      {
        registeradm.password = hashed;
        registeradm.id=await db.collection('adminlogins').countDocuments()+1;
        const result = await registeradm.save();
        return res.status(201).json(result);
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