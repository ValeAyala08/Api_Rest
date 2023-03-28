const { Router } = require('express')

const { 
    getInventarios,
    getInventarioByID,
    createInventario,
    updateInventario,
    deleteInventario

} = require('../controllers/inventario')

const router = Router()

router.get('/', getInventarios);
router.get('/:id', getInventarioByID);
router.post('/', createInventario);
router.put('/:id', updateInventario);
router.delete('/:id', deleteInventario);

module.exports = router