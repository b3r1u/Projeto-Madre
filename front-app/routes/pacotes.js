var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('pacotes', { title: 'Pacotes de Viagem' });
});

// Rota para adicionar um novo pacote
router.post('/', function(req, res, next) {
  const pacotes = loadPacotes();
  const newId = pacotes.length > 0 ? pacotes[pacotes.length - 1].id + 1 : 1;
  const newPacote = {
    id: newId,
    pais: req.body.pais,
    valorPassagem: req.body.valorPassagem,
    passagem: req.body.passagem,
    validade: req.body.validade,
    duracao: req.body.duracao,
    saidas: req.body.saidas,
    refeicao: req.body.refeicao,
    imagem: `uploads/${req.body.pais.toUpperCase().replace(/\s/g, '-')}.jpg` // Caminho da imagem baseado no nome do país
  };
  pacotes.push(newPacote);
  savePacotes(pacotes);
  res.redirect('/pacotes');
});

// Rota para editar um pacote
router.put('/:id', function(req, res, next) {
  const pacotes = loadPacotes();
  const pacoteIndex = pacotes.findIndex(p => p.id == req.params.id);
  if (pacoteIndex !== -1) {
    pacotes[pacoteIndex] = {
      ...pacotes[pacoteIndex],
      pais: req.body.pais,
      valorPassagem: req.body.valorPassagem,
      passagem: req.body.passagem,
      validade: req.body.validade,
      duracao: req.body.duracao,
      saidas: req.body.saidas,
      refeicao: req.body.refeicao
    };
    savePacotes(pacotes);
    res.json({ message: 'Pacote atualizado com sucesso' });
  } else {
    res.status(404).json({ message: 'Pacote não encontrado' });
  }
});

// Rota para deletar um pacote
router.delete('/:id', function(req, res, next) {
  let pacotes = loadPacotes();
  pacotes = pacotes.filter(p => p.id != req.params.id);
  savePacotes(pacotes);
  res.json({ message: 'Pacote deletado com sucesso' });
});


module.exports = router;
