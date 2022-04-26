const express = require('express');
const router = express.Router();

const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');



router.get('/add', isLoggedIn, async(req, res) => {
    const proceso = await pool.query('SELECT * FROM proceso');
    const ccostos = await pool.query('SELECT * FROM ccostos');
    const lider = await pool.query('SELECT * FROM lider');
    res.render('empleados/add', { proceso, ccostos, lider });
});


router.post('/add', isLoggedIn, async(req, res) => {
    const { id, nombreEmpleado, apellidoEmpleado, centroCosto, proceso, lider } = req.body;
    const newEmpleado = {
        id,
        nombreEmpleado,
        apellidoEmpleado,
        centroCosto,
        proceso,
        lider
    };
    await pool.query('INSERT INTO empleados set ?', [newEmpleado]);
    req.flash('success', 'Registro guardado satisfactoriamente');
    res.redirect('/empleados');
});


router.get('/', isLoggedIn, async(req, res) => {
    const empleados = await pool.query('SELECT * FROM empleados');
    // WHERE id = ?', [req.user.cedula]

    res.render('empleados/list', { empleados });
});



router.get('/empleados/edit/:id', isLoggedIn, async(req, res) => {
    const { id } = req.params;
    const empleados = await pool.query('SELECT * FROM empleados WHERE ID = ?', [id]);
    res.render('empleados/edit', { empleados: empleados[0] });
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
    res.redirect('/empleados');
});

module.exports = router;