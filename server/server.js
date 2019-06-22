const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3030;

app.use((req, res, next) => {
  let start = Date.now();
  res.once("finish", () => {
    let end = Date.now() - start;
    console.log(req.method, req.url, res.statusCode, end);
  });
  next();
});

const router = require("./routes");

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(router);

app.listen(PORT);
