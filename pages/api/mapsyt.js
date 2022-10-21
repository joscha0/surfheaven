import * as mapsYt from "../../services/mapsYt.json";

export default function handler(req, res) {
  res.status(200).json(mapsYt);
}
