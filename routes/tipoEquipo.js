const { Router } = require('express')
const { 
    createTipoEquipo, 
    getTiposEquipo, 
    getTipoEquipoByID,
    updateTipoEquipo,
    deleteTipoEquipo
} = require('../controllers/tipoEquipo')

const router = Router()

router.post('/', createTipoEquipo)
router.get('/', getTiposEquipo)
router.get('/:id', getTipoEquipoByID)
router.put('/:id', updateTipoEquipo)
router.delete('/:id', deleteTipoEquipo)

module.exports = router

