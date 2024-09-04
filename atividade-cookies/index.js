const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const PORT = 4000;

app.use(express.json());
app.use(cookieParser());

// Criar cookie
app.post("/cookie/criar", (req, res) => {
  const { name, value } = req.body;
  res.cookie(name, value, { httpOnly: true });
  res.status(201).json({
    mensagem: "cookie criado com sucesso",
    cod_status: 201,
  });
});

// Ler cookie
app.get("/cookie/ler", (req, res) => {
  const { name } = req.query;
  const value = req.cookies[name];
  if (value) {
    res.status(200).json({
      mensagem: `O nome do cookie criado foi ${name} e valor ${value}`,
      cod_status: 200,
    });
  } else {
    res.status(404).json({
      mensagem: "cookie não encontrado",
      cod_status: 404,
    });
  }
});

// Atualizar cookie
app.put("/cookie/atualizar", (req, res) => {
  const { name, value } = req.body;
  res.cookie(name, value, { httpOnly: true });
  res.status(201).json({
    mensagem: `O novo nome do cookie é ${name} e o novo valor é ${value}`,
    cod_status: 201,
  });
});

// Excluir cookie
app.delete("/cookie/excluir", (req, res) => {
  const { name } = req.query;
  res.clearCookie(name);
  res.status(201).json({
    mensagem: "cookie excluído com sucesso",
    cod_status: 201,
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
