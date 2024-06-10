var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3');

const db = new sqlite3.Database('./database/database.db')

db.run(`CREATE TABLE IF NOT EXISTS pacotes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  passagem TEXT,
  validade DATE,
  saidas TEXT,
  refeicao TEXT
)`, (err) => {
  if (err){
    console.error("Erro ao criar a tabela pacotes: ", err);
  } else {
    console.log("Tabela pacotes criada com sucesso");
  }
});

// Criar pacote
router.post("/pacotes", (req, res) => {
  const { passagem, validade, saidas, refeicao } = req.body;
  console.log(req.body)

  db.run(
    "INSERT INTO pacotes (passagem, validade, saidas, refeicao) VALUES (?, ?, ?, ?)",
    [passagem, validade, saidas, refeicao],
    (error) => {
      if (error) {
        res.status(500).send(error);
        return;
      } else {
        res.status(201).send(`Pacote criado com sucesso`);
      }
    },
  );
});

/* GET PACOTES */
router.get('/', function(req, res, next) {
  db.all("SELECT * FROM pacotes", (error, rows) => {
    if (error) {
      res.status(500).send(error);
      return;
    }
    res.json(rows);
  });
});

// GET PACOTE PELO ID
router.get('/:id', function(req, res, next) {
  const { id } = req.params;
  db.get("SELECT * FROM pacotes WHERE id = ?", [id], (error, row) => {
    if (error) {
      res.status(500).send(error);
      return;
    }
    res.json(row);
  });
});

// PUT PACOTES
router.put('/:id', function(req, res, next) {
  const { id } = req.params;
  const { passagem, validade, saidas, refeicao } = req.body;
  db.run(
    "UPDATE pacotes SET passagem = ?, validade = ?, saidas = ?, refeicao = ? WHERE id = ?",
    [passagem, validade, saidas, refeicao, id],
    (error) => {
      if (error) {
        res.status(500).send(error);
        return;
      }
      res.send(`Pacote atualizado com sucesso`);
    }
  );
});

// PATCH PACOTES
router.patch('/:id', function(req, res, next) {
  const { id } = req.params;
  const { passagem, validade, saidas, refeicao } = req.body;
  db.run(
    "UPDATE pacotes SET passagem = ?, validade = ?, saidas = ?, refeicao = ? WHERE id = ?",
    [passagem, validade, saidas, refeicao, id],
    (error) => {
      if (error) {
        res.status(500).send(error);
        return;
      }
      res.send(`Pacote atualizado com sucesso`);
    }
  );
});

// DELETE PACOTES
router.delete('/:id', function(req, res, next) {
  const { id } = req.params;
  db.run("DELETE FROM pacotes WHERE id = ?", [id], (error) => {
    if (error) {
      res.status(500).send(error);
      return;
    }
    res.send(`Pacote deletado com sucesso`);
  });
});

module.exports = router;
