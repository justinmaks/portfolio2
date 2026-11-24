// 'use client';

import { Container, Grid, Link, Typography } from "@mui/material";

type Tile = {
  text: string;
  url: string;
};

const tiles: Tile[] = [
  {
    text: "hedge-local – coding agent OTEL telemetry TUI",
    url: "https://github.com/justinmaks/hedge-local",
  },
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
];

function Tile({ text, url }: Tile) {
  return (
    <Link
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      underline="none"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        borderRadius: 2,
        p: 2,
        textAlign: "center",
        border: "1px solid rgba(255, 255, 255, 0.18)",
        backgroundColor: "rgba(10, 12, 40, 0.45)",
        backdropFilter: "blur(4px)",
        transition: "transform 150ms ease, border-color 150ms ease, background-color 150ms ease",
        "&:hover, &:focus-visible": {
          transform: "translateY(-4px)",
          borderColor: "primary.main",
          backgroundColor: "rgba(20, 24, 70, 0.55)",
        },
        "@media (prefers-reduced-motion: reduce)": {
          transition: "none",
          "&:hover, &:focus-visible": { transform: "none" },
        },
      }}
    >
      <Typography variant="h6" component="span" sx={{ color: "white" }}>
        {text}
      </Typography>
    </Link>
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
