const express = require('express')
const router = express.Router()
const {
    addDemande,
    selectDemande,
    deleteDemande,
    updateDemande,
} = require('../controllers/demandeController')

router.post('/', addDemande).get('/', selectDemande)
router.route('/:id').delete( deleteDemande).put(updateDemande)

module.exports = router