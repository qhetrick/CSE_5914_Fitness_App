from elasticsearch import Elasticsearch
import logging
import csv


def populateData(es):
    # Ignore security warnings for now
    logging.captureWarnings(True)

    # Test connection
    if es.ping():
        print('Connected')
    else:
        print('ERROR: Couldn''t connect.')

    # Create index
    try:
        es.indices.delete(index="exercises")
    except:
        pass
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
