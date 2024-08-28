from .utils import get_all_cities, get_coordinates, get_attractions
from .llm import chat

from flask import Flask, request
app = Flask(__name__)

@app.route('/api/python')
def hello_world():
    return '<p>Hello, World!</p>'

@app.get('/api/cities')
def all_cities():
    return get_all_cities()

@app.get('/api/coor/<city>')
def city_coords(city: str):
    coords = get_coordinates(city)
    return {'city': city, 'lat': coords[0], 'lng': coords[1]}

@app.get('/api/attr/<city>')
def city_attrs(city: str):
    coords = get_coordinates(city)
    ats = get_attractions(*coords)
    return ats

@app.post('/api/llm/chat')
def try_chat():
    city = request.json['city']
    coords = get_coordinates(city)
    sights = get_attractions(*coords)
    ans = chat(city, sights)
    return ans