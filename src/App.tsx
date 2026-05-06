import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { ThemeProvider } from './theme';
import { Landing } from './routes/Landing';
import { ConsumerRoute } from './routes/ConsumerRoute';
import { PartnerRoute } from './routes/PartnerRoute';
import { InstallPrompt } from './components/InstallPrompt';

export function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/app" element={<ConsumerRoute />} />
          <Route path="/partner" element={<PartnerRoute />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <RouteAwareInstallPrompt />
      </BrowserRouter>
    </ThemeProvider>
  );
}

function RouteAwareInstallPrompt() {
  const { pathname } = useLocation();
  // The partner dashboard isn't an installable consumer surface, so we skip the install pitch there.
  const enabled = !pathname.startsWith('/partner');
  return <InstallPrompt enabled={enabled} />;
}
