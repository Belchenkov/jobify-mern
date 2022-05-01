import { StatusCodes } from "http-status-codes";

const errorHandlerMiddleware = (err, req, res, next) => {
    console.error(err);

    const defaultError = {
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        msg: 'Something went wrong, try again later'
    };

    if (err.name === 'ValidationError') {
        defaultError.statusCode = StatusCodes.UNPROCESSABLE_ENTITY;
        defaultError.msg = Object.values(err.errors).map(item => item.message).join(',');
    }

    if (err.code & err.code === 11000) {
        defaultError.statusCode = StatusCodes.UNPROCESSABLE_ENTITY;
        defaultError.msg = `${Object.keys(err.keyValue)} field has to be unique`;
    }

    return res
        .status(defaultError.statusCode)
        .json({
            msg: defaultError.msg,
        });
};

export default errorHandlerMiddleware;