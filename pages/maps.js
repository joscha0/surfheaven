import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";

import { getMaps } from "../services/api";
import AdvancedGrid from "../components/advancedGrid";
import MapRecordPopup from "../components/mapRecordPopup";
import Typography from "@mui/material/Typography";

function Maps({ mapsData }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedMap, setSelectedMap] = useState({});

  const handleClose = () => {
    setShowModal(false);
  };

  const openModal = (map) => {
    setSelectedMap(map);
    setShowModal(true);
  };
  return (
    <center>
      <Box sx={{ maxWidth: "xl", paddingTop: 5 }}>
        <MapRecordPopup
          handleClose={handleClose}
          show={showModal}
          record={selectedMap}
        />
        <Typography variant="h2" component="h1" sx={{ pt: 5, pb: 3 }}>
          Maps
        </Typography>
        <AdvancedGrid items={mapsData} openModal={openModal} isRecord={false} />
      </Box>
    </center>
  );
}

export default Maps;

export async function getServerSideProps(context) {
  // res.setHeader(
  //     'Cache-Control',
  //     'public, s-maxage=10, stale-while-revalidate=59'
  //   )
  const mapsData = await getMaps();

  return { props: { mapsData } };
}
