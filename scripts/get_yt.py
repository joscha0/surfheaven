import json
import os
import re
import requests

API_KEY = os.environ['YT_API']
playlistId = "UUXnkOphTnYYOCO764za2xTw"  # surfheaven yt
pageToken = ""
index = 0

while True:

    r = requests.get(
        f"https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId={playlistId}&maxResults=50&pageToken={pageToken}&key={API_KEY}")

    data = r.json()

    with open(f'yt/sh{index}.json', 'w') as f:
        json.dump(r.json(), f)

    if "nextPageToken" not in data:
        break

    pageToken = data["nextPageToken"]
    index += 1

maps = {}

for i in range(2):
    with open(f'yt/sh{i}.json', 'r') as f:
        data = json.load(f)
        videos = data['items']
        for video in videos:
            title = video['snippet']['title'].removeprefix("CS:GO Surf - ").split(
                ' ')
            if title[1] == 'WR':
                player = title[-1]
                video_id = video['snippet']['resourceId']['videoId']
                desc = video['snippet']['description']
                mapname = re.search(r"Map: \*[\S]*\*", desc)

                if mapname:
                    mapname = mapname.group().removeprefix(
                        "Map: *").removesuffix("*")
                else:
                    mapname = title[0]

                maps[mapname] = {
                    "player": player,
                    "video_id": video_id,
                }

with open('maps.json', 'w') as f:
    json.dump(maps, f)
