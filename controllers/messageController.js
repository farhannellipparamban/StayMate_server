import Message from "../models/messageModel.js";
import path from 'path';

export const addMessage = async (req, res) => {
  try {
    const { chatId, text, senderId } = req.body;
    const message = new Message({
      chatId,
      text,
      senderId,
      createdAt: Date.now(), 
    });
    const result = await message.save();
    res.status(200).json(result);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ status: "Internal Server Error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { chatId } = req.params;
    const result = await Message.find({ chatId });
    res.status(200).json(result);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ status: "Internal Server Error" });
  }
};



export const addAudioMessage = async (req, res) => {
  try {
    const { chatId, senderId } = req.body;
    const audio = req.file;

    if (!audio) {
      return res.status(400).json({ error: "Audio file not provided" });
    }

    // Get the full path of the uploaded audio file
    const audioPath = path.resolve('public', 'audio', audio.filename);

    // Create a new message record with the audio file path
    const message = new Message({
      chatId,
      senderId,
      audioPath,
    });
    await message.save();

    res.status(201).json({ message: "Audio message sent successfully" });
  } catch (error) {
    console.error("Error adding audio message:", error);
    res.status(500).json({ error: error.message });
  }
};
