import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import mongoose from "mongoose";
import morgan from "morgan";
import session from "express-session";
import path from "path";
import { fileURLToPath } from "url";

import auth from "./routes/auth.js";
import clientRoutes from "./routes/client.js";
import managerRoutes from "./routes/managements.js";
import generalRoutes from "./routes/general.js";
import salesRoutes from "./routes/sales.js";
import checkRoutes from "./routes/checkUnique.js"
// data imports
import User from "./models/User.js";
import { dataUser, dataTour, dataProvince } from "./datas/index.js";
import Tour from "./models/Tour.js";
import passport from "passport";
import Province from "./models/Province.js";

/* CONFIGURATION  */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(
  cors({
    origin: process.env.FRONT_END,
    credentials: true,
  })
);
app.use("/assets", express.static(path.join(__dirname, "public//assets")));
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
/* FILE STORAGE */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const update = multer({ storage });

/* ROUTES */
app.use("/auth", auth);
app.use("/client", clientRoutes);
app.use("/management", managerRoutes);
app.use("/general", generalRoutes);
app.use("/sales", salesRoutes);
app.use("/check",checkRoutes)
const PORT = process.env.PORT || 9000;

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port:${PORT}`));
    /* ONLY ADD DATA ONE TIME */
    // User.insertMany(dataUser);
    // Tour.insertMany(dataTour);
    // Province.insertMany(dataProvince)
  })
  .catch((error) => console.log(`${error} did not connect`));
