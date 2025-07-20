const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const serverless = require('serverless-http'); // required for Vercel

const { connect } = require('./config/database-config');
const apiRoutes = require('./routes/index');

const app = express();

// ✅ CORS middleware
app.use(cors({
  origin: 'http://localhost:5173', // Or use "*" if you want to allow all for now
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

// ✅ Required for preflight OPTIONS
app.options('*', cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', apiRoutes); // update your frontend calls accordingly

app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// ✅ Connect to DB
connect().then(() => console.log('MongoDB connected'));

// ✅ This is required for Vercel
module.exports = app;
module.exports.handler = serverless(app);
