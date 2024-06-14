var express = require('express');
var router = express.Router();
const url = "https://probable-space-potato-4xgj996xwwp3jr4w-4000.app.github.dev/pacotes/"

/* GET pacotes listing. */
router.get('/', function (req, res, next) {

  fetch(url, { method: 'GET' })
    .then(async (res) => {
      if (!res.ok) {
        const err = await res.json()
        throw err
      }
      return res.json()
    })
    .then((pacotes) => {
      let title = "Gestão de Pacotes"
      let cols = ["Id", "Nome Pacote", "passagem", "validade", "local de Saida", "refeicao", "local de Destino" , "Ações"]
      res.render('layout', {body: 'pages/pacotes', title, pacotes, cols, error: "" })
    })
    .catch((error) => {
      console.log('Erro', error)
      res.render('layout', { body: 'pages/pacotes', title: "Gestão de Pacotes", error })
    })
});

// POST new pacote
router.post("/", (req, res) => {
  const { username, passagem, validade, localSaida, refeicao, localDestino   } = req.body
  fetch(url + '/register', {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, passagem, validade, localSaida, refeicao, localDestino   })
  }).then(async (res) => {
    if (!res.ok) {
      const err = await res.json()
      throw err
    }
    return res.json()
  })
    .then((pacote) => {
      res.send(pacote)
    })
    .catch((error) => {
      res.status(500).send(error)
    })
})

// UPDATE pacote
router.put("/:id", (req, res) => {
  const { id } = req.params
  const { username, passagem, validade, localSaida, refeicao, localDestino  } = req.body
  fetch(url+id, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, passagem, validade, localSaida, refeicao, localDestino   })
  }).then(async (res) => {
    if (!res.ok) {
      const err = await res.json()
      throw err
    }
    return res.json()
  })
    .then((pacote) => {
      res.send(pacote)
    })
    .catch((error) => {
      res.status(500).send(error)
    })
})

// REMOVE pacote
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
    .then((pacote) => {
      res.send(pacote)
    })
    .catch((error) => {
      res.status(500).send(error)
    })
})

// GET pacote by id
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
    .then((pacote) => {
      res.send(pacote)
    })
    .catch((error) => {
      res.status(500).send(error)
    })
})

module.exports = router;