const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log("MONGODB_URI:", process.env.MONGO_URI);
    // const connect = await mongoose.connect(process.env.MONGO_URI)
    const connect = await mongoose.connect(
      "mongodb+srv://mukeshchoudhary02_db_user:I0762RqsxX9Rjwwl@cluster0.rpa6cku.mongodb.net/HealthCare"
    );

    console.log("DB Connected", connect.connection.host);
  } catch (err) {
    console.error("DB connection error:", err);
    process.exit(1);
  }
};

module.exports = connectDB;
