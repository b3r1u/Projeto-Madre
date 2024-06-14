var express = require('express');
var router = express.Router();
var sqlite3 = require("sqlite3")
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');

const db = new sqlite3.Database('./database/database.db')

// CRIANDO TABELA pacotes
db.run(`CREATE TABLE IF NOT EXISTS pacotes (
   id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT,
  passagem TEXT,
  validade DATE,
  localSaida TEXT,
  refeicao TEXT,
  localDestino TEXT
)`, (err) => {
  if (err) {
    console.error('Erro ao criar a tabela pacotes: ', err);
  } else {
    console.log('Tabela pacotes criada com sucesso!');
  }
});


/* POST create a new pacote. */
router.post('/register', (req, res) => {
  console.log(req.body)
  const { username, passagem, validade, localSaida, refeicao, localDestino   } = req.body

  db.get('SELECT * FROM pacotes WHERE username = ?', username, (err, row) => {
    if (row) {
      console.log("Pacote já existe", err)
      return res.status(400).send({ error: 'Nome do Pacote já existe' })
    } else {
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          console.log("Erro ao criar o hash da senha", err)
          return res.status(500).send({ error: 'Erro ao criar o hash da senha' })
        } else {
          db.run('INSERT INTO pacotes (username, passagem, validade, localSaida, refeicao, localDestino ) VALUES (?,?,?,?,?,?)', [username, hash, passagem, validade, localSaida, refeicao, localDestino], (err) => {
            if (err) {
              console.log("Erro ao criar o Pacote", err)
              return res.status(500).send({ error: 'Erro ao criar o Pacote' })
            } else {
              res.status(201).send({ message: "Pacote criado com sucesso" })
            }
          })
        }

      })
    }
  })
})

  /* GET pacotes listing. */
  router.get('/', function (req, res, next) {
  db.all('SELECT * FROM pacotes', (err, pacotes) => {
    if (err) {
      console.log("Pacote não foram encontrados", err)
      return res.status(500).send({ error: "Pacote não encontrados" })
    } else {
      res.status(200).send(pacotes)
    }
  })
});

/* GET single pacote by ID. */
router.get('/:id', function (req, res, next) {
  const { id } = req.params;
  db.get('SELECT * FROM pacotes WHERE id = ?', [id], (err, row) => {
    if (err) {
      console.error('Pacote não encontrado', err);
      return res.status(500).json({ error: 'Pacote não encontrado' });
    }
    if (!row) {
      return res.status(404).json({ error: 'Pacote não encontrado' });
    }
    res.status(200).json(row);
  });
});


/* PUT update o pacote. */
router.put('/:id', function (req, res, next) {
  const { id } = req.params;
  const { username, passagem, validade, localSaida, refeicao, localDestino  } = req.body;
  db.run('UPDATE pacotes SET pacotes SET username = ?, passagem = ?, validade = ?, localSaida = ?, refeicao = ?, localDestino = ? WHERE id = ?', [username, passagem, validade, localSaida, refeicao, localDestino , id], function (err) {
    if (err) {
      console.error('Erro ao atualizar o Pacote', err);
      return res.status(500).json({ error: 'Erro ao atualizar o Pacote' });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Pacote não encontrado' });
    }
    res.status(200).json({ message: "Pacote atualizado com sucesso" });
  });
});

/* PATCH partially update o pacote. */
router.patch('/:id', function (req, res, next) {
  const { id } = req.params;
  const fields = req.body;
  const keys = Object.keys(fields);
  const values = Object.values(fields);

  if (keys.length === 0) {
    return res.status(400).json({ error: 'Nenhum campo fornecido para atualização' });
  }

  const setClause = keys.map((key) => `${key} = ?`).join(', ');

  db.run(`UPDATE pacotes SET ${setClause} WHERE id = ?`, [...values, id], function (err) {
    if (err) {
      console.error('Erro ao atualizar o Pacote parcialmente', err);
      return res.status(500).json({ error: 'Erro ao atualizar o Pacote parcialmente' });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Pacote não encontrado' });
    }
    res.status(200).json({ message: "Pacote atualizado parcialmente com sucesso" });
  });
});

/* DELETE o pacote. */
router.delete('/:id', function (req, res, next) {
  const { id } = req.params;
  db.run('DELETE FROM pacotes WHERE id = ?', [id], function (err) {
    if (err) {
      console.error('Erro ao deletar o Pacote', err);
      return res.status(500).json({ error: 'Erro ao deletar o Pacote' });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Pacote não encontrado' });
    }
    res.status(200).json({ message: "Pacote deletado com sucesso" });
  });
});

module.exports = router;