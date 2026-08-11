import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { DashboardPage } from '@/pages/DashboardPage';
import { HomePage } from '@/pages/HomePage';
import { LoginPage } from '@/pages/LoginPage';
import { OnboardingPage } from '@/pages/OnboardingPage';
import { SignupPage } from '@/pages/SignupPage';
import { RequireAuth } from '@/routes/RequireAuth';
import { RequireOnboardingStatus } from '@/routes/RequireOnboardingStatus';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route element={<RequireAuth />}>
          <Route element={<RequireOnboardingStatus requireCompleted={false} />}>
            <Route path="/onboarding" element={<OnboardingPage />} />
          </Route>
          <Route path="/dashboard" element={<DashboardPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
