"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaqueController = void 0;
const saque_service_1 = require("../services/saque.service");
const httpError_1 = require("../utils/httpError");
// controller responsável por tratar as requisições de saque
class SaqueController {
    // método para processar a requisição de saque e retornar a quantidade de cada nota adequada
    static realizarSaque(req, res) {
        try {
            const { valor } = req.body;
            if (valor === undefined) {
                throw new httpError_1.HttpError(400, "O campo 'valor' é obrigatório.");
            }
            const resultado = saque_service_1.SaqueService.calcularSaque(valor);
            console.log("Saque realizado com sucesso:", resultado);
            return res.status(200).json({
                mensagem: "Saque realizado!",
                resultado,
            });
        }
        catch (error) {
            console.error(`Erro ao processar saque: ${error.message}`);
            if (process.env.NODE_ENV === "development") {
                console.error(error.stack);
            }
            if (error instanceof httpError_1.HttpError) {
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
exports.SaqueController = SaqueController;
//# sourceMappingURL=saque.controller.js.map