"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const saque_controller_1 = require("../controllers/saque.controller");
const router = (0, express_1.Router)();
// rota de teste para verificar se a API está funcionando
router.get("/", (req, res) => {
    res.send("API de Saques funcionando");
});
// rota para processar requisições de saque
// recebe no body JSON com { valor: number } e retorna a quantidade de cédulas.
router.post("/saque", (req, res) => saque_controller_1.SaqueController.realizarSaque(req, res));
exports.default = router;
//# sourceMappingURL=saque.routes.js.map