const asyncHandler = require("express-async-handler");

const Departement = require("../models/departementModel");
const Faculte = require("../models/faculteModel");
const Enseignant = require("../models/enseignantModel");


// @desc    Get goals
// @route   GET /api/goals
// @access  Private
const selectEnseignant = asyncHandler(async (req, res) => {
  const enseignant = await Enseignant.find();

  res.status(200).json(enseignant);
});

// @desc    Set goal
// @route   POST /api/goals
// @access  Private
const addEnseignant = asyncHandler(async (req, res) => {
    const { name, email ,password , chefDepartement,id_departement} = req.body
  if (!name && !email  && !password  && !chefDepartement  && !id_departement) {
    res.status(400);
    throw new Error("Please add informations");
  }

  const exist = await Enseignant.findOne({ email })
  if(exist){
    res.status(400);
    throw new Error("this user exist");
  }

  const enseignant = await Enseignant.create(req.body);

  res.status(200).json(enseignant);
});

// @desc    Update goal
// @route   PUT /api/goals/:id
// @access  Private
const updateEnseignant = asyncHandler(async (req, res) => {
  const enseignant = await Enseignant.findById(req.params.id); //il cherche par id

  if (!enseignant) {
    res.status(400);
    throw new Error("enseignant not found");
  }
  const updatedenseignant = await Enseignant.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(updatedenseignant);
});

// @desc    Delete faculte
// @route   DELETE /api/goals/:id
// @access  Private
const deleteEnseignant = asyncHandler(async (req, res) => {
  const enseignant = await Enseignant.findById(req.params.id);

  if (!enseignant) {
    res.status(400);
    throw new Error("enseignant not found");
  }

  await Enseignant.findOneAndRemove(req.params.id);

  res.status(200).json({ id: req.params.id });
});

module.exports = {
    addEnseignant,
    selectEnseignant,
    deleteEnseignant,
    updateEnseignant,
};