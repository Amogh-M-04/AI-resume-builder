import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AIResumeLayout } from './layouts/AIResumeLayout';
import { StepPage } from './pages/rb/StepPage';
import { ProofPage } from './pages/rb/ProofPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/rb/01-problem" replace />} />

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

        <Route path="*" element={<Navigate to="/rb/01-problem" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
