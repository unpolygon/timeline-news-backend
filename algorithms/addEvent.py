import requests
# import json
import pandas as pd
from collections import defaultdict
from collections import Counter

url = 'http://localhost:5000/eventCard'
path = './eventCard.json'

data = pd.read_json(path, orient='records')

def createEvent():
    return{
        'topic': '',
        'title': '',
        'publish_date': '',
        'url': '',
        'ners': []
    }

def postEvent(events):
    res_post = requests.post(
                'http://localhost:5000/eventCard/add/', 
                json=events)
    print(res_post.json())
    # for todo_item in res_post.json():
    #     print('{} {}'.format(todo_item['topic'], todo_item['ners']))
    # print(events)
    
last_topic = ''
events = ''

for row in data.itertuples():
    events = createEvent()
    events['topic'] = row.Topic
    events['title'] = row.Title
    events['publish_date'] = row.Publish_date
    events['url'] = row.URL
    events['ners'] += row.Ners.split(',')
    postEvent(events)

# postEvent(events)

