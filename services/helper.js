function secondsToHM(seconds) {
  var h = Math.floor(seconds / 3600);
  var m = Math.floor((seconds % 3600) / 60);
  return (h !== 0 ? h + "h " : "") + m + "m";
}

function secondsToMS(seconds) {
  var m = Math.floor((seconds % 3600) / 60);
  var s = seconds - m * 60;
  return (m !== 0 ? m + ":" : "") + s.toFixed(5);
}

/* global BigInt */
function toSteamID64(id) {
  return (BigInt(76561197960265728) + BigInt(id)).toString();
}

export { toSteamID64, secondsToHM, secondsToMS };
