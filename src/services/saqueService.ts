import { HttpError } from "../utils/httpError";


// Serviço responsável por calcular a combinação de notas para um saque
export class SaqueService {
  // Notas disponíveis no caixa eletrônico
  private static readonly notas = [100, 50, 20, 10, 5, ] as const;

  // Calcula a combinação de notas para o valor solicitado
  public static calcularSaque(valor: number): Record<number, number> {
    if (!Number.isInteger(valor) || valor <= 0) {
      throw new HttpError(400, "O valor deve ser um inteiro positivo.");
    }

    // Variável para rastrear o valor restante a ser sacado
    let restante = valor;
    const resultado: Record<number, number> = {};

    // inicializa resultado
    for (const nota of SaqueService.notas) {
      resultado[nota] = 0;
    }
    // caso o restante é ímpar
    if (restante % 2 !== 0) {
      if (restante >= 5) {
        resultado[5] = 1;
        restante -= 5;
      } else {
        throw new HttpError(400, "Não é possível sacar esse valor com as cédulas disponíveis.");
      }
    }

    // Como o restante agora é sempre par, o algoritmo funciona normalmente
    for (const nota of SaqueService.notas) {
      if (nota === 5) continue; 

      // Calcula quantas notas dessa denominação podem ser usadas
      if (restante >= nota) {
        const quantidade = Math.floor(restante / nota);
        resultado[nota] = quantidade;
        restante -= quantidade * nota;
      }
    }

    if (restante > 0) {
      throw new HttpError(400, "Não é possível sacar esse valor com as cédulas disponíveis.");
    }

    return resultado;
  }
}
