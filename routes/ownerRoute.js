import express from "express";

const ownerRoute = express();
import { ownerTokenVerify } from "../middleware/authVerify.js";
import {
  BlockCustomer,
  RoomListDetails,
  addRoom,
  customersList,
  deleteRoomImage,
  editRoom,
  editRoomDetails,
  ownerEmailVerify,
  ownerForgetPassword,
  ownerGoogleLogin,
  ownerLoginVerify,
  ownerRegister,
  ownerResendOtp,
  ownerResetPassword,
  roomBlock,
  updateOwnerProfile,
} from "../controllers/ownerController.js";

ownerRoute.post("/signup", ownerRegister);
ownerRoute.post("/otp", ownerEmailVerify);
ownerRoute.post("/resendOtp", ownerResendOtp);
ownerRoute.post("/login", ownerLoginVerify);
ownerRoute.post("/googleLogin", ownerGoogleLogin);
ownerRoute.post("/ownerForget", ownerForgetPassword);
ownerRoute.patch("/ownerResetPass/:id/:token", ownerResetPassword);
ownerRoute.put("/editProfile", ownerTokenVerify, updateOwnerProfile);
ownerRoute.post("/addRoom", ownerTokenVerify, addRoom);
ownerRoute.get("/roomList/:ownerId", ownerTokenVerify, RoomListDetails);
ownerRoute.get("/editRoomDetails/:roomId", ownerTokenVerify, editRoomDetails);
ownerRoute.put("/editRoom", ownerTokenVerify, editRoom);
ownerRoute.patch("/deleteImage",ownerTokenVerify,deleteRoomImage)
ownerRoute.patch("/blockRoom", ownerTokenVerify, roomBlock);
ownerRoute.get("/customers", ownerTokenVerify, customersList);
ownerRoute.patch("/blockCustomers", ownerTokenVerify, BlockCustomer);

export default ownerRoute;
