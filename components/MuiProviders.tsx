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
      default: '#000014',
      paper: 'rgba(0, 0, 0, 0.7)',
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


