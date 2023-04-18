const asyncHandler = require("express-async-handler");

const Departement = require("../models/departementModel");
const Faculte = require("../models/faculteModel");
const Enseignant = require("../models/enseignantModel");
const Demande = require("../models/demandeModel");


// @desc    Get goals
// @route   GET /api/goals
// @access  Private
const selectDemande = asyncHandler(async (req, res) => {
  const demande = await Demande.find();

  res.status(200).json(demande);
});

// @desc    Set goal
// @route   POST /api/goals
// @access  Private
const addDemande = asyncHandler(async (req, res) => {
    const { module, id_enseignant } = req.body
  if (!module && !id_enseignant) {
    res.status(400);
    throw new Error("Please add informations");
  }


  const demande = await Demande.create(
    {
        module,
        id_enseignant,
        verifier: false,
        confirmer: false
    }
  );

  res.status(200).json(demande);
});

// @desc    Update goal
// @route   PUT /api/goals/:id
// @access  Private
const updateDemande = asyncHandler(async (req, res) => {
  const demande = await Demande.findById(req.params.id); //il cherche par id

  if (!demande) {
    res.status(400);
    throw new Error("demande not found");
  }
  const updateDemande = await Demande.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(updateDemande);
});

// @desc    Delete faculte
// @route   DELETE /api/goals/:id
// @access  Private
const deleteDemande = asyncHandler(async (req, res) => {
  const demande = await Demande.findById(req.params.id);

  if (!demande) {
    res.status(400);
    throw new Error("demande not found");
  }

  await Demande.findOneAndRemove(req.params.id);

  res.status(200).json({ id: req.params.id });
});

module.exports = {
    addDemande,
    selectDemande,
    deleteDemande,
    updateDemande,
};