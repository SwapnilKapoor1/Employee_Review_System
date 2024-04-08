import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const { MONGODB_URL} = process.env;

export const connectWithDb=async()=>{
  try{
    await mongoose.connect(MONGODB_URL);
    console.log('Database has been connected');
  }catch(err){
    console.log(err);
  }
}
