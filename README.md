# Caixa Eletrônico API

API em **TypeScript** que simula o funcionamento de um caixa eletrônico. Ela recebe um valor de saque e retorna a quantidade mínima de cédulas necessárias para compor esse saque.

As cédulas disponíveis são: **100, 50, 20, 10, 5 e 2**.

---

## Tecnologias

* Node.js
* TypeScript
* Express 5
* HTTP JSON API

---

## Estrutura do projeto

```
src/
├─ app.ts          # Configuração do Express e middlewares
├─ server.ts       # Inicialização do servidor
├─ routes/         # Rotas da API
│  └─ saque.routes.ts
├─ controllers/    # Lógica de recebimento e retorno das requisições
│  └─ saque.controller.ts
├─ services/       # Regras de negócio do saque
│  └─ saque.service.ts
└─ utils/          # Classe para erros HTTP personalizados
   └─ http-error.ts

__tests__/                # Pasta de testes unitários
└─ saqueService.test.ts   # Testes da lógica de saque
```

---

### Convenções de Nomenclatura

* **Pastas**: camelCase (`controllers`, `services`, `routes`, `utils`)
* **Arquivos de código**: camelCase (`saqueController.ts`, `saqueService.ts`, `saqueRoutes.ts`, `httpError.ts`)
* **Classes internas**: PascalCase (`SaqueController`, `SaqueService`, `HttpError`)
* **Métodos**: camelCase (`realizarSaque`, `calcularSaque`)
* **Arquivos de configuração**: camelCase (`app.ts` para configurar o Express, `server.ts` para iniciar o servidor)

Essa organização garante:

* Facilidade para localizar arquivos e funcionalidades
* Manutenção e escalabilidade mais simples
* Padrão consistente para novos arquivos ou módulos

---

## Como rodar

1. Clonar o repositório:

```bash
git clone https://github.com/TinRober/caixa-eletronico-morada.ai
cd caixa-eletronico-morada.ai
```

2. Instalar dependências:

```bash
npm install
```

3. Rodar em modo desenvolvimento (com recarga automática):

```bash
npm run dev
```

O servidor irá iniciar em `http://localhost:5000/api`.

---

## Endpoints

### GET `/api`

Retorna uma mensagem de teste:

**Resposta:**

```json
"API de Saques funcionando!"
```

---

### POST `/api/saque`

Realiza um saque e retorna a quantidade de cédulas necessárias.

**Body (JSON):**

```json
{
  "valor": 380
}
```

**Resposta (JSON):**

```json
{
  "100": 3,
  "50": 1,
  "20": 1,
  "10": 1,
  "5": 0,
  "2": 0
}
```

---

### Erros possíveis

* Valor inválido (não inteiro ou <= 0):

```json
{
  "erro": "O valor deve ser um inteiro positivo."
}
```

* Valor impossível de sacar com as cédulas disponíveis (1 ou 3, por exemplo):

```json
{
  "erro": "Não é possível sacar esse valor com as cédulas disponíveis."
}
```

* Erro interno no servidor:

```json
{
  "erro": "Erro interno no servidor."
}
```

---

## Observações

* A lógica do saque é **gulosa**, utilizando sempre a cédula de maior valor possível antes de partir para a próxima (exceto a nota de 5).
* Apenas os valores positivos **1 e 3** não podem ser sacados com as cédulas disponíveis.
* O projeto utiliza **arquitetura limpa**, separando Controllers, Services e Utils.

---

## Dificuldades Encontradas

## Fiz essa análise de forma sincera e bem detalhada. Se isso vai ser uma boa ideia ou não só vou saber depois. 

### Antes de iniciar o projeto

1. **Aprender TypeScript**: Normalmente utilizo JavaScript, mas como a Morada.ai utiliza principalmente TypeScript, decidi me arriscar.

2. **Definir a lógica do projeto**: Entender como criar a lógica do caixa eletrônico. Atualmente estou lendo *"Entendendo Algoritmos"*, e nele existe um capítulo sobre algoritmos gulosos. Descobri isso depois de já ter desenvolvido parte do projeto, mas pode ser útil adicionar insights futuramente.

### Durante o desenvolvimento

3. **Erro `TypeError: argument handler must be a function`**: O problema ocorreu porque eu tinha importado o método da classe, e não a função direta.

4. **Postman não reconhecendo a URL**: Inicialmente estava usando a porta 3000, enquanto o projeto está configurado para 5000. Além disso, quebras de linha no Postman estavam quebrando a URL.

5. **Lógica gulosa para saque**: Ao testar com valores como 128, a lógica de sempre pegar a maior nota disponível falhou, pois sobravam valores que não podiam ser atendidos. Para contornar isso, a lógica foi ajustada para que, quando o restante fosse 1 ou 3, a nota de 5 não fosse utilizada:

```ts
// regra especial para a nota de 5
if (nota === 5 && (restante === 1 || restante === 3)) {
  continue;
}
```

Essa regra sozinha não resolveu completamente, o problema com o número 8 continuou, mas o GitHub Copilot ajudou a chegar em uma solução. (spoiler: não deu certo também, tratei disso no ponto 9)

```ts
// regra final para a nota de 5
if (nota === 5 && restante % 2 !== 1) {
  continue;
}
```

6. **Formato do JSON de saída**: A saída estava em uma única linha, enquanto o padrão esperado mostrava cada nota em linha separada. Além disso, os objetos JS ordenam chaves numéricas do menor para o maior. Optei por não transformar as notas em strings ou usar soluções alternativas para manter o código simples e organizado. Também removi a mensagem `"Saque realizado!"` do JSON, seguindo o padrão solicitado.

7. **Organização do projeto**: Foi necessário entender como estruturar pastas, arquivos, classes e métodos em TypeScript para manter o projeto bem organizado e padronizado.

8. **Saída no Windows**: normalmente eu programo em linux, quando eu rodei no windows (o comando aparentemente é diferente também) o resultado não saiu em json igual saiu saiu no linux e no exemplo do projeto, saiu assim mas acredito que isso não seja um problema:
Invoke-RestMethod -Uri http://localhost:5000/api/saque -Method POST -Body '{"valor":380}' -ContentType "application/json" >>

```ts
2   : 0
5   : 0
10  : 1
20  : 1
50  : 1
100 : 3
```

9. Durante o desenvolvimento do cálculo de cédulas para o saque, surgiu uma dificuldade ao tentar sacar valores ímpares, a princípio eu nem tinha cogitado a possibilidade de sacar números ímpares. O algoritmo original impedia o uso da nota de R$ 5 em situações onde ela era necessária, tornando impossível montar valores ímpares com as cédulas disponíveis. O problema ocorria porque todas as outras notas são pares, e qualquer valor ímpar só pode ser formado usando pelo menos uma nota de R$ 5. A solução foi ajustar a lógica para, sempre que o valor solicitado for ímpar, retirar automaticamente uma nota de R$ 5 antes de distribuir o restante. Assim, o valor remanescente sempre será par e pode ser montado normalmente com as outras cédulas. Após essa alteração, o saque passou a funcionar corretamente para qualquer valor válido, incluindo os ímpares.

**Observação**: Tentei consultar o perfil de quem criou o desafio para espelhar alguma estrutura de projeto em TypeScript, mas não foi muito elucidativo. Também percebi que outros candidatos não implementaram um tratamento especial para a nota de 5, investigar o projeto de outras pessoas que fizeram o teste anteriormente através das branchs tornou essa parte do desafio mais interessante. tentei verificar se algum deles fazia parte da empresa para verificar o projeto mas não encontrei. 

---

## Complemento: Testes Automatizados

Durante o processo, também configurei o Jest (nunca havia utilizado anteriormente) com TypeScript para garantir que a lógica de saque funcionasse para vários cenários, incluindo:

- valores pares  
- valores ímpares  
- valores impossíveis  
- valores inválidos  
- combinações limítrofes (ex: 5, 7, 9, 101)  

Os testes ajudaram a validar os ajustes feitos na lógica da nota de 5 e prevenir regressões durante refatorações.

---

## Scripts disponíveis

```bash
npm run dev     # Rodar em modo desenvolvimento
npm run build   # Compilar TypeScript para JavaScript
npm start       # Rodar versão compilada
npm test        # Executar os testes com Jest
```

---

## Autor

Roberto Alzir Galarani Chaves
