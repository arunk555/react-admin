const bcryptjs = require('bcryptjs');
const Admin = require('../../models/admin/user');

const register =async (req, res)=>{
    const { name, password, email }=req.body;
    if(!(name && password, email)){
      return res.status(404).json({
        success: false,
        message: 'Mandatory fields are missing!'
      });
    } 
    try {
       
      const hashed = await bcryptjs.hash('test', process.env.SALT*1);
      return res.status(201).send(hashed);
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
          });
    }
};



module.exports = { register };