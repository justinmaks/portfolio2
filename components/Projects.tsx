// 'use client';

import { Box, Container, Grid, Link, Typography } from "@mui/material";

type Tile = {
  text: string;
  url: string;
};

const tiles: Tile[] = [
  {
    text: "EnvNow – Environment variable manager with Vault integration (Go)",
    url: "https://github.com/justinmaks/envnow",
  },
  {
    text: "jlts – Link shortener and tracking service",
    url: "https://link.stin.lol",
  },
  { text: "PPP – Public Plex Portal (Next.js)", url: "https://stin.lol" },
  {
    text: "phldata.xyz – Indego public bike and usage map (Philadelphia)",
    url: "https://phldata.xyz",
  },
  {
    text: "transit.phldata.xyz – SEPTA bus and rail live map (Philadelphia)",
    url: "https://transit.phldata.xyz",
  },
  {
    text: "EVE Tools Index – EVE Online 3rd-party tools indexer",
    url: "https://index.stin.win",
  },
  {
    text: "EVE Gate Camp Checker – live gate camp tracker for EVE Online",
    url: "https://eve.stin.win",
  },
  {
    text: "hedge-local – coding agent OTEL telemetry TUI",
    url: "https://github.com/justinmaks/hedge-local",
  },
];

function Tile({ text, url }: Tile) {
  return (
    <Box
      // border={1}
      borderRadius={2}
      p={2}
      textAlign="center"
      width="100%"
      sx={{
        cursor: "pointer",
        borderColor: "rgba(255, 255, 255, 0.25)",
        borderWidth: 2,
        backgroundColor: "rgba(51, 51, 51, 0.2)",
        transition: "transform 150ms ease, border-color 150ms ease",
        "&:hover": {
          transform: "translateY(-4px)",
          borderColor: "primary.main",
        },
      }}
    >
      <Link
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        underline="none"
      >
        <Typography variant="h6" color="white">
          {text}
        </Typography>
      </Link>
    </Box>
  );
}

export default function Projects() {
  return (
    <Container maxWidth="md" sx={{ mt: { xs: 8, md: 12 } }}>
      <Grid container spacing={2}>
        {tiles.map((tile) => (
          <Grid size={{ xs: 12, sm: 6 }} key={tile.url}>
            <Tile {...tile} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
