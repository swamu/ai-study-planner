import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTaskDatabase } from '../context/TaskDatabaseContext';
import CategoryBadge from '../components/ui/CategoryBadge';
import DifficultyBadge from '../components/ui/DifficultyBadge';
import { Card } from '../components/ui/Card';

const TaskDatabase = () => {
  const { tasks, toggleTaskCompletion, updateTaskNotes, exportToCSV } = useTaskDatabase();

  const [filters, setFilters] = useState({
    month: 'all',
    category: 'all',
    status: 'all',
    search: ''
  });

  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [expandedRow, setExpandedRow] = useState(null);

  // Get unique values for filters
  const uniqueMonths = useMemo(() => 
    [...new Set(tasks.map(t => t.monthId))].sort((a, b) => a - b),
    [tasks]
  );

  const uniqueCategories = useMemo(() => 
    [...new Set(tasks.map(t => t.category))],
    [tasks]
  );

  // Filtered and sorted tasks
  const filteredTasks = useMemo(() => {
    let filtered = tasks.filter(task => {
      if (filters.month !== 'all' && task.monthId !== parseInt(filters.month)) return false;
      if (filters.category !== 'all' && task.category !== filters.category) return false;
      if (filters.status !== 'all') {
        if (filters.status === 'completed' && !task.completed) return false;
        if (filters.status === 'pending' && task.completed) return false;
      }
      if (filters.search && !task.task.toLowerCase().includes(filters.search.toLowerCase())) return false;
      return true;
    });

    if (sortConfig.key) {
      filtered.sort((a, b) => {
        let aVal = a[sortConfig.key];
        let bVal = b[sortConfig.key];

        if (sortConfig.key === 'completed') {
          aVal = a.completed ? 1 : 0;
          bVal = b.completed ? 1 : 0;
        }

        if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [tasks, filters, sortConfig]);

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc'
    });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return '↕️';
    return sortConfig.direction === 'asc' ? '↑' : '↓';
  };

  const stats = useMemo(() => ({
    total: filteredTasks.length,
    completed: filteredTasks.filter(t => t.completed).length,
    pending: filteredTasks.filter(t => !t.completed).length,
    progress: filteredTasks.length > 0 ? (filteredTasks.filter(t => t.completed).length / filteredTasks.length * 100).toFixed(1) : 0
  }), [filteredTasks]);

  return (
    <div className="min-h-screen bg-dark-bg">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary-600/20 via-accent-purple/20 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl font-bold text-text-primary mb-3">
              <span className="text-gradient">Task Database</span> 📋
            </h1>
            <p className="text-lg text-text-secondary">
              Excel-like view of all {tasks.length} tasks across 10 months
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card>
            <div className="text-center py-4">
              <div className="text-2xl font-bold text-gradient">{stats.total}</div>
              <div className="text-xs text-text-secondary mt-1">Total Tasks</div>
            </div>
          </Card>
          <Card>
            <div className="text-center py-4">
              <div className="text-2xl font-bold text-green-400">{stats.completed}</div>
              <div className="text-xs text-text-secondary mt-1">Completed</div>
            </div>
          </Card>
          <Card>
            <div className="text-center py-4">
              <div className="text-2xl font-bold text-amber-400">{stats.pending}</div>
              <div className="text-xs text-text-secondary mt-1">Pending</div>
            </div>
          </Card>
          <Card>
            <div className="text-center py-4">
              <div className="text-2xl font-bold text-gradient">{stats.progress}%</div>
              <div className="text-xs text-text-secondary mt-1">Progress</div>
            </div>
          </Card>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search */}
              <div>
                <label className="block text-xs font-semibold text-text-secondary mb-2">Search</label>
                <input
                  type="text"
                  placeholder="Search tasks..."
                  value={filters.search}
                  onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                  className="input w-full"
                />
              </div>

              {/* Month filter */}
              <div>
                <label className="block text-xs font-semibold text-text-secondary mb-2">Month</label>
                <select
                  value={filters.month}
                  onChange={(e) => setFilters({ ...filters, month: e.target.value })}
                  className="input w-full"
                >
                  <option value="all">All Months</option>
                  {uniqueMonths.map(m => (
                    <option key={m} value={m}>Month {m}</option>
                  ))}
                </select>
              </div>

              {/* Category filter */}
              <div>
                <label className="block text-xs font-semibold text-text-secondary mb-2">Category</label>
                <select
                  value={filters.category}
                  onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                  className="input w-full"
                >
                  <option value="all">All Categories</option>
                  {uniqueCategories.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              {/* Status filter */}
              <div>
                <label className="block text-xs font-semibold text-text-secondary mb-2">Status</label>
                <select
                  value={filters.status}
                  onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                  className="input w-full"
                >
                  <option value="all">All Status</option>
                  <option value="completed">Completed</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
              <div className="text-sm text-text-secondary">
                Showing {filteredTasks.length} of {tasks.length} tasks
              </div>
              <button
                onClick={exportToCSV}
                className="btn btn-primary text-sm"
              >
                📥 Export CSV
              </button>
            </div>
          </Card>
        </motion.div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="overflow-hidden">
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="table-header w-12">
                      <input type="checkbox" className="rounded border-gray-300" disabled />
                    </th>
                    <th className="table-header cursor-pointer hover:bg-gray-50" onClick={() => handleSort('monthId')}>
                      Month {getSortIcon('monthId')}
                    </th>
                    <th className="table-header cursor-pointer hover:bg-gray-50" onClick={() => handleSort('weekId')}>
                      Week {getSortIcon('weekId')}
                    </th>
                    <th className="table-header cursor-pointer hover:bg-gray-50 min-w-[300px]" onClick={() => handleSort('task')}>
                      Task {getSortIcon('task')}
                    </th>
                    <th className="table-header cursor-pointer hover:bg-gray-50" onClick={() => handleSort('category')}>
                      Category {getSortIcon('category')}
                    </th>
                    <th className="table-header cursor-pointer hover:bg-gray-50" onClick={() => handleSort('difficulty')}>
                      Difficulty {getSortIcon('difficulty')}
                    </th>
                    <th className="table-header cursor-pointer hover:bg-gray-50" onClick={() => handleSort('completed')}>
                      Status {getSortIcon('completed')}
                    </th>
                    <th className="table-header w-12"></th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence mode="popLayout">
                    {filteredTasks.map((task, index) => (
                      <React.Fragment key={task.id}>
                        <motion.tr
                          className={`table-row ${task.completed ? 'opacity-60' : ''}`}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ delay: index * 0.02 }}
                          layout
                        >
                          <td className="table-cell">
                            <motion.button
                              onClick={() => toggleTaskCompletion(task.id)}
                              whileTap={{ scale: 0.9 }}
                              className="cursor-pointer"
                            >
                              <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                                task.completed
                                  ? 'bg-accent-blue border-accent-blue'
                                  : 'border-gray-300 hover:border-accent-blue bg-surface'
                              }`}>
                                {task.completed && (
                                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                  </svg>
                                )}
                              </div>
                            </motion.button>
                          </td>
                          <td className="table-cell">
                            <span className="font-medium text-primary-400">M{task.monthId}</span>
                          </td>
                          <td className="table-cell">
                            <span className="text-text-secondary">W{task.weekId}</span>
                          </td>
                          <td className="table-cell">
                            <div className={`font-medium ${task.completed ? 'line-through text-text-secondary' : 'text-text-primary'}`}>
                              {task.task}
                            </div>
                            <div className="text-xs text-text-tertiary mt-1">{task.categoryGoal}</div>
                          </td>
                          <td className="table-cell">
                            <CategoryBadge category={task.category} showIcon={false} />
                          </td>
                          <td className="table-cell">
                            <DifficultyBadge difficulty={task.difficulty} showIcon={false} />
                          </td>
                          <td className="table-cell">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${
                              task.completed
                                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                            }`}>
                              {task.completed ? '✓ Done' : '○ Pending'}
                            </span>
                          </td>
                          <td className="table-cell">
                            <motion.button
                              onClick={() => setExpandedRow(expandedRow === task.id ? null : task.id)}
                              className="text-border hover:text-text-secondary p-1"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              {expandedRow === task.id ? '▼' : '▶'}
                            </motion.button>
                          </td>
                        </motion.tr>
                        
                        {/* Expanded row */}
                        <AnimatePresence>
                          {expandedRow === task.id && (
                            <motion.tr
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                            >
                              <td colSpan="10" className="border-b border-border-light">
                                <div className="p-4 bg-gray-50">
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {task.resources && (
                                      <div>
                                        <label className="block text-xs font-semibold text-text-secondary mb-2">
                                          Resources
                                        </label>
                                        <a
                                          href={task.resources}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="text-sm text-primary-400 hover:text-primary-300 break-all"
                                        >
                                          {task.resources}
                                        </a>
                                      </div>
                                    )}
                                    <div className="md:col-span-2">
                                      <label className="block text-xs font-semibold text-text-secondary mb-2">
                                        Notes
                                      </label>
                                      <textarea
                                        value={task.notes}
                                        onChange={(e) => updateTaskNotes(task.id, e.target.value)}
                                        placeholder="Add your notes..."
                                        className="input w-full text-sm resize-none"
                                        rows={2}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </td>
                            </motion.tr>
                          )}
                        </AnimatePresence>
                      </React.Fragment>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default TaskDatabase;
