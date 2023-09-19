# wsl
# sysctl -w vm.max_map_count=262144
from elasticsearch import Elasticsearch # pip install elasticsearch (I had to manually move the libraries to this directory)
import logging
import csv
import os

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
os.system(f'curl -k --cacert ../Resources/http_ca.crt -u elastic:{esPass} -X PUT "https://localhost:9200/exercises')

# Populate data
with open('../Resources/exercise_list.csv') as csv_file:
    csvReader = csv.reader(csv_file)
    line_count = 0
    tags = []
    for row in csvReader:
        if line_count == 0:
            tags = row
        else:
            jsonEntry = f'{{""{tags[0]}"":""{row[0]}"",""{tags[1]}"":""{row[1]}"",""{tags[2]}"":""{row[2]}"",""{tags[3]}"":""{row[3]}"",""{tags[4]}"":""{row[4]}"",""{tags[5]}"":""{row[5]}"",""{tags[6]}"":""{row[6]}""}}'
            os.system(f'curl -k --cacert ../Resources/http_ca.crt -u elastic:{esPass} -X POST https://localhost:9200/exercises/_doc/{row[0]} -H "Content-Type: application/json" -d "{jsonEntry}"')
        line_count += 1
