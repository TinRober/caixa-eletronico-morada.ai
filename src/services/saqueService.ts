import { HttpError } from "../utils/httpError";

// serviço responsável por calcular a quantidade de cédulas para um saque
export class SaqueService {
  // notas disponíveis no caixa eletrônico (do maior para o menor)
  private static readonly notas = [100, 50, 20, 10, 5, 2] as const;

  // método para calcular a quantidade de cada nota para o valor solicitado
  public static calcularSaque(valor: number): Record<number, number> {
    if (!Number.isInteger(valor) || valor <= 0) {
      throw new HttpError(400, "O valor deve ser um inteiro positivo.");
    }

    let restante = valor;

    // inicializa o objeto resultado com todas as notas zeradas
    const resultado: Record<number, number> = {};
    for (const nota of SaqueService.notas) {
      resultado[nota] = 0;
    }

    for (const nota of SaqueService.notas) {
      // regra especial para a nota de 5
      if (nota === 5 && restante % 2 !== 1) {
        continue;
      }

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
