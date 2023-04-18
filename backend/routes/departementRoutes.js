const express = require('express')
const router = express.Router()
const {
    addDepartement,
    selectDepartement,
    deleteDepartement,
    updateDepartement,
} = require('../controllers/departementController')

router.post('/', addDepartement).get('/', selectDepartement)
router.route('/:id').delete( deleteDepartement).put(updateDepartement)

module.exports = router