'use client';

import { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Alert,
  Grid,
  Divider,
  Chip,
} from '@mui/material';
import NetworkCheckIcon from '@mui/icons-material/NetworkCheck';

interface CidrInfo {
  network: string;
  broadcast: string;
  firstHost: string;
  lastHost: string;
  subnetMask: string;
  wildcardMask: string;
  totalHosts: number;
  usableHosts: number;
  prefix: number;
  ipClass: string;
}

function ipToInt(ip: string): number {
  return ip.split('.').reduce((acc, oct) => (acc << 8) | parseInt(oct, 10), 0) >>> 0;
}

function intToIp(n: number): string {
  return [(n >>> 24) & 0xff, (n >>> 16) & 0xff, (n >>> 8) & 0xff, n & 0xff].join('.');
}

function ipClass(first: number): string {
  if (first < 128) return 'A';
  if (first < 192) return 'B';
  if (first < 224) return 'C';
  if (first < 240) return 'D (Multicast)';
  return 'E (Reserved)';
}

function calculate(cidr: string): CidrInfo {
  const [ipPart, prefixStr] = cidr.split('/');
  const prefix = parseInt(prefixStr, 10);
  if (prefix < 0 || prefix > 32) throw new Error('Prefix must be 0–32.');

  const octets = ipPart.split('.');
  if (octets.length !== 4 || octets.some((o) => isNaN(parseInt(o)) || parseInt(o) < 0 || parseInt(o) > 255)) {
    throw new Error('Invalid IP address.');
  }

  const mask = prefix === 0 ? 0 : (~0 << (32 - prefix)) >>> 0;
  const ipInt = ipToInt(ipPart);
  const networkInt = (ipInt & mask) >>> 0;
  const broadcastInt = (networkInt | ~mask) >>> 0;
  const totalHosts = Math.pow(2, 32 - prefix);
  const usableHosts = prefix >= 31 ? totalHosts : Math.max(0, totalHosts - 2);

  return {
    network: intToIp(networkInt),
    broadcast: intToIp(broadcastInt),
    firstHost: prefix >= 31 ? intToIp(networkInt) : intToIp(networkInt + 1),
    lastHost: prefix >= 31 ? intToIp(broadcastInt) : intToIp(broadcastInt - 1),
    subnetMask: intToIp(mask),
    wildcardMask: intToIp(~mask >>> 0),
    totalHosts,
    usableHosts,
    prefix,
    ipClass: ipClass(parseInt(octets[0], 10)),
  };
}

export default function CidrCalculator() {
  const [input, setInput] = useState('');
  const [info, setInfo] = useState<CidrInfo | null>(null);
  const [error, setError] = useState('');

  const calc = () => {
    setError('');
    setInfo(null);
    try {
      if (!input.includes('/')) throw new Error('Enter a CIDR block, e.g. 192.168.1.0/24');
      setInfo(calculate(input.trim()));
    } catch (e) {
      setError(String(e).replace('Error: ', ''));
    }
  };

  const rows = info
    ? [
        { label: 'Network Address', value: `${info.network}/${info.prefix}` },
        { label: 'Broadcast', value: info.broadcast },
        { label: 'First Usable Host', value: info.firstHost },
        { label: 'Last Usable Host', value: info.lastHost },
        { label: 'Subnet Mask', value: info.subnetMask },
        { label: 'Wildcard Mask', value: info.wildcardMask },
        { label: 'Total Addresses', value: info.totalHosts.toLocaleString() },
        { label: 'Usable Hosts', value: info.usableHosts.toLocaleString() },
        { label: 'IP Class', value: info.ipClass },
      ]
    : [];

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <TextField
        label="CIDR block"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="192.168.1.0/24"
        fullWidth
        slotProps={{ input: { style: { fontFamily: 'var(--font-geist-mono)', fontSize: 14 } } }}
        error={!!error}
        helperText={error || ' '}
        onKeyDown={(e) => e.key === 'Enter' && calc()}
      />

      <Box display="flex" gap={1} flexWrap="wrap">
        <Button variant="contained" startIcon={<NetworkCheckIcon />} onClick={calc}>
          Calculate
        </Button>
        {['10.0.0.0/8', '172.16.0.0/12', '192.168.0.0/16'].map((cidr) => (
          <Chip
            key={cidr}
            label={cidr}
            size="small"
            variant="outlined"
            onClick={() => { setInput(cidr); setError(''); setInfo(null); }}
            sx={{ cursor: 'pointer', fontFamily: 'var(--font-geist-mono)' }}
          />
        ))}
      </Box>

      {info && (
        <Box sx={{ bgcolor: 'rgba(0,0,0,0.45)', borderRadius: 1, p: 2 }}>
          <Grid container spacing={1}>
            {rows.map(({ label, value }, i) => (
              <Grid size={12} key={label}>
                <Box display="flex" justifyContent="space-between" alignItems="center" py={0.5}>
                  <Typography variant="caption" color="text.secondary">
                    {label}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ fontFamily: 'var(--font-geist-mono)', textAlign: 'right' }}
                  >
                    {value}
                  </Typography>
                </Box>
                {i < rows.length - 1 && <Divider />}
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
}
