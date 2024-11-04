import express from "express";
import dotenv from "dotenv";
import conn from "./db.js";
import pageRoute from "./routes/pageRoute.js";

dotenv.config();

// DB connection
conn();

const app = express();
const port = process.env.PORT;

// esj template engine
app.set("view engine", "ejs");

// static files middleware
app.use(express.static("public"));

// routes
app.use("/", pageRoute);

app.listen(port, () => {
  console.log(`App listening on ${port}`);
});
