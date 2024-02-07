import UserModel from "../model/user";
import TextModel from "../model/text";

const addFriend = async (req, res) => {
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
}

module.exports = addFriend;