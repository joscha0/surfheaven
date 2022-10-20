import { getImageUrl, secondsToHM } from "../services/helper";
import * as React from "react";

import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";
import Button from "@mui/material/Button";
import { Card, Grid, Link, Typography } from "@mui/material";

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2, fontWeight: "bold" }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

const ServerPopup = (props) => {
  const server = props.server;

  return (
    <Dialog
      onClose={props.handleClose}
      aria-labelledby="customized-dialog-title"
      open={props.show}
      maxWidth="lg"
    >
      {server == null || server == undefined ? (
        <p>Loading...</p>
      ) : (
        <>
          <BootstrapDialogTitle
            id="customized-dialog-title"
            onClose={props.handleClose}
          >
            {server.name}
          </BootstrapDialogTitle>
          <DialogContent dividers>
            <Box sx={{ p: 3 }}>
              <Typography variant="h5" component="h3">
                Current Map: <b>{server.map}</b>
              </Typography>
              <Box sx={{ p: 2 }}>
                <Image
                  src={getImageUrl(server.map, 0, true)}
                  alt={server.map}
                  objectFit="cover"
                  height={700}
                  width={2000}
                />
              </Box>
              {"mapinfo" in server && (
                <Typography color="text.secondary">
                  Tier: <b>{server.mapinfo.tier}</b> |{" "}
                  {server.mapinfo.type == 1 && "Stages:"}{" "}
                  <b>
                    {server.mapinfo.type == 1
                      ? server.mapinfo.checkpoints
                      : "Linear"}
                  </b>
                  {" | "}
                  Bonus: <b>{server.mapinfo.bonus}</b>
                </Typography>
              )}
              {"mapinfo" in server && (
                <Typography variant="body2" color="text.secondary">
                  Author: <b>{server.mapinfo.author}</b> | Completions:{" "}
                  <b>{server.mapinfo.completions}</b>
                </Typography>
              )}
              {"mapinfo" in server && (
                <Typography variant="body2" color="text.secondary">
                  Date added:{" "}
                  <b>
                    {new Date(server.mapinfo.date_added)
                      .toDateString()
                      .substring(4)}
                  </b>
                </Typography>
              )}
              {"mapinfo" in server && (
                <Typography variant="body2" color="text.secondary">
                  Playtime (Server):{" "}
                  <b>{secondsToHM(server.mapinfo.playtime)}</b> | Times Played
                  (Server): <b>{server.mapinfo.times_played}</b>
                </Typography>
              )}
              <Typography>
                Players: {server.playercount + " / " + server.maxplayers}
              </Typography>
              <Box sx={{ display: "flex", gap: 2, p: 2 }}>
                <Button variant="outlined" href={"map/" + server.map}>
                  Open Map
                </Button>
                <Button
                  variant="contained"
                  href={"steam://connect/" + server.ip}
                >
                  Connect
                </Button>
              </Box>
              <Typography variant="h6">Players: </Typography>
              <Grid container spacing={2}>
                {"players" in server &&
                  server.players.map((player) => (
                    <Grid item>
                      <Card sx={{ p: 1 }}>
                        <Link href={"/player/" + player.steamid}>
                          {player.name}
                        </Link>
                      </Card>
                    </Grid>
                  ))}
              </Grid>
            </Box>
          </DialogContent>
        </>
      )}
    </Dialog>
  );
};

export default ServerPopup;
