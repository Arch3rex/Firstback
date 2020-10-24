require('dotenv').config();
const morgan = require('morgan');
const express = require('express');
const cors = require('cors');
const loginRoutes = require('./src/routes/loginRoutes');
const projectRoutes = require('./src/routes/projectsRoutes');
const taskRoutes = require('./src/routes/taskRoutes');
const errorHandler = require('./src/errors/errorHandler');
const notExsist = require('./src/errors/notExsist');

const app = express();
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.use(loginRoutes);
app.use(projectRoutes);
app.use(taskRoutes);
app.use(notExsist);
app.use(errorHandler);

module.exports = app;
