from .services.web_utils import get_all_cities, get_coordinates, get_attractions
from .services.llm import chat

import uuid
from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/hello')
def hello_world():
    return '<p>Hello, World!</p>'

@app.get('/api/city/all')
def all_cities():
    return get_all_cities()

@app.get('/api/city/<city>')
def city_coords(city: str):
    coords = get_coordinates(city)
    return {'city': city, 'lat': coords[0], 'lng': coords[1]}

@app.get('/api/city/<city>/attr')
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