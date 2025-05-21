import express, { urlencoded } from "express";
import dotenv from "dotenv";
import { ConnectDB } from "./src/config/mongo.db.config.js";
import Morgan from "morgan";
import cors from "cors";
import {ShortUrlRouter} from './src/routes/short.url.route.js'
import { RedirectFromShortUrl } from "./src/services/short.url.service.js";
import {ErrorHandler} from './src/utils/ErrorHandler.js'
import cookieParser from 'cookie-parser';
import {AuthRoutes} from './src/routes/auth.routes.js'

const app = express();

dotenv.configDotenv();
ConnectDB();

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));
app.use(cookieParser())
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(ErrorHandler)
if(process.env.ENV == 'development') {
  app.use(Morgan("dev"));
}

app.use('/auth',AuthRoutes)
app.use("/api/url",ShortUrlRouter);
app.get("/:short",RedirectFromShortUrl);

app.listen(3000, () => {
  console.log("https://localhost:3000");
});
