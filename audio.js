const recorder = require("node-record-lpcm16")
const speech = require("@google-cloud/speech")
const client = new speech.SpeechClient()

const encoding = "LINEAR16"
const sampleRateHertz = 16000
const languageCode = "en-US"

const request = {
  config: {
    encoding: encoding,
    sampleRateHertz: sampleRateHertz,
    languageCode: languageCode,
    //is_final: false
  }
  // interimResults: true
}

const recognizeStream = client
  .streamingRecognize(request)
  .on("error", console.error)

const recording = recorder.record({
    // sampleRateHertz: sampleRateHertz,
    // threshold: 10,
    // Other options, see https://www.npmjs.com/package/node-record-lpcm16#options
    // verbose: false,
    recordProgram: "sox", // Try also "arecord" or "sox"
    silence: "200000000000000.0",
    // endOnSilence: true
})

module.exports.recognize_audio = recognizeStream
module.exports.record_audio = recording
