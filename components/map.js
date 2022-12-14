import Image from "next/image";

import * as React from "react";
import Box from "@mui/material/Box";
import { getImageUrl, secondsToMS, msToSeconds } from "../services/helper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import {
  VictoryChart,
  VictoryLine,
  VictoryTheme,
  VictoryVoronoiContainer,
  VictoryTooltip,
  VictoryLegend,
  VictoryAxis,
} from "victory";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Link from "@mui/material/Link";

import YtAccord from "./ytAccord";

import * as mapsYt from "../services/mapsYt.json";

export default function Map({ mapData }) {
  return (
    <Box sx={{ p: 3 }}>
      {"error" in mapData ? (
        <h1>{mapData.error}</h1>
      ) : (
        <Box>
          <Typography variant="h4" component="h1" padding={2}>
            {mapData.map}
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 2,
              p: 1,
            }}
          >
            <Typography>
              Type: <strong>{mapData.type == 0 ? "Linear" : "Staged"}</strong>
            </Typography>
            <Typography>
              Tier: <strong>{mapData.tier}</strong>
            </Typography>
            <Typography>
              Bonus: <strong>{mapData.bonus}</strong>
            </Typography>
            <Typography>
              {mapData.type == 0 ? "Checkpoints" : "Stages"}:{" "}
              <strong>{mapData.checkpoints}</strong>
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 2,
              p: 1,
            }}
          >
            <Typography>
              Author: <strong>{mapData.author}</strong>
            </Typography>
            <Typography>
              Date added:{" "}
              <strong>
                {new Date(mapData.date_added).toDateString().substring(4)}
              </strong>
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 2,
              p: 1,
            }}
          >
            <Typography>
              Completions: <strong>{mapData.completions}</strong>
            </Typography>
            <Typography>
              Playtime: <strong>{mapData.playtime}h</strong>
            </Typography>
          </Box>
          <Box sx={{ p: 2 }}>
            <Image
              src={getImageUrl(mapData.map, mapData.track, true)}
              alt={mapData.map}
              layout="responsive"
              height={450}
              width={1000}
              objectFit="contain"
            />
          </Box>
          {mapData.map in mapsYt && <YtAccord map={mapsYt[mapData.map]} />}
          {Object.keys(mapData.map_pr).length > 0 && (
            <Box
              sx={{
                p: 1,
              }}
            >
              <Typography variant="h4" component="h1" padding={2}>
                Personal Record
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
                <Typography>
                  Rank: <strong>{mapData.map_pr.rank}</strong>
                </Typography>
                <Typography>
                  Time: <strong>{secondsToMS(mapData.map_pr.time)}</strong>
                </Typography>
                <Typography>
                  Finish speed:{" "}
                  <strong>{Math.round(mapData.map_pr.finishspeed)}u</strong>
                </Typography>
                <Typography>
                  Date:{" "}
                  <strong>
                    {new Date(mapData.map_pr.date).toDateString().substring(4)}
                  </strong>
                </Typography>

                <Typography>
                  Completions: <strong>{mapData.map_pr.finishcount}</strong>
                </Typography>
              </Box>
            </Box>
          )}
          {mapData.records.length > 0 && (
            <Box
              sx={{
                p: 1,
              }}
            >
              <Typography
                variant="h4"
                component="h2"
                sx={{ padding: 2, paddingTop: 10 }}
              >
                WR history
              </Typography>

              <Box sx={{ height: { xs: "100%", md: 800 } }}>
                <VictoryChart
                  theme={VictoryTheme.material}
                  minDomain={{ y: 0 }}
                  domainPadding={{ y: 20 }}
                  containerComponent={
                    <VictoryVoronoiContainer
                      voronoiDimension="x"
                      labels={({ datum }) =>
                        `${datum.name}: ${secondsToMS(datum.y)} (${datum.x})`
                      }
                      labelComponent={<VictoryTooltip />}
                    />
                  }
                >
                  <VictoryAxis tickFormat={(t) => ``} label="Date" />
                  <VictoryAxis
                    dependentAxis
                    tickFormat={(t) => `${t}s`}
                    label="time (s)"
                    style={{
                      axisLabel: { padding: 40 },
                    }}
                  />
                  <VictoryLine
                    interpolation="catmullRom"
                    style={{
                      data: { stroke: "#f6a821" },
                      parent: { border: "1px solid #ccc" },
                    }}
                    data={mapData.records.map((cp) => ({
                      x: new Date(cp.timestamp).toUTCString(),
                      y: msToSeconds(cp.time),
                      name: cp.player_name,
                    }))}
                  />
                </VictoryChart>
              </Box>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>Records [{mapData.records.length}]</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {mapData.records.map((record) => (
                    <Typography sx={{ textAlign: "left" }} key={record.id}>
                      {record.timestamp}:{" "}
                      <Link href={"/player/" + record.player_id}>
                        {record.player_name}
                      </Link>{" "}
                      finished in <b>{record.time}</b> ({record.improvement}) on
                      server {record.server}
                    </Typography>
                  ))}
                </AccordionDetails>
              </Accordion>
            </Box>
          )}
          {mapData.map_ccp.length > 0 && (
            <Box
              sx={{
                p: 1,
              }}
            >
              <Typography
                variant="h4"
                component="h2"
                sx={{ padding: 2, paddingTop: 10 }}
              >
                CCP
              </Typography>
              <Grid container columns={{ xs: 4, md: 8 }}>
                <Grid item xs={4} md={4}>
                  <Typography variant="h5" component="h2">
                    Time
                  </Typography>
                  <VictoryChart
                    theme={VictoryTheme.material}
                    minDomain={{ y: 0 }}
                    domainPadding={{ x: 20, y: 20 }}
                    containerComponent={
                      <VictoryVoronoiContainer
                        voronoiDimension="x"
                        labels={({ datum }) =>
                          `${datum.name}: ${secondsToMS(datum.y)}`
                        }
                        labelComponent={<VictoryTooltip />}
                      />
                    }
                  >
                    <VictoryAxis
                      tickFormat={(t) => `${Math.round(t)}`}
                      label="Checkpoint / Stage"
                      style={{
                        axisLabel: { padding: 30 },
                      }}
                    />
                    <VictoryAxis
                      dependentAxis
                      tickFormat={(t) => `${t}s`}
                      label="time (s)"
                      style={{
                        axisLabel: { padding: 40 },
                      }}
                    />
                    <VictoryLegend
                      orientation="horizontal"
                      gutter={20}
                      style={{
                        border: { stroke: "#ccc" },
                        title: { fontSize: 20 },
                      }}
                      data={[
                        {
                          name: mapData.map_ccp[0].name,
                          symbol: { fill: "#3145C4" },
                        },
                        {
                          name: mapData.map_ccp[0].wrname,
                          symbol: { fill: "#c43a31" },
                        },
                      ]}
                    />
                    <VictoryLine
                      interpolation="catmullRom"
                      style={{
                        data: { stroke: "#3145C4" },
                        parent: { border: "1px solid #ccc" },
                      }}
                      data={mapData.map_ccp.map((cp) => ({
                        x: cp.checkpoint,
                        y: cp.time,
                        label: cp.time - cp.wrtime,
                        name: cp.name,
                      }))}
                    />
                    <VictoryLine
                      interpolation="catmullRom"
                      style={{
                        data: { stroke: "#c43a31" },
                        parent: { border: "1px solid #ccc" },
                      }}
                      data={mapData.map_ccp.map((cp) => ({
                        x: cp.checkpoint,
                        y: cp.wrtime,
                        name: cp.wrname + " (WR)",
                      }))}
                    />
                  </VictoryChart>
                </Grid>
                <Grid item xs={4} md={4}>
                  <Typography variant="h5" component="h2">
                    Speed
                  </Typography>
                  <VictoryChart
                    theme={VictoryTheme.material}
                    minDomain={{ y: 0 }}
                    domainPadding={{ x: 20, y: 20 }}
                    containerComponent={
                      <VictoryVoronoiContainer
                        voronoiDimension="x"
                        labels={({ datum }) => `${datum.name}: ${datum.y}u`}
                        labelComponent={<VictoryTooltip />}
                      />
                    }
                  >
                    <VictoryAxis
                      tickFormat={(t) => `${Math.round(t)}`}
                      label="Checkpoint / Stage"
                      style={{
                        axisLabel: { padding: 30 },
                      }}
                    />
                    <VictoryAxis
                      dependentAxis
                      tickFormat={(t) => `${t}u`}
                      label="speed (units)"
                      style={{
                        axisLabel: { padding: 40 },
                      }}
                    />
                    <VictoryLegend
                      orientation="horizontal"
                      gutter={20}
                      style={{
                        border: { stroke: "#ccc" },
                        title: { fontSize: 20 },
                      }}
                      data={[
                        {
                          name: mapData.map_ccp[0].name,
                          symbol: { fill: "#3145C4" },
                        },
                        {
                          name: mapData.map_ccp[0].wrname,
                          symbol: { fill: "#c43a31" },
                        },
                      ]}
                    />
                    <VictoryLine
                      interpolation="catmullRom"
                      style={{
                        data: { stroke: "#3145C4" },
                        parent: { border: "1px solid #ccc" },
                      }}
                      data={mapData.map_ccp.map((cp) => ({
                        x: cp.checkpoint,
                        y: Math.round(cp.speed),
                        label: Math.round(cp.speed - cp.wrspeed),
                        name: cp.name,
                      }))}
                    />
                    <VictoryLine
                      interpolation="catmullRom"
                      style={{
                        data: { stroke: "#c43a31" },
                        parent: { border: "1px solid #ccc" },
                      }}
                      data={mapData.map_ccp.map((cp) => ({
                        x: cp.checkpoint,
                        y: Math.round(cp.wrspeed),
                        name: cp.wrname + " (WR)",
                      }))}
                    />
                  </VictoryChart>
                </Grid>
              </Grid>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
}
