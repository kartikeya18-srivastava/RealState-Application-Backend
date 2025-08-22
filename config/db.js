import mongoose from "mongoose"
export const dbConnect=async()=>{
   const conn= await  mongoose.connect("mongodb+srv://QuirexHousing:<Quirex123>@quirex.ibzsfm6.mongodb.net/?retryWrites=true&w=majority&appName=Quirex", {
     useNewUrlParser: true,
     useUnifiedTopology: true
   });

   if(conn){
    console.log("Db connected successfully............"); 
   }
}
