var express = require('express');
var router = express.Router();

const url = "https://fuzzy-computing-machine-pjjjw65xq4xp26xq-3000.app.github.dev/users/"


/* GET users listing. */
router.get('/', function(req, res, next) {
  fetch(url,{ method: 'GET'})
  .then(async (res)=>{
    if(!res.ok){
      const err = await res.json()
      throw err
    }
    return res.json()
  })
  .then((users)=>{
    let title = "Gestao de usuários"
    let cols = ["id", "username", "email", "cpf", "dataDeNascimento",
"telefone", "endereco", "password", "Ações" ]
    res.render('users', {title, users, cols, error: ""})
  })
  .catch((error)=>{
    console.log('Erro', error)
    res.status(500).send(error)
  })
  });

//POST NEW USER
router.post("/", async (req, res) => {
  const { username , email, cpf, dataNascimento, telefone,endereco, password } = req.body;
  
  try {
    const response = await fetch(url + '/register', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username , email, cpf, dataNascimento, telefone,endereco, password })
    });

    if (!response.ok) {
      const err = await response.json();
      return res.status(response.status).send(err);
    }

    const user = await response.json();
    res.send(user);

  } catch (error) {
    res.status(500).send(error);
  }
});

//UPDATE PUT USUARIO 
router.put("/:id", (req, res)=>{
  const {id} = req.params
  const {username , email, cpf, dataNascimento, telefone,endereco, password} = req.body
    fetch(url+id, {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({username , email, cpf, dataNascimento, telefone,endereco, password})
    })
    .then(async (res)=>{
      if(!res.ok){
        const err = await res.json()
        throw err
      }
      return res.json()
    })
    .then((user)=>{
      res.send(user)
    })
    .catch((error)=>{
      res.status(500).send(error)
    })   
})

//DELETE user
router.delete("/:id", (req, res)=>{
  const {id} = req.params
    fetch(url+id, {
      method: "DELETE",
    })
    .then(async (res)=>{
      if(!res.ok){
        const err = await res.json()
        throw err
      }
      return res.json()
    })
    .then((user)=>{
      res.send(user)
    })
    .catch((error)=>{
      res.status(500).send(error)
    })   
})

//GET USER BY ID
router.get("/:id", (req, res)=>{
  const {id} = req.params
    fetch(url+id, {
      method: "GET",
    })
    .then(async (res)=>{
      if(!res.ok){
        const err = await res.json()
        throw err
      }
      return res.json()
    })
    .then((user)=>{
      res.send(user)
    })
    .catch((error)=>{
      res.status(500).send(error)
    })   
})

module.exports = router;
