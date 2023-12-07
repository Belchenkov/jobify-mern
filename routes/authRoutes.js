import express from 'express';
import rateLimit from 'express-rate-limit';
const router = express.Router();
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10,
    message: 'Too many requests from this IP address, please try again after 15 minutes'
});

import { register, login, updateUser } from '../controllers/authConroller.js';
import authenticateUser from '../middleware/auth.js';

router.route('/register').post(apiLimiter, register);
router.route('/login').post(apiLimiter, login);
router.route('/update-user').patch(authenticateUser, updateUser);


export default router;
