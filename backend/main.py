from elasticsearch import Elasticsearch
import logging
import sys
import populateData

# Ignore security warnings for now
logging.captureWarnings(True)

# Take password as cmd line arg
esPass = sys.argv[1]

# Poplulate the data
print('Populating Data...')
populateData.populateData(esPass)
print('Done!')

# Connect to elastic search
es = Elasticsearch("https://localhost:9200",
                    basic_auth=('elastic', esPass),
                    ca_certs='../Resources/http_ca.crt', # file must be in this directory
                    verify_certs=False) # source of the warnings, mimics '-k' flag

# Run basic searches
if not es.ping():
    print('ERROR: Couldn''t connect to Elasticsearch.')
else:
    userInput = False
    while userInput != 'q':
        userInput = input('Enter a search query (q to quit): ')
        if userInput != 'q':
            results = es.search(index="exercises", query={"fuzzy":{"name":{"value":userInput,"fuzziness":"AUTO"}}})
            print("ID, Name, Equipment, Level, Muscle, Preview Source, Video Link")
            for hit in results['hits']['hits']:
                print("%(id)s, %(name)s, %(equipment)s, %(level)s, %(muscle)s, %(previewSrc)s, %(videoLink)s" % hit["_source"])


