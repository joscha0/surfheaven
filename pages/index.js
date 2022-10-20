import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";

import { getServers } from "../services/api";

import MapRecordPopup from "../components/mapRecordPopup";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Button } from "@mui/material";
import ServerCard from "../components/serverCard";

function Home({ serversData }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedServer, setSelectedServer] = useState({});

  const handleClose = () => {
    setShowModal(false);
  };

  const openModal = (server) => {
    setSelectedServer(server);
    setShowModal(true);
  };
  return (
    <center>
      <Box sx={{ maxWidth: "xl", paddingTop: 5 }}>
        <MapRecordPopup
          handleClose={handleClose}
          show={showModal}
          record={selectedServer}
        />
        <Typography variant="h2" component="h1" sx={{ pt: 5, pb: 2 }}>
          surfheaven
        </Typography>
        <Typography>
          Alternative web page for surfheaven surf servers.
        </Typography>
        <Grid container justifyContent="center" spacing={1} sx={{ p: 2 }}>
          <Grid item>
            <Button
              variant="outlined"
              component="a"
              href="https://surfheaven.eu/"
              target="_blank"
              rel="noopener"
            >
              Official Website
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              component="a"
              href="https://surfheaven.eu/donate/"
              target="_blank"
              rel="noopener"
            >
              Donate
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              component="a"
              href="https://steamcommunity.com/groups/surfheaven"
              target="_blank"
              rel="noopener"
            >
              Steam Group
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              component="a"
              href="https://discord.gg/GW2X5fJ"
              target="_blank"
              rel="noopener"
            >
              Discord
            </Button>
          </Grid>
        </Grid>
        <Typography variant="h4" component="h1" sx={{ pt: 5, pb: 2 }}>
          Servers
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          {serversData.map((server) => (
            <Grid item xs key={server.ip}>
              <ServerCard server={server} openModal={openModal} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </center>
  );
}

export default Home;

export async function getServerSideProps(context) {
  // res.setHeader(
  //     'Cache-Control',
  //     'public, s-maxage=10, stale-while-revalidate=59'
  //   )
  const serversData = await getServers();
  return { props: { serversData } };
}
