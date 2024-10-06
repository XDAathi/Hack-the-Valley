import time
import googlemaps
from geopy.geocoders import Nominatim
from secrets import config_api_key as api_key
import os
from dotenv import load_dotenv

load_dotenv()
place_id_list = []
address='Toronto' # placeholder
geolocator = Nominatim(user_agent="Your_Name") # ignore the user_agent. i found it online didnt feel like making an account. it just works lol
location = geolocator.geocode(address) # name to address
coordinates = str(location.latitude) +", " + str(location.longitude) # address to global coordinates


gmaps = googlemaps.Client(os.getenv('config_api_key'))

places_result = gmaps.places_nearby(location=coordinates, language='en', radius=40000, type="tourist") # type=tourist returns best quality of results
for x in range(3): # max limit of 60 results
    for place in places_result['results']:
        place_id = place["place_id"]
        place_id_list.append(place_id)
    time.sleep(1) # need a slight pause so google can load in the next page of results
    if x != 2:
        places_result = gmaps.places_nearby(page_token=places_result['next_page_token'])
