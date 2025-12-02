import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import SyncStatus from './SyncStatus';

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { path: '/', icon: '🏠', label: 'Dashboard' },
    { path: '/database', icon: '📋', label: 'Tasks' },
    { path: '/progress', icon: '📊', label: 'Progress' },
    { path: '/final-prep', icon: '🎯', label: 'Final Prep' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-surface border-b border-border shadow-sm">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="text-2xl">📚</div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-semibold text-text-primary">
                AI Study Planner
              </h1>
              <p className="text-xs text-text-secondary">8-Month Flexible Plan</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                  isActive(item.path)
                    ? 'bg-gray-100 text-text-primary font-medium'
                    : 'text-text-secondary hover:text-text-primary hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <span>{item.icon}</span>
                  <span className="text-sm">{item.label}</span>
                </div>
              </Link>
            ))}
          </div>

          {/* Right Side - Sync Status & User */}
          <div className="hidden md:flex items-center space-x-3">
            <SyncStatus />
            <div className="flex items-center space-x-2 text-sm text-text-secondary">
              <span>👤</span>
              <span className="max-w-[150px] truncate">{user?.email}</span>
            </div>
            <button
              onClick={handleLogout}
              className="btn btn-secondary text-sm px-3 py-1.5"
            >
              Logout
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="w-5 h-4 flex flex-col justify-between">
              <span className={`w-full h-0.5 bg-text-primary rounded-full transition-transform ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
              <span className={`w-full h-0.5 bg-text-primary rounded-full transition-opacity ${isMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`w-full h-0.5 bg-text-primary rounded-full transition-transform ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <motion.div
          className="md:hidden border-t border-border bg-surface"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
        >
          <div className="container-custom py-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg ${
                  isActive(item.path)
                    ? 'bg-gray-100 text-text-primary font-medium'
                    : 'text-text-secondary hover:bg-gray-50'
                }`}
              >
                <span>{item.icon}</span>
                <span className="text-sm">{item.label}</span>
              </Link>
            ))}
            
            <div className="pt-2 mt-2 border-t border-border space-y-2">
              <SyncStatus />
              <div className="flex items-center justify-between px-4 py-2">
                <span className="text-sm text-text-secondary truncate">{user?.email}</span>
                <button
                  onClick={handleLogout}
                  className="btn btn-secondary text-xs px-3 py-1"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navigation;
