import google.generativeai as genai
import place_id

prefrence = "food" # do this for all 4 prefrences namely food, must sees, nature, entertainment
key = "AIzaSyAjnkzs_l3ImBTjEmZOMJ_6K0ooYZ8QhEU"

genai.configure(api_key=key)
model = genai.GenerativeModel("gemini-1.5-flash")
response = model.generate_content("for this city, " + place_id.address + " only name top 10 attractions for someone who is touring for" + prefrence + " I REPEAT JUST THE NAME IN A LIST ORDER:" + str(place_id.place_list))
print(response.text)