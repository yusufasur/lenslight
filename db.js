import mongoose from "mongoose";

const conn = async () => {
  try {
    await mongoose.connect(process.env.DB_URI, {
      dbName: "lenslight",
    });
    console.log("Connected to the DB successful");
  } catch (err) {
    console.log(err);
  }
};

export default conn;
