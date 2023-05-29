var bodyParser = require("body-parser");

const express = require("express");
const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use((req, res) => {
  if (req.method === "POST") {
    console.log("POST REQUEST, SETTING COOKIE");
    res.cookie("test-same-site-lax", "test-lax", { sameSite: "lax", secure: true });
    res.cookie("test-same-site-none", "test-none", { sameSite: "none", secure: true });
  } else {
    console.log("COOKIES FOR NON POSt REQUEST", req.cookies);
  }
  res.json({"Key": "Hello World!"});
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});