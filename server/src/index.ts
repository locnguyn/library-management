import express, { Express } from "express";
import dotenv from "dotenv";
import routes from "./routes/index";
import morgan from "morgan";
import bodyParser from "body-parser";
import mongoose from "mongoose";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(morgan("combined"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api", routes);


mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/library");

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
