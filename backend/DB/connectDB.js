import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
const connectDB = async () => {
    try {
        const connnectionInstance = await mongoose.connect(`${process.env.MONDODB_URI}/${DB_NAME}`)
        console.log("Database connected with Connection Instance: ", connnectionInstance.connection.host);
    } catch (error) {
        console.log("Error Connecting To DataBase: ", error.message);
        process.exit(1)
    }
};

export default connectDB;