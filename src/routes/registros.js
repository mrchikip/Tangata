const express = require('express');
const router = express.Router();

const pool = require('../database');

router.get('/add', (req, res) => {
    res.render('registros/add');
});

router.post('/add', async (req, res) => {
    const { title, url, description} = req.body;
    const newRegistro = {
        title,
        url,
        description
    };
    await pool.query('INSERT INTO links set ?', [newRegistro]);
    res.send('received');
});

module.exports = router;