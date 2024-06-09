var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3');

const db = new sqlite3.Database('./database/database.db')

db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
   username TEXT, 
   email TEXT UNIQUE, 
   cpf TEXT UNIQUE,
   dataNascimento DATE,
   telefone TEXT,
   endereco TEXT, 
   password TEXT
)`, (err) => {
  if (err){
  console.error("erro ao criar a tabela users: ", err);
  }
  else{
  console.log("Tabela users criada com sucesso");
  }
});

//criar usuario
router.post("/register", (req, res) => {
  const { username , email, cpf, telefone,endereco, password } = req.body;
  console.log(req.body)

  db.run(
    "INSERT INTO users (username, email, cpf, telefone,endereco, password) VALUES (?, ?, ?, ?, ?, ?)",
    [username, email, cpf, telefone,endereco,password],
    (error) => {
      if (error) {
        res.status(500).send(error);
        return;
      }
      else{
      res.status(201).send(`Usuário ${username} cadastrado com sucesso`);
      }
    },
  );
});

/* GET USERS. */
router.get('/', function(req, res, next) {
  db.all("SELECT * FROM users", (error, rows) => {
    if (error) {
      res.status(500).send(error);
      return;
    }
    res.json(rows);
  });
});

//GET PELO ID
router.get('/:id', function(req, res, next) {
  const{id} = req.params;
db.get("SELECT * FROM users WHERE id = ?", [id], (error, row) => {
  if (error) {
    res.status(500).send(error);
    return;
  }
  res.json(row);
});
});

//PUT USERS
router.put('/:id', function(req, res, next) {
  const { id } = req.params;
  const { username, email, cpf, telefone, endereco, password } = req.body;
  db.run(
    "UPDATE users SET username = ?, email = ?, cpf = ?, telefone = ?, endereco = ?, password = ? WHERE id = ?",
    [username, email, cpf, telefone, endereco, password, id],
    (error) => {
      if (error) {
        res.status(500).send(error);
        return;
      }
      res.send(`Usuário ${username} atualizado com sucesso`);
    }
  );
});

router.patch('/:id', function(req, res, next) {
  const { id } = req.params;
  const { username, email, cpf, telefone, endereco, password } = req.body;
  db.run(
    "UPDATE users SET username = ?, email = ?, cpf = ?, telefone = ?, endereco = ?, password = ? WHERE id = ?",
    [username, email, cpf, telefone, endereco, password, id],
    (error) => {
      if (error) {
        res.status(500).send(error);
        return;
      }
      res.send(`Usuário ${username} atualizado com sucesso`);
    }
  );
});


router.delete('/:id', function(req, res, next) {
  const{id} = req.params;
db.run("DELETE FROM users WHERE id = ?", [id], (error, row) => {
  if (error) {
    res.status(500).send(error);
    return;
  }
  res.send(`Usuário ${id} deletado com sucesso`);
});
});


module.exports = router;
