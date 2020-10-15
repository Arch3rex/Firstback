require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const loginRoutes = require('./Routes/loginRoutes');
const projectRoutes = require('./Routes/projectsRoutes');
const taskRoutes = require('./Routes/taskRoutes');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@clusterfree.neutu.mongodb.net/ProjectDB?retryWrites=true&w=majority`, {
  useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false,
}).then(() => console.log('Database Connected')).catch((err) => console.log(err));

app.use(loginRoutes);
app.use(projectRoutes);
app.use(taskRoutes);
app.listen(4000);
