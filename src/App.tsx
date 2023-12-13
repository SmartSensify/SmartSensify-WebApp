import React from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppRoutes from './AppRoutes';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="*" element={<AppRoutes />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
