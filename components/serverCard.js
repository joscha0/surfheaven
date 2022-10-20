import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { getImageUrl } from "../services/helper";
import Image from "next/image";

export default function ServerCard({ server, openModal }) {
  return (
    <Card sx={{ width: 330 }}>
      <CardMedia>
        <div style={{ position: "relative", width: "100%", height: "140px" }}>
          <Image
            src={getImageUrl(server.map, 0, true)}
            alt={server.map}
            layout="fill"
            objectFit="cover"
          />
        </div>
      </CardMedia>
      <CardContent>
        <Typography gutterBottom variant="body1" component="div">
          {server.name}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          {server.map}
        </Typography>
        <Typography gutterBottom variant="body1" component="div">
          Players: {server.playercount + " / " + server.maxplayers}
        </Typography>
        {"tier" in server.mapinfo && (
          <Typography variant="body2" color="text.secondary">
            Tier: <b>{server.mapinfo.tier}</b> |{" "}
            {server.mapinfo.type == 1 && "Stages:"}{" "}
            <b>
              {server.mapinfo.type == 1 ? server.mapinfo.checkpoints : "Linear"}
            </b>
            {" | "}
            Bonus: <b>{server.mapinfo.bonus}</b>
          </Typography>
        )}
      </CardContent>
      <CardActions sx={{ justifyContent: "center", gap: 2 }}>
        <Button variant="outlined" onClick={() => openModal(server)}>
          More info
        </Button>
        <Button variant="contained" href={"steam://connect/" + server.ip}>
          Connect
        </Button>
      </CardActions>
    </Card>
  );
}
