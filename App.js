require("dotenv").config();

const express = require("express");
const app = express();

// middleware
// error handler
const errorHandlerMiddleware = require("./middleware/error-handler");
const notFoundMiddleware = require("./middleware/not-found");

const authRouter = require("./routes/auth");
app.use(express.json());
// Routes
app.use("/api/v1/auth", authRouter);

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
  res.send('<h1>Parcel delivery API</h1><a href="/api-docs">Documentation</a>');
});

start();
