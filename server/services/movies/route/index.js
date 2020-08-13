const router = require('express').Router()
const moviesController = require('../controllers/')

router.get('/movies', moviesController.getAll)
router.post('/movies', moviesController.add)
router.put('/movies/:id', moviesController.update)
router.delete('/movies/:id', moviesController.delete)

module.exports = router