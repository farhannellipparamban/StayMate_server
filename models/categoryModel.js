import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  is_hidden: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("category", categorySchema);
