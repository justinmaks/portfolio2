'use client';

import { useState } from 'react';
import { Box, Container, Tab, Tabs, Typography } from '@mui/material';
import JwtDecoder from './tools/JwtDecoder';
import Base64Tool from './tools/Base64Tool';
import TimestampConverter from './tools/TimestampConverter';
import JsonFormatter from './tools/JsonFormatter';
import UuidGenerator from './tools/UuidGenerator';
import CidrCalculator from './tools/CidrCalculator';

const tools = [
  { label: 'JWT', component: <JwtDecoder /> },
  { label: 'Base64', component: <Base64Tool /> },
  { label: 'Timestamp', component: <TimestampConverter /> },
  { label: 'JSON', component: <JsonFormatter /> },
  { label: 'UUID', component: <UuidGenerator /> },
  { label: 'CIDR', component: <CidrCalculator /> },
];

export default function Tools() {
  const [tab, setTab] = useState(0);

  return (
    <Container
      maxWidth="md"
      sx={{ position: 'relative', zIndex: 1, mt: { xs: 4, md: 6 }, color: 'white', pb: 8 }}
    >
      <Typography variant="h4" component="h1" gutterBottom fontWeight={600}>
        Dev Tools
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Client-side utilities — nothing leaves your browser.
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3, mt: 2 }}>
        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          variant="scrollable"
          scrollButtons="auto"
          textColor="primary"
          indicatorColor="primary"
        >
          {tools.map((t) => (
            <Tab key={t.label} label={t.label} sx={{ textTransform: 'none', fontWeight: 500 }} />
          ))}
        </Tabs>
      </Box>

      {tools.map((t, i) => (
        <Box key={t.label} hidden={tab !== i} role="tabpanel">
          {tab === i && t.component}
        </Box>
      ))}
    </Container>
  );
}
