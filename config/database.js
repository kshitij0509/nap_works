const mongoose = require("mongoose");
require("dotenv").config();

const dbConnect = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URL);
    console.log(
      `.............................MongoDB Connected: ${connection.connection.host}.............................`
    );
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = dbConnect;
