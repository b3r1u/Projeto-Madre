var express = require('express');
var router = express.Router();

const url = "https://orange-memory-5w4gpp5wrvg37j4r-3000.app.github.dev/users"

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
    let cols = ["id", "username", "email", "cpf", "dataNascimento",
"telefone", "endereco", "password", "Ações" ]
    res.render('users', {title, users, cols, error: ""})
  })
  .catch((error)=>{
    console.log('Erro', error)
    res.status(500).send(error);
        return;
  })
  });

module.exports = router;
