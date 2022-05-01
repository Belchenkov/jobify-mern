import { StatusCodes } from "http-status-codes";

import User from '../models/User.js';

class CustomAPIError extends Error {
    constructor(message) {
        super(message);
    }
}

class UnprocessableEntityError extends CustomAPIError {
    constructor(message) {
        super(message);
        this.statusCode = StatusCodes.UNPROCESSABLE_ENTITY;
    }
}

class NotFoundError extends CustomAPIError {
    constructor(message) {
        super(message);
        this.statusCode = StatusCodes.NOT_FOUND;
    }
}

const register = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        throw new UnprocessableEntityError('Please provide all values!');
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