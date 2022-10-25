import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { secondsToMS, getImageUrl } from "../services/helper";
import Image from "next/image";

export default function RecordCard({ record, openModal }) {
  const isMap = record.track == 0 || record.track == undefined;
  return (
    <Card sx={{ width: 330 }}>
      <CardActionArea onClick={() => openModal(record)}>
        <CardMedia>
          <div style={{ position: "relative", width: "100%", height: "140px" }}>
            <Image
              src={getImageUrl(record.map, record.track, isMap)}
              alt={record.map + (isMap ? "" : "_b" + record.track)}
              layout="fill"
              objectFit="cover"
            />
          </div>
        </CardMedia>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {record.map} {isMap ? "" : "B" + record.track}
          </Typography>
          {"time" in record && (
            <Typography gutterBottom variant="h6" component="div">
              {secondsToMS(record.time)}
            </Typography>
          )}
          {"rank" in record && (
            <Typography variant="body2" color="text.secondary">
              Rank: <b>{record.rank}</b> | Tier: <b>{record.tier}</b> | Date:{" "}
              <b>{new Date(record.date).toDateString().substring(4)}</b>
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
