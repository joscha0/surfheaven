import React, { useState, useEffect } from "react";

import Box from "@mui/material/Box";

import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSteam } from "@fortawesome/free-brands-svg-icons";

import StarIcon from "@mui/icons-material/Star";

import Link from "@mui/material/Link";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PropTypes from "prop-types";

import { secondsToHM } from "../services/helper";
import RecordCard from "./recordCard";
import Flag from "react-world-flags";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Player({ playerData }) {
  // for CSR
  //   const [player, setPlayer] = useState({});

  //   const router = useRouter();

  //   useEffect(() => {
  //     if (!router.isReady) return;
  //     getPlayer(id).then((playerResponse) => {
  //       setPlayer(playerResponse);
  //     });
  //   }, [router]);

  const [tabIndex, setTabIndex] = React.useState(0);
  const player = playerData.playerData;

  const handleChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <Box sx={{ padding: 5 }}>
      <Box>
        <Paper sx={{ padding: 5 }}>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            columnSpacing={{ xs: 2, md: 4 }}
            rowSpacing={0}
          >
            <Grid item>
              <Avatar
                alt={player.name}
                src={player.avatar}
                sx={{ width: 100, height: 100 }}
              />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingTop: 3,
                }}
              >
                <Box
                  sx={{
                    margin: 2,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Flag code={player.country_code} height="16" />
                </Box>
                <Typography variant="h4" component="h1">
                  {player.name}
                </Typography>
                <IconButton
                  target="_blank"
                  rel="noopener"
                  component="a"
                  href={"http://steamcommunity.com/profiles/" + player.steamid}
                >
                  <FontAwesomeIcon icon={faSteam} />
                </IconButton>
                {player.vip === 1 && <StarIcon color="primary" />}
              </Box>

              <h3>
                Rank: {player.rank} ({player.rankname})
              </h3>
            </Grid>
            <Grid item textAlign="left">
              <h2>Info</h2>
              <p>
                Maps completed: <strong>{player.mapscompleted}</strong>
              </p>
              <p>
                Play time:
                <strong> {secondsToHM(parseInt(player.playtime))}</strong>
              </p>
              <p>
                Country: <strong>{player.country_code}</strong>
              </p>
              <p>
                Country Rank:
                <strong>
                  {" "}
                  {player.country_rank}/{player.country_ranktotal}
                </strong>
              </p>
              <p>
                Last online:
                <strong> {new Date(player.lastplay).toDateString()}</strong>
              </p>
              <p>
                First online:
                <strong> {new Date(player.firstseen).toDateString()}</strong>
              </p>
            </Grid>
          </Grid>
        </Paper>
        <h2>Recent records</h2>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={tabIndex}
            onChange={handleChange}
            aria-label="basic tabs"
            centered
          >
            <Tab label="Maps" {...a11yProps(0)} />
            <Tab label="Bonuses" {...a11yProps(1)} />
            <Tab label="Stages" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={tabIndex} index={0}>
          <Grid container spacing={2} justifyContent="center">
            {player.records_map.map((record) => (
              <Grid item xs>
                <RecordCard record={record} />
              </Grid>
            ))}
          </Grid>
        </TabPanel>
        <TabPanel value={tabIndex} index={1}>
          Item Two
        </TabPanel>
        <TabPanel value={tabIndex} index={2}>
          Coming soon...
        </TabPanel>
      </Box>
    </Box>
  );
}
