'use client';

import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import type { ReactNode } from 'react';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    background: {
      default: '#020205',
      paper: 'rgba(8, 8, 16, 0.85)',
    },
  },
  typography: {
    fontFamily: 'var(--font-geist-sans, Roboto, Helvetica, Arial, sans-serif)',
  },
});

type MuiProvidersProps = {
  children: ReactNode;
};

export default function MuiProviders({ children }: MuiProvidersProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}


