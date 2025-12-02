import React, { createContext, useContext, useState, useEffect } from 'react';
import { scheduleData } from '../data/fullScheduleData';
import { useSupabaseSync } from '../hooks/useSupabaseSync';
import { isSupabaseConfigured } from '../lib/supabase';
import { useAuth } from './AuthContext';

const TaskDatabaseContext = createContext();

export const useTaskDatabase = () => {
  const context = useContext(TaskDatabaseContext);
  if (!context) {
    throw new Error('useTaskDatabase must be used within a TaskDatabaseProvider');
  }
  return context;
};

// Generate task database from schedule data
const generateInitialTasks = () => {
  const tasks = [];
  let taskId = 1;

  scheduleData.months.forEach(month => {
    month.weeks.forEach(week => {
      if (week.isBreak) {
        // Skip break weeks - we don't have them anymore
      } else {
        week.categories.forEach(category => {
          category.tasks.forEach(taskText => {
            tasks.push({
              id: `task-${taskId++}`,
              monthId: month.id,
              weekId: week.id,
              monthName: month.name,
              weekName: week.name,
              category: category.name,
              categoryGoal: category.goal,
              task: taskText,
              difficulty: week.difficulty,
              completed: false,
              notes: "",
              resources: category.resources
            });
          });
        });
      }
    });
  });

  return tasks;
};

export const TaskDatabaseProvider = ({ children }) => {
  const { user, isGuest } = useAuth();
  
  // Use authenticated user ID, or 'guest' for guest mode, or 'local-user' for local auth
  const userId = user?.id || (isGuest ? 'guest' : 'local-user');

  const [tasks, setTasks] = useState(() => {
    // First try localStorage (immediate load)
    const saved = localStorage.getItem('task_database');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return generateInitialTasks();
      }
    }
    return generateInitialTasks();
  });

  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const hasSupabase = isSupabaseConfigured();

  // Only sync with Supabase if user is logged in (not guest mode)
  const shouldSyncUserId = (user && !isGuest) ? userId : null;
  
  // Supabase sync hook
  const { saveTasks } = useSupabaseSync(shouldSyncUserId, tasks, setTasks);

  // Monitor online/offline status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Save to both localStorage (immediate) and Supabase (when online)
  useEffect(() => {
    // Always save to localStorage for offline access
    localStorage.setItem('task_database', JSON.stringify(tasks));

    // If Supabase is configured and online, sync to cloud
    if (hasSupabase && isOnline) {
      const debounceTimer = setTimeout(() => {
        saveTasks(tasks);
      }, 1000); // Debounce saves by 1 second

      return () => clearTimeout(debounceTimer);
    }
  }, [tasks, hasSupabase, isOnline, saveTasks]);

  const updateTask = (taskId, updates) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, ...updates } : task
      )
    );
  };

  const toggleTaskCompletion = (taskId) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Removed date functions - we're week-based now!

  const updateTaskNotes = (taskId, notes) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, notes } : task
      )
    );
  };

  const getTasksByWeek = (monthId, weekId) => {
    return tasks.filter(task => task.monthId === monthId && task.weekId === weekId);
  };

  const getTasksByMonth = (monthId) => {
    return tasks.filter(task => task.monthId === monthId);
  };

  const getWeekProgress = (monthId, weekId) => {
    const weekTasks = getTasksByWeek(monthId, weekId);
    if (weekTasks.length === 0) return 0;
    const completed = weekTasks.filter(t => t.completed).length;
    return (completed / weekTasks.length) * 100;
  };

  const getMonthProgress = (monthId) => {
    const monthTasks = getTasksByMonth(monthId);
    if (monthTasks.length === 0) return 0;
    const completed = monthTasks.filter(t => t.completed).length;
    return (completed / monthTasks.length) * 100;
  };

  const getOverallProgress = () => {
    if (tasks.length === 0) return 0;
    const completed = tasks.filter(t => t.completed).length;
    return (completed / tasks.length) * 100;
  };

  const exportToCSV = () => {
    const headers = ['ID', 'Month', 'Week', 'Category', 'Goal', 'Task', 'Start Date', 'End Date', 'Difficulty', 'Completed', 'Notes', 'Resources'];
    const rows = tasks.map(task => [
      task.id,
      task.monthName,
      task.weekName,
      task.category,
      task.categoryGoal,
      task.task,
      task.startDate,
      task.endDate,
      task.difficulty,
      task.completed ? 'Yes' : 'No',
      task.notes,
      task.resources
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `study-plan-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const resetDatabase = () => {
    const newTasks = generateInitialTasks();
    setTasks(newTasks);
  };

  const clearAllProgress = () => {
    setTasks(prevTasks =>
      prevTasks.map(task => ({ ...task, completed: false, notes: '' }))
    );
  };

  const syncStatus = {
    hasSupabase,
    isOnline,
    syncEnabled: hasSupabase && isOnline
  };

  return (
    <TaskDatabaseContext.Provider value={{
      tasks,
      updateTask,
      toggleTaskCompletion,
      updateTaskNotes,
      getTasksByWeek,
      getTasksByMonth,
      getWeekProgress,
      getMonthProgress,
      getOverallProgress,
      exportToCSV,
      resetDatabase,
      clearAllProgress,
      syncStatus,
      userId
    }}>
      {children}
    </TaskDatabaseContext.Provider>
  );
};
