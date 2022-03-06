import User from '../models/User.js';

const register = async (req, res) => {
    try {
        const user = await User.create(req.body);

        res.status(201)
            .json({
                status: true,
                user
            });
    } catch (err) {
        res.status(500)
            .json({
                status: false,
                msg: err.message
            });
    }
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