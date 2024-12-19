import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';

const secret = 'my_jwt_secret'; // Replace with your secure key

// Generate JWT Token
const generateToken = (id) => jwt.sign({ id }, secret, { expiresIn: '1h' });

// User Registration
export const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, NIDNumber, phoneNumber, password, bloodGroup } = req.body;

    const existingUser = await User.findOne({ phoneNumber });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const newUser = await User.create({ firstName, lastName, NIDNumber, phoneNumber, password, bloodGroup });
    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (err) {
    res.status(500).json({ message: 'Registration failed', error: err.message });
  }
};

// User Login
export const loginUser = async (req, res) => {
  try {
    const { phoneNumber, password } = req.body;

    const user = await User.findOne({ phoneNumber });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user._id);
    res.cookie('token', token, { httpOnly: true, maxAge: 3600000 });
    res.status(200).json({ message: 'Logged in successfully', user });
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
};

// Get Single User Profile
export const getUserProfile = async (req, res) => {
  res.status(200).json(req.user);
};

// Get All User Profiles
export const getAllProfiles = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch profiles', error: err.message });
  }
};

// Update User Profile
export const updateUserProfile = async (req, res) => {
  try {
    const updates = req.body;
    const updatedUser = await User.findByIdAndUpdate(req.user._id, updates, { new: true });
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update profile', error: err.message });
  }
};

// Delete User Profile
export const deleteUserProfile = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user._id);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete user', error: err.message });
  }
};

// Logout User
export const logoutUser = (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ message: 'Logged out successfully' });
};
