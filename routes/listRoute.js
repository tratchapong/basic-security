const router = require('express').Router()
const listController = require('../controllers/listController')

router.get('/', listController.getAllLists)
router.get('/:id', listController.getListById)
router.post('/', listController.createList)
router.put('/:id', listController.updateList)
router.delete('/:id', listController.deleteList)

module.exports = router
