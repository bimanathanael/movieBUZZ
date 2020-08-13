const router = require('express').Router()
const moviesController = require('../controllers/moviesController')
const tvSeriesController = require('../controllers/tvSeriesController')

router.get('/movies', moviesController.getAll)
router.post('/movies', moviesController.add)
router.put('/movies/:id', moviesController.update)
router.delete('/movies/:id', moviesController.delete)

router.get('/tvSeries', tvSeriesController.getAll)
router.post('/tvSeries', tvSeriesController.add)
router.put('/tvSeries/:id', tvSeriesController.update)
router.delete('/tvSeries/:id', tvSeriesController.delete)

module.exports = router