const express = require("express");
const app = express();
const port = 3000;
const userRouter = require("./routes/user");

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  next();
});
app.use("/", express.json());
app.use("/user", userRouter);
app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});
