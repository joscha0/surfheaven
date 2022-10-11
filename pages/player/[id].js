import React from "react";
import Box from "@mui/material/Box";

import Player from "../../components/player";

import { getPlayer } from "../../services/api";

function IdPlayer(playerData) {
  return (
    <center>
      <Box sx={{ maxWidth: "xl" }}>
        <Player playerData={playerData} />
      </Box>
    </center>
  );
}

export default IdPlayer;

export async function getServerSideProps(context) {
  // res.setHeader(
  //     'Cache-Control',
  //     'public, s-maxage=10, stale-while-revalidate=59'
  //   )
  const { id } = context.query;
  const playerData = await getPlayer(id);

  return { props: { playerData } };
}
