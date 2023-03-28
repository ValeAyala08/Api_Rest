const { Router } = require('express')
const { 
    createEstado, 
    getEstados, 
    getEstadoByID,
    updateEstado,
    deleteEstado
} = require('../controllers/estado')

const router = Router()

router.post('/', createEstado)
router.get('/', getEstados)
router.get('/:id', getEstadoByID)
router.put('/:id', updateEstado)
router.delete('/:id', deleteEstado)

module.exports = router

