'use client';

import { AppBar, Box, Button, Toolbar } from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Projects', href: '/projects' },
  { label: 'Tools', href: '/tools' },
  { label: 'Snake', href: '/snake' },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <AppBar
      position="static"
      color="transparent"
      elevation={0}
      sx={{ backgroundImage: 'none', pt: 2 }}
    >
      <Toolbar sx={{ justifyContent: 'center' }}>
        <Box display="flex" gap={1}>
          {navLinks.map((link) => (
            <Button
              key={link.href}
              component={Link}
              href={link.href}
              color="inherit"
              sx={{
                fontSize: '1.15rem',
                opacity: pathname === link.href ? 1 : 0.7,
                textTransform: 'none',
              }}
            >
              {link.label}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
}


