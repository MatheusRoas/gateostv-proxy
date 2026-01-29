const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());

// --- ROTA DA SUA LISTA ---
app.get('/minhalista', (req, res) => {
    // Aqui colocamos o nome exato do seu arquivo
    const arquivo = path.join(__dirname, 'm3uEurop-sinS-.m3u');
    
    // Envia o arquivo para o navegador
    res.sendFile(arquivo, (err) => {
        if (err) {
            console.log("Erro ao enviar arquivo:", err);
            res.status(500).send("Erro: Arquivo m3u não encontrado no servidor.");
        }
    });
});

// --- ROTA PROXY (Para casos extras) ---
app.get('/proxy', async (req, res) => {
    const url = req.query.url;
    if (!url || !url.startsWith('http')) return res.status(400).send('URL inválida');
    
    try {
        const response = await fetch(url, { timeout: 15000 });
        res.set('Content-Type', response.headers.get('content-type') || 'application/octet-stream');
        response.body.pipe(res);
    } catch (err) {
        res.status(500).send('Erro ao carregar stream');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Gateos Server rodando com m3uEurop-sinS-.m3u 🐱'));
