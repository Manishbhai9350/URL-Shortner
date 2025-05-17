import express, { urlencoded } from "express";
import dotenv from "dotenv";
import { ConnectDB } from "./src/config/mongo.db.config.js";
import Morgan from "morgan";
import {ShortUrlRouter} from './src/routes/short.url.route.js'
import { RedirectFromShortUrl } from "./src/services/short.url.service.js";

const app = express();

dotenv.configDotenv();
ConnectDB();

app.use(Morgan("dev"));
app.use(express.json());
app.use(urlencoded({ extended: true }));

app.use("/api/url",ShortUrlRouter);
app.get("/:short",RedirectFromShortUrl);

app.listen(3000, () => {
  console.log("https://localhost:3000");
});
