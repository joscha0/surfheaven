import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Link from "@mui/material/Link";

import Grid from "@mui/material/Grid";

import { getTopPlayers } from "../services/api";
import { secondsToDHM, secondsToHM } from "../services/helper";
import Flag from "react-world-flags";
import Typography from "@mui/material/Typography";

function TopPlayers({ topPlayersData }) {
  return (
    <center>
      <Box sx={{ maxWidth: "xl", paddingTop: 5 }}>
        <Typography variant="h2" component="h1" sx={{ pt: 5, pb: 3 }}>
          Top Players
        </Typography>
        {topPlayersData.length > 0 ? (
          <Grid item>
            <TableContainer>
              <Table sx={{ maxWidth: 950 }}>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <strong>Rank</strong>
                    </TableCell>

                    <TableCell align="right">
                      <strong>Points</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Last online</strong>
                    </TableCell>
                    <TableCell align="right">
                      <strong>Maps completed</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Playtime</strong>
                    </TableCell>
                    <TableCell>
                      <strong>First seen</strong>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {topPlayersData.map((player, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        {index + 1 + ". "}
                        <Flag code={player.country_code} height="14" />{" "}
                        <b>
                          <Link href={"/player/" + player.steamid}>
                            {player.name}
                          </Link>
                        </b>
                      </TableCell>
                      <TableCell align="right">
                        <b>{player.points}</b>
                      </TableCell>
                      <TableCell>
                        {secondsToDHM(
                          (Date.now() - new Date(player.lastplay)) / 1000
                        ) + " ago"}
                      </TableCell>
                      <TableCell align="right">
                        {player.mapscompleted}
                      </TableCell>
                      <TableCell>{secondsToHM(player.playtime)}</TableCell>
                      <TableCell>
                        {new Date(player.firstseen).toDateString().substring(4)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        ) : (
          <Typography>No players found!</Typography>
        )}
      </Box>
    </center>
  );
}

export default TopPlayers;

export async function getServerSideProps(context) {
  const topPlayersData = await getTopPlayers();

  return { props: { topPlayersData } };
}
