const express = require('express');
const router = express.Router();

const pool = require('../database');

router.get('/add', (req, res) => {
    res.render('registros/add');
});

router.post('/add', async (req, res) => {
    res.send('received');
});

module.exports = router;