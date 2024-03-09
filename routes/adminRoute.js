import express from "express";
const adminRoute = express();
import { adminTokenVerify } from "../middleware/authVerify.js";
import {
  adminLogin,
  ownerBlock,
  ownerList,
  roomAddRequests,
  roomList,
  singleRoomDetails,
  userBlock,
  userList,
  verifyRoomDetails,
} from "../controllers/adminController.js";

adminRoute.post("/login", adminLogin);
adminRoute.get("/userList", adminTokenVerify, userList);
adminRoute.patch("/blockUser", adminTokenVerify, userBlock);
adminRoute.get("/ownerList", adminTokenVerify, ownerList);
adminRoute.patch("/blockOwner", adminTokenVerify, ownerBlock);
adminRoute.get("/roomList",adminTokenVerify,roomList)
adminRoute.get("/singleRoomDetails/:roomId",adminTokenVerify,singleRoomDetails)
adminRoute.get("/roomAddRequest", adminTokenVerify, roomAddRequests);
adminRoute.patch('/verifyRoom',adminTokenVerify,verifyRoomDetails)

export default adminRoute;
