import { StatusCodes } from "http-status-codes";

import User from '../models/User.js';

const register = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        throw Error('Please provide all values!');
    }

    const user = await User.create({
        name,
        email,
        password,
    });

    res.status(StatusCodes.CREATED)
        .json({
            status: true,
            user
        });
};

const login = async (req, res) => {
    res.send('login user');
};

const updateUser = async (req, res) => {
    res.send('updateUser');
};

export {
    register,
    login,
    updateUser,
};