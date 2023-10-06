from elasticsearch import Elasticsearch
import logging
import csv


def populateData(esPass):
    # Ignore security warnings for now
    logging.captureWarnings(True)

    # Connect to elastic search
    es = Elasticsearch("https://localhost:9200",
                        basic_auth=('elastic', esPass),
                        ca_certs='../Resources/http_ca.crt', # file must be in this directory
                        verify_certs=False) # source of the warnings, mimics '-k' flag

    if es.ping():
        print('Connected')
    else:
        print('ERROR: Couldn''t connect.')

    # Create index
    try:
        es.indices.delete(index="exercises")
    finally:
        es.indices.create(index="exercises")

    # Populate data
    with open('exercise_list.csv') as csv_file:
        csvReader = csv.reader(csv_file)
        line_count = 0
        tags = []
        for row in csvReader:
            if line_count == 0:
                tags = row
            else:
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
