import express from "express"
import upload from '../config/multer.js';
import { addAudioMessage, addMessage, getMessages } from "../controllers/messageController.js"

const messageRoute = express.Router()

messageRoute.post("/",addMessage)
messageRoute.get("/:chatId",getMessages)
messageRoute.post("/audioMessage", upload.single("audio"), addAudioMessage);
export default messageRoute