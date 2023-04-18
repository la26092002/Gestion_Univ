const express = require('express')
const router = express.Router()
const {
  register,
  login,
  getMe,

  registerEmployer,
  loginEmployer,
  getMeEmployer,
} = require('../controllers/authController')
const { protect } = require('../middleware/authMiddleware')

router.post('/', register)
router.post('/login', login)
router.get('/me',protect, getMe)


router.post('/EmployerRegister', registerEmployer)
router.post('/Employerlogin', loginEmployer)
router.get('/EmployerMe',protect, getMeEmployer)




module.exports = router