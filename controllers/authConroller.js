import { StatusCodes } from "http-status-codes";

import User from '../models/User.js';
import { UnprocessableEntityError } from "../errors/index.js";

const register = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) throw new UnprocessableEntityError('Please provide all values!');

    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) throw new UnprocessableEntityError('Email already in use');

    const user = await User.create({
        name,
        email,
        password,
    });
    const token = user.createJWT();

    res.status(StatusCodes.CREATED)
        .json({
            status: true,
            user,
            token,
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