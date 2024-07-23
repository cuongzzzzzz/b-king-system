const { ReasonStatusCode, StatusCode } = require("../constants");

class ApiError extends Error {
    constructor(message, status) {
        super(message);
        this.message = message;
        this.status = status;
    }
}

class ConflictError extends ApiError {
    constructor(message) {
        super(message || ReasonStatusCode.CONFLICT, StatusCode.CONFLICT);
    }
}

class BadRequestError extends ApiError {
    constructor(message) {
        super(message || ReasonStatusCode.BAD_REQUEST, StatusCode.BAD_REQUEST);
    }
}

class ForbiddenError extends ApiError {
    constructor(message) {
        super(message || ReasonStatusCode.FORBIDDEN, StatusCode.FORBIDDEN);
    }
}

class UnauthorizedError extends ApiError {
    constructor(message) {
        super(message || ReasonStatusCode.UNAUTHORIZED, StatusCode.UNAUTHORIZED);
    }
}

class InternalServerError extends ApiError {
    constructor(message) {
        super(
            message || ReasonStatusCode.INTERNAL_SERVER_ERROR,
            StatusCode.INTERNAL_SERVER_ERROR
        );
    }
}

class ResourceNotFoundError extends ApiError {
    constructor(message) {
        super(message || ReasonStatusCode.NOT_FOUND, StatusCode.NOT_FOUND);
    }
}

// Xuất các lớp sử dụng module.exports
module.exports = {
    ApiError,
    ConflictError,
    BadRequestError,
    ForbiddenError,
    UnauthorizedError,
    InternalServerError,
    ResourceNotFoundError,
};
