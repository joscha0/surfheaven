import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { getImageUrl } from "../services/helper";
import Image from "next/image";

export default function MapCard({ record: map, openModal }) {
  const isMap = map.track == 0 || map.track == undefined;
  return (
    <Card sx={{ width: 330 }}>
      <CardActionArea onClick={() => openModal(map)}>
        <CardMedia>
          <div style={{ position: "relative", width: "100%", height: "140px" }}>
            <Image
              src={getImageUrl(map.map, map.track, isMap)}
              alt={map.map + (isMap ? "" : "_b" + map.track)}
              layout="fill"
              objectFit="cover"
            />
          </div>
        </CardMedia>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {map.map} {isMap ? "" : "B" + map.track}
          </Typography>
          {"tier" in map && (
            <Typography variant="body2" color="text.secondary">
              Tier: <b>{map.tier}</b> | {map.type == 1 && "Stages:"}{" "}
              <b>{map.type == 1 && map.checkpoints}</b> {map.type == 1 && "| "}
              Bonus: <b>{map.bonus}</b>
            </Typography>
          )}
          {"author" in map && (
            <Typography variant="body2" color="text.secondary">
              Author: <b>{map.author}</b> | Completions:{" "}
              <b>{map.completions}</b>
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
