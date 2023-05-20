import mongoose from "mongoose";
const Connection =async(URL)=> {
try{
   await mongoose.connect(URL,{useUnifiedTopology:true,useNewUrlParser:true});
   console.log('Database connectiion succeeded');
}catch(error){
    console.log('Error while loading database',error);
}
}
export default Connection;