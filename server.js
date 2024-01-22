const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Dados simulados (substitua isso com um banco de dados real)
let posts = [];

// Rota para criar uma nova postagem
app.post('/createPost', (req, res) => {
    const { topic, value } = req.body;

    // Adicione a nova postagem aos dados
    posts.push({ topic, value });

    // Envie os dados atualizados de volta para o cliente
    res.json({ posts });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
