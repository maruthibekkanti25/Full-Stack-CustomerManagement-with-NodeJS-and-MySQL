// server.js
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors'); 
const port = 3000;
const routes = require('../backend/routes/routes');

// Middleware
app.use(cors()); 
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../frontend/Home')));

// Routes
app.use(routes);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
