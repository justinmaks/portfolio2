'use client';

import { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  Divider,
  Chip,
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

interface TimeInfo {
  unix: number;
  utc: string;
  local: string;
  iso: string;
  relative: string;
}

function relative(ts: number): string {
  const diff = Math.floor((Date.now() - ts * 1000) / 1000);
  const abs = Math.abs(diff);
  const future = diff < 0;
  if (abs < 60) return `${abs}s ${future ? 'from now' : 'ago'}`;
  if (abs < 3600) return `${Math.floor(abs / 60)}m ${future ? 'from now' : 'ago'}`;
  if (abs < 86400) return `${Math.floor(abs / 3600)}h ${future ? 'from now' : 'ago'}`;
  return `${Math.floor(abs / 86400)}d ${future ? 'from now' : 'ago'}`;
}

function parse(input: string): TimeInfo | null {
  const trimmed = input.trim();
  if (!trimmed) return null;

  let ms: number | null = null;

  // Pure integer: unix seconds or ms
  if (/^\d+$/.test(trimmed)) {
    const n = parseInt(trimmed, 10);
    // Heuristic: >1e10 is likely ms
    ms = n > 1e10 ? n : n * 1000;
  } else {
    const d = new Date(trimmed);
    if (!isNaN(d.getTime())) ms = d.getTime();
  }

  if (ms === null) return null;

  const d = new Date(ms);
  const unix = Math.floor(ms / 1000);
  return {
    unix,
    utc: d.toUTCString(),
    local: d.toLocaleString(),
    iso: d.toISOString(),
    relative: relative(unix),
  };
}

export default function TimestampConverter() {
  const [input, setInput] = useState('');
  const [info, setInfo] = useState<TimeInfo | null>(null);
  const [error, setError] = useState('');

  const now = () => {
    const ts = Math.floor(Date.now() / 1000).toString();
    setInput(ts);
    setInfo(parse(ts));
    setError('');
  };

  const convert = () => {
    setError('');
    const result = parse(input);
    if (!result) {
      setError('Could not parse input. Try a Unix timestamp or a date string.');
      setInfo(null);
    } else {
      setInfo(result);
    }
  };

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Box display="flex" gap={1} alignItems="flex-start">
        <TextField
          label="Unix timestamp or date string"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="1700000000 or 2024-01-15T00:00:00Z"
          fullWidth
          slotProps={{ input: { style: { fontFamily: 'var(--font-geist-mono)', fontSize: 13 } } }}
          error={!!error}
          helperText={error || ' '}
          onKeyDown={(e) => e.key === 'Enter' && convert()}
        />
      </Box>

      <Box display="flex" gap={1}>
        <Button variant="contained" onClick={convert} startIcon={<AccessTimeIcon />}>
          Convert
        </Button>
        <Button variant="outlined" onClick={now}>
          Now
        </Button>
      </Box>

      {info && (
        <Box
          sx={{
            bgcolor: 'rgba(0,0,0,0.45)',
            borderRadius: 1,
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 1.5,
          }}
        >
          <Grid container spacing={1}>
            {[
              { label: 'Unix (s)', value: info.unix.toString() },
              { label: 'ISO 8601', value: info.iso },
              { label: 'UTC', value: info.utc },
              { label: 'Local', value: info.local },
            ].map(({ label, value }) => (
              <Grid size={12} key={label}>
                <Typography variant="caption" color="text.secondary">
                  {label}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontFamily: 'var(--font-geist-mono)', wordBreak: 'break-all' }}
                >
                  {value}
                </Typography>
                <Divider sx={{ mt: 1 }} />
              </Grid>
            ))}
          </Grid>
          <Chip label={info.relative} size="small" color="primary" sx={{ alignSelf: 'flex-start' }} />
        </Box>
      )}
    </Box>
  );
}
