var express = require('express');
var router = express.Router();
const url = "https://probable-space-potato-4xgj996xwwp3jr4w-4000.app.github.dev/users/"

/* GET users listing. */
router.get('/', function (req, res, next) {

  fetch(url, { method: 'GET' })
    .then(async (res) => {
      if (!res.ok) {
        const err = await res.json()
        throw err
      }
      return res.json()
    })
    .then((users) => {
      let title = "Gestão de Usuários"
      let cols = ["Id", "Nome" , "email", "cpf", "Data de Nascimento", "telefone", "endereco", "Ações"]
      res.render('layout', {body: 'pages/users', title, users, cols, error: "" })
    })
    .catch((error) => {
      console.log('Erro', error)
      res.render('layout', { body: 'pages/users', title: "Gestão de Usuários", error })
    })
});

// POST new user
router.post("/", (req, res) => {
  const { username , email, cpf, dataNascimento, telefone,endereco, password  } = req.body
  fetch(url + '/register', {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username , email, cpf, dataNascimento, telefone,endereco, password  })
  }).then(async (res) => {
    if (!res.ok) {
      const err = await res.json()
      throw err
    }
    return res.json()
  })
    .then((user) => {
      res.send(user)
    })
    .catch((error) => {
      res.status(500).send(error)
    })
})

// UPDATE user
router.put("/:id", (req, res) => {
  const { id } = req.params
  const { username , email, cpf, dataNascimento, telefone,endereco, password  } = req.body
  fetch(url+id, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username , email, cpf, dataNascimento, telefone,endereco, password  })
  }).then(async (res) => {
    if (!res.ok) {
      const err = await res.json()
      throw err
    }
    return res.json()
  })
    .then((user) => {
      res.send(user)
    })
    .catch((error) => {
      res.status(500).send(error)
    })
})

// REMOVE user
router.delete("/:id", (req, res) => {
  const { id } = req.params
  fetch(url+id, {
    method: "DELETE"
  }).then(async (res) => {
    if (!res.ok) {
      const err = await res.json()
      throw err
    }
    return res.json()
  })
    .then((user) => {
      res.send(user)
    })
    .catch((error) => {
      res.status(500).send(error)
    })
})

// GET user by id
router.get("/:id", (req, res) => {
  const { id } = req.params
  fetch(url+id, {
    method: "GET"
  }).then(async (res) => {
    if (!res.ok) {
      const err = await res.json()
      throw err
    }
    return res.json()
  })
    .then((user) => {
      res.send(user)
    })
    .catch((error) => {
      res.status(500).send(error)
    })
})

module.exports = router;