import app from "./app";

// Porta em que o servidor irá escutar
const PORT = process.env.PORT || 5000;

// inicia o servidor Express
app.listen(PORT, () => {
  console.log(`Servidor iniciado com sucesso!`);
  console.log(`Porta: ${PORT}`);
  console.log(`Endpoint: http://localhost:${PORT}/api\n`);
});
