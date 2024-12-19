import express from 'express';
import {
  registerUser,
  loginUser,
  getUserProfile,
  getAllProfiles,
  updateUserProfile,
  deleteUserProfile,
  logoutUser,
} from '../app/controllers/userController.js';
import authMiddleware from '../app/middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', authMiddleware, getUserProfile);
router.get('/profiles', authMiddleware, getAllProfiles);
router.put('/profile', authMiddleware, updateUserProfile);
router.delete('/profile', authMiddleware, deleteUserProfile);
router.post('/logout', logoutUser);

export default router;
