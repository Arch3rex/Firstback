require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const loginRoutes = require('./src/routes/loginRoutes');
const projectRoutes = require('./src/routes/projectsRoutes');
const taskRoutes = require('./src/routes/taskRoutes');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));

// TODO: pay attention on this, its need to REST
app.use(bodyParser.json());

app.use(loginRoutes);
app.use(projectRoutes);
app.use(taskRoutes);

module.exports = app;
