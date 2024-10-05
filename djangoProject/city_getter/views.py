from django.shortcuts import render
from django.http import HttpResponse
import pandas

# Webpage url
url = 'https://en.wikipedia.org/wiki/History_of_Python'

# Extract tables
dfs = pandas.read_html(url)

# Get first table
df = dfs[1]
df2 = df[['Version','Release date']]

def return_city(request):
    for row in df2:
        return HttpResponse(row)
