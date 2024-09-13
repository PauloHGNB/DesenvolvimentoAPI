const express = require("express");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

const users = {
  username: "usuario",
  password: "senha123",
};

const SECRET_KEY = "123123123";

function generateToken() {
  const token = jwt.sign({}, SECRET_KEY, {
    expiresIn: "2h",
  });
  const decoded = jwt.decode(token);
  return {
    token_id: token,
    iat: new Date(decoded.iat * 1000).toISOString(),
    exp: new Date(decoded.exp * 1000).toISOString(),
  };
}

app.post("/jwt/auth", (req, res) => {
  const { username, password } = req.body;

  if (username === users.username && password === users.password) {
    const token = generateToken();
    return res.json(token);
  } else {
    return res.status(401).json({ message: "Credenciais inválidas" });
  }
});

function verifyJWT(req, res, next) {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(403).json({ message: "Token não fornecido" });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(403).json({ message: "Token inválido" });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Token inválido" });
    }
    req.user = decoded;
    next();
  });
}

app.get("/jwt/produtos", verifyJWT, (req, res) => {
  res.json({
    message: "Lista de produtos",
    produtos: ["Produto 1", "Produto 2", "Produto 3"],
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
