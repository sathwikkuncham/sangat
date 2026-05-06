import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from './theme';
import { Landing } from './routes/Landing';
import { ConsumerRoute } from './routes/ConsumerRoute';
import { PartnerRoute } from './routes/PartnerRoute';

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
      </BrowserRouter>
    </ThemeProvider>
  );
}
