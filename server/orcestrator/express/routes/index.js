const router = require('express').Router()
const tvSeriesController = require('../controllers/tvSeriesController')
const moviesController = require('../controllers/moviesController')
const mainController = require('../controllers/mainController')

router.get('/tvSeries', tvSeriesController.getAll)
router.get('/tvSeries/:id', tvSeriesController.getOne)
router.post('/tvSeries', tvSeriesController.add)
router.put('/tvSeries/:id', tvSeriesController.update)
router.delete('/tvSeries/:id', tvSeriesController.delete)

router.get('/movies', moviesController.getAll)
router.get('/movies/:id', moviesController.getOne)
router.post('/movies', moviesController.add)
router.put('/movies/:id', moviesController.update)
router.delete('/movies/:id', moviesController.delete)

router.get('/', mainController.getAll)

module.exports = router