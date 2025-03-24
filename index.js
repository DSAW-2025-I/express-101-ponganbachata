const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Define team configuration - always two members
const TEAM_SIZE = 2;

// Student information
const students = {};

// Student 1 information
students["1"] = {
  "name": "Alejandro",
  "lastName": "Parra",
  "email": "alejandropaga@unisabana.edu.co",
  "id": "0000322607"
};

// Student 2 information
students["2"] = {
  "name": "Krish",
  "lastName": "Purmessur", 
  "email": "krishpumo@unisabana.edu.co",
  "id": "0000322216"
};

// Dynamic endpoint with parameter validation
app.get('/user-info/:id', (req, res) => {
  const studentId = req.params.id;
  
  // Input validation
  if (!studentId || (studentId !== '1' && studentId !== '2')) {
    return res.status(400).json({ error: 'Invalid student ID. Must be 1 or 2.' });
  }
  
  // Check if student exists based on team composition
  if (!students[studentId]) {
    return res.status(404).json({ error: 'Student not found. This team may have only one member.' });
  }
  
  // Return student information
  return res.json(students[studentId]);
});

// Root endpoint
app.get('/', (req, res) => {
  res.send(`Welcome to the Student Info API. This team has ${TEAM_SIZE} member(s).`);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});