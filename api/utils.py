import requests
import numpy as np 
import pandas as pd 

from overpass import attractions, query, url

fpath = './public/worldcities.csv'
df_city = pd.read_csv(fpath)
radius = 5000

def get_all_cities():
    return df_city['city_ascii'].values.tolist()

def get_coordinates(city: str):
    return df_city.loc[df_city['city_ascii']==city, ['lat', 'lng']].astype(float).values[0]

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

def get_attractions(lat: float, lng: float, n: int = 10):
    out = []
    for attr in attractions:
        response = requests.get(url, params={'data': query.format(attraction=attr, radius=radius, lat=lat, lng=lng)})
        data = response.json()['elements']
        val = [detail(point) for point in data]
        out.extend(val)

    return np.random.choice(out, n)