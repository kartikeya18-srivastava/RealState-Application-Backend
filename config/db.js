import mongoose from "mongoose"
export const dbConnect=async()=>{
   const conn= await  mongoose.connect(process.env.MONGO_URI);

   if(conn){
    console.log("Db connected successfully............"); 
   }
}
