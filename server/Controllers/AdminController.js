import mongoose from 'mongoose';
import User from "../Models/Users.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-provider_id -__v');
    res.json({ users });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users', error: error.message });
  }
};

const isAdminRole = (role) => String(role || '').toLowerCase() === 'admin';

export const banUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || !mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: 'Valid user id is required' });
    }

    if (req.user._id.toString() === id) {
      return res.status(403).json({ message: 'Admins cannot ban themselves' });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (isAdminRole(user.role)) {
      return res.status(403).json({ message: 'Cannot ban another admin' });
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { banned: true },
      { new: true, runValidators: true }
    );

    res.json({ message: 'User banned successfully', user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: 'Failed to ban user', error: error.message });
  }
};

export const unbanUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || !mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: 'Valid user id is required' });
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { banned: false },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User unbanned successfully', user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: 'Failed to unban user', error: error.message });
  }
};
