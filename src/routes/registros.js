const express = require('express');
const router = express.Router();

const pool = require('../database');

router.get('/add', (req, res) => {
    res.render('registros/add');
});

router.post('/add', async (req, res) => {
    const { title, url, description } = req.body;
    const newRegistro = {
        title,
        url,
        description
    };
    await pool.query('INSERT INTO links set ?', [newRegistro]);
    res.redirect('/registros');
});

router.get('/', async (req, res) => {
    const links = await pool.query('SELECT * FROM links', [req.body]);
    res.render('registros/list', { links });
});

router.get('/delete/:id', async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM links WHERE ID = ?', [id]);
    res.redirect('/registros');
});


module.exports = router;