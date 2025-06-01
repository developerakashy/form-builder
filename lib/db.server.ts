import mongoose from "mongoose";

const connectDB = async () => {
    if (mongoose.connection.readyState === 1) return;
    const connectionInstance = await mongoose.connect(`${process.env.MONGO_DB_URI}/form-builder`)
    console.log(connectionInstance.connection.host)
}

export default connectDB
