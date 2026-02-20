'use client';

import { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  Tooltip,
  List,
  ListItem,
  ListItemText,
  Slider,
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import RefreshIcon from '@mui/icons-material/Refresh';

function generateUUID(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export default function UuidGenerator() {
  const [count, setCount] = useState(1);
  const [uuids, setUuids] = useState<string[]>([generateUUID()]);
  const [copied, setCopied] = useState<string | null>(null);

  const generate = () => {
    setUuids(Array.from({ length: count }, generateUUID));
  };

  const copy = (uuid: string) => {
    navigator.clipboard.writeText(uuid).then(() => {
      setCopied(uuid);
      setTimeout(() => setCopied(null), 2000);
    });
  };

  const copyAll = () => {
    navigator.clipboard.writeText(uuids.join('\n')).then(() => {
      setCopied('all');
      setTimeout(() => setCopied(null), 2000);
    });
  };

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Box>
        <Typography gutterBottom>
          Count: <strong>{count}</strong>
        </Typography>
        <Slider
          value={count}
          onChange={(_, v) => setCount(v as number)}
          min={1}
          max={20}
          marks={[1, 5, 10, 20].map((v) => ({ value: v, label: String(v) }))}
          sx={{ maxWidth: 320 }}
        />
      </Box>

      <Box display="flex" gap={1}>
        <Button variant="contained" startIcon={<RefreshIcon />} onClick={generate}>
          Generate
        </Button>
        {uuids.length > 1 && (
          <Button variant="outlined" onClick={copyAll}>
            {copied === 'all' ? 'Copied!' : 'Copy All'}
          </Button>
        )}
      </Box>

      <List dense disablePadding>
        {uuids.map((uuid, i) => (
          <ListItem
            key={i}
            disablePadding
            secondaryAction={
              <Tooltip title={copied === uuid ? 'Copied!' : 'Copy'}>
                <IconButton size="small" edge="end" onClick={() => copy(uuid)}>
                  <ContentCopyIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            }
            sx={{
              bgcolor: 'rgba(0,0,0,0.35)',
              mb: 0.5,
              borderRadius: 1,
              px: 1.5,
              py: 0.5,
            }}
          >
            <ListItemText
              primary={
                <TextField
                  value={uuid}
                  size="small"
                  fullWidth
                  slotProps={{
                    input: {
                      readOnly: true,
                      disableUnderline: true,
                      style: { fontFamily: 'var(--font-geist-mono)', fontSize: 13 },
                    },
                  }}
                  variant="standard"
                />
              }
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
