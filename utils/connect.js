import mongoose from "mongoose"

console.log('Connecting');
export const connectMongo = async () => mongoose.connect(process.env.MONGODB_URI);
console.log('Connected');