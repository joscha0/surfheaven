import cache from "memory-cache";
import { BASE_URL } from "./consts";
import { toSteamID64 } from "./helper";

const cachedFetch = async (url, seconds) => {
  const cachedResponse = cache.get(url);
  if (cachedResponse) {
    return cachedResponse;
  } else {
    var response;
    try {
      response = await fetch(url);
    } catch (e) {
      return {};
    }
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
  var response;
  try {
    response = await fetch(url);
  } catch (e) {
    return {};
  }
  var data;
  if (response.status >= 400) {
    data = {};
  } else {
    data = await response.json();
  }
  return data;
};

const getRecordsData = async (id) => {
  const recordsData = await cachedFetch(BASE_URL + "records/" + id, 120);
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

  return { map: records_map, bonus: records_bonus };
};

const getPlayer = async (id) => {
  const playerData = await cachedFetch(BASE_URL + "playerinfo/" + id, 120);
  const playerInfo = playerData[0] ?? {};
  if (Object.keys(playerInfo).length === 0) {
    return { error: "Player not found!" };
  }

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

  const mapsData = await getMaps();
  var uncompleted_map = [];
  var uncompleted_bonus = [];
  if (Object.keys(uncompletedData).length > 0) {
    for (const uncompleted of uncompletedData) {
      const mapDataArr = mapsData.filter((map) => map.map == uncompleted.map); // TODO improve performance
      const mapData = mapDataArr[0] ?? {};
      const uncompletedData = {
        map: uncompleted.map ?? "",
        track: uncompleted.track ?? "",
        type: mapData.type ?? "",
        date_added: mapData.date_added ?? "",
        checkpoints: mapData.checkpoints ?? "",
        tier: mapData.tier ?? "",
        bonus: mapData.bonus ?? "",
        author: mapData.author ?? "",
        completions: mapData.completions ?? "",
        playtime: mapData.playtime ?? "",
        times_played: mapData.times_played ?? "",
      };
      if (uncompleted.track == 0) {
        uncompleted_map.push(uncompletedData);
      } else if (uncompleted.track > 0) {
        uncompleted_bonus.push(uncompletedData);
      }
    }
  }

  const recordsData = await getRecordsData(id);

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
    totalmaps: mapsData.length ?? "",
    country_rank: playerInfo.country_rank ?? "",
    country_ranktotal: playerInfo.country_ranktotal ?? "",
    avatar: steamData.response.players[0].avatarfull ?? "",
    loccountrycode: steamData.response.players[0].loccountrycode ?? "",
    records_map: recordsData.map,
    records_bonus: recordsData.bonus,
    uncompleted_map: uncompleted_map,
    uncompleted_bonus: uncompleted_bonus,
  };
};

const getId = async () => {
  const id = await regularFetch(BASE_URL + "id/");

  return id[0].steamid;
};

const getMap = async (name, playerId) => {
  const mapsData = await getMaps();
  if (Object.keys(mapsData).length === 0) {
    return { error: "Error loading map!" };
  }

  const mapInfoData = mapsData.filter((map) => map.map == name);
  if (mapInfoData.length === 0) {
    return { error: "Map not found!" };
  }
  const mapInfo = mapInfoData[0];

  var mapCCP = [];

  const mapCP = await cachedFetch(
    BASE_URL + "checkpoints/" + name + "/" + playerId,
    120
  );
  if (mapCP.length > 0) {
    const mapCPWR = await cachedFetch(BASE_URL + "checkpoints/" + name, 120);
    mapCCP.push({
      name: mapCP[0].name,
      steamid: mapCP[0].steamid,
      time: 0,
      stagetime: 0,
      speed: 0,
      checkpoint: 0,
      wrname: mapCPWR[0].name,
      wrsteamid: mapCPWR[0].steamid,
      wrtime: 0,
      wrstagetime: 0,
      wrspeed: 0,
    });
    for (var i = 0; i < mapCP.length; i++) {
      mapCCP.push({
        name: mapCP[i].name,
        steamid: mapCP[i].steamid,
        time: mapCP[i].time,
        stagetime: mapCP[i].stagetime,
        speed: mapCP[i].speed,
        checkpoint: i + 1,
        wrname: mapCPWR[i].name,
        wrsteamid: mapCPWR[i].steamid,
        wrtime: mapCPWR[i].time,
        wrstagetime: mapCPWR[i].stagetime,
        wrspeed: mapCPWR[i].speed,
      });
    }
  }

  const recordsData = await getRecordsData(playerId);

  const mapRecord = recordsData.map.filter((map) => map.map == name);

  // remove second to last element for staged maps
  if (mapInfo.type == 1) {
    mapCCP.splice(-2, 1);
  }

  var records = await regularFetch(
    "https://api.surf0.net/api/v1/sh/records/map/" + name
  );

  if (records.length > 0) {
    records = records.reverse();
  }

  return {
    map: mapInfo.map ?? "",
    type: mapInfo.type ?? "",
    date_added: mapInfo.date_added ?? "",
    times_played: mapInfo.times_played ?? "",
    checkpoints: mapInfo.checkpoints ?? "",
    tier: mapInfo.tier ?? "",
    bonus: mapInfo.bonus ?? "",
    author: mapInfo.author ?? "",
    completions: mapInfo.completions ?? "",
    mappers_added: mapInfo.mappers_added ?? "",
    playtime: mapInfo.playtime ?? "",
    map_pr: mapRecord[0] ?? {},
    map_ccp: mapCCP ?? [],
    records: records ?? [],
  };
};

const getMaps = async () => {
  // get all maps cached for 12h
  const mapsData = await cachedFetch(BASE_URL + "maps/", 12 * 60 * 60);
  return mapsData;
};

const getTopPlayers = async () => {
  const topPlayersData = await cachedFetch(BASE_URL + "top/100/", 60 * 60);
  return topPlayersData;
};

const getServers = async () => {
  const serversData = await cachedFetch(BASE_URL + "servers/", 60);
  return serversData;
};

const searchPlayer = async (player) => {
  return await cachedFetch(BASE_URL + "find/player/" + player, 60 * 60);
};

export {
  getPlayer,
  getId,
  getMap,
  getMaps,
  getTopPlayers,
  getServers,
  searchPlayer,
};
