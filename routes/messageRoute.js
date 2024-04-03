import express from "express"
import { addMessage, getMessages } from "../controllers/messageController.js"

const messageRoute = express.Router()

messageRoute.post("/",addMessage)
messageRoute.get("/:chatId",getMessages)

export default messageRoute