import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    user:{
        type:mongoose.Types.ObjectId,
        ref :"user",
        // required:true,
    },
    owner:{
        type:mongoose.Types.ObjectId,
        ref:"owner",
        required:true,
    },
    room:{
        type:mongoose.Types.ObjectId,
        ref:"room",
        required:true,
    },
    totalBookingRent:{
        type:Number,
        // required:true,
    },
    startDate:{
        type:Date,
        // required:true,
    },
    endDate:{
        type:Date,
        // required:true,
    }
},{timestamps:true})

export default mongoose.model("booking",bookingSchema)