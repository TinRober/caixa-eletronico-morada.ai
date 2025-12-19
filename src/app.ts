import express, { Application } from "express";
import saqueRoutes from "./routes/saqueRoutes";

// configuração principal do aplicativo Express
const app: Application = express();

// Middleware para interpretar JSON
app.use(express.json());

// Configuração para formatar JSON 
app.set("json spaces", 2);

// Prefixo da API
app.use("/api", saqueRoutes);

export default app;