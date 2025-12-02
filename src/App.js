import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TaskDatabaseProvider } from './context/TaskDatabaseContext';
import Navigation from './components/Navigation';
import Dashboard from './pages/Dashboard';
import MonthView from './pages/MonthView';
import WeekView from './pages/WeekView';
import Progress from './pages/Progress';
import TaskDatabase from './pages/TaskDatabase';
import FinalPrep from './pages/FinalPrep';

function App() {
  return (
    <TaskDatabaseProvider>
      <Router>
        <div className="min-h-screen bg-dark-bg">
          <Navigation />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/month/:monthId" element={<MonthView />} />
            <Route path="/month/:monthId/week/:weekId" element={<WeekView />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/database" element={<TaskDatabase />} />
            <Route path="/final-prep" element={<FinalPrep />} />
          </Routes>
        </div>
      </Router>
    </TaskDatabaseProvider>
  );
}

export default App;
