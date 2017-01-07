# This package will contain the spiders of your Scrapy project
#
import scrapy

class DmozItem(scrapy.Item):
    title = scrapy.Field()
    link = scrapy.Field()
    desc = scrapy.Field()

class DmozSpider(scrapy.Spider):
    name = "dmoz"
    allowed_domains = ["dmoz.org"]
    start_urls = [
        "http://www.dmoz.org/Computers/Programming/Languages/Python/Books/"
    ]

    def parse(self, response):
        for sel in response.xpath('/div[class="site-item"]/div[class="title-and-desc"]'):
            item = DmozItem()
            item["title"] = sel.xpath('a/text()').extract()
            item["link"] = sel.xpath('a/@href').extract()
            item["desc"] = sel.xpath('div[class="site-desc"]/text()').extract()
            yield item