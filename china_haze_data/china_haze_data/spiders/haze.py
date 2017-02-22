from scrapy.spiders import Spider
from scrapy.selector import Selector

from china_haze_data.items import ChinaHazeDataItem


class HazeSpider(Spider):
    name = "haze"
    allowed_domains = ["pm25s.com"]
    start_urls = [
        "http://www.pm25s.com/cn/rank/"
    ]

    def parse(self, response):
        items = []
        cities = response.css(".content > .pm25 > div")
        # print cities
        for city in cities:
            item = ChinaHazeDataItem()
            item["city_name"] = city.css(".cityrank").extract_first().strip()
            item["ranking"] = city.css("span:nth-child(1)").extract_first().strip()
            item["aqi"] = city.css("span:nth-child(3)").extract_first().strip()
            item["pm25"] = city.css("span:nth-child(4)").extract_first().strip()
            item["quality"] = city.css("span:last-child").extract_first().strip()
            items.append(item)

        return items
