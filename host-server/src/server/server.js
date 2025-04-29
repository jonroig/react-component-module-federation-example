const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Example route (adjust based on your setup)
const apiRoutes = require('./routes/index');

// Middleware to serve static files
app.use(express.static(path.join(__dirname, '../../dist')));

// Use the router (ensure it's a valid middleware function)
app.use('/api', apiRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});