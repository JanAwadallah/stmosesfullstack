const express = require("express");
const dotenv = require("dotenv");
const userRouter = require("./routes/userRoutes");
const liturgyRouter = require("./routes/liturgyRoutes");
const { errorHandler } = require("./middleware/errorMiddleware");
const cors = require("cors");
const connectDB = require("./config/db");
const app = express();
const path = require("path");

app.use(cors());

dotenv.config();
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/file-download/:fileName", async (req, res) => {
  try {
    await res.download(`client/public/docs/${req.params.fileName}`);
  } catch (error) {
    console.log(error);
  }
});

app.use("/api/users", userRouter);
app.use("/api/liturgy", liturgyRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
  app.get("*", (req, res) =>
    res.sendFile(__dirname, "../", "client", "build", "index.html")
  );
} else {
  app.get("/", (req, res) => {
    res.send("Backend server is running");
  });
}
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(process.env.PORT, () => {
  console.log(
    `Server listening to port ${PORT} in ${process.env.NODE_ENV} mode `
  );
});
