const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');


const app = express();
app.use(cors());


app.get('/proxy', async (req, res) => {
const url = req.query.url;


if (!url || !url.startsWith('http')) {
return res.status(400).send('URL inválida');
}


try {
const response = await fetch(url, { timeout: 15000 });
res.set('Content-Type', response.headers.get('content-type') || 'application/octet-stream');
response.body.pipe(res);
} catch (err) {
res.status(500).send('Erro ao carregar o stream');
}
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('GateosProxy ativo 🐱'));