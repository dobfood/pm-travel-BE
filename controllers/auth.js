import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const register = async (req, res) => {
  try {
    const { fullName, phone, email, password } = req.body;

    // check validate required
    if (!(fullName && password && phone && email)) {
      res.status(400).send("All input is required");
    }
    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }
    //Encrypt user password
    const encryptedPassword = await bcrypt.hash(password, 10);
    //create user in our database
    const user = await User.create({
      fullName,
      phone,
      email: email.toLowerCase(),
      password: encryptedPassword,
    });
    //create token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.JWT_SECRET,
      {
        expiresIn: "2h",
      }
    );
    user.token = token;
    res.status(201).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const comparePasswords = async (plainPassword, hashedPassword) => {
  try {
    const match = await bcrypt.compare(plainPassword, hashedPassword);
    return match;
  } catch (error) {}
};
export const login = async (req, res) => {
  // Our login logic starts here
  try {
    //get user input
    const { email, password } = req.body;

    //validate user input
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user = await User.findOne({ email });
    const isMatch = await comparePasswords(password, user.password);
    if (user && isMatch) {
      
      //create token

      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.JWT_SECRET,
        {
          expiresIn: "2h",
        }
      );
      delete user.password;
      user.token = token;
      res.status(200).json({ user, token });
      return;
    }
    res.status(400).send("Invalid Credentials");
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
