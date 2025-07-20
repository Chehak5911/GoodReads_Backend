const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const serverless = require('serverless-http'); // 🔸 Add this

const { PORT } = require('./config/server-config');
const apiRoutes = require('./routes/index');
const { connect } = require('./config/database-config');
const logger = require('./config/logger');

const app = express();

// ✅ Allow frontend origin during dev
app.use(cors({
    origin: 'http://localhost:5173', // OR use "*" if you want to allow all
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', apiRoutes);

app.get('/home', (req, res) => {
    res.send('<h1>Home</h1>');
});

// ❌ Remove this block:
// const setupAndStartServer = function() {
//     app.listen(PORT, async function() {
//         console.log(`Server started at PORT ${PORT}`);
//         await connect();
//         console.log('Mongo db connected');
//     });
// }
// setupAndStartServer();

// ✅ Replace with this for Vercel:
connect().then(() => console.log('MongoDB connected'));

module.exports = app; // OR:
module.exports.handler = serverless(app); // ✅ Vercel entry point
