const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const Enseignant = require('../models/enseignantModel')
const Employer = require('../models/employerModel')


const register = asyncHandler(async (req, res) => {
  
  const { name, email, password,id_departement } = req.body
  const chefDepartement = ""

  if (!name || !email || !password || !id_departement) {
    res.status(400)
    throw new Error('Please add all fields')
  }

  // Check if user exists
  const enseignantExists = await Enseignant.findOne({ email })

  if (enseignantExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // Create user
  const enseignant = await Enseignant.create({
    name,
    email,
    password: hashedPassword,
    id_departement,
    chefDepartement,
  })

  if (enseignant) {
    res.status(201).json({
      _id: enseignant.id,
      name: enseignant.name,
      email: enseignant.email,
      token: generateToken(enseignant._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  // Check for user email
  const enseignant = await Enseignant.findOne({ email })

  if (enseignant && (await bcrypt.compare(password, enseignant.password))) {//bcrypt.compare return boolean {true or false}
    res.json({
      _id: enseignant.id,
      name: enseignant.name,
      email: enseignant.email,
      token: generateToken(enseignant._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid credentials')
  }
})

const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user)
})

//------------------------Employer-----------------------------------

const registerEmployer = asyncHandler(async (req, res) => {
  
  const { name, email, password,id_faculte } = req.body

  if (!name || !email || !password || !id_faculte) {
    res.status(400)
    throw new Error('Please add all fields')
  }

  // Check if user exists
  const employerExists = await Employer.findOne({ email })

  if (employerExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // Create user
  const employer = await Employer.create({
    name,
    email,
    password: hashedPassword,
    id_faculte,
  })

  if (employer) {
    res.status(201).json({
      _id: employer.id,
      name: employer.name,
      email: employer.email,
      token: generateToken(employer._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

const loginEmployer = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  // Check for user email
  const employer = await Employer.findOne({ email })

  if (employer && (await bcrypt.compare(password, employer.password))) {//bcrypt.compare return boolean {true or false}
    res.json({
      _id: employer.id,
      name: employer.name,
      email: employer.email,
      token: generateToken(employer._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid credentials')
  }
})

const getMeEmployer = asyncHandler(async (req, res) => {
  res.status(200).json(req.user)
})
//-------------------------------------------------------------------

// Generate JWT
const generateToken = (id) => {//signature,JWT_SECRET,expiresIn
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}

module.exports = {
  register,
  login,
  getMe,
  registerEmployer,
  loginEmployer,
  getMeEmployer
}
