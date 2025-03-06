const fs = require("fs");
const path = require("path");
const morgan = require("morgan");

// Creating a logs directory
const logDirectory = path.join(__dirname, "../logs");
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}

// write operation in file
const accessLogStream = fs.createWriteStream(
  path.join(logDirectory, "access.log"),
  { flags: "a" }
);

const logger = morgan("combined", { stream: accessLogStream });

module.exports = logger;
