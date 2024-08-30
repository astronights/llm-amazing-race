url = "http://overpass-api.de/api/interpreter"

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
