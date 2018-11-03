const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

app.post("/api/data", (req, res) => {
  console.log("Received new POST request");
  console.log(req.body)
  res.status(200).json(req.body);
});

const port = process.env.PORT ? process.env.PORT : 8001;
const server = app.listen(port, () => {
  console.log("Server listening on port %s", port);
});

