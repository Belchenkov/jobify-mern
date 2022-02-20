const errorHandlerMiddleware = (err, req, res, next) => {
    console.error(err);

    return res
        .status(500)
        .json({
            msg: 'There was an error',
        });
};

export default errorHandlerMiddleware;