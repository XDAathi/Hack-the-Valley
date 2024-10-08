import google.generativeai as genai
import place_id
from dotenv import load_dotenv
import os
load_dotenv()


prefrence = "food" # do this for all 4 prefrences namely food, must sees, nature, entertainment
key = os.getenv('gemini_key')

genai.configure(api_key=key)
model = genai.GenerativeModel("gemini-1.5-flash")
response = model.generate_content("for this city, " + place_id.address + " only name top 10 attractions for someone who is touring for" + prefrence + "RETURN THE OUTPUT IN COMMA SEPRATED VALUES WITHOUT SPACES: PLEASE ALSO CLEANUP ANY UNESSACRY QOUTES" + str(place_id.places_result))
final_response = response.text
print(final_response)
onlyPlaces = []
for x in place_id.place_list:
    if str(x) in final_response:
        onlyPlaces.append(x)
print(onlyPlaces)