import mongoose from "mongoose";

const { Schema, model } = mongoose;

const destinationSchema = new Schema({
  destinations: { type: [Number], required: true, default: [4] },
});

export default model("Destination", destinationSchema);
