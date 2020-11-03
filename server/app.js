require('dotenv').config();
const express = require('express');
const app = express();
const Error = require('./middlewares/errorHandler')
const { urlencoded } = require('express');
const cors = require('cors');
const port = 3000;
const routes = require('./routes/index')

// Body parser
app.use(cors());
app.use(express.json());
app.use(urlencoded({extended: true}));

// Middlewares
app.use('/', routes);
app.use(Error.handle);

app.listen(port, () => {
  console.log('App running at port', port)
})