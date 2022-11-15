const mongoose = require('mongoose');
const { MONGODB_URI } = process.env;
exports.connect=async()=>{
   try {
    await mongoose.connect(MONGODB_URI,{
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Successfully connected to the mongoDB!");
   } catch (error) {
    console.log("Unable to connect the mongoDB! Error "+error.message);
    process.exit(1);
   }
};

