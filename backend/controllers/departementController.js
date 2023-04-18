const asyncHandler = require("express-async-handler");

const Departement = require("../models/departementModel");
const Faculte = require("../models/faculteModel");

// @desc    Get goals
// @route   GET /api/goals
// @access  Private
const selectDepartement = asyncHandler(async (req, res) => {
  const departement = await Departement.find();

  res.status(200).json(departement);
});

// @desc    Set goal
// @route   POST /api/goals
// @access  Private
const addDepartement = asyncHandler(async (req, res) => {
  if (!req.body.name && !req.body.idFaculte) {
    res.status(400);
    throw new Error("Please add a name and idFaculte");
  }

  const departement = await Departement.create({
    name: req.body.name,
    idFaculte: req.body.idFaculte,
  });

  res.status(200).json(departement);
});

// @desc    Update goal
// @route   PUT /api/goals/:id
// @access  Private
const updateDepartement = asyncHandler(async (req, res) => {
  const departement = await Departement.findById(req.params.id); //il cherche par id

  if (!departement) {
    res.status(400);
    throw new Error("departement not found");
  }
  const updatedDepartement = await Departement.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(updatedDepartement);
});

// @desc    Delete faculte
// @route   DELETE /api/goals/:id
// @access  Private
const deleteDepartement = asyncHandler(async (req, res) => {
  const departement = await Departement.findById(req.params.id);

  if (!departement) {
    res.status(400);
    throw new Error("departement not found");
  }

  await Departement.findOneAndRemove(req.params.id);

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  addDepartement,
  selectDepartement,
  deleteDepartement,
  updateDepartement,
};
