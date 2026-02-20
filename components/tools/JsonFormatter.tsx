'use client';

import { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Alert,
  ButtonGroup,
  Tooltip,
  IconButton,
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CompressIcon from '@mui/icons-material/Compress';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';

export default function JsonFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const format = (indent: number) => {
    setError('');
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, indent));
    } catch (e) {
      setError(String(e));
    }
  };

  const minify = () => format(0);
  const prettify = () => format(2);

  const copy = () => {
    navigator.clipboard.writeText(output).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <TextField
        label="JSON input"
        multiline
        rows={6}
        value={input}
        onChange={(e) => { setInput(e.target.value); setError(''); }}
        fullWidth
        slotProps={{ input: { style: { fontFamily: 'var(--font-geist-mono)', fontSize: 13 } } }}
      />

      <ButtonGroup variant="contained" size="small" sx={{ alignSelf: 'flex-start' }}>
        <Button startIcon={<FormatAlignLeftIcon />} onClick={prettify}>
          Prettify
        </Button>
        <Button startIcon={<CompressIcon />} onClick={minify}>
          Minify
        </Button>
      </ButtonGroup>

      {error && <Alert severity="error" sx={{ whiteSpace: 'pre-wrap', fontFamily: 'var(--font-geist-mono)', fontSize: 12 }}>{error}</Alert>}

      {output && (
        <Box position="relative">
          <TextField
            label="Output"
            multiline
            rows={10}
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
