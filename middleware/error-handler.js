const errorHandlerMiddleware = (err, req, res, next) => {
    console.error(err);

    return res
        .status(500)
        .json({
            msg: err,
        });
};

export default errorHandlerMiddleware;