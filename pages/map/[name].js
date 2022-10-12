import React from "react";
import Box from "@mui/material/Box";

import Map from "../../components/map";

import { getMap } from "../../services/api";
import nookies from "nookies";

function NameMap({ mapData }) {
  return (
    <center>
      <Box sx={{ maxWidth: "xl" }}>
        <Map mapData={mapData} />
      </Box>
    </center>
  );
}

export default NameMap;

export async function getServerSideProps(context) {
  // res.setHeader(
  //     'Cache-Control',
  //     'public, s-maxage=10, stale-while-revalidate=59'
  //   )
  const cookies = nookies.get(context);

  const shId = cookies["sh-id"];

  const { name } = context.query;
  const mapData = await getMap(name, shId);

  return { props: { mapData } };
}
