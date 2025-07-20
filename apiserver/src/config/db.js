
import mongoose from "mongoose";

export const connectDB = async () =>{
    try {
    await mongoose.connect(process.env.ATLAS_URI)
    console.log("DB Connected Successfuly")
} catch (error) {
    console.error("Mongoose connection error",error)
    process.exit(1) // exit with failure
}
}