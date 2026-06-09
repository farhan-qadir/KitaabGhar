import { User } from '../models/User.js';
import jwt from 'jsonwebtoken';
import { isMongoConnected } from '../config/database.js';

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET || 'your_secret_key', {
    expiresIn: '7d'
  });
};

// Demo users for testing
const demoUsers = {};

// Register user
export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Demo mode: store user in memory
    if (!isMongoConnected()) {
      if (demoUsers[email]) {
        return res.status(400).json({
          success: false,
          message: 'Email already registered'
        });
      }

      const userId = 'user_' + Date.now();
      demoUsers[email] = {
        id: userId,
        name,
        email,
        password, // Note: In demo, password is not hashed
        role: 'user'
      };

      const token = generateToken(userId);

      return res.status(201).json({
        success: true,
        message: 'User registered successfully (DEMO MODE)',
        data: {
          id: userId,
          name,
          email,
          role: 'user'
        },
        token
      });
    }

    // Real database mode
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Email already registered'
      });
    }

    // Create new user
    const user = new User({ name, email, password });
    await user.save();

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      token
    });
  } catch (error) {
    next(error);
  }
};

// Login user
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Demo mode: check in-memory users
    if (!isMongoConnected()) {
      const user = demoUsers[email];
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password'
        });
      }

      if (user.password !== password) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password'
        });
      }

      const token = generateToken(user.id);

      return res.status(200).json({
        success: true,
        message: 'Login successful (DEMO MODE)',
        data: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        },
        token
      });
    }

    // Real database mode
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      token
    });
  } catch (error) {
    next(error);
  }
};

// Get user profile
export const getUserProfile = async (req, res, next) => {
  try {
    const userId = req.user?.id || req.body.userId;

    if (!isMongoConnected()) {
      // Demo mode: find user in memory
      for (const [email, user] of Object.entries(demoUsers)) {
        if (user.id === userId) {
          return res.status(200).json({
            success: true,
            message: 'Profile fetched (DEMO MODE)',
            data: user
          });
        }
      }
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const user = await User.findById(userId).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Profile fetched successfully',
      data: user
    });
  } catch (error) {
    next(error);
  }
};

// Update user profile
export const updateUserProfile = async (req, res, next) => {
  try {
    const userId = req.user?.id || req.body.userId;
    const { name, phone, address, profileImage } = req.body;

    if (!isMongoConnected()) {
      // Demo mode
      for (const [email, user] of Object.entries(demoUsers)) {
        if (user.id === userId) {
          if (name) user.name = name;
          if (phone) user.phone = phone;
          if (address) user.address = address;
          if (profileImage) user.profileImage = profileImage;

          return res.status(200).json({
            success: true,
            message: 'Profile updated (DEMO MODE)',
            data: user
          });
        }
      }
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { name, phone, address, profileImage },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: user
    });
  } catch (error) {
    next(error);
  }
};

// Get all users (admin only)
export const getAllUsers = async (req, res, next) => {
  try {
    if (!isMongoConnected()) {
      return res.status(200).json({
        success: true,
        message: 'Users fetched (DEMO MODE)',
        data: Object.values(demoUsers)
      });
    }

    const users = await User.find().select('-password');

    res.status(200).json({
      success: true,
      message: 'Users fetched successfully',
      data: users
    });
  } catch (error) {
    next(error);
  }
};
