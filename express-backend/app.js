const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require("multer");
const axios = require("axios");

const UserModel = require("./model/user");
const TextModel = require("./model/text");
const CountModel = require("./model/connection");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// app.use(upload.single("file"));
// MongoDB
mongoose
  .connect(
    "mongodb+srv://ankur73tiwari:KdWSeUuTC7z03dny@cluster0.rh2lnkv.mongodb.net/baavlibuch?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
    }
  )
  .then((res) => console.log("Connected to DB"))
  .catch((err) => console.log(err));

app.use(express.json());
app.use(cors());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

let connectionCount = 0;
const connectionCountMiddleware = async (req, res, next) => {
  const lastData = await CountModel.findOne({}).sort({ count: -1 }).limit(1);
  CountModel.create({ count: lastData.count + 1 });
  console.log(connectionCount);
  next();
};
// const ConnectionLog = mongoose.model("ConnectionLog", { count: Number });


app.get("/", (req, res) => {
  res.send("Hello");
});



app.post("/addFriend", upload.single("file"),connectionCountMiddleware, async (req, res) => {
  const { id, friendId, password, text } = req.body;

  if (!req.file) {
    return res.status(400).json("File not uploaded");
  }

  const buffer = req.file?.buffer;
  const mimetype = req.file?.mimetype;

  try {
    // Check if the user exists
    const existingUser = await UserModel.findOne({ personId: id });

    if (existingUser && existingUser.password === password) {
      // User exists, check if the password matches

      // Password matches, update friendList and photo
      await UserModel.updateOne(
        { personId: id },
        {
          $push: { friendList: friendId },
          $set: {
            photo: { data: buffer, contentType: req.file.mimetype },
          },
        }
      );
      const newText = new TextModel({ text: text });
      await newText.save();
// console.log("Request made so far ":  )
      return res.status(201).json("Friend added successfully");
    } else {
      // User does not exist
      const newUser = new UserModel({
        personId: id,
        text: text,
        photo: { data: buffer, contentType: mimetype }, // Assuming you want to store the file name as the photo
        password: password,
        friendList: [friendId], // Add the personId to the friendList
      });
      const newText = new TextModel({ text: text });
      await newText.save();

      // Save the new user to the database
      await newUser.save();

      return res.status(201).json("User created successfully");
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json("Internal Server Error");
  }
});

app.get("/getNgrams", async (req, res) => {
  try {
    const recentTexts = await TextModel.find().sort({ _id: -1 }).limit(2);
    const [text1, text2] = recentTexts.map((entry) => entry.text);

    // const text1 = "Hello";
    // const text2 = "world is beutiful";

    const text = text1 + " " + text2;
    console.log(text);
    const formData = new FormData();
    formData.append("text", text);
    // const response = await axios.post('http://django-api-url', { text1, text2 });
    const response = await axios.post(
      "http://127.0.0.1:8000/submit-data",
      formData
    );
    
    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error", err: error });
  }
});

app.get("/data", async (req, res) => {
  try {
    // Query all data from the MongoDB collection
    const allData = await UserModel.find();

    // Send the data as a JSON response
    res.status(200).json(allData);
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal Server Error");
  }
});

app.get("/request", async (req, res) => {
  try {
    // Query all data from the MongoDB collection
    const lastData = await CountModel.findOne({}).sort({ count: -1 }).limit(1);console.log(lastData)
  // Send the data as a JSON response
  res.status(200).json(lastData);
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal Server Error");
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
