require("dotenv").config();
require("express-async-errors");

const cors = require("cors");

const express = require("express");
const bodyParser = require("body-parser");
const app = express();

// middleware
// error handler
const errorHandlerMiddleware = require("./middleware/error-handler");
const notFoundMiddleware = require("./middleware/not-found");

const authRouter = require("./routes/auth");
const artisanRouter = require("./routes/artisan");

app.use(bodyParser.urlencoded({ extended: false }));

app.use("/uploads", express.static("uploads"));

app.use(express.json());
app.use(cors());

// Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/artisan", artisanRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

// connet db
const port = process.env.PORT || 5000;
const connectDB = require("./db/connect");
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

app.get("/", (req, res) => {
  res.send('<h1>Artisan API</h1><a href="/api-docs">Documentation</a>');
});

start();
