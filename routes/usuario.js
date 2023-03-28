const { Router } = require('express')
const { 
    createUser, 
    getUsers, 
    getUserByID,
    updateUser,
    deleteUser
} = require('../controllers/usuario')

const router = Router()

router.post('/', createUser)
router.get('/', getUsers)
router.get('/:id', getUserByID)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)

module.exports = router

