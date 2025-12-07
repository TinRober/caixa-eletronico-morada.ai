"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpError = void 0;
// utilitário para representar erros HTTP com código de status
class HttpError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
        // mantém o protótipo correto para instâncias de HttpError
        Object.setPrototypeOf(this, new.target.prototype);
        // captura a stack trace para facilitar o debug
        Error.captureStackTrace?.(this, this.constructor);
    }
}
exports.HttpError = HttpError;
//# sourceMappingURL=httpError.js.map