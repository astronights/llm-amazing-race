import random
import requests
from collections import defaultdict

from ..variables.overpass import url as overpass_url, attractions, query
from ..variables.mongo import mongo_url, mongo_headers, mongo_payload


def get_all_cities():
    body = {**mongo_payload, 'projection': {'city_ascii': 1,
                                            'country': 1, 'lat': 1, 'lng': 1, '_id': 0}}
    response = requests.post(mongo_url, headers=mongo_headers, json=body)

    cities = response.json().get('documents', [])
    grouped_by_country = defaultdict(list)

    for city in cities:
        country = city.get('country')
        grouped_by_country[country].append({
            'name': city['city_ascii'], 'lat': city['lat'], 'lng': city['lng']
        })

    return dict(grouped_by_country)


def get_coordinates(city: str):
    body = {**mongo_payload,
            'filter': {'city_ascii': city},
            'projection': {'lat': 1, 'lng': 1, '_id': 0}}
    response = requests.post(mongo_url, headers=mongo_headers, json=body)
    vals = response.json()['documents'][0]
    return [vals['lat'], vals['lng']]


def detail(item: dict):
    return {
        'lat': item.get('lat', item.get('center', {}).get('lat')),
        'lnt': item.get('lon', item.get('center', {}).get('lon')),
        'id': item['id'],
        'name': item['tags']['name:en'].split(',')[0],
        'type': item['tags'].get('tourism',
                                 item['tags'].get('historic',
                                                  item['tags'].get('amenity',
                                                                   item['tags'].get('leisure'))))
    }


def get_attractions(lat: float, lng: float, n: int = 10, radius: float = 5000):
    out = []
    for attr in attractions:
        response = requests.get(overpass_url, params={'data': query.format(
            attraction=attr, radius=radius, lat=lat, lng=lng)})
        data = response.json()['elements']
        val = [detail(point) for point in data]
        out.extend(val)

    return out if len(out) < n else random.choices(out, k=n)
