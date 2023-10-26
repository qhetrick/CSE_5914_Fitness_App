from elasticsearch import Elasticsearch
import logging
import sys
import os
from populateData import populateData

import numpy as np

# Ignore security warnings for now
logging.captureWarnings(True)

# Take password as cmd line arg
# esPass = sys.argv[1]

# Poplulate the data
print('Populating Data...')
populateData()
print('Done!')

# Connect to elastic search with password
esName = os.getenv("ELASTIC_USER")
esPass = os.getenv("ELASTIC_PASSWORD")

es = Elasticsearch(
    ["https://es01:9200"],
    basic_auth=(esName, esPass),
    ca_certs="/usr/share/elasticsearch/config/certs/ca/ca.crt",
    verify_certs=True,
)
# Connect to elastic search
# es = Elasticsearch("https://localhost:9200",
#                    basic_auth=('elastic', esPass),
#                    ca_certs='../Resources/http_ca.crt',  # file must be in this directory
#                    verify_certs=False)  # source of the warnings, mimics '-k' flag


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


def generateWorkout():
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

    r1 = np.random.randint(0, len(quads) - 1)
    r2 = np.random.randint(0, len(hamstrings) - 1)
    r3 = np.random.randint(0, len(push) - 1)
    r4 = np.random.randint(0, len(pull) - 1)
    r5 = np.random.randint(0, len(core) - 1)

    return [quads[r1], hamstrings[r2], push[r3], pull[r4], core[r5]]


# Search in terminal for now
if not es.ping():
    print('ERROR: Couldn''t connect to Elasticsearch.')
else:
    userInput = False
    while userInput != 'q':
        userInput = input('Press Enter to generate a workout (q to quit): ')#'Enter a search query (q to quit): ')
        if userInput != 'q':
            results = generateWorkout()#search(userInput)
            print("ID, Name, Equipment, Level, Muscle, Preview Source, Video Link")
            for hit in results:
                print("%(id)s, %(name)s, %(equipment)s, %(level)s, %(muscle)s, %(previewSrc)s, %(videoLink)s" % hit[
                    "_source"])
