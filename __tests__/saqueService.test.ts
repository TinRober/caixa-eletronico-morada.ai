import { SaqueService } from "../src/services/saqueService";
import { HttpError } from "../src/utils/httpError";

// Testes unitários para SaqueService
describe("SaqueService", () => {
  test("deve retornar a combinação correta para um valor par", () => {
    const resultado = SaqueService.calcularSaque(180);

    expect(resultado).toEqual({
      100: 1,
      50: 1,
      20: 1,
      10: 1,
      5: 0,
      2: 0,
    });
  });

  // Teste adicional para valor ímpar usando nota de 5
  test("deve retornar a combinação correta para um valor ímpar usando nota de 5", () => {
    const resultado = SaqueService.calcularSaque(125);

    expect(resultado).toEqual({
      100: 1,
      50: 0,
      20: 1,
      10: 0,
      5: 1,
      2: 0,
    });
  });

  // Teste adicional para valor ímpar que requer múltiplas notas de 2 após usar nota de 5
  test("deve retornar a combinação correta para um valor ímpar usando nota de 5 antes de usar o restante da lógica", () => {
    const resultado = SaqueService.calcularSaque(101);

    expect(resultado).toEqual({
      100: 0,
      50: 1,
      20: 2,
      10: 0,
      5: 1,
      2: 3,
    });
  });

  // Teste para valor que não pode ser sacado
  test("deve lançar erro ao tentar sacar valor menor que 1", () => {
    expect(() => SaqueService.calcularSaque(0)).toThrow(HttpError);
  });

  // Teste para valor que não pode ser sacado
  test("deve lançar erro ao tentar sacar valor impossível (ex: 3)", () => {
    expect(() => SaqueService.calcularSaque(3)).toThrow(HttpError);
  });

  // Teste para valor negativo
  test("deve lançar erro para valores não inteiros", () => {
    expect(() => SaqueService.calcularSaque(10.5)).toThrow(HttpError);
  });
});
