from .utils import get_all_cities, get_coordinates, get_attractions
from .llm import chat

import uuid
from flask import Flask, request
from flask_socketio import SocketIO, join_room, leave_room, send, emit

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")

rooms = {}

@socketio.on('createRoom')
def handle_create_room(room_name: str):

    room_id = uuid.uuid4()
    rooms[room_id] = {'name': room_name, 'members': [request.sid]}
    
    join_room(room_id)
    print(room_name, room_id, request.sid)
    emit('roomCreated', {'room_name': room_name, 'room_id': str(room_id), 'creator_id': request.sid})

@socketio.on('joinRoom')
def handle_join_room(room_name):
    if room_name in rooms and len(rooms[room_name]) < 10:
        rooms[room_name].append(request.sid)
        join_room(room_name)
        emit('playerJoined', rooms[room_name], room=room_name)
    else:
        emit('roomFull', room=request.sid)

@app.route('/api/python')
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