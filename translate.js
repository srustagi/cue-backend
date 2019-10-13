const natural = require('natural')
const path = require('path')
const request = require('request-promise')

var process_string = (str) => {
	var tokenizer = new natural.WordPunctTokenizer()
	var result = tokenizer.tokenize(str)
	var base_folder = path.join(path.dirname(require.resolve("natural")), "brill_pos_tagger")
	var rulesFilename = base_folder + "/data/English/tr_from_posjs.txt"
	var lexiconFilename = base_folder + "/data/English/lexicon_from_posjs.json"
	var defaultCategory = 'N'
	 
	var lexicon = new natural.Lexicon(lexiconFilename, defaultCategory)
	var rules = new natural.RuleSet(rulesFilename)
	var tagger = new natural.BrillPOSTagger(lexicon, rules)
	result = tagger.tag(result)
	var final_result = []
	for (var i = result.taggedWords.length - 1; i >= 0; i--) {
		if(result.taggedWords[i].tag == "VB" || result.taggedWords[i].tag == "NN" || result.taggedWords[i].tag == "NNS" || result.taggedWords[i].tag == "JJ" || result.taggedWords[i].tag == "VBD") {
			final_result.unshift(result.taggedWords[i])
		}
	}
	return final_result
}

var get_image = async(q) => {
	var endpoint = "https://www.googleapis.com/customsearch/v1?num=1&searchType=image&"
	var api_key = "AIzaSyCGyMoHIWlbHc5qgHNt2NDzIr9KxAxMAHU"
	var search_engine_id = "012908347918381086857:7phowmgmyn9"
	var uri = endpoint + "key=" + api_key + "&cx=" + search_engine_id + "&q=" + encodeURIComponent(q)
	result = await request(uri)
	return result
}

module.exports.process_string = process_string
module.exports.get_image = get_image

// get_image("elmo").then((result) => {console.log(JSON.parse(result).items[0].link)})
