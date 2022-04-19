const express = require('express');
const router = express.Router();

const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

router.get('/add', (req, res) => {
    res.render('registros/add');
});

router.post('/add', isLoggedIn, async(req, res) => {
    const { title, url, description } = req.body;
    const newRegistro = {
        title,
        url,
        description,
        user_id: req.user.id
    };
    await pool.query('INSERT INTO links set ?', [newRegistro]);
    req.flash('success', 'Registro guardado satisfactoriamente');
    res.redirect('/registros');
});

router.get('/', isLoggedIn, async(req, res) => {
    const links = await pool.query('SELECT * FROM links WHERE user_id = ?', [req.user.id]);
    res.render('registros/list', { links });
});

router.get('/delete/:id', isLoggedIn, async(req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM links WHERE ID = ?', [id]);
    req.flash('success', 'Registro eliminado satisfactoriamente');
    res.redirect('/registros');
});

router.get('/edit/:id', isLoggedIn, async(req, res) => {
    const { id } = req.params;
    const links = await pool.query('SELECT * FROM links WHERE ID = ?', [id]);
    res.render('registros/edit', { link: links[0] });
});

router.post('/edit/:id', isLoggedIn, async(req, res) => {
    const { id } = req.params;
    const { title, url, description } = req.body;
    const newRegistro = {
        title,
        url,
        description
    };
    await pool.query('UPDATE links set ? WHERE ID = ?', [newRegistro, id]);
    req.flash('success', 'Registro actualizado satisfactoriamente');
    res.redirect('/registros');
});




// registro de empleados


router.get('/empleados', isLoggedIn, async(req, res) => {
    const empleados = await pool.query('SELECT * FROM empleados WHERE lider = ?', [req.user.id]);
    res.render('registros/empleados/list', { empleados });
});

router.get('/empleados/add', isLoggedIn, async(req, res) => {
    const ccostos = await pool.query('SELECT * FROM ccostos');
    res.render('registros/empleados/add', { ccostos: ccostos });
});

router.post('/empleados/add', isLoggedIn, async(req, res) => {
    const { title, url, description } = req.body;
    const newRegistro = {
        title,
        url,
        description,
        user_id: req.user.id
    };
    await pool.query('INSERT INTO empleados set ?', [newRegistro]);
    req.flash('success', 'Registro guardado satisfactoriamente');
    res.redirect('/registros/empleados');
});

router.get('/empleados/edit/:id', isLoggedIn, async(req, res) => {
    const { id } = req.params;
    const empleados = await pool.query('SELECT * FROM empleados WHERE ID = ?', [id]);
    res.render('registros/empleados/edit', { empleados: empleados[0] });
});

router.post('/empleados/edit/:id', isLoggedIn, async(req, res) => {
    const { id } = req.params;
    const { title, url, description } = req.body;
    const newRegistro = {
        title,
        url,
        description
    };
    await pool.query('UPDATE empleados set ? WHERE ID = ?', [newRegistro, id]);
    req.flash('success', 'Registro actualizado satisfactoriamente');
    res.redirect('/registros/empleados');
});

module.exports = router;