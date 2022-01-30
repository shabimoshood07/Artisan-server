require("dotenv").config();

const express = require("express");
const app = express();

const authRouter = require("./routes/auth");
// Routes
app.use("/api/v1/auth", authRouter);

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
