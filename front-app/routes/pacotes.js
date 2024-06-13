// var express = require('express');
// var router = express.Router();

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('pacotes', { title: 'Pacotes de Viagem' });
// });

// // Rota para adicionar um novo pacote
// router.post('/', function(req, res, next) {
//   const pacotes = loadPacotes();
//   const newId = pacotes.length > 0 ? pacotes[pacotes.length - 1].id + 1 : 1;
//   const newPacote = {
//     id: newId,
//     pais: req.body.pais,
//     valorPassagem: req.body.valorPassagem,
//     passagem: req.body.passagem,
//     validade: req.body.validade,
//     duracao: req.body.duracao,
//     localSaida: req.body.localSaida,
//     refeicao: req.body.refeicao,
//     imagem: `uploads/${req.body.pais.toUpperCase().replace(/\s/g, '-')}.jpg` // Caminho da imagem baseado no nome do país
//   };
//   pacotes.push(newPacote);
//   savePacotes(pacotes);
//   res.redirect('/pacotes');
// });

// // Rota para editar um pacote
// router.put('/:id', function(req, res, next) {
//   const pacotes = loadPacotes();
//   const pacoteIndex = pacotes.findIndex(p => p.id == req.params.id);
//   if (pacoteIndex !== -1) {
//     pacotes[pacoteIndex] = {
//       ...pacotes[pacoteIndex],
//       pais: req.body.pais,
//       valorPassagem: req.body.valorPassagem,
//       passagem: req.body.passagem,
//       validade: req.body.validade,
//       duracao: req.body.duracao,
//       localSaida: req.body.localSaida,
//       refeicao: req.body.refeicao
//     };
//     savePacotes(pacotes);
//     res.json({ message: 'Pacote atualizado com sucesso' });
//   } else {
//     res.status(404).json({ message: 'Pacote não encontrado' });
//   }
// });

// // Rota para deletar um pacote
// router.delete('/:id', function(req, res, next) {
//   let pacotes = loadPacotes();
//   pacotes = pacotes.filter(p => p.id != req.params.id);
//   savePacotes(pacotes);
//   res.json({ message: 'Pacote deletado com sucesso' });
// });


// module.exports = router;



var express = require('express');
var router = express.Router();

const url = "https://fuzzy-computing-machine-pjjjw65xq4xp26xq-3000.app.github.dev/pacotes/"


/* GET pacotes listing. */
router.get('/', function(req, res, next) {
  fetch(url,{ method: 'GET'})
  .then(async (res)=>{
    if(!res.ok){
      const err = await res.json()
      throw err
    }
    return res.json()
  })
  .then((pacotes)=>{
    let title = "Gestao de Pacotes"
    let cols = ["id", "passagem", "validade", "localSaida", "refeicao",
"localDestino", "Ações" ]
    res.render('layout', {body: 'pages/pacotes', title, pacotes, cols, error: ""})
  })

  .catch((error)=>{
    console.log('Erro', error)
    //res.status(500).send(error)
    res.render('layout',{body: 'pages/pacotes', title: "Gestão de Pacotes", error })
  })
  });

//POST NEW pacotes
router.post("/",(req, res) => {
  const { passagem, validade, localSaida, refeicao,localDestino } = req.body;

    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ passagem, validade, localSaida, refeicao,localDestino })
    }).then(async(res)=>{
    if(!res.ok) {
      const err = await res.json();
      throw err
    }
    return res.json()
  })
    .then((user)=>{
      res.send(user)
    })
   .catch ((error) =>{
    res.status(500).send(error);
  })
})

//UPDATE PUT USUARIO 
router.put("/:id", (req, res)=>{
  const {id} = req.params
  const {passagem, validade, localSaida, refeicao,localDestino} = req.body
    fetch(url+id, {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({passagem, validade, localSaida, refeicao,localDestino})
    })
    .then(async (res)=>{
      if(!res.ok){
        const err = await res.json()
        throw err
      }
      return res.json()
    })
    .then((pacotes)=>{
      res.send(pacotes)
    })
    .catch((error)=>{
      res.status(500).send(error)
    })   
})

//DELETE pacotes
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
    .then((pacotes)=>{
      res.send(pacotes)
    })
    .catch((error)=>{
      res.status(500).send(error)
    })   
})

//GET pacotes BY ID
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
    .then((pacotes)=>{
      res.send(pacotes)
    })
    .catch((error)=>{
      res.status(500).send(error)
    })   
})

module.exports = router;

