import Offer from "../models/offerModel.js"
import Rooms from "../models/roomModel.js"

export const addOffer = async(req,res)=>{
    try {
        
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:"Internal Server Error"})
    }
}