class BaseException extends Error{

    constructor(message, status=500){
        super(message);
        this.name = this.constructor.name;
        this.status = status;
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = BaseException;