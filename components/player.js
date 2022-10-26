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
import { countries } from "country-data";

import Link from "@mui/material/Link";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PropTypes from "prop-types";

import { secondsToHM } from "../services/helper";
import RecordCard from "./recordCard";
import Flag from "react-world-flags";
import AdvancedGrid from "./advancedGrid";
import MapPopup from "./mapPopup";

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
      {value === index && <Box sx={{ p: { xs: 1, sm: 3 } }}>{children}</Box>}
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

export default function Player({ player }) {
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
  const [tabIndex2, setTabIndex2] = React.useState(0);
  const [showModal, setShowModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState({});

  const handleChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const handleChange2 = (event, newValue) => {
    setTabIndex2(newValue);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const openModal = (record) => {
    setSelectedRecord(record);
    setShowModal(true);
  };

  return (
    <Box sx={{ padding: { xs: 2, sm: 5 } }}>
      <MapPopup
        handleClose={handleClose}
        show={showModal}
        map={selectedRecord}
      />
      {"error" in player ? (
        <h1>{player.error}</h1>
      ) : (
        <Box>
          <Paper sx={{ padding: 5 }}>
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              columnSpacing={{ xs: 4, md: 8 }}
              rowSpacing={0}
            >
              <Grid
                item
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                  alignItems: "center",
                }}
              >
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
                    color="primary"
                    target="_blank"
                    rel="noopener"
                    component="a"
                    sx={{ height: 16, width: 16, p: 2, m: 1 }}
                    href={
                      "http://steamcommunity.com/profiles/" + player.steamid
                    }
                  >
                    <FontAwesomeIcon icon={faSteam} />
                  </IconButton>
                </Box>
                {player.vip === 1 && (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <StarIcon color="primary" /> <Typography>VIP</Typography>
                    <StarIcon color="primary" />
                  </Box>
                )}
                <Typography variant="h6" component="h3">
                  Rank: {player.rank} ({player.rankname})
                </Typography>
              </Grid>
              <Grid
                item
                textAlign="left"
                sx={{ display: "flex", flexDirection: "column", gap: 2 }}
              >
                <Typography variant="h4" component="h2">
                  Info
                </Typography>
                <Typography>
                  Points: <strong>{player.points}</strong>
                </Typography>
                <Typography>
                  Maps completed:{" "}
                  <strong>
                    {player.mapscompleted + " / " + player.totalmaps}
                  </strong>
                </Typography>
                <Typography>
                  Play time:
                  <strong> {secondsToHM(parseInt(player.playtime))}</strong>
                </Typography>
                <Typography>
                  Country:{" "}
                  <strong>{countries[player.country_code].name}</strong>
                </Typography>
                <Typography>
                  Country Rank:
                  <strong>
                    {" "}
                    {player.country_rank + " / " + player.country_ranktotal}
                  </strong>
                </Typography>
                <Typography>
                  Last online:
                  <strong>
                    {" "}
                    {new Date(player.lastplay).toDateString().substring(4)}
                  </strong>
                </Typography>
                <Typography>
                  First online:
                  <strong>
                    {" "}
                    {new Date(player.firstseen).toDateString().substring(4)}
                  </strong>
                </Typography>
              </Grid>
            </Grid>
          </Paper>
          <Typography variant="h4" component="h2" sx={{ pt: 5, pb: 3 }}>
            Recent records
          </Typography>
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
            {"records_map" in player && (
              <AdvancedGrid
                items={player.records_map}
                isRecord={true}
                openModal={openModal}
              />
            )}
          </TabPanel>
          <TabPanel value={tabIndex} index={1}>
            {"records_bonus" in player && (
              <AdvancedGrid
                items={player.records_bonus}
                isRecord={true}
                openModal={openModal}
              />
            )}
          </TabPanel>
          <TabPanel value={tabIndex} index={2}>
            <Typography>Coming soon...</Typography>
          </TabPanel>
          <Typography variant="h4" component="h2" sx={{ pt: 5, pb: 3 }}>
            Uncompleted
          </Typography>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={tabIndex2}
              onChange={handleChange2}
              aria-label="basic tabs"
              centered
            >
              <Tab label="Maps" {...a11yProps(0)} />
              <Tab label="Bonuses" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={tabIndex2} index={0}>
            {"uncompleted_map" in player && (
              <AdvancedGrid
                items={player.uncompleted_map}
                openModal={openModal}
                isRecord={false}
              />
            )}
          </TabPanel>
          <TabPanel value={tabIndex2} index={1}>
            {"uncompleted_bonus" in player && (
              <AdvancedGrid
                items={player.uncompleted_bonus}
                openModal={openModal}
                isRecord={false}
              />
            )}
          </TabPanel>
        </Box>
      )}
    </Box>
  );
}
