import { getImageUrl } from "../services/helper";
import * as React from "react";

import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import PersonIcon from "@mui/icons-material/Person";
import Button from "@mui/material/Button";
import Image from "next/image";

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
  const isBonus = record.track != 0;

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
            {record.map} {isBonus ? "B" + record.track : ""}
          </BootstrapDialogTitle>
          <DialogContent dividers>
            <Box sx={{ p: 3 }}>
              <Image
                src={getImageUrl(record.map, record.track, isBonus)}
                alt={record.map}
                objectFit="cover"
                height={700}
                width={2000}
              />
            </Box>
            <Box>Test</Box>
          </DialogContent>
        </>
      )}
    </Dialog>
  );
};

export default MapRecordPopup;
