import mongoose from 'mongoose';

const connectMongo = async () => mongoose.createConnection(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

export default connectMongo;
