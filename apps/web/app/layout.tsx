import React from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';
import { QueryProvider } from '@web/providers/QueryProvider';

const theme = createTheme({
  palette: {
    mode: 'light',
  },
});

export const metadata = {
  title: 'Todo App - Clean Architecture Demo',
  description: 'A demonstration of clean architecture patterns with Next.js',
};

type RootLayoutProps = {
  children: React.ReactNode;
};

const RootLayout = ({ children }: RootLayoutProps): React.ReactElement => {
  return (
    <html lang='en'>
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <QueryProvider>{children}</QueryProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
};

export default RootLayout;
