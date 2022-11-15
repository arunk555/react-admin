const Subscriber=require('../models/subscribers');

const subscribers= async (req, res)=>{
   try {
     const subscribers=await Subscriber.find();
     return res.status(200).json(subscribers);
   } catch (error) {
     errormessage(500, error.message, res);
   }
};

const subscriberOne= (req, res)=>{
    return res.status(200).json(res.subscriber);
 };

const addsubscriber= async (req, res)=>{
    const { name, email, age } = req.body;
    if(!(name && email)){
        errormessage(400, 'Mandatory fields are missing!', res);
    }
    const subscriber= new Subscriber({ name, email, age});
    try {
        const sdata= await subscriber.save();
        return res.status(201).json(sdata);
    } catch (error) {
        errormessage(400, error.message, res);
    }
};

const updatesubscriber= async (req, res)=>{
    const { name, email, age } = req.body;
    if(name){
        res.subscriber.name=name;
    }
    if(email){
        res.subscriber.email=email;
    }
    if(req.body.hasOwnProperty('age')){
        res.subscriber.age=age;
    }
    try {
        const upsub=await res.subscriber.save();
        return res.status(200).json(upsub);
    } catch (error) {
       errormessage(400, error.message, res); 
    }
};

const deletesubscriber=async (req, res)=>{
    try {
        const sdata= await res.subscriber.remove();
        return res.status(200).json({
            message: "deleted successfully!"
        });
    } catch (error) {
        errormessage(500, error.message, res);
    }
};

const subscriberById=async (req, res, next)=>{
  let subscriberdata;
  try {
    subscriberdata=await Subscriber.findById(req.params.id);
  } catch (error) {
    errormessage(500, error.message, res);
  }
  res.subscriber=subscriberdata;
  next();
};

const errormessage=(code, errmessage, res)=>{
  return res.status(code).json({
    success: false,
    message: errmessage
  });
};

module.exports={ subscribers, addsubscriber, subscriberById, subscriberOne, updatesubscriber, deletesubscriber }