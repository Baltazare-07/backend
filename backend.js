const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let signalements = [];

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Backend Sentinelle actif' });
});

app.get('/api/signalements', (req, res) => {
    res.json(signalements);
});

app.post('/api/signalements', (req, res) => {
    const data = req.body;
    const newId = Date.now();
    
    signalements.push({
        id: newId,
        ...data,
        date: new Date().toISOString(),
        blockchain_tx: `0x${Math.random().toString(36).substring(2, 15)}`
    });
    
    res.json({ 
        success: true, 
        id: newId,
        tx_hash: `0x${Math.random().toString(36).substring(2, 15)}`
    });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`✅ Backend Sentinelle sur port ${PORT}`);
});
