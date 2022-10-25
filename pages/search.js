import React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Link from "@mui/material/Link";

import Grid from "@mui/material/Grid";

import { searchPlayer } from "../services/api";
import { secondsToDHM, secondsToHM } from "../services/helper";
import Flag from "react-world-flags";
import Typography from "@mui/material/Typography";

function Search({ searchResults }) {
  return (
    <center>
      <Box sx={{ maxWidth: "xl", paddingTop: 5 }}>
        <Typography variant="h2" component="h1" sx={{ pt: 5, pb: 3 }}>
          Search Results
        </Typography>
        {searchResults.length > 0 ? (
          <Grid item>
            <TableContainer>
              <Table sx={{ maxWidth: 700 }}>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <strong>Name</strong>
                    </TableCell>
                    <TableCell align="right">
                      <strong>Rank</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Last online</strong>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {searchResults.map((player, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        <Flag code={player.country_code} height="14" />{" "}
                        <b>
                          <Link href={"/player/" + player.steamid}>
                            {player.name}
                          </Link>
                        </b>
                      </TableCell>
                      <TableCell align="right">
                        <b>{player.rank}</b>
                      </TableCell>
                      <TableCell>
                        {secondsToDHM(
                          (Date.now() - new Date(player.lastplay)) / 1000
                        ) + " ago"}
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

export default Search;

export async function getServerSideProps(context) {
  const { p } = context.query;

  const searchResults = await searchPlayer(p);

  return { props: { searchResults } };
}
