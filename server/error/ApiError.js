class ApiError extends Error {
    constructor(status, message) {
        super(message);  // Передаем сообщение в родительский конструктор
        this.status = status;
        this.message = message;
    }

    // Статический метод для badRequest
    static badRequest(message) {
        return new ApiError(400, message);  // Код 400 - это стандарт для "неправильного запроса"
    }

    // Статический метод для Internal error
    static internal(message) {
        return new ApiError(500, message);
    }

    // Статический метод для Forbidden error
    static forbidden(message) {
        return new ApiError(403, message);
    }
}

module.exports = ApiError;
