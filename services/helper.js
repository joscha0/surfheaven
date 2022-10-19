import { mapnameFixes } from "./consts";

function secondsToHM(seconds) {
  var h = Math.floor(seconds / 3600);
  var m = Math.floor((seconds % 3600) / 60);
  return (h !== 0 ? h + "h " : "") + m + "m";
}

function secondsToDHM(seconds) {
  var d = Math.floor(seconds / (3600 * 24));
  var h = Math.floor((seconds % (3600 * 24)) / 3600);
  var m = Math.floor((seconds % 3600) / 60);
  return (d !== 0 ? d + "d " : "") + (h !== 0 ? h + "h " : "") + m + "m";
}

function secondsToMS(seconds) {
  var m = Math.floor((seconds % 3600) / 60);
  var s = seconds - m * 60;
  return (
    (m !== 0 ? (m + "").padStart(2, "0") + ":" : "") +
    (s.toFixed(5) + "").padStart(8, "0")
  );
}

/* global BigInt */
function toSteamID64(id) {
  return (BigInt(76561197960265728) + BigInt(id)).toString();
}

function getImageUrl(mapname, track, isMap) {
  var name = mapname + (isMap ? "" : "_b" + track);
  if (name in mapnameFixes) {
    name = mapnameFixes[name];
  }
  return (
    "https://raw.githubusercontent.com/Sayt123/SurfMapPics/Maps-and-bonuses/csgo/" +
    name +
    ".jpg"
  );
}

export { toSteamID64, secondsToHM, secondsToMS, getImageUrl, secondsToDHM };
