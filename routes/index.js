const express = require("express");
const router = express.Router();

const audio = require("../audio");
const translate = require("../translate");

var record_audio = audio.record_audio;
var recognize_audio = audio.recognize_audio;

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/start", function(req, res, next) {
  record_audio.stream().pipe(recognize_audio);
  recognize_audio.on("data", data => {
    str = data.results[0].alternatives[0].transcript;
    str = JSON.stringify(translate.process_string(str));
    // console.log(str);
    res.end(str);
  });
});

router.post("/stop", function(req, res, next) {
  record_audio.pause();
  console.log("paused");
});

router.post("/resume", function(req, res, next) {
  record_audio.resume();
  recognize_audio.on("data", data => {
    str = data.results[0].alternatives[0].transcript;
    str = JSON.stringify(translate.process_string(str));
    console.log(str);
    res.end(str);
  });
  console.log("resumed");
});

module.exports = router;
