import googlemaps
import pandas as pd
import os
from dotenv import load_dotenv


load_dotenv()
gmaps = googlemaps.Client(os.getenv('config_api_key'))
placeName = "CN Tower"
places_result = gmaps.places(placeName)
placeID = places_result['results'][0]['place_id']
print(placeID)

place = gmaps.place(place_id = placeID)
reviews = []
for i in range(len(place['result']['reviews'])):
    text = place['result']['reviews'][i]['text']
    rating = place['result']['reviews'][i]['rating']
    reviews.append({'rating':rating,'text':text})

df = pd.DataFrame(reviews)
print(df)
