# wsl
# sysctl -w vm.max_map_count=262144
from elasticsearch import Elasticsearch # pip install elasticsearch (I had to manually move the libraries to this directory)
import logging
import csv
import sys

def AnalyzeData(li):
    reps, effort = 0, 0
    id, name, equip, lvl, muscle = li[0], li[1], li[2], li[3], il[4]
    a, b, = checkID(li[0])
    reps += a
    effort += b
    a, b, = checkName(li[1])
    a, b, = checkEquip(li[2])
    a, b, = checkLvl(li[3])
    a, b, = checkMuscle(li[4])
    return reps, effort

# Ignore security warnings for now
logging.captureWarnings(True)

# Connect to elastic search
esPass =  sys.argv[1] # ELASTIC_PASSWORD 'VXQLGUfva56soBM7fH4R'
es = Elasticsearch("https://localhost:9200",
                    basic_auth=('elastic', esPass),
                    ca_certs='http_ca.crt', # file must be in this directory
                    verify_certs=False) # source of the warnings, mimics '-k' flag

if es.ping():
    print('Connected')
else:
    print('ERROR: Couldn''t connect.')

# Create index
try:
    es.indices.delete(index="exercises")
except:
    print("Error creating index for exercises!")
es.indices.create(index="exercises")

# Populate datas
with open('exercise_list.csv') as csv_file:
    csvReader = csv.reader(csv_file)
    line_count = 0
    tags = []
    for row in csvReader:
        if line_count == 0:
            tags = row
        else:
            reps, effort = AnalyzeData(row)
            jsonEntry = {
                f'{tags[0]}': f'{row[0]}',
                f'{tags[1]}': f'{row[1]}',
                f'{tags[2]}': f'{row[2]}',
                f'{tags[3]}': f'{row[3]}',
                f'{tags[4]}': f'{row[4]}',
                f'{tags[5]}': f'{row[5]}',
                f'{tags[6]}': f'{row[6]}',
                'reps': f'{reps}',
                'effort': f'{effort}'
            }
            es.create(index="exercises", id=row[0], document=jsonEntry)
        line_count += 1
