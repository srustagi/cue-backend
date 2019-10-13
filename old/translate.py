import nltk, requests, json

def process_string(str):
	str = nltk.word_tokenize(str)
	str = nltk.pos_tag(str)
	str = [(word, tag) for (word, tag) in str if (tag == 'NN' or tag == 'JJ' or tag == 'VB')]
	return str

def get_image(q):
	endpoint = "https://www.googleapis.com/customsearch/v1?num=1&searchType=image&"
	api_key = "AIzaSyCGyMoHIWlbHc5qgHNt2NDzIr9KxAxMAHU"
	search_engine_id = "012908347918381086857:7phowmgmyn9"
	uri = endpoint + "key=" + api_key + "&cx=" + search_engine_id + "&q=" + q
	result = requests.get(uri).text
	return json.loads(result)["items"][0]["link"]

print(get_image("elmo"))