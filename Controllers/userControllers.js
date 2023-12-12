import User from "../Models/UserModel.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../middleware/authMiddleware.js";

// Path: Controllers/userControllers.js
const registerUser = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    mobileNumber,
    address1,
    address2,
    pincode,
    country,
    state,
  } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(400).json({ message: "User with this email already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    mobileNumber,
    address1,
    address2,
    pincode,
    country,
    state,
  });

  if (user) {
    const token = generateToken(user._id);
    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      mobileNumber: user.mobileNumber,
      address1: user.address1,
      address2: user.address2,
      pincode: user.pincode,
      country: user.country,
      state: user.state,
      token,
    });
  } else {
    res.status(400).json({
      message: "Invalid user data",
    });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    // Check if the password is correct
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = generateToken(user._id);

    // Return the user details if login is successful
    res.status(200).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      mobileNumber: user.mobileNumber,
      address1: user.address1,
      address2: user.address2,
      pincode: user.pincode,
      country: user.country,
      state: user.state,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const getUsers = async (req, res) => {
  const users = await User.find({});

res.json(users);
};

export { registerUser, loginUser, getUsers };
