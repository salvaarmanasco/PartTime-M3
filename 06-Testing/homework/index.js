const express = require("express");
const { arrayReplaceAt } = require("markdown-it/lib/common/utils");
const app = express();

app.use(express.json()); // for parsing application/json

app.get("/", (req, res) => {
  res.send({
    message: "hola",
  });
});
app.get("/test", (req, res) => {
  res.send({
    message: "test",
  });
});

app.post("/product", (req, res) => {
  res.send({
    result: req.body.a * req.body.b,
  });
});

app.post("/sum", (req, res) => {
  res.send({
    result: req.body.a + req.body.b,
  });
});

app.post("/sumArray", (req, res) => {
  let compare = (a, b) => {
    for (let i = 0; i < a.length; i++) {
      for (let j = 1; j < a.length; j++) {
        if (a[i] + a[j] === b) return true;
      }
      return false;
    }
  };
  res.send({
    result: compare(req.body.array, req.body.num),
  });
});

app.post("/numString", (req, res) => {
  if (typeof req.body.mensaje === "string") {
    if (req.body.mensaje.length === 0) {
      res.sendStatus(400);
    }
    res.send({
      result: req.body.mensaje.length,
    });
  }
  res.sendStatus(400);
});

app.post("/pluck", (req, res) => {
  res.send({
    result: req.body.array.map((e) => {}),
  });
});

module.exports = app; // Exportamos app para que supertest session la pueda ejecutar
