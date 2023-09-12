from elasticsearch import Elasticsearch # pip install elasticsearch (I had to manually move the libraries to this directory)
import logging


es = Elasticsearch("https://localhost:9200",
                    basic_auth=('elastic', 'VXQLGUfva56soBM7fH4R'), # my ELASTIC_PASSWORD
                    ca_certs='http_ca.crt', # file must be in this directory
                    verify_certs=False) # source of the warnings, mimics '-k' flag

if es.ping():
    print('Yay Connect')
else:
    print('Awww it could not connect!')

print(es.info())
