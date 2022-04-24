import { StatusCodes } from "http-status-codes";

const errorHandlerMiddleware = (err, req, res, next) => {
    console.error(err);

    const defaultError = {
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        msg: 'Something went wrong, try again later'
    };

    return res
        .status(defaultError.statusCode)
        .json({
            msg: err,
        });
};

export default errorHandlerMiddleware;