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

    return res
        .status(defaultError.statusCode)
        .json({
            msg: defaultError.msg,
        });
};

export default errorHandlerMiddleware;