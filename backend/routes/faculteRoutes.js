const express = require('express')
const router = express.Router()
const {
    addFaculte,
    selectFaculte,
    deleteFaculte,
    updateFaculte,
} = require('../controllers/facuteController')

router.post('/', addFaculte).get('/', selectFaculte)
router.route('/:id').delete( deleteFaculte).put(updateFaculte)

module.exports = router