'use client';

import {
  Box,
  Button,
  Container,
  IconButton,
  Popover,
  Typography,
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import ChatIcon from '@mui/icons-material/Chat';
import { useState } from 'react';

const pgpKey = `-----BEGIN PGP PUBLIC KEY BLOCK-----

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
=Djul
-----END PGP PUBLIC KEY BLOCK-----`;

export default function Profile() {
  const [anchorElEmail, setAnchorElEmail] = useState<HTMLElement | null>(null);
  const [anchorElXMPP, setAnchorElXMPP] = useState<HTMLElement | null>(null);
  const [showPGPKey, setShowPGPKey] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleEmailPopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElEmail(event.currentTarget);
  };

  const handleEmailPopoverClose = () => {
    setAnchorElEmail(null);
  };

  const handleXmppPopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElXMPP(event.currentTarget);
  };

  const handleXmppPopoverClose = () => {
    setAnchorElXMPP(null);
    setCopied(false);
  };

  const togglePGPKey = () => {
    setShowPGPKey((prev) => !prev);
  };

  const copyToClipboard = (text: string) => {
    if (!navigator?.clipboard) {
      return;
    }
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const openEmail = Boolean(anchorElEmail);
  const openXMPP = Boolean(anchorElXMPP);

  return (
    <Container
      maxWidth="sm"
      sx={{
        position: 'relative',
        zIndex: 1,
        mt: { xs: 8, md: 12 },
        color: 'white',
        textAlign: 'center',
      }}
    >
      <Box>
        <Typography variant="h3" component="h1" gutterBottom>
          Justin Maksimczuk
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          Software Engineer
        </Typography>

        <Box mt={3}>
          <a
            href="https://www.linkedin.com/in/justin-maksimczuk"
            target="_blank"
            rel="noreferrer"
          >
            <IconButton aria-label="LinkedIn" color="primary">
              <LinkedInIcon fontSize="large" />
            </IconButton>
          </a>

          <a href="https://github.com/justinmaks" target="_blank" rel="noreferrer">
            <IconButton aria-label="GitHub" color="primary">
              <GitHubIcon fontSize="large" />
            </IconButton>
          </a>

          <a
            href="mailto:justin@maksimczuk.com"
            target="_blank"
            rel="noreferrer"
            onMouseEnter={handleEmailPopoverOpen}
            onMouseLeave={handleEmailPopoverClose}
          >
            <IconButton aria-label="Email" color="primary">
              <EmailIcon fontSize="large" />
            </IconButton>
          </a>

          <Popover
            id="email-popover"
            sx={{ pointerEvents: 'none' }}
            open={openEmail}
            anchorEl={anchorElEmail}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            onClose={handleEmailPopoverClose}
            disableRestoreFocus
          >
            <Typography sx={{ p: 1 }}>justin@maksimczuk.com</Typography>
          </Popover>

          <IconButton
            aria-label="XMPP"
            color="primary"
            onMouseEnter={handleXmppPopoverOpen}
            onMouseLeave={handleXmppPopoverClose}
            onClick={() => copyToClipboard('stin@xmpp.jp')}
          >
            <ChatIcon fontSize="large" />
          </IconButton>

          <Popover
            id="xmpp-popover"
            sx={{ pointerEvents: 'none' }}
            open={openXMPP}
            anchorEl={anchorElXMPP}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            onClose={handleXmppPopoverClose}
            disableRestoreFocus
          >
            <Typography sx={{ p: 1 }}>
              {copied ? 'Copied to clipboard!' : 'stin@xmpp.jp'}
            </Typography>
          </Popover>
        </Box>

        <Box mt={2}>
          <Button variant="contained" color="primary" onClick={togglePGPKey}>
            {showPGPKey ? 'Hide PGP Key' : 'Show PGP Key'}
          </Button>
        </Box>

        {showPGPKey && (
          <Box
            mt={4}
            component="pre"
            sx={{
              textAlign: 'left',
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              color: 'white',
              p: 2,
              borderRadius: 2,
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              overflow: 'auto',
              maxHeight: '55vh',
              fontSize: '12px',
            }}
          >
            {pgpKey}
          </Box>
        )}
      </Box>
    </Container>
  );
}


