import re, requests, nltk
from bs4 import BeautifulSoup as bs

class Scrape():
	def __init__(self, url):
		self.url = url
		self.source = ""
		self.text = ""

	def parse_source(self):
		self.source = re.search(r'(?<=\/)\w+', self.url).group(0)

	def get_source(self):
		return self.source

	def parse_wikipedia(self):
		if self.source.lower() == 'wikipedia':
			self.text = requests.get(self.url).text
			self.text = bs(self.text, 'html.parser')
			self.text = self.text.find_all('p')

	def show_text(self):
		return [word.get_text() for word in self.text]


s = Scrape("https://wikipedia.org/wiki/Fight_Club")
s.parse_source()
s.parse_wikipedia()
print(s.show_text())