import { getImageUrl } from "../services/helper";
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

const MapRecordPopup = (props) => {
  const record = props.record;
  const isMap = record.track == 0 || record.track == undefined;

  return (
    <Dialog
      onClose={props.handleClose}
      aria-labelledby="customized-dialog-title"
      open={props.show}
      maxWidth="lg"
    >
      {record == null ? (
        <p>Loading...</p>
      ) : (
        <>
          <BootstrapDialogTitle
            id="customized-dialog-title"
            onClose={props.handleClose}
          >
            {record.map} {isMap ? "" : "B" + record.track}
          </BootstrapDialogTitle>
          <DialogContent dividers>
            <Box sx={{ p: 3 }}>
              <Image
                src={getImageUrl(record.map, record.track, isMap)}
                alt={record.map}
                objectFit="cover"
                height={700}
                width={2000}
              />
              <Button variant="contained" href={"map/" + record.map}>
                Open Map
              </Button>
            </Box>
          </DialogContent>
        </>
      )}
    </Dialog>
  );
};

export default MapRecordPopup;
