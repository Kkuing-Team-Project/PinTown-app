const mongoose = require('mongoose');

async function connectToMongoDB() {
  try {
    await mongoose.connect('', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB 연결 성공');
  } catch (error) {
    console.error('MongoDB 연결 오류:', error);
  }
}

module.exports = connectToMongoDB;
