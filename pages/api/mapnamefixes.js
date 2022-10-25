import { mapnameFixes } from "../../services/consts";

export default function handler(req, res) {
  res.status(200).json(mapnameFixes);
}
