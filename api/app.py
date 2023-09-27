#currently need to start venv to run docker container in future
from flask import Flask, request, render_template, jsonify
from elasticsearch import Elasticsearch, helpers
import csv

es = Elasticsearch(["http://localhost:9200"])

app = Flask(__name__)

def csv_to_elasticsearch(csv_file, index_name):
    with open(csv_file, 'r') as file:
        reader = csv.DictReader(file)
        actions = [
            {
                "_index": index_name,
                "_source": row
            }
            for row in reader
        ]
        helpers.bulk(es, actions)

@app.route('/')
def index():
    return "Flask with Elasticsearch!"


@app.route('/search', methods=['GET'])
def search():
    keyword = request.args.get('keyword')
    response = es.search(index="your_index_name", body={
        "query": {
            "multi_match": {
                "query": keyword,
                "fields": ["field1", "field2"]  # Add fields you want to search
            }
        }
    })
    
    # Extract hits from es response
    hits = response['hits']['hits']
    return jsonify(hits)

if __name__ == "__main__":
    app.run(debug=True)