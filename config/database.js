const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error(' Missing MONGODB_URI in .env');
  process.exit(1);
}

mongoose.set('strictQuery', true);

mongoose.connection.on('connected', () =>
  console.log(' MongoDB connected')
);
mongoose.connection.on('error', (err) =>
  console.error('Mongo error:', err)
);

module.exports = async function connectDB() {
  await mongoose.connect(uri);
};