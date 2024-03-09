import User from "../models/userModel.js";
import Owner from "../models/ownerModel.js";
import Room from "../models/roomModel.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export const adminLogin = (req, res) => {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  const userName = "Admin";
  try {
    const { email, password } = req.body;
    if (adminEmail === email) {
      if (adminPassword === password) {
        const token = jwt.sign(
          {
            name: userName,
            email: adminEmail,
            role: "admin",
          },
          process.env.ADMIN_SECRET,
          {
            expiresIn: "1h",
          }
        );
        res
          .status(200)
          .json({ userName, token, message: `Welome ${userName}` });
      } else {
        res.status(403).json({ message: "Incorrect Password" });
      }
    } else {
      res.status(401).json({ message: "Incorrect email" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ status: "Internal Server Error" });
  }
};

export const userList = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ users });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ status: "Internal Server Error" });
  }
};

export const userBlock = async (req, res) => {
  try {
    const { userId, status } = req.body;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const updatedStatus = !status;

    await User.findByIdAndUpdate(
      { _id: userId },
      { $set: { isBlocked: updatedStatus } }
    );

    let message = "";
    if (updatedStatus) {
      message = "User is Blocked.";
    } else {
      message = "User is Unblocked.";
    }

    res.status(200).json({ message });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ status: "Internal Server Error" });
  }
};

export const ownerList = async (req, res) => {
  try {
    const owners = await Owner.find();
    res.status(200).json({ owners });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ status: "Internal Server Error" });
  }
};

export const ownerBlock = async (req, res) => {
  try {
    const { ownerId, status } = req.body;
    const owner = await Owner.findById(ownerId);

    if (!owner) {
      return res.status(404).json({ message: "Owner not found" });
    }

    const updatedStatus = !status;

    await Owner.findByIdAndUpdate(
      { _id: ownerId },
      { $set: { isBlocked: updatedStatus } }
    );

    let message = "";
    if (updatedStatus) {
      message = "Owner is Blocked.";
    } else {
      message = "Owner is Unblocked.";
    }

    res.status(200).json({ message });
  } catch (error) {
    console.log(error, message);
    res.status(500).json({ status: "Internal Server Error" });
  }
};

export const roomList = async (req, res) => {
  try {
    const rooms = await Room.find().populate("ownerId");
    res.status(200).json({ rooms });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ status: "Internal Server Error" });
  }
};

export const singleRoomDetails = async (req, res) => {
  try {
    const { roomId } = req.params;
    const room = await Room.findById(roomId).populate("ownerId");
    res.status(200).json({ room });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ status: "Internal Server Error" });
  }
};

export const roomAddRequests = async (req, res) => {
  try {
    const totalRequests = await Room.find({
      verificationStatus: "Pending",
    }).sort({ createdAt: -1 })
    res.status(200).json({ totalRequests: totalRequests });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ status: "Internal Server Error" });
  }
};

export const verifyRoomDetails = async (req, res) => {
  try {
    const { roomId, status } = req.body;

    if (status === "approve") {
      const room = await Room.findByIdAndUpdate(
        { _id: roomId },
        { $set: { verificationStatus: "Approved" } },
        { new: true }
      );
      res.status(200).json({ succMessage: "Approved", room });
    } else {
      const room = await Room.findByIdAndUpdate(
        { _id: roomId },
        { $set: { verificationStatus: "Rejected" } },
        { new: true }
      );
      res.status(200).json({ errMessage: "Rejected", room });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ status: "Internal Server Error" });
  }
};
