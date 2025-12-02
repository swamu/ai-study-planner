import React from 'react';
import { useTaskDatabase } from '../context/TaskDatabaseContext';

const SyncStatus = () => {
  const { syncStatus } = useTaskDatabase();

  const getStatusConfig = () => {
    if (!syncStatus.hasSupabase) {
      return {
        color: 'bg-gray-400',
        text: 'Local Only',
        icon: '💾'
      };
    }
    
    if (!syncStatus.isOnline) {
      return {
        color: 'bg-amber-400',
        text: 'Offline',
        icon: '📡'
      };
    }
    
    return {
      color: 'bg-green-500',
      text: 'Synced',
      icon: '☁️'
    };
  };

  const config = getStatusConfig();

  return (
    <div className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-gray-50 border border-border">
      <div className={`w-2 h-2 rounded-full ${config.color}`} />
      <span className="text-xs font-medium text-text-secondary">{config.text}</span>
      <span className="text-sm">{config.icon}</span>
    </div>
  );
};

export default SyncStatus;
