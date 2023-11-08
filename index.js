var express = require("express");
var cors = require("cors");
require("dotenv").config();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

var app = express();

app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.post(
  "/api/fileanalyse",
  upload.single("upfile"),
  function (req, res, next) {
    // req.file is the `avatar` file
    const file = req.file;

    const data = {
      name: file.originalname,
      type: file.mimetype,
      size: file.size,
    };
    res.locals.data = data;
    next();
    // req.body will hold the text fields, if there were any
  },
  (req,res)=>{
    res.json(res.locals.data)
  }
);

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Your app is listening on port " + port);
});
