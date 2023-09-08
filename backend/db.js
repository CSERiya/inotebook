const mongoose=require('mongoose');
const mongoURI="mongodb://127.0.0.1:27017"
const connectToMongo = async () => {
    try {
      mongoose.set("strictQuery", false);
      await mongoose.connect(mongoURI, {
        useNewUrlParser: true, 
        useUnifiedTopology: true,
      });
      console.log("Connected to mongoose");
    } catch (error) {    
      console.error(error);
      process.exit(1);   
    }
};
module.exports=connectToMongo;  