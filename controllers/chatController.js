import Chat from "../models/chatModel";
import User from "../models/userModel";
import Owner from "../models/ownerModel";

export const ownerData = async (req, res) => {
  try {
    const { ownerId } = req.params;
    const result = await Owner.findOne({ _id: ownerId });
    res.status(200).json(result);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ status: "Internal Server Error " });
  }
};

export const userData = async (req, res) => {
  try {
    const { userId } = req.params;
    const result = await User.findOne({ _id: userId });
    res.status(200).json(result);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ status: "Internal Server Error" });
  }
};

export const userChats = async (req, res) => {
  try {
    const { userId } = req.params;
    const chats = await Chat.aggregate([
      {
        $match: { members: userId },
      },
      {
        $lookup: {
          from: "messages", // Replace with the actual name of your messages collection
          let: { chatIdToString: { $toString: "$_id" } }, // Convert _id to string
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$chatId", "$$chatIdToString"] }, // Match on the converted chatId
              },
            },
            {
              $sort: { createdAt: -1 }, // Sort messages in descending order based on timestamp
            },
            {
              $limit: 1, // Get only the latest message
            },
          ],
          as: "messages",
        },
      },
      {
        $addFields: {
          lastMessageTimeStamp: {
            $ifNull: [{ $first: "$messages.createdAt" }, null],
          },
        },
      },
      {
        $sort: { lastMessageTimeStamp: -1 }, // Sort chats based on the latest message timestamp
      },
    ]);

    res.status(200).json(chats);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ status: "Internal Server Error" });
  }
};
