require("dotenv").config();
const express = require("express");
const app = express();
const dbConnect = require("./config/database");
const routes = require("./routes/index.js");
const morgan = require("morgan");
const hemlet = require("helmet");
const errorHandler = require("./middleware/errorHandler.js");
const limiter = require("./middleware/rateLimiter.js");
const logger = require("./middleware/log.js");
dbConnect();

app.use(morgan("tiny"));
app.use(express.json());
app.use(hemlet());
app.use(limiter);
app.use(logger);

const PORT = process.env.PORT;
app.get("/", (req, res) => {
  res.send("hello nap");
});

app.use(routes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`..................RUNNING ON ${PORT}.......................`);
});
