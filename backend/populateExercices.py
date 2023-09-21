# wsl
# sysctl -w vm.max_map_count=262144
from elasticsearch import Elasticsearch # pip install elasticsearch (I had to manually move the libraries to this directory)
import logging
import csv
import os

# Ignore warnings for now
logging.captureWarnings(True)

# Connect to elastic search
esPass = 'VXQLGUfva56soBM7fH4R' # my ELASTIC_PASSWORD
es = Elasticsearch("https://localhost:9200",
                    basic_auth=('elastic', esPass),
                    ca_certs='../http_ca.crt', # file must be in this directory
                    verify_certs=False) # source of the warnings, mimics '-k' flag

if es.ping():
    print('Yay Connect')
    print(es.info())
else:
    print('Awww it could not connect!')

# Create index
es.indices.delete(index="exercises")
es.indices.create(index="exercises")

# Populate data
with open('../Resources/exercise_list.csv') as csv_file:
    csvReader = csv.reader(csv_file)
    line_count = 0
    tags = []
    for row in csvReader:
        if line_count == 0:
            tags = row
        else:
            jsonEntry = f'{{"{tags[0]}":"{row[0]}","{tags[1]}":"{row[1]}","{tags[2]}"":""{row[2]}"",""{tags[3]}"":""{row[3]}"",""{tags[4]}"":""{row[4]}"",""{tags[5]}"":""{row[5]}"",""{tags[6]}"":""{row[6]}""}}'
            jsonEntry = {
                f'{tags[0]}': f'{row[0]}',
                f'{tags[1]}': f'{row[1]}',
                f'{tags[2]}': f'{row[2]}',
                f'{tags[3]}': f'{row[3]}',
                f'{tags[4]}': f'{row[4]}',
                f'{tags[5]}': f'{row[5]}',
                f'{tags[6]}': f'{row[6]}',
            }
            es.create(index="exercises", id=row[0], document=jsonEntry)
        line_count += 1
