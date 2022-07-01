const mongoose = require("mongoose");
//Set up default mongoose connection

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
    });
    console.log("MongoDB connected successfuly");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
module.exports = connectDB;
