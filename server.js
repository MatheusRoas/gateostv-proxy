const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());

// ROTA DA LISTA
app.get('/minhalista', (req, res) => {
    // ATENÇÃO: O nome aqui tem que ser IGUAL ao nome do arquivo que você subiu
    const arquivo = path.join(__dirname, 'm3uEurop-sinS-.m3u');
    
    res.sendFile(arquivo, (err) => {
        if (err) {
            console.log("Erro:", err);
            res.status(500).send("Erro: Arquivo não encontrado.");
        }
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('GateosProxy ativo 🐱'));
