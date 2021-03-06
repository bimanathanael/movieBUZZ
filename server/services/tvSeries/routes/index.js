const router = require('express').Router()
const tvSeriesController = require('../controllers/tvSeriesController')

router.get('/tvSeries', tvSeriesController.getAll)
router.get('/tvSeries/:id', tvSeriesController.getOne)
router.post('/tvSeries', tvSeriesController.add)
router.put('/tvSeries/:id', tvSeriesController.update)
router.delete('/tvSeries/:id', tvSeriesController.delete)

module.exports = router