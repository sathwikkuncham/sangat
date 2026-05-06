import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { ThemeProvider } from './theme';
import { Landing } from './routes/Landing';
import { ConsumerRoute } from './routes/ConsumerRoute';
import { PartnerRoute } from './routes/PartnerRoute';
import { BrandOptions } from './routes/BrandOptions';
import { InstallPrompt } from './components/InstallPrompt';

export function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/app" element={<ConsumerRoute />} />
          <Route path="/partner" element={<PartnerRoute />} />
          <Route path="/brand" element={<BrandOptions />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <RouteAwareInstallPrompt />
      </BrowserRouter>
    </ThemeProvider>
  );
}

function RouteAwareInstallPrompt() {
  const { pathname } = useLocation();
  // Skip the install pitch on routes that aren't the consumer experience.
  const enabled = !pathname.startsWith('/partner') && !pathname.startsWith('/brand');
  return <InstallPrompt enabled={enabled} />;
}
