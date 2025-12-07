"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const saque_routes_1 = __importDefault(require("./routes/saque.routes"));
// configuração principal do aplicativo Express
const app = (0, express_1.default)();
// Middleware para interpretar JSON
app.use(express_1.default.json());
// Prefixo da API
app.use("/api", saque_routes_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map