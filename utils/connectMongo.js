import mongoose from 'mongoose';

const connectMongo = async () => mongoose.createConnection(process.env.MONGODB_URI);

export default connectMongo;
