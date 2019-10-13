const recorder = require("node-record-lpcm16")
const speech = require("@google-cloud/speech")
const translate = require('./translate')

const client = new speech.SpeechClient()

const encoding = "LINEAR16"
const sampleRateHertz = 16000
const languageCode = 'en-US'

const request = {
  config: {
    encoding: encoding,
    sampleRateHertz: sampleRateHertz,
    languageCode: languageCode,
    alternativeLanguageCodes: ['es-US'],
    enableAutomaticPunctuation: true,
  }
  // interimResults: true
}

const recognizeStream = client
  .streamingRecognize(request)
  .on("error", () => {
    recording.stop()
    recording.stream().pipe(recognizeStream)
    recognizeStream.on("data", data => {
        console.log(data.results[0].alternatives[0].transcript)
    })
  })

const recording = recorder.record({
    // threshold: 10,
    recordProgram: "sox", // Try also "arecord" or "sox"
    silence: "200000000000000.0",
})

module.exports.recognize_audio = recognizeStream
module.exports.record_audio = recording
