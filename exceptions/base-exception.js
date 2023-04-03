class BaseException extends Error {

    constructor(message, status = 500) {
        super(message)
        this.status = status
        this.name = this.constructor.name
        Error.captureStackTrace(this, this.constructor)
    }

}

module.exports = BaseException