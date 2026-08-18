import express from "express";

const app = express();

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "API funcionando",
  });
});

app.get("/api/hello/:name", ())

app.listen(3000, () => {
  console.log("API rodando em http://localhost:3000");
});
