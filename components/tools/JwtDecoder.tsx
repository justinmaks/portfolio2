'use client';

import { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Alert,
  Chip,
} from '@mui/material';
import LockOpenIcon from '@mui/icons-material/LockOpen';

function base64UrlDecode(str: string): string {
  const padded = str.replace(/-/g, '+').replace(/_/g, '/');
  const pad = padded.length % 4;
  const base64 = pad ? padded + '='.repeat(4 - pad) : padded;
  try {
    return decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + c.charCodeAt(0).toString(16).padStart(2, '0'))
        .join('')
    );
  } catch {
    return atob(base64);
  }
}

interface DecodedJwt {
  header: Record<string, unknown>;
  payload: Record<string, unknown>;
  signature: string;
}

export default function JwtDecoder() {
  const [input, setInput] = useState('');
  const [decoded, setDecoded] = useState<DecodedJwt | null>(null);
  const [error, setError] = useState('');

  const decode = () => {
    setError('');
    setDecoded(null);
    const parts = input.trim().split('.');
    if (parts.length !== 3) {
      setError('Invalid JWT: expected 3 dot-separated parts.');
      return;
    }
    try {
      const header = JSON.parse(base64UrlDecode(parts[0]));
      const payload = JSON.parse(base64UrlDecode(parts[1]));
      setDecoded({ header, payload, signature: parts[2] });
    } catch {
      setError('Failed to decode JWT — check that it is well-formed.');
    }
  };

  const formatTime = (ts: unknown) => {
    if (typeof ts !== 'number') return null;
    return new Date(ts * 1000).toUTCString();
  };

  const isExpired = () => {
    if (!decoded) return false;
    const exp = decoded.payload.exp;
    if (typeof exp !== 'number') return false;
    return Date.now() / 1000 > exp;
  };

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <TextField
        label="Paste JWT token"
        multiline
        rows={4}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
        fullWidth
        slotProps={{ input: { style: { fontFamily: 'var(--font-geist-mono)', fontSize: 13 } } }}
      />
      <Button variant="contained" onClick={decode} startIcon={<LockOpenIcon />} sx={{ alignSelf: 'flex-start' }}>
        Decode
      </Button>

      {error && <Alert severity="error">{error}</Alert>}

      {decoded && (
        <Box display="flex" flexDirection="column" gap={2}>
          {isExpired() && (
            <Alert severity="warning">Token is expired.</Alert>
          )}

          <Box>
            <Typography variant="subtitle2" color="primary" gutterBottom>
              HEADER
            </Typography>
            <Box
              component="pre"
              sx={{
                bgcolor: 'rgba(0,0,0,0.45)',
                color: '#e2e8f0',
                p: 2,
                borderRadius: 1,
                fontSize: 13,
                fontFamily: 'var(--font-geist-mono)',
                overflowX: 'auto',
                m: 0,
              }}
            >
              {JSON.stringify(decoded.header, null, 2)}
            </Box>
          </Box>

          <Box>
            <Typography variant="subtitle2" color="primary" gutterBottom>
              PAYLOAD
            </Typography>
            <Box
              component="pre"
              sx={{
                bgcolor: 'rgba(0,0,0,0.45)',
                color: '#e2e8f0',
                p: 2,
                borderRadius: 1,
                fontSize: 13,
                fontFamily: 'var(--font-geist-mono)',
                overflowX: 'auto',
                m: 0,
              }}
            >
              {JSON.stringify(decoded.payload, null, 2)}
            </Box>
            <Box display="flex" flexWrap="wrap" gap={1} mt={1}>
              {typeof decoded.payload.iat === 'number' && (
                <Chip label={`iat: ${formatTime(decoded.payload.iat)}`} size="small" variant="outlined" />
              )}
              {typeof decoded.payload.exp === 'number' && (
                <Chip
                  label={`exp: ${formatTime(decoded.payload.exp)}`}
                  size="small"
                  variant="outlined"
                  color={isExpired() ? 'error' : 'success'}
                />
              )}
            </Box>
          </Box>

          <Box>
            <Typography variant="subtitle2" color="primary" gutterBottom>
              SIGNATURE <Typography component="span" variant="caption" color="text.secondary">(not verified)</Typography>
            </Typography>
            <Box
              sx={{
                bgcolor: 'rgba(0,0,0,0.45)',
                color: '#94a3b8',
                p: 2,
                borderRadius: 1,
                fontSize: 13,
                fontFamily: 'var(--font-geist-mono)',
                wordBreak: 'break-all',
              }}
            >
              {decoded.signature}
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}
