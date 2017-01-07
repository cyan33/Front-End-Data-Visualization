# -*- coding: utf-8 -*-

# Define here the models for your scraped items\

import scrapy


class DmozItem(scrapy.Item):
    title = scrapy.Field()
    link = scrapy.Field()
    desc = scrapy.Field()

