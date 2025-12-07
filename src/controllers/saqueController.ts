import { Request, Response } from "express";
import { SaqueService } from "../services/saqueService";
import { HttpError } from "../utils/httpError";

// controller responsável por tratar as requisições de saque
export class SaqueController {

  // método para processar a requisição de saque
  public static realizarSaque(req: Request, res: Response): Response {
    try {
      const { valor } = req.body;

      if (valor === undefined) {
        throw new HttpError(400, "O campo 'valor' é obrigatório.");
      }

      // calcula o saque e retorna diretamente o objeto com as notas
      const resultado = SaqueService.calcularSaque(valor);

      console.log("Saque realizado com sucesso:", resultado);

      return res.status(200).json(resultado);

    } catch (error: any) {
      console.error(`Erro ao processar saque: ${error.message}`);

      if (process.env.NODE_ENV === "development") {
        console.error(error.stack);
      }

      if (error instanceof HttpError) {
        return res.status(error.statusCode).json({
          erro: error.message
        });
      }

      return res.status(500).json({
        erro: "Erro interno no servidor."
      });
    }
  }
}
