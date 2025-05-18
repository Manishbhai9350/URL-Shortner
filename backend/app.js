import express, { urlencoded } from "express";
import dotenv from "dotenv";
import { ConnectDB } from "./src/config/mongo.db.config.js";
import Morgan from "morgan";
import cors from "cors";
import {ShortUrlRouter} from './src/routes/short.url.route.js'
import { RedirectFromShortUrl } from "./src/services/short.url.service.js";
import {ErrorHandler} from './src/utils/ErrorHandler.js'

const app = express();

dotenv.configDotenv();
ConnectDB();

// Enable CORS for all routes
app.use(cors());
app.use(Morgan("dev"));
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(ErrorHandler)

app.use("/api/url",ShortUrlRouter);
app.get("/:short",RedirectFromShortUrl);

app.listen(3000, () => {
  console.log("https://localhost:3000");
});
