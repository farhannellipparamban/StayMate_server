import express from "express";
import cors from "cors";
import userRoute from "./routes/userRoute.js";
import ownerRoute from "./routes/ownerRoute.js";
import adminRoute from "./routes/adminRoute.js";
import dbConnect from "./config/mongodb.js";
import dotenv from "dotenv"

dotenv.config()
dbConnect();
const app = express();
const PORT = process.env.PORT || 8000;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH"],
    credentials: true,
  })
);
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use("/", userRoute);
app.use("/owner", ownerRoute);
app.use('/admin',adminRoute)

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
