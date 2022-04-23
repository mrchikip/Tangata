const express = require('express');
const router = express.Router();

const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');



router.get('/', isLoggedIn, async(req, res) => {
    const empleados = await pool.query('SELECT * FROM empleados');
    res.render('empleados/list');
});

router.get('/add', isLoggedIn, async(req, res) => {
    const proceso = await pool.query('SELECT * FROM proceso');
    const ccostos = await pool.query('SELECT * FROM ccostos');
    const lider = await pool.query('SELECT * FROM lider');
    res.render('empleados/add', { proceso, ccostos, lider });
});



router.post('/add', isLoggedIn, async(req, res) => {
    const { cedula, nombre, apellido, ccostos, proceso, lider } = req.body;
    const newEmpleado = {
        cedula,
        nombre,
        apellido,
        ccosto,
        proceso,
        lider
        //        id: req.user.cedula
    };
    await pool.query('INSERT INTO empleados set ?', [newEmpleado]);
    req.flash('success', 'Registro guardado satisfactoriamente');
    res.redirect('/empleados');
});


// router.get('/', isLoggedIn, async(req, res) => {
//    const empleados = await pool.query('SELECT * FROM empleados WHERE user_id = ?', [req.user.id]);
//    res.render('empleados/list', { empleados });
// });


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