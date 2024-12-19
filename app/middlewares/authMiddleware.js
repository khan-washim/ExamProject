import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const secret = 'my_jwt_secret'; // Replace with your secure key

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: 'Unauthorized, token missing' });

    const decoded = jwt.verify(token, secret);
    req.user = await User.findById(decoded.id).select('-password');
    if (!req.user) return res.status(401).json({ message: 'Unauthorized, user not found' });

    next();
  } catch (err) {
    res.status(401).json({ message: 'Unauthorized, invalid token' });
  }
};

export default authMiddleware;
