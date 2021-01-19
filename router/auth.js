const { Router } = require('express');
const { check } = require('express-validator');

const router = Router();

// Controladores
const { crearUsuario, login, renewToken } = require('../controllers/auth');

// Middlewares
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

// path: api/login

// Crear nuevos usuarios
router.post('/new', [
    check('nombre', 'El nombre es obligarotio').not().isEmpty(),
    check('password', 'El password es obligarotio').not().isEmpty(),
    check('email', 'El email es obligarotio').isEmail(),
    validarCampos
], crearUsuario);

// Login
router.post('/', [
    check('email', 'El email es obligarotio').isEmail(),
    check('password', 'El password es obligarotio').not().isEmpty(),
    validarCampos
] ,login);

// Revalidar token
router.get('/renew',validarJWT, renewToken)





module.exports = router;