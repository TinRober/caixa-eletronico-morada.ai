"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaqueService = void 0;
const httpError_1 = require("../utils/httpError");
// serviço responsável por calcular a quantidade de cédulas para um saque
class SaqueService {
    // método para calcular a quantidade de cada nota para o valor solicitado
    static calcularSaque(valor) {
        if (!Number.isInteger(valor) || valor <= 0) {
            throw new httpError_1.HttpError(400, "O valor deve ser um inteiro positivo.");
        }
        let restante = valor;
        const resultado = {
            100: 0,
            50: 0,
            20: 0,
            10: 0,
            5: 0,
            2: 0
        };
        for (const nota of SaqueService.notas) {
            if (restante >= nota) {
                // regra especial para a nota de 5
                if (nota === 5 && restante % 2 !== 1) {
                    continue;
                }
                const quantidade = Math.floor(restante / nota);
                resultado[nota] = quantidade;
                restante -= quantidade * nota;
            }
        }
        if (restante > 0) {
            throw new httpError_1.HttpError(400, "Não é possível sacar esse valor com as cédulas disponíveis.");
        }
        return resultado;
    }
}
exports.SaqueService = SaqueService;
// notas disponíveis no caixa eletrônico
SaqueService.notas = [100, 50, 20, 10, 5, 2];
//# sourceMappingURL=saque.service.js.map