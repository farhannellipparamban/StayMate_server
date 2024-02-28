import express from "express";
import { userTokenVerify } from "../middleware/authVerify.js";
import {
  HomeRoomListing,
  allRoomList,
  emailOtpVerification,
  forgetPassword,
  loginVerification,
  myBookings,
  resendOtp,
  resetPassword,
  roomBooking,
  updateProfile,
  userGoogleLogin,
  userSignup,
} from "../controllers/userController.js";

const userRoute = express();

userRoute.post("/signup", userSignup);
userRoute.post("/otp", emailOtpVerification);
userRoute.post("/resendOtp", resendOtp);
userRoute.post("/login", loginVerification);
userRoute.post("/googleLogin", userGoogleLogin);
userRoute.post("/forgetPassword", forgetPassword);
userRoute.put("/resetPassword/:id/:token",resetPassword);
userRoute.put("/editProfile", userTokenVerify, updateProfile);
userRoute.get("/homeRoomList", HomeRoomListing);
userRoute.get("/allRooms", allRoomList);
userRoute.post("/roomBooking",roomBooking)
userRoute.get("/myBookings/:roomId",myBookings)
// userRoute.post("/filterRooms",filteredRooms)

export default userRoute;
