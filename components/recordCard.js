import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { secondsToMS } from "../services/helper";

export default function RecordCard({ record, isBonus }) {
  return (
    <Card sx={{ width: 330 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={
            "https://raw.githubusercontent.com/Sayt123/SurfMapPics/Maps-and-bonuses/csgo/" +
            record.map +
            (isBonus ? "_b" + record.track : "") +
            ".jpg"
          }
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
            Rank: {record.rank} | Tier: {record.tier} | Date:{" "}
            {new Date(record.date).toDateString()}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
