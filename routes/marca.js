const { Router } = require('express')
const { 
    createMarca, 
    getMarcas, 
    getMarcaByID,
    updateMarca,
    deleteMarca
}= require('../controllers/marca')

const router = Router()

router.post('/', createMarca)
router.get('/', getMarcas)
router.get('/:id', getMarcaByID)
router.put('/:id', updateMarca)
router.delete('/:id', deleteMarca)

module.exports = router

