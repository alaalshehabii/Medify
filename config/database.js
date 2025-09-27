const mongoose = require('mongoose');
const { MONGODB_URI } = process.env;

mongoose.connect(MONGODB_URI);
mongoose.connection.on('connected', () => console.log('  MongoDB connected'));
mongoose.connection.on('error', (err) => console.error('Mongo error:', err));

module.exports = mongoose;
