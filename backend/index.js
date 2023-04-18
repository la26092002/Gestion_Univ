const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const connectDB = require('./config/db');
const port = 5000;


// LARBI
connectDB()
const app = express();
app.use(express.json());


app.use('/api/faculte', require('./routes/faculteRoutes'));
app.use('/api/departement', require('./routes/departementRoutes'));
app.use('/api/enseignantAdd', require('./routes/enseignantRoutes'));
app.use('/api/demande', require('./routes/demandeRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));



app.listen(port, () => console.log(`Server started on port ${port}`));   
