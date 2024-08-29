import os

mongo_url = 'https://ap-southeast-1.aws.data.mongodb-api.com/app/data-dlwtatk/endpoint/data/v1/action/find'

mongo_payload = {
    'collection': 'cities',
    'database': 'osm',
    'dataSource': 'cluster-e0925482',
    'limit': '50000'
}

mongo_headers = {
    'Content-Type': 'application/json',
    'Access-Control-Request-Headers': '*',
    'api-key': os.environ['MONGO_API_KEY']
}

overpass_url = "http://overpass-api.de/api/interpreter"

attractions = [
    '"tourism"="attraction"',
    '"historic"="*"',
    '"amenity"="place_of_worship"',
    '"leisure"="park"',
    '"tourism"="museum"'
]

query = """
    [out:json];
    (
      node[{attraction}]["wikidata"]["name:en"](around:{radius},{lat},{lng});
      way[{attraction}]["wikidata"]["name:en"](around:{radius},{lat},{lng});
      relation[{attraction}]["wikidata"]["name:en"](around:{radius},{lat},{lng});
    );
    out center 20;
    """
