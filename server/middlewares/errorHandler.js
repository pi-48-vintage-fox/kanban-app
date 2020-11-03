"use strict";

const errorHandler = (err, req, res, next) => {
    let status = 500;
    let name = err.name;
    let message = err.message || "";

    switch (err.name) {
        case "BadRequest":
            status = 400;
            message = "Bad Request";
            break;
        case "BadRequestPatch":
            name: "BadRequest";
            status = 400;
            message = "Failed to update Category of task";
            break;
        case "BadRequestDelete":
            name: "BadRequest";
            status = 400;
            message = "Failed to delete task";
            break;
        case "SequelizeValidationError":
        case "UniqueConstraintError":
            status = 400;
            message = err.message;
            break;
        case "Unauthorized":
            status = 401;
            message = "Unauthorized";
            break;
        case "WrongCredential":
            name: "Unauthorized";
            status = 401;
            message = "Wrong Email/Password";
            break;
        case "Forbidden":
            status = 403;
            message = "Forbidden";
            break;
        case "NotFound":
            status = 404;
            message = "Not Found";
            break;
    }

    res.status(status).json({
        name,
        message
    });
};

module.exports = errorHandler;