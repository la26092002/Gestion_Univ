const express = require('express')
const router = express.Router()
const {
    addEnseignant,
    selectEnseignant,
    deleteEnseignant,
    updateEnseignant,
} = require('../controllers/enseignantController')

router.post('/', addEnseignant).get('/', selectEnseignant)
router.route('/:id').delete( deleteEnseignant).put(updateEnseignant)

module.exports = router