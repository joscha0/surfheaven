import json
import os
import requests
import difflib
import re

API_KEY = os.environ['YT_API']

mapslist = []
with open('yt/maps.json') as f:
    data = json.load(f)
    for mapData in data:
        mapslist.append(mapData["map"])


def get_yt_data(playlistId: str, name: str):
    pageToken = ""
    index = 0

    while True:

        r = requests.get(
            f"https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId={playlistId}&maxResults=50&pageToken={pageToken}&key={API_KEY}")

        data = r.json()

        with open(f'yt/{name}-{index}.json', 'w') as f:
            json.dump(r.json(), f)

        if "nextPageToken" not in data:
            break

        pageToken = data["nextPageToken"]
        index += 1
    return index + 1


sh_id = "UUXnkOphTnYYOCO764za2xTw"  # surfheaven yt
ksf_id = "UUud3lmIRcld41IocSMIT71w"  # ksfrecords yt


maps = {}

sh_len = get_yt_data(sh_id, "sh")
for i in range(sh_len):
    with open(f'yt/sh-{i}.json', 'r') as f:
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
                date = re.search(r"Date: [\S]*\n", desc)

                if mapname:
                    mapname = mapname.group().removeprefix(
                        "Map: *").removesuffix("*")
                else:
                    mapname = title[0]

                if date:
                    date = date.group().removeprefix("Date: ").removesuffix("\n")
                else:
                    date = ""

                maps[mapname] = {
                    "sh": {
                        "name": title[0],
                        "player": player,
                        "video_id": video_id,
                        "date": date
                    },
                    "ksf": {}
                }

ksf_len = get_yt_data(ksf_id, "ksf")
for i in range(ksf_len):
    with open(f'yt/ksf-{i}.json', 'r') as f:
        data = json.load(f)
        videos = data['items']
        for video in videos:
            title = video['snippet']['title'].split(' ')
            if len(title) == 5 and title[1] == 'WR.':
                mapname = title[0]
                player = title[-1].removesuffix(".")
                video_id = video['snippet']['resourceId']['videoId']
                desc = video['snippet']['description']
                if 'Server: [KSF' in desc:
                    last = desc.find('Server: [KSF')
                else:
                    last = desc.rfind('surf.ksfclan.com')
                text = desc[desc.find('[Surf Timer]'):last]
                date = re.search(r"Date of run: .*\n", desc)
                if date:
                    date = date.group().removeprefix("Date of run: ").removesuffix("\n")
                else:
                    date = ""

                mapkey = difflib.get_close_matches(mapname, mapslist, n=1)[0]

                if not mapkey in maps:
                    maps[mapkey] = {
                        "ksf": {}
                    }
                if maps[mapkey]["ksf"] == {} or ("name" in maps[mapkey]["ksf"] and (maps[mapkey]["ksf"]["name"] not in mapslist) and mapkey in mapslist):
                    maps[mapkey]["ksf"] = {
                        "name": mapname,
                        "player": player,
                        "video_id": video_id,
                        "date": date,
                        "info": text
                    }

with open('mapsYt.json', 'w') as f:
    json.dump(maps, f)
