import cache from "memory-cache";
import { BASE_URL } from "./consts";
import { toSteamID64 } from "./helper";

const cachedFetch = async (url, seconds) => {
  const cachedResponse = cache.get(url);
  if (cachedResponse) {
    return cachedResponse;
  } else {
    const response = await fetch(url);
    var data;
    if (response.status >= 400) {
      data = {};
    } else {
      data = await response.json();
    }
    cache.put(url, data, seconds * 1000);
    return data;
  }
};

const regularFetch = async (url) => {
  const response = await fetch(url);
  var data;
  if (response.status >= 400) {
    data = {};
  } else {
    data = await response.json();
  }
  return data;
};

const getPlayer = async (id) => {
  const playerData = await cachedFetch(BASE_URL + "playerinfo/" + id, 120);
  const playerInfo = playerData[0] ?? {};
  if (Object.keys(playerInfo).length === 0) {
    return { error: "Player not found!" };
  }

  const recordsData = await cachedFetch(BASE_URL + "records/" + id, 120);
  const uncompletedData = await cachedFetch(
    BASE_URL + "uncompleted/" + id,
    120
  );
  const steamid = toSteamID64(id);
  const steamData = await regularFetch(
    "https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=" +
      process.env.STEAM_API_KEY +
      "&steamids=" +
      steamid
  );

  var records_map = [];
  var records_bonus = [];
  if (Object.keys(recordsData).length > 0) {
    for (const record of recordsData) {
      const recordData = {
        map: record.map ?? "",
        time: record.time ?? "",
        rank: record.rank ?? "",
        track: record.track ?? "",
        tier: record.tier ?? "",
        date: record.date ?? "",
        finishcount: record.finishcount ?? "",
        finishspeed: record.finishspeed ?? "",
      };
      if (record.track == 0) {
        records_map.push(recordData);
      } else if (record.track > 0) {
        records_bonus.push(recordData);
      }
    }
  }

  var uncompleted_map = [];
  var uncompleted_bonus = [];
  if (Object.keys(uncompletedData).length > 0) {
    for (const uncompleted of uncompletedData) {
      const uncompletedData = {
        map: uncompleted.map ?? "",
        track: uncompleted.track ?? "",
      };
      if (uncompleted.track == 0) {
        uncompleted_map.push(uncompletedData);
      } else if (uncompleted.track > 0) {
        uncompleted_bonus.push(uncompletedData);
      }
    }
  }

  return {
    name: playerInfo.name ?? "",
    steamid: steamid,
    rank: playerInfo.rank ?? "",
    rankname: playerInfo.rankname ?? "",
    points: playerInfo.points ?? "",
    vip: playerInfo.vip ?? "",
    country_code: playerInfo.country_code ?? "",
    firstseen: playerInfo.firstseen ?? "",
    lastplay: playerInfo.lastplay ?? "",
    playtime: playerInfo.playtime ?? "",
    mapscompleted: playerInfo.mapscompleted ?? "",
    country_rank: playerInfo.country_rank ?? "",
    country_ranktotal: playerInfo.country_ranktotal ?? "",
    avatar: steamData.response.players[0].avatarfull ?? "",
    loccountrycode: steamData.response.players[0].loccountrycode ?? "",
    records_map: records_map,
    records_bonus: records_bonus,
    uncompleted_map: uncompleted_map,
    uncompleted_bonus: uncompleted_bonus,
  };
};

const getId = async () => {
  const id = await regularFetch(BASE_URL + "id/");

  return id[0].steamid;
};

export { getPlayer, getId };
