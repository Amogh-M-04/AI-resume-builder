import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { AIResumeLayout } from './layouts/AIResumeLayout';
import { StepPage } from './pages/rb/StepPage';
import { ProofPage } from './pages/rb/ProofPage';
import { Home } from './pages/Home';
import { Builder } from './pages/Builder';
import { Preview } from './pages/Preview';
import { ResumeProvider } from './context/ResumeContext';

function App() {
  return (
    <BrowserRouter>
      <ResumeProvider>
        <Routes>
          {/* Main Application Routes */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/builder" element={<Builder />} />
            <Route path="/preview" element={<Preview />} />
            {/* Reusing ProofPage as requested */}
            <Route path="/proof" element={<ProofPage />} />
          </Route>

          {/* Legacy Build Track Routes */}
          <Route path="/rb" element={<AIResumeLayout />}>
            <Route path="01-problem" element={<StepPage />} />
            <Route path="02-market" element={<StepPage />} />
            <Route path="03-architecture" element={<StepPage />} />
            <Route path="04-hld" element={<StepPage />} />
            <Route path="05-lld" element={<StepPage />} />
            <Route path="06-build" element={<StepPage />} />
            <Route path="07-test" element={<StepPage />} />
            <Route path="08-ship" element={<StepPage />} />
            <Route path="proof" element={<ProofPage />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </ResumeProvider>
    </BrowserRouter>
  );
}

export default App;
