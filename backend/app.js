import express, { urlencoded } from "express";
import dotenv from "dotenv";
import { ConnectDB } from "./src/config/mongo.db.config.js";
import UrlModel from "./src/models/url.model.js";
import Morgan from "morgan";
import {ShortUrlRouter} from './src/routes/short.url.route.js'

const app = express();

dotenv.configDotenv();
ConnectDB();

app.use(Morgan("dev"));
app.use(express.json());
app.use(urlencoded({ extended: true }));

app.use("/api/url",ShortUrlRouter);
app.get("/:short", async (req, res) => {
  try {
    const { short } = req.params;

    const Url = await UrlModel.findOne({ short });

    if (!Url) {
      return res.status(400).json({
        message: "Undefined URL",
        success: false,
      });
    }

    res.redirect(Url.full);
  } catch (error) {
    return res.status(400).json({
      message: "Undefined URL",
      success: false,
    });
  }
});

app.listen(3000, () => {
  console.log("https://localhost:3000");
});
