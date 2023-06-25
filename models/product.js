import mongoose from "mongoose";
import { Schema } from "mongoose";

const product=new Schema({
    p_name:{
        type:String,
        required:true
    },
    p_price:{
        type:Number,
        required:true
    },
    p_color:{
        type:String,
        required:true
    }
});

export default mongoose.model("Product",product);