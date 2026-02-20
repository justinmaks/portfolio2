'use client';

import { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Alert,
  IconButton,
  Tooltip,
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';

type Mode = 'encode' | 'decode';

export default function Base64Tool() {
  const [mode, setMode] = useState<Mode>('encode');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const process = () => {
    setError('');
    if (!input.trim()) { setOutput(''); return; }
    try {
      if (mode === 'encode') {
        setOutput(btoa(unescape(encodeURIComponent(input))));
      } else {
        setOutput(decodeURIComponent(escape(atob(input.trim()))));
      }
    } catch {
      setError(mode === 'encode' ? 'Encoding failed.' : 'Invalid Base64 string.');
    }
  };

  const swap = () => {
    setMode((m) => (m === 'encode' ? 'decode' : 'encode'));
    setInput(output);
    setOutput('');
    setError('');
  };

  const copy = () => {
    navigator.clipboard.writeText(output).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Box display="flex" alignItems="center" gap={2}>
        <ToggleButtonGroup
          value={mode}
          exclusive
          onChange={(_, v) => { if (v) { setMode(v); setOutput(''); setError(''); } }}
          size="small"
        >
          <ToggleButton value="encode">Encode</ToggleButton>
          <ToggleButton value="decode">Decode</ToggleButton>
        </ToggleButtonGroup>
        {output && (
          <Tooltip title="Swap input/output">
            <IconButton size="small" onClick={swap}>
              <SwapHorizIcon />
            </IconButton>
          </Tooltip>
        )}
      </Box>

      <TextField
        label={mode === 'encode' ? 'Plain text' : 'Base64 string'}
        multiline
        rows={4}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        fullWidth
        slotProps={{ input: { style: { fontFamily: 'var(--font-geist-mono)', fontSize: 13 } } }}
      />

      <Button variant="contained" onClick={process} sx={{ alignSelf: 'flex-start' }}>
        {mode === 'encode' ? 'Encode' : 'Decode'}
      </Button>

      {error && <Alert severity="error">{error}</Alert>}

      {output && (
        <Box position="relative">
          <TextField
            label="Output"
            multiline
            rows={4}
            value={output}
            fullWidth
            slotProps={{
              input: {
                readOnly: true,
                style: { fontFamily: 'var(--font-geist-mono)', fontSize: 13 },
              },
            }}
          />
          <Tooltip title={copied ? 'Copied!' : 'Copy'}>
            <IconButton
              size="small"
              onClick={copy}
              sx={{ position: 'absolute', top: 8, right: 8 }}
            >
              <ContentCopyIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      )}
    </Box>
  );
}
