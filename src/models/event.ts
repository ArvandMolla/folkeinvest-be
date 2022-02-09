import mongoose from "mongoose";


const { Schema, model } = mongoose;

const eventSchema = new Schema(
  {
    sam: { type: Number, required: true },
    payload: { type: String, required: true },    
  }
);

export default model("Event", eventSchema);