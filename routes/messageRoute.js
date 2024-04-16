import express from "express"
import upload from '../config/multer.js';
import { addAudioMessage, addMessage, fileSendingMessage, getMessages, imageSendingMessage, videoSendingMessage } from "../controllers/messageController.js"

const messageRoute = express.Router()

messageRoute.post("/",addMessage)
messageRoute.get("/:chatId",getMessages)
messageRoute.post("/audioMessage", upload.single("audio"), addAudioMessage);
messageRoute.post("/imageMessage", upload.single("image"),imageSendingMessage );
messageRoute.post("/videoMessage", upload.single("video"),videoSendingMessage ); 
messageRoute.post("/fileMessage", upload.single("file"),fileSendingMessage ); 
export default messageRoute