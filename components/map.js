import Image from "next/image";

import * as React from "react";
import Box from "@mui/material/Box";
import { getImageUrl, secondsToMS } from "../services/helper";
import Typography from "@mui/material/Typography";
import {
  VictoryChart,
  VictoryLine,
  VictoryTheme,
  VictoryVoronoiContainer,
  VictoryTooltip,
} from "victory";

export default function Map({ mapData }) {
  console.log(mapData.map_ccp);
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
              src={getImageUrl(mapData.map, mapData.track, false)}
              alt={mapData.map}
              layout="responsive"
              height={450}
              width={1000}
              objectFit="contain"
            />
          </Box>
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
          <Box
            sx={{
              p: 1,
            }}
          >
            <Typography variant="h4" component="h1" padding={2}>
              CCP
            </Typography>
            <VictoryChart
              theme={VictoryTheme.material}
              containerComponent={
                <VictoryVoronoiContainer
                  voronoiDimension="x"
                  labels={({ datum }) => `time: ${datum.y}`}
                  labelComponent={<VictoryTooltip />}
                />
              }
            >
              <VictoryLine
                interpolation="natural"
                style={{
                  data: { stroke: "#3145C4" },
                  parent: { border: "1px solid #ccc" },
                }}
                data={mapData.map_ccp.map((cp) => ({
                  x: cp.checkpoint,
                  y: cp.time,
                  label: cp.time,
                }))}
              />
              <VictoryLine
                interpolation="natural"
                style={{
                  data: { stroke: "#c43a31" },
                  parent: { border: "1px solid #ccc" },
                }}
                data={mapData.map_ccp.map((cp) => ({
                  x: cp.checkpoint,
                  y: cp.wrtime,
                  label: cp.wrtime,
                }))}
              />
            </VictoryChart>
          </Box>
        </Box>
      )}
    </Box>
  );
}
