import React from "react";
import "../App.css";
import { Stack } from "@mui/material";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import GitHubIcon from "@mui/icons-material/GitHub";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#172337",
        color: "white",
        height: 100,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <p>&copy; 2023 Persistent Airways. All rights reserved.</p>
      <Stack direction={"row"} spacing={2}>
        <FacebookRoundedIcon className="logos facebook" />
        <InstagramIcon className="logos instagram" />
        <TwitterIcon className="logos twitter" />
        <YouTubeIcon className="logos youtube" />
        <Link to={"/"}>
          <GitHubIcon className="logos" sx={{ color: "white" }} />
        </Link>
      </Stack>
    </footer>
  );
}
