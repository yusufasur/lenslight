import express from "express";
import dotenv from "dotenv";
import conn from "./db.js";
import pageRoute from "./routes/pageRoute.js";
import photoRoute from "./routes/photoRoute.js";

dotenv.config();

// DB connection
conn();

const app = express();
const port = process.env.PORT;

// esj template engine
app.set("view engine", "ejs");

// static files middleware
app.use(express.static("public"));
app.use(express.json());

// routes
app.use("/", pageRoute);
app.use("/photos", photoRoute);

app.listen(port, () => {
  console.log(`App listening on ${port}`);
});
