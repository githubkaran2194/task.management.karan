import mongoose from 'mongoose';

const mongoUri = process.env.MONGO_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB.');
    }
    catch (e) {
        console.log("Error connecting to MongoDB - " + e.message);
    }
};

export default connectDB;
