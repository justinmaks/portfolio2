'use client';

import { Box, Container, Link, Typography } from '@mui/material';

type Tile = {
  text: string;
  url: string;
};

const tiles: Tile[] = [
  {
    text: 'EnvNow – Environment variable manager with Vault integration (Go)',
    url: 'https://github.com/justinmaks/envnow',
  },
  { text: 'PPP – Public Plex Portal (Next.js)', url: 'https://stin.lol' },
  { text: 'Strmnow - Free TV and Movie Streaming (Next.js)', url: 'https://strmnow.lol' },
  { text: 'Linkly – Full-featured link shortening service with analytics (React)', url: 'https://linkly.devmaks.biz' }
];

function Tile({ text, url }: Tile) {
  return (
    <Box
      border={1}
      borderRadius={2}
      p={2}
      textAlign="center"
      width="100%"
      sx={{
        cursor: 'pointer',
        borderColor: 'rgba(255, 255, 255, 0.25)',
        borderWidth: 2,
        backgroundColor: 'rgba(51, 51, 51, 0.2)',
        transition: 'transform 150ms ease, border-color 150ms ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          borderColor: 'primary.main',
        },
      }}
    >
      <Link href={url} target="_blank" rel="noopener noreferrer" underline="none">
        <Typography variant="h6" color="white">
          {text}
        </Typography>
      </Link>
    </Box>
  );
}

export default function Projects() {
  return (
    <Container maxWidth="sm" sx={{ mt: { xs: 8, md: 12 } }}>
      <Box display="flex" flexDirection="column" alignItems="stretch" gap={2}>
        {tiles.map((tile) => (
          <Tile key={tile.url} {...tile} />
        ))}
      </Box>
    </Container>
  );
}


