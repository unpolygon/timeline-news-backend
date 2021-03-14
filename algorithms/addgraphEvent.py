import requests
import pandas as pd
from collections import defaultdict
from collections import Counter
from datetime import datetime, date
import os
import sys

url = 'http://localhost:5000/graphEvent/add'
path = './graphFile/'

class GraphEvent:
  def __init__(self, topic, title, date, event, eventNo, sentence, clause, dateText, exactDate, paragraphNo, realDate, endDate, url, nodeId):
    self.topic = topic
    self.title = title
    self.date = convertToISO(date)
    self.event = event
    self.eventNo = eventNo
    self.sentence = sentence
    self.clause = clause
    self.dateText = dateText
    self.exactDate = exactDate
    self.paragraphNo = paragraphNo
    self.realDate = realDate
    self.endDate = convertToISO(endDate)
    self.url = url
    self.nodeId = nodeId

def convertToISO(date_pd):
    if isinstance(date_pd, (datetime, date)): 
        date_iso = date_pd.isoformat()
        if date_iso == 'NaT':
            return None
        return date_pd.isoformat()
    raise TypeError ("Type %s not serializable" % type(date_pd))

def getAllFile(path):
  for root, dirs, files in os.walk(path):
    for f in files:
      yield os.path.join(root,f)

def cleanDate(col):
  print(col, type(col),end = ' | ',sep = ' | ')
  if isinstance(col,str):
    col = col[ :len('2012-12-21')]
    col = pd.to_datetime(col, format='%Y-%m-%d', utc=True, errors='ignore')
  else:
    col = pd.to_datetime("", format='%Y-%m-%d', utc=True, errors='ignore')
  print(col,type(col),sep = ' | ')
  return col

def postObj(url,obj):
    print(obj)
    try:
        res_post = requests.post(
                    url, 
                    json=obj)
        print(res_post.json())
    except Exception as err:
        print(err)
    

for f_path in getAllFile(path):
  df = pd.read_csv(f_path, index_col = 0)

  df = df.where(pd.notnull(df), None)
  df['date'] = df['date'].map(cleanDate)
  df['endDate'] = df['endDate'].map(cleanDate)

  all_nodes = df.to_dict('records')
  
  nodeId = 0
  
  for node in all_nodes:
    data = GraphEvent(
        node['topic'], 
        node['title'], 
        node['date'], 
        node['events'], 
        node['id'], 
        node['sentence'], 
        node['clause'],
        node['dateText'],
        node['exactDate'],
        node['paragraphNo'],
        node['realDate'],
        node['endDate'],
        node['url'],
        nodeId
        )
    postObj(url,vars(data))
    nodeId += 1


    

