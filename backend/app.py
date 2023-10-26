# #currently need to start venv to run docker container in future
# from flask import Flask, request, render_template, jsonify
# from elasticsearch import Elasticsearch, helpers
# import csv
# import pandas as pd
# import os

# # Connect to elastic search with password
# esName = os.getenv("ELASTIC_USER")
# esPass = os.getenv("ELASTIC_PASSWORD")

# es = Elasticsearch(
#     ["https://es01:9200"],
#     basic_auth=(esName, esPass),
#     ca_certs="/usr/share/elasticsearch/config/certs/ca/ca.crt",
#     verify_certs=True,
# )

# app = Flask(__name__)

# def feed_data_to_es(csv_file, chunk_size=500):
#     for chunk in pd.read_csv(csv_file, chunksize=chunk_size):
#         records = chunk.to_dict(orient='records')

#     actions = [
#         {
#             "_op_type": "index",
#             "_index": "exercise_index",
#             "_source": record
#         }
#         for record in records
#     ]
#     try:
#         helpers.bulk(es, actions)
#     except helpers.BulkIndexError as e:
#         print(e.errors)

# feed_data_to_es("exercise_list.csv")


# @app.route('/')
# def index():
#     return "Flask with Elasticsearch!"


# @app.route('/exercises', methods=['GET'])
# def exercises():
#     body = {
#         "query": {
#             "match_all": {}
#         }
#     }
#     res = es.search(index="exercise_index", body=body, size=1000)  # Adjust size as needed.
#     results = [hit['_source'] for hit in res['hits']['hits']]
#     return jsonify(results)


# @app.route('/search', methods=['GET'])
# def search():
#     query = request.args.get('q', '')
#     field = request.args.get('field', '')

#     # Validate the field if required, to ensure it's a valid and permitted field.
#     # For example:
#     valid_fields = ["id", "name", "description", "equipment", "level", "muscle"]
#     if field not in valid_fields:
#         return jsonify({"error": "Invalid field specified"}), 400

#     # Use the field to craft the Elasticsearch query
#     if query and field:
#         body = {
#             "query": {
#                 "match": {
#                     field: query
#                 }
#             }
#         }
#     else:
#         body = {
#             "query": {
#                 "match_all": {}
#             }
#         }

#     res = es.search(index="exercise_index", body=body, size=1000)
#     results = [hit['_source'] for hit in res['hits']['hits']]
#     return jsonify(results)


# if __name__ == "__main__":
#     app.run(host='0.0.0.0', debug=True)

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
    while True:#userInput != 'q':
        if userInput == False:
            #userInput = input('Press Enter to generate a workout (q to quit): ')#'Enter a search query (q to quit): ')
            #if userInput != 'q':
            results = generateWorkout()#search(userInput)
            print("ID, Name, Equipment, Level, Muscle, Preview Source, Video Link")
            for hit in results:
                print("%(id)s, %(name)s, %(equipment)s, %(level)s, %(muscle)s, %(previewSrc)s, %(videoLink)s" % hit[
                    "_source"])
            userInput = True
