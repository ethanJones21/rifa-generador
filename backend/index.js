// por el cross-end si el entorno no es produccion importa variables de entorno locales
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const multer = require("multer");
const path = require("path");

// INITIALIZATION
const app = express();

// SETTINGS
app.set("port", process.env.PORT || 3000);

// MIDDLEWARES
app.use(morgan("dev"));

const storage = multer.diskStorage({
  destination: path.join(__dirname, "public/uploads"),
  filename(req, file, cb) {
    // 142432432.jpg
    cb(null, new Date().getTime() + path.extname(file.originalname));
  },
});
// input['file'] image
app.use(multer({ storage }).single("image"));
// interpretar datos de formulario a traves de json
app.use(express.urlencoded({ extended: false }));
// interpretar json
app.use(express.json());

// STATIC FILES
app.use(express.static(path.join(__dirname, "public")));

// START MONGODB
const { dbConnection } = require("./database");
dbConnection();

// CORS
// app.use(CORS);
app.use(cors());

// ROUTES
app.use("/api/boletos", require("./routes/boleto.routes"));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public/index.html"));
});

// START SERVER
app.listen(app.get("port"), () => {
  console.log("Server on port: ", app.get("port"));
});
