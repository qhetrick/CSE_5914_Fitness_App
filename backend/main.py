from elasticsearch import Elasticsearch
import logging
import sys
from populateData import populateData
import os

import numpy as np

# Connect to elastic search with password
esName = os.getenv("ELASTIC_USER")
esPass = os.getenv("ELASTIC_PASSWORD")

es = Elasticsearch(
    ["https://es01:9200"],
    basic_auth=(esName, esPass),
    ca_certs="/usr/share/elasticsearch/config/certs/ca/ca.crt",
    verify_certs=True,
)

# Poplulate the data
print('Populating Data...')
populateData(es)
print('Done!')


# Run basic searches
def search(userInput, tag=None):
    if tag is None: tag = "name"
    words = userInput.split(' ')
    q = {"bool": {"must": []}}
    for word in words:
        q["bool"]["must"].append({"fuzzy": {tag: {"value": word, "fuzziness": "AUTO"}}})
    return es.search(index="exercises", query=q, size=1000)['hits']['hits']


def exactSearch(userInput, tag=None):
    if tag is None: tag = "name"
    return es.search(index="exercises", query={"match": {tag: userInput}}, size=1000)['hits']['hits']

# Gather data for generateWorkout
stretches = search('Stretching', tag='muscle')    

quads = search('squat')
quads.extend(search('lunge'))
quads.extend(search('jump'))

hamstrings = search('deadlift')
hamstrings.extend(search('hip raise'))
hamstrings.extend(search('good morning'))
hamstrings.extend(search('step up'))

push = search('overhead press')
push.extend(search('bench press'))
push.extend(search('incline dumbell press'))
push.extend(search('pushup'))
push.extend(exactSearch('dip'))

pull = search('chinup')
pull.extend(search('pullup'))
pull.extend(search('row'))

core = search('plank')
core.extend(search('crunch'))
core.extend(search('mountain climber'))
core.extend(search('tuck'))
core.extend(search('leg raise'))

def generateWorkout(excludeEquipList=[], level=['Beginner', 'Intermediate', 'Advanced']):
    # Filter Data
    fStretches = []
    for hit in stretches:
        if hit['_source']['equipment'] not in excludeEquipList and hit['_source']['level'] in level:
            fStretches.append(hit)
            
    fQuads = []
    for hit in quads:
        if hit['_source']['equipment'] not in excludeEquipList and hit['_source']['level'] in level:
            fQuads.append(hit)
            
    fHamstrings = []
    for hit in hamstrings:
        if hit['_source']['equipment'] not in excludeEquipList and hit['_source']['level'] in level:
            fHamstrings.append(hit)
            
    fPush = []
    for hit in push:
        if hit['_source']['equipment'] not in excludeEquipList and hit['_source']['level'] in level:
            fPush.append(hit)
            
    fPull = []
    for hit in pull:
        if hit['_source']['equipment'] not in excludeEquipList and hit['_source']['level'] in level:
            fPull.append(hit)
            
    fCore = []
    for hit in core:
        if hit['_source']['equipment'] not in excludeEquipList and hit['_source']['level'] in level:
            fCore.append(hit)
        

    # Select From Filtered Data
    r1 = np.random.randint(0, len(fStretches) - 1)
    r2 = np.random.randint(0, len(fQuads) - 1)
    r3 = np.random.randint(0, len(fHamstrings) - 1)
    r4 = np.random.randint(0, len(fPush) - 1)
    r5 = np.random.randint(0, len(fPull) - 1)
    r6 = np.random.randint(0, len(fCore) - 1)

    return [fStretches[r1], fQuads[r2], fHamstrings[r3], fPush[r4], fPull[r5], fCore[r6]]


# Search in terminal for now
if not es.ping():
    print('ERROR: Couldn''t connect to Elasticsearch.')
else:
    #userInput = False
    first = True
    while True: #userInput != 'q':
        #userInput = input('Press Enter to generate a workout (q to quit): ')#'Enter a search query (q to quit): ')
        #if userInput != 'q':
        if first:
            first = False
            results = generateWorkout()#search(userInput)
            print("ID, Name, Equipment, Level, Muscle, Preview Source, Video Link")
            for hit in results:
                print("%(id)s, %(name)s, %(equipment)s, %(level)s, %(muscle)s, %(previewSrc)s, %(videoLink)s" % hit[
                    "_source"])
