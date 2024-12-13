import express, { Express } from "express";
import dotenv from "dotenv";
import routes from "./routes/index";
// import morgan from "morgan";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";


dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8000;

// app.use(morgan("combined"));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api", routes);

mongoose.connect(
  process.env.DATABASE_URL || "mongodb://root:admin123@mongodb:27017/library?authSource=admin"
);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

export default app;
