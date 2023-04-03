import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import mongoose from "mongoose";
import morgan from "morgan";
import clientRoutes from "./routes/client.js";
import managerRoutes from "./routes/managements.js";
import generalRoutes from "./routes/general.js";
import salesRoutes from "./routes/sales.js";

// data imports
import User from "./models/User.js";
import { dataUser } from "./datas/index.js";
/* CONFIGURATION  */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* ROUTES */

app.use("/client", clientRoutes);
app.use("/manager", managerRoutes);
app.use("/general", generalRoutes);
app.use("/sales", salesRoutes);

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
  })
  .catch((error) => console.log(`${error} did not connect`));
