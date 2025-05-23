import React, { useEffect } from 'react';
import { useMsal } from '@azure/msal-react';
import { InteractionStatus } from '@azure/msal-browser';
import { loginRequest } from './msalConfig';

import Header from './components/Layout/Header/Header';
import Footer from './components/Layout/Footer/Footer';
import HomePage from './components/LandingPage/HomePage';
import DetailsPage from './components/DetailsPage/DetailsPage';
import DMAccessrolesPage from './components/AccessRolesPage/DMAccessrolesPage';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import theme from './theme/theme';

function App() {
  const { instance, inProgress, accounts } = useMsal();
  const isAuthenticated = accounts.length > 0;

  useEffect(() => {
    if (!isAuthenticated && inProgress === InteractionStatus.None) {
      instance.loginRedirect(loginRequest).catch((error) => {
        console.error("Login redirect failed", error);
      });
    }
  }, [isAuthenticated, inProgress, instance]);

  if (inProgress !== InteractionStatus.None) {
    return <Box p={4}>Authenticating...</Box>;
  }

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box className="App" display="flex" flexDirection="column" minHeight="100vh">
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/details/:id" element={<DetailsPage />} />
            <Route path="/explore-access" element={<DMAccessrolesPage />} />
          </Routes>
          <Footer />
        </Box>
      </ThemeProvider>
    </Router>
  );
}

// ✅ Ensure ONLY this export at the bottom
export default App;
