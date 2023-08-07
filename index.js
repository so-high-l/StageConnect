import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import categoryRoutes from "./routes/category.js";
import demandeRoutes from "./routes/demande.js";
import offerRoutes from "./routes/offer.js";
import evaluationRoutes from "./routes/evaluation.js";
import { register } from "./controllers/auth.js";

//  CONFIGURATIONS
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
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

// FILE STORAGE
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

//ROUTES WITH FILES
app.post("/auth/register", upload.single("picture"), register);

// ROUTES
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/category", categoryRoutes);
app.use("/demande", demandeRoutes);
app.use("/offer", offerRoutes);
app.use("/evaluation", evaluationRoutes);

// MONGODB SETUP
const PORT = process.env.PORT || 6001;
const dbName = process.env.DB_NAME;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName,
  })
  .then(() => {
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    );
  })
  .catch((error) => console.log(`Not connected, error: ${error}`));
