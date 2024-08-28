import os
from dotenv import load_dotenv, find_dotenv

from ast import literal_eval
import google.generativeai as genai

from prompt import puzzle

load_dotenv(find_dotenv())

genai.configure(api_key=os.environ["GEMINI_API_KEY"])
model = genai.GenerativeModel('gemini-1.5-flash')


def chat(city, sights, n=10):
    response = model.generate_content(puzzle.format(city=city, n=n, sights=sights))
    try:
        journey = literal_eval(response.text) 
        return journey
    except Exception as e:
        return {'message': f'Gemini couldn\'t give a JSON response: {response.text}'}