import React, { useState, useEffect, useCallback } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import Player from "../components/player";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useRouter } from "next/router";

import nookies from "nookies";
import { parseCookies, setCookie, destroyCookie } from "nookies";

import { getId, getPlayer } from "../services/api";

const Profile = ({ playerData }) => {
  const [textInput, setTextInput] = useState("");

  const router = useRouter();

  const refreshData = useCallback(() => {
    router.replace(router.asPath);
  }, [router]);

  const handleTextInputChange = (event) => {
    setTextInput(event.target.value);
  };

  const handleSetId = () => {
    setCookie(null, "sh-id", textInput, {
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    });
    refreshData();
  };

  const automaticSetId = useCallback(() => {
    getId().then((id) => {
      setCookie(null, "sh-id", id, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });
      setTextInput(id);
      refreshData();
    });
  }, [refreshData]);

  useEffect(() => {
    const cookies = parseCookies();
    if ("sh-id" in cookies) {
      const shId = cookies["sh-id"];
      setTextInput(shId);
    } else {
      automaticSetId();
    }
  }, [automaticSetId]);

  return (
    <center>
      <Box sx={{ maxWidth: "xl", paddingTop: 5 }}>
        <Stack
          spacing={2}
          direction="row"
          alignItems="center"
          justifyContent="center"
        >
          <Button
            variant="outlined"
            onClick={automaticSetId}
            endIcon={<RefreshIcon />}
          >
            Automatic
          </Button>
          <TextField
            label="Surfheaven ID e.g: 353708445"
            variant="filled"
            value={textInput}
            onChange={handleTextInputChange}
          />
          <Button variant="contained" onClick={handleSetId}>
            Save
          </Button>
        </Stack>

        <Player player={playerData} />
      </Box>
    </center>
  );
};

export default Profile;

export async function getServerSideProps(context) {
  const cookies = nookies.get(context);

  const shId = cookies["sh-id"];
  var playerData;
  if (shId) {
    playerData = await getPlayer(shId);
  } else {
    playerData = { error: "no player" };
  }

  return { props: { playerData } };
}
