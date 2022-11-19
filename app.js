require('dotenv').config();
const express=require('express');
const app=express();
require('./database/mongodb').connect();
const subscriber_route = require('./routes/subscriber');
const admuser_route = require('./routes/admin/user');


app.use(express.json());
let prefix="/api/v"+process.env.VERSION;
//console.log(prefix);
app.use(prefix+'/subscriber', subscriber_route);
app.use(prefix+'/admin', admuser_route);


app.use('*',(req, res)=>{
  return res.status(404).json({
    success: false,
    message: "Page not found",
    error: {
        statusCode: 404,
        message: "You reached a route that is not defined on this server",
      }
  })
});
module.exports=app;