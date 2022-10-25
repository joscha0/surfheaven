import ResponsiveYt from "./responsiveYt";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

const YtAccord = ({ map }) => {
  return (
    <Box sx={{ pt: 3, pb: 3 }}>
      <Typography variant="h6">Videos: </Typography>
      {"sh" in map && (
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>
              surfheaven: <b>{map.sh.name}</b> surfed by <b>{map.sh.player}</b>{" "}
              (<b>{map.sh.date}</b>)
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ResponsiveYt videoId={map.sh.video_id} />
          </AccordionDetails>
        </Accordion>
      )}
      {"ksf" in map && Object.keys(map.ksf).length > 0 && (
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>
              KSF: <b>{map.ksf.name}</b> surfed by <b>{map.ksf.player}</b> (
              <b>{map.ksf.date}</b>)
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ResponsiveYt videoId={map.ksf.video_id} />
            <Card
              variant="outlined"
              sx={{
                margin: 2,
                padding: 2,
                whiteSpace: "pre-wrap",
              }}
            >
              {map.ksf.info}
            </Card>
          </AccordionDetails>
        </Accordion>
      )}
    </Box>
  );
};

export default YtAccord;
