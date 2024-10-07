const mongoose = require("mongoose");

const connectdb = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://satyam9128532410:Satyam0718@cluster0.mqik0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
      {
        useUnifiedTopology: true,
      }
    );
    console.log(`db connection established.... ${conn.connection.host}`);
  } catch (error) {
    console.log(error.message);
    process.exit();
  }
};

module.exports = connectdb;
