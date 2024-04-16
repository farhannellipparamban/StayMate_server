import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    chatId: {
      type: String,
    },
    senderId: {
      type: String,
    },
    text: {
      type: String,
    },
    audioPath: {
      type: String,
    },
    images: [
      {
        type: String,
      },
    ],
    videos: [
      {
        type: String,
      },
    ],
    files: [
      {
        fileName: String,
        filePath: String,
        fileType: String,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("message", messageSchema);
