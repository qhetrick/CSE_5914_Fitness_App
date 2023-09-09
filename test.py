from elasticsearch import Elasticsearch
import logging


es = Elasticsearch("https://localhost:9200",
                    basic_auth=('elastic', 'VXQLGUfva56soBM7fH4R'),
                    ca_certs='http_ca.crt',
                    verify_certs=False)

if es.ping():
    print('Yay Connect')
else:
    print('Awww it could not connect!')

print(es.info())
