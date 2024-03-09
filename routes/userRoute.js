import express from "express";
import { userTokenVerify } from "../middleware/authVerify.js";
import {
  HomeRoomListing,
  allRoomList,
  emailOtpVerification,
  forgetPassword,
  getUserDetails,
  loginVerification,
  resendOtp,
  resetPassword,
  updateProfile,
  userGoogleLogin,
  userSignup,
} from "../controllers/userController.js";
import {
  cancelBooking,
  filteredRooms,
  myBookings,
  roomBooking,
  verifyBooking,
} from "../controllers/bookingController.js";

const userRoute = express();

userRoute.post("/signup", userSignup);
userRoute.post("/otp", emailOtpVerification);
userRoute.post("/resendOtp", resendOtp);
userRoute.post("/login", loginVerification);
userRoute.post("/googleLogin", userGoogleLogin);
userRoute.post("/forgetPassword", forgetPassword);
userRoute.put("/resetPassword/:id/:token", resetPassword);
userRoute.get("/homeRoomList", HomeRoomListing);
userRoute.get("/allRooms", allRoomList);
userRoute.post("/filterRooms", filteredRooms);
userRoute.put("/editProfile", userTokenVerify, updateProfile);
userRoute.get("/userDetails/:id", userTokenVerify, getUserDetails);
userRoute.post("/roomBooking", userTokenVerify, roomBooking);
userRoute.post("/verifyPayment", userTokenVerify, verifyBooking);
userRoute.get("/myBookings/:userId", userTokenVerify, myBookings);
userRoute.post("/cancelBooking", userTokenVerify, cancelBooking);

export default userRoute;