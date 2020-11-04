require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');

const authRoutes = require('./routes/auth');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

app.use(authRoutes);

app.listen(port, () => {
    console.log(`Application running on port ${port}`);
})