import { Router } from "express";
import { SaqueController } from "../controllers/saqueController";

const router = Router();

// rota de teste para verificar se a API está funcionando
router.get("/", (req, res) => {
  res.send("API de Saques funcionando");
});

// rota para processar requisições de saque
// recebe no body JSON com { valor: number } e retorna a quantidade de cédulas.
router.post("/saque", (req, res) => SaqueController.realizarSaque(req, res));

export default router;
