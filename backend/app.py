#currently need to start venv to run docker container in future
from flask import Flask, request, render_template, jsonify
from elasticsearch import Elasticsearch, helpers
import csv
import pandas as pd
import os
from flask_cors import CORS, cross_origin;

# Connect to elastic search with password
esName = os.getenv("ELASTIC_USER")
esPass = os.getenv("ELASTIC_PASSWORD")

es = Elasticsearch(
    ["https://es01:9200"],
    basic_auth=(esName, esPass),
    ca_certs="/usr/share/elasticsearch/config/certs/ca/ca.crt",
    verify_certs=True,
)

app = Flask(__name__)
CORS(app)


def feed_data_to_es(csv_file, chunk_size=500):
    for chunk in pd.read_csv(csv_file, chunksize=chunk_size):
        records = chunk.to_dict(orient='records')

    actions = [
        {
            "_op_type": "index",
            "_index": "exercise_index",
            "_source": record
        }
        for record in records
    ]
    try:
        helpers.bulk(es, actions)
    except helpers.BulkIndexError as e:
        print(e.errors)

feed_data_to_es("exercise_list.csv")


@app.route('/')
def index():
    return "Flask Elasticsearch!"


@app.route('/exercises', methods=['GET'])
def exercises():
    body = {
        "query": {
            "match_all": {}
        }
    }
    res = es.search(index="exercise_index", body=body, size=1000)  # Adjust size as needed.
    results = [hit['_source'] for hit in res['hits']['hits']]
    print(jsonify({'results': results}))

    return jsonify({'results': results})


@app.route('/search', methods=['GET'])
def search():
    query = request.args.get('q', '')
    field = request.args.get('field', '')

    # Validate the field if required, to ensure it's a valid and permitted field.
    # For example:
    valid_fields = ["id", "name", "description", "equipment", "level", "muscle"]
    if field not in valid_fields:
        return jsonify({"error": "Invalid field specified"}), 400

    # Use the field to craft the Elasticsearch query
    if query and field:
        body = {
            "query": {
                "match": {
                    field: query
                }
            }
        }
    else:
        body = {
            "query": {
                "match_all": {}
            }
        }

    res = es.search(index="exercise_index", body=body, size=1000)
    results = [hit['_source'] for hit in res['hits']['hits']]
    return jsonify(results)


if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True)