"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
// Porta em que o servidor irá escutar
const PORT = process.env.PORT || 5000;
// inicia o servidor Express
app_1.default.listen(PORT, () => {
    console.log(`Servidor iniciado com sucesso!`);
    console.log(`Porta: ${PORT}`);
    console.log(`Endpoint: http://localhost:${PORT}/api\n`);
});
//# sourceMappingURL=server.js.map