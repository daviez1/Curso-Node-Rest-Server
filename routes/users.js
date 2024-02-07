const { Router } = require('express')

const router = Router()

const { usuariosDelete,
    usuariosGet,
    usuariosPost,
    usuariosPut 
} = require('../controller/usuarios') 

router.get('/api/usuarios', function (req, res) {
    res.send('Hola')
})
router.get('/', usuariosGet)

router.post('/', usuariosPost)

router.put('/:id', usuariosPut)

router.delete('/', usuariosDelete) 

router.patch('/', function (req, res) {
    res.json({
        msg: "GET API" 
    })
})   

router.get('/', function (req, res) {
    res.send('Hola')
  }) 

  module.exports = router