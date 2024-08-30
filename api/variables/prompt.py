puzzle = '''
Please plan out an amazing race itinerary for {city} with {n} stops. 
This should be like a text based adventure. Provide a small riddle for
each stop. At each stop provide a small task to find that can be googled.
Here is the input JSON containing the sights: {sights}. Each record conists of 
the latitude and longitude, the name of the attraction and its type. Use these
only to build the itinerary. 
I want the output as a list of JSONs with one record for each stop. 
Each record should include the text based riddle for the stop, a one line hint,
the name of the place as the answer, as well as a small task. The task should
be a JSON record of its own with a small question the user will have to Google
about the place and the answer of the task. For each record, also add in an image
of the sight. Ensure the image is in the markdown format with only the URL and no
alt text. Along with the {n} stops, 
make sure the list of JSONs also has a record for the starting and the ending stop.
Please output the JSON output directly without any backticks so it can be parsed:
'''