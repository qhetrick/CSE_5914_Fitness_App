from elasticsearch import Elasticsearch
import logging
import sys
from populateData import populateData
import os
import json

import numpy as np

# Connect to elastic search with password
esName = os.getenv("ELASTIC_USER")
esPass = os.getenv("ELASTIC_PASSWORD")

es = Elasticsearch(
    ["https://es01:9200"],
    basic_auth=(esName, esPass),
    ca_certs="/usr/share/elasticsearch/config/certs/ca/ca.crt",
    verify_certs=True,
)

# Poplulate the data
print("Populating Data...")
populateData(es)
print("Done!")


# Run basic searches
def search(userInput, tag=None):
    if tag is None:
        tag = "name"
    words = userInput.split(" ")
    q = {"bool": {"must": []}}
    for word in words:
        q["bool"]["must"].append({"fuzzy": {tag: {"value": word, "fuzziness": "AUTO"}}})

    return es.search(index="exercises", query=q, size=1000)["hits"]["hits"]


def exactSearch(userInput, tag=None):
    if tag is None:
        tag = "name"
    return es.search(index="exercises", query={"match": {tag: userInput}}, size=1000)[
        "hits"
    ]["hits"]


# Gather data for generateWorkout
stretches = search("Stretching", tag="muscle")

quads = search("squat")
quads.extend(search("lunge"))
quads.extend(search("jump"))

hamstrings = search("deadlift")
hamstrings.extend(search("hip raise"))
hamstrings.extend(search("good morning"))
hamstrings.extend(search("step up"))

push = search("overhead press")
push.extend(search("bench press"))
push.extend(search("incline dumbell press"))
push.extend(search("pushup"))
push.extend(exactSearch("dip"))

pull = search("chinup")
pull.extend(search("pullup"))
pull.extend(search("row"))

core = search("plank")
core.extend(search("crunch"))
core.extend(search("mountain climber"))
core.extend(search("tuck"))
core.extend(search("leg raise"))


def generateWorkout(
    excludeEquipList=[], level=["Beginner", "Intermediate", "Advanced"]
):
    # Filter Data
    fStretches = []
    for hit in stretches:
        if (
            hit["_source"]["equipment"] not in excludeEquipList
            and hit["_source"]["level"] in level
        ):
            fStretches.append(hit)

    fQuads = []
    for hit in quads:
        if (
            hit["_source"]["equipment"] not in excludeEquipList
            and hit["_source"]["level"] in level
        ):
            fQuads.append(hit)

    fHamstrings = []
    for hit in hamstrings:
        if (
            hit["_source"]["equipment"] not in excludeEquipList
            and hit["_source"]["level"] in level
        ):
            fHamstrings.append(hit)

    fPush = []
    for hit in push:
        if (
            hit["_source"]["equipment"] not in excludeEquipList
            and hit["_source"]["level"] in level
        ):
            fPush.append(hit)

    fPull = []
    for hit in pull:
        if (
            hit["_source"]["equipment"] not in excludeEquipList
            and hit["_source"]["level"] in level
        ):
            fPull.append(hit)

    fCore = []
    for hit in core:
        if (
            hit["_source"]["equipment"] not in excludeEquipList
            and hit["_source"]["level"] in level
        ):
            fCore.append(hit)

    # Select From Filtered Data
    r1 = np.random.randint(0, len(fStretches) - 1)
    r2 = np.random.randint(0, len(fQuads) - 1)
    r3 = np.random.randint(0, len(fHamstrings) - 1)
    r4 = np.random.randint(0, len(fPush) - 1)
    r5 = np.random.randint(0, len(fPull) - 1)
    r6 = np.random.randint(0, len(fCore) - 1)

    return [
        fStretches[r1],
        fQuads[r2],
        fHamstrings[r3],
        fPush[r4],
        fPull[r5],
        fCore[r6],
    ]


# Example usage:
# attributes = ["Ab Wheel", "Hamstrings", "Beginner", "Intermediate"]
# categories = ["equipment", "muscle", "level", "level"]
def search_with_attributes_and_categories(attributes, categories):
    # Place each filter item in their own attribute list
    equipment_clauses = [
        {
            "fuzzy": {
                "equipment": {
                    "value": "None",
                    "fuzziness": "AUTO",
                }
            }
        }
    ]
    level_clauses = []
    muscle_clauses = []

    for attr, cat in zip(attributes, categories):
        if cat == "equipment":
            words = attr.split(" ")
            q = {"bool": {"must": []}}
            for word in words:
                q["bool"]["must"].append(
                    {"fuzzy": {cat: {"value": word, "fuzziness": "2"}}}
                )

            equipment_clauses.append(q)

        elif cat == "level":
            words = attr.split(" ")
            q = {"bool": {"must": []}}
            for word in words:
                q["bool"]["must"].append(
                    {"fuzzy": {cat: {"value": word, "fuzziness": "AUTO"}}}
                )

            level_clauses.append(q)

        elif cat == "muscle":
            words = attr.split(" ")
            q = {"bool": {"must": []}}
            for word in words:
                q["bool"]["must"].append(
                    {"fuzzy": {cat: {"value": word, "fuzziness": "2"}}}
                )

            muscle_clauses.append(q)

        else:
            print("ERROR: Invalid filter category passed to backend")

    query = {
        "query": {
            "bool": {
                "must": [  # Logically AND
                    {
                        "bool": {"should": equipment_clauses}
                    },  # Logically OR within equipment category
                    {
                        "bool": {"should": level_clauses}
                    },  # Logically OR within level category
                    {
                        "bool": {"should": muscle_clauses}
                    },  # Logically OR within muscle category
                ]
            }
        },
        "size": 1000,  # Set the size to return up to 1000 entries
    }

    # Convert the query dictionary to a JSON string and print it
    query_json = json.dumps(query, indent=4)
    print(query_json)

    # Execute the query
    results = es.search(index="exercises", body=query)

    # Process and print the search results as needed
    for hit in results["hits"]["hits"]:
        print(
            "%(id)s, %(name)s, %(equipment)s, %(level)s, %(muscle)s, %(previewSrc)s, %(videoLink)s"
            % hit["_source"]
        )

    print("Done printing")

    # Process and return the search results
    return results


# Search in terminal for now
if not es.ping():
    print("ERROR: Couldn" "t connect to Elasticsearch.")
else:
    # userInput = False
    first = True
    while True:  # userInput != 'q':
        # userInput = input('Press Enter to generate a workout (q to quit): ')#'Enter a search query (q to quit): ')
        # if userInput != 'q':
        if first:
            first = False

            attributes = ["Ab Wheel", "Hamstrings", "Beginner", "Intermediate"]
            categories = ["equipment", "muscle", "level", "level"]
            search_results = search_with_attributes_and_categories(
                attributes, categories
            )

            results = generateWorkout()  # search(userInput)
            print("ID, Name, Equipment, Level, Muscle, Preview Source, Video Link")
            for hit in results:
                print(
                    "%(id)s, %(name)s, %(equipment)s, %(level)s, %(muscle)s, %(previewSrc)s, %(videoLink)s"
                    % hit["_source"]
                )

            # # Process and print the search results as needed
            # for hit in search_results["hits"]["hits"]:
            #     print(
            #         "%(id)s, %(name)s, %(equipment)s, %(level)s, %(muscle)s, %(previewSrc)s, %(videoLink)s"
            #         % hit["_source"]
            #     )

            # print(search_results["hits"]["total"]["value"])
