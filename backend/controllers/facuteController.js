const asyncHandler = require('express-async-handler')
   
const Faculte = require('../models/faculteModel')

// @desc    Get goals
// @route   GET /api/goals
// @access  Private
const selectFaculte = asyncHandler(async (req, res) => {
  const faculte = await Faculte.find()

  res.status(200).json(faculte)
})

// @desc    Set goal
// @route   POST /api/goals
// @access  Private
const addFaculte = asyncHandler(async (req, res) => {
  if (!req.body.name) {
    res.status(400)
    throw new Error('Please add a name field')
  }

  const faculte = await Faculte.create({
    name: req.body.name,
  })

  res.status(200).json(faculte)
})

// @desc    Update goal
// @route   PUT /api/goals/:id
// @access  Private
const updateFaculte = asyncHandler(async (req, res) => {
  const faculte = await Faculte.findById(req.params.id)//il cherche par id

  if (!faculte) {
    res.status(400)
    throw new Error('faculte not found')
  }
  const updatedFaculte = await Faculte.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  res.status(200).json(updatedFaculte)
})

// @desc    Delete faculte
// @route   DELETE /api/goals/:id
// @access  Private
const deleteFaculte = asyncHandler(async (req, res) => {
  const faculte = await Faculte.findById(req.params.id)

  if (!faculte) {
    res.status(400)
    throw new Error('faculte not found')
  }

  await Faculte.findOneAndRemove(req.params.id)

  res.status(200).json({ id: req.params.id })
})

module.exports = {
    addFaculte,
    selectFaculte,
    deleteFaculte,
    updateFaculte,
}