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

export const imageSendingMessage = async (req, res) => {
  try {
    const { chatId, senderId } = req.body;
    const image = req.file;

    if (!image) {
      return res.status(400).json({ error: "Image file not provided" });
    }

    // Get the full path of the uploaded image file
    const imagePath = path.resolve('public', 'images', image.filename);

    // Create a new message record with the image file path
    const message = new Message({
      chatId,
      senderId,
      images: [imagePath],
    });
    await message.save();

    res.status(201).json({ message: "Image message sent successfully" });
  } catch (error) {
    console.error("Error adding image message:", error);
    res.status(500).json({ error: error.message });
  }
};

export const videoSendingMessage = async (req, res) => {
  try {
    const { chatId, senderId } = req.body;
    const video = req.file;

    if (!video) {
      return res.status(400).json({ error: "Video file not provided" });
    }

    // Get the full path of the uploaded video file
    const videoPath = path.resolve('public', 'videos', video.filename);

    // Create a new message record with the video file path
    const message = new Message({
      chatId,
      senderId,
      videos: [videoPath],
    });
    await message.save();

    res.status(201).json({ message: "Video message sent successfully" });
  } catch (error) {
    console.error("Error adding video message:", error);
    res.status(500).json({ error: error.message });
  }
};

export const fileSendingMessage = async (req, res) => {
  try {
    const { chatId, senderId } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: "File not provided" });
    }

    // Get the full path of the uploaded file
    const filePath = path.resolve('public', 'files', file.filename);

    // Create a new message record with the file details
    const message = new Message({
      chatId,
      senderId,
      files: [{
        fileName: file.originalname,
        filePath,
        fileType: file.mimetype,
      }],
    });
    await message.save();

    res.status(201).json({ message: "File message sent successfully" });
  } catch (error) {
    console.error("Error adding file message:", error);
    res.status(500).json({ error: error.message });
  }
};
