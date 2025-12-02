import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { TaskDatabaseProvider } from './context/TaskDatabaseContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navigation from './components/Navigation';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import MonthView from './pages/MonthView';
import WeekView from './pages/WeekView';
import Progress from './pages/Progress';
import TaskDatabase from './pages/TaskDatabase';
import FinalPrep from './pages/FinalPrep';

function App() {
  return (
    <AuthProvider>
      <TaskDatabaseProvider>
        <Router>
          <div className="min-h-screen bg-background">
            <Routes>
              {/* Public route */}
              <Route path="/login" element={<Login />} />
              
              {/* Protected routes */}
              <Route path="/*" element={
                <ProtectedRoute>
                  <Navigation />
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/month/:monthId" element={<MonthView />} />
                    <Route path="/month/:monthId/week/:weekId" element={<WeekView />} />
                    <Route path="/progress" element={<Progress />} />
                    <Route path="/database" element={<TaskDatabase />} />
                    <Route path="/final-prep" element={<FinalPrep />} />
                  </Routes>
                </ProtectedRoute>
              } />
            </Routes>
          </div>
        </Router>
      </TaskDatabaseProvider>
    </AuthProvider>
  );
}

export default App;
