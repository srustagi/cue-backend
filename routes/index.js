var express = require('express')
var router = express.Router()

var audio = require('../audio')
var record_audio = audio.record_audio
var recognize_audio = audio.recognize_audio

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' })
})

router.post('/start', function(req, res, next) {
	record_audio.stream().pipe(recognize_audio)
	recognize_audio.on("data", data => {
		console.log(data.results[0])
	})
})

router.post('/stop', function(req, res, next) {
	record_audio.pause()
	console.log("this is happening")
})

router.post('/resume', function(req, res, next) {
	record_audio.resume()
})

module.exports = router;
