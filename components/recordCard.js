import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { secondsToMS, getImageUrl } from "../services/helper";

export default function RecordCard({ record, isBonus }) {
  return (
    <Card sx={{ width: 330 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={getImageUrl(record.map, record.track, isBonus)}
          alt={record.map + (isBonus ? "_b" + record.track : "")}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {record.map} {isBonus ? "B" + record.track : ""}
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            {secondsToMS(record.time)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Rank: <b>{record.rank}</b> | Tier: <b>{record.tier}</b> | Date:{" "}
            <b>{new Date(record.date).toDateString()}</b>
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
