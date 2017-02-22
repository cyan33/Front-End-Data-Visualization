from bs4 import BeautifulSoup
import urllib
import urllib2
import glob
import json
import io

class ChinaHaze:
    def __init__(self):
        self.url = 'http://www.pm25s.com/cn/rank/'
        self.user_agent = 'Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.87 Safari/537.36'
        self.headers = {'User-Agent': self.user_agent}
        self.dataItems = []

    def getPageCode(self):
        request = urllib2.Request(self.url, headers=self.headers)
        response = urllib2.urlopen(request).read().decode('utf-8')
        return response
    def collectData(self):
        soup = BeautifulSoup(self.getPageCode(), 'lxml')
        city_list = soup.find('div', class_='pm25').find_all('div')
        for city in city_list:
            ## Loop through each city
            raw_spans = city.find_all('span')
            if len(raw_spans) == 0:
                break;
            item = {
                'ranking': str(raw_spans[0].string),
                'name': str(raw_spans[1].string),
                'aqi': str(raw_spans[2].string),
                'pm2.5': str(raw_spans[3].string),
                'quality': str(raw_spans[10].string)
            }
            print type(item['ranking'])
            self.dataItems.append(item)
        return self.dataItems
    def generateDataFile(self):
        self.collectData()
        with open("haze_data.json", "w") as f:
            json.dump(self.dataItems, f, indent=4, separators=(',', ': '))
        print("File has been generated.")

spider = ChinaHaze()
spider.generateDataFile()
input('')
