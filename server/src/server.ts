import express from 'express';
// importação com "type": "module"

const app = express();

// criação de primeira rota
app.get('/ads', (request, response) => {
    return response.json([
        {
            id: 1,
            name: 'Anúncio 1',
        }, {
            id: 2,
            name: 'Anúncio 2',
        }
    ]);
});

// request: buscar informações da requisição

app.listen(3333);