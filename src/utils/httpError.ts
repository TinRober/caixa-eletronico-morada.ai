
// utilitário para representar erros HTTP com código de status
export class HttpError extends Error {
  
  // código de status HTTP associado ao erro
  public readonly statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    
    // mantém o protótipo correto para instâncias de HttpError
    Object.setPrototypeOf(this, new.target.prototype);

    // captura a stack trace para facilitar o debug
    Error.captureStackTrace?.(this, this.constructor);
  }
}
