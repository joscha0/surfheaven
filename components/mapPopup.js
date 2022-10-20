import { getImageUrl, secondsToHM, secondsToMS } from "../services/helper";
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
import { Typography } from "@mui/material";

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

const MapPopup = (props) => {
  const map = props.map;
  const isMap = map.track == 0 || map.track == undefined;
  const isRecord = "time" in map;

  return (
    <Dialog
      onClose={props.handleClose}
      aria-labelledby="customized-dialog-title"
      open={props.show}
      maxWidth="lg"
    >
      {map == null ? (
        <p>Loading...</p>
      ) : (
        <>
          <BootstrapDialogTitle
            id="customized-dialog-title"
            onClose={props.handleClose}
          >
            {map.map} {isMap ? "" : "B" + map.track}
          </BootstrapDialogTitle>
          <DialogContent dividers>
            <Box sx={{ p: 3 }}>
              <Image
                src={getImageUrl(map.map, map.track, isMap)}
                alt={map.map}
                objectFit="cover"
                height={700}
                width={2000}
              />
              {isRecord ? (
                <Box sx={{ p: 3 }}>
                  {"time" in map && (
                    <Typography gutterBottom variant="h6" component="div">
                      Time: {secondsToMS(map.time)}
                    </Typography>
                  )}
                  {"rank" in map && (
                    <Typography color="text.secondary">
                      Rank: <b>{map.rank}</b> | Tier: <b>{map.tier}</b> | Date:{" "}
                      <b>{new Date(map.date).toDateString().substring(4)}</b>
                    </Typography>
                  )}
                  {"finishcount" in map && (
                    <Typography color="text.secondary">
                      Finish count: <b>{map.finishcount}</b> | Finish speed:{" "}
                      <b>{Math.round(map.finishspeed)}</b>
                    </Typography>
                  )}
                </Box>
              ) : (
                <Box sx={{ p: 3 }}>
                  {"tier" in map && (
                    <Typography color="text.secondary">
                      Tier: <b>{map.tier}</b> | {map.type == 1 && "Stages:"}{" "}
                      <b>{map.type == 1 ? map.checkpoints : "Linear"}</b>
                      {" | "}
                      Bonus: <b>{map.bonus}</b>
                    </Typography>
                  )}
                  {"author" in map && (
                    <Typography variant="body2" color="text.secondary">
                      Author: <b>{map.author}</b> | Completions:{" "}
                      <b>{map.completions}</b>
                    </Typography>
                  )}
                  {"date_added" in map && (
                    <Typography variant="body2" color="text.secondary">
                      Date added:{" "}
                      <b>
                        {new Date(map.date_added).toDateString().substring(4)}
                      </b>
                    </Typography>
                  )}
                  {"playtime" in map && (
                    <Typography variant="body2" color="text.secondary">
                      Playtime (Server): <b>{secondsToHM(map.playtime)}</b> |
                      Times Played (Server): <b>{map.times_played}</b>
                    </Typography>
                  )}
                </Box>
              )}
              <Button variant="contained" href={"map/" + map.map}>
                Open Map
              </Button>
            </Box>
          </DialogContent>
        </>
      )}
    </Dialog>
  );
};

export default MapPopup;
