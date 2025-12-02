import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { scheduleData } from '../data/fullScheduleData';
import { useTaskDatabase } from '../context/TaskDatabaseContext';
import CategoryBadge from '../components/ui/CategoryBadge';
import DifficultyBadge from '../components/ui/DifficultyBadge';
import ProgressBar from '../components/ui/ProgressBar';
import { Card, CardContent } from '../components/ui/Card';

const WeekView = () => {
  const { monthId, weekId } = useParams();
  const navigate = useNavigate();
  const { getTasksByWeek, toggleTaskCompletion, updateTaskNotes, getWeekProgress } = useTaskDatabase();

  const [expandedTask, setExpandedTask] = useState(null);

  const month = scheduleData.months.find(m => m.id === parseInt(monthId));
  const week = month?.weeks.find(w => w.id === parseInt(weekId));
  const tasks = getTasksByWeek(parseInt(monthId), parseInt(weekId));
  const weekProgress = getWeekProgress(parseInt(monthId), parseInt(weekId));

  if (!month || !week) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center">
        <Card>
          <CardContent className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-2xl font-bold text-text-primary mb-2">Week Not Found</h2>
            <button 
              onClick={() => navigate('/')}
              className="text-primary-400 hover:text-primary-300"
            >
              ← Back to Dashboard
            </button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleTaskClick = (taskId) => {
    setExpandedTask(expandedTask === taskId ? null : taskId);
  };

  return (
    <div className="min-h-screen bg-dark-bg">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary-600/20 via-accent-purple/20 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <button
              onClick={() => navigate(`/month/${monthId}`)}
              className="flex items-center space-x-2 text-text-secondary hover:text-text-primary transition-colors mb-4"
            >
              <span>←</span>
              <span>Back to Month {monthId}</span>
            </button>

            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <span className="text-sm font-semibold text-primary-400">
                    MONTH {monthId} • WEEK {weekId}
                  </span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-3">
                  {week.name}
                </h1>
                <div className="flex items-center space-x-3">
                  <DifficultyBadge difficulty={week.difficulty} animate />
                  {!week.isBreak && week.categories && (
                    <>
                      {week.categories.slice(0, 4).map((cat, i) => (
                        <CategoryBadge key={i} category={cat.name} animate />
                      ))}
                    </>
                  )}
                </div>
              </div>

              <Card className="inline-block min-w-[200px]">
                <CardContent className="py-4">
                  <div className="text-center mb-3">
                    <div className="text-3xl font-bold text-gradient">
                      {tasks.filter(t => t.completed).length}/{tasks.length}
                    </div>
                    <div className="text-sm text-text-secondary">Tasks Completed</div>
                  </div>
                  <ProgressBar progress={weekProgress} />
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Task Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {week.isBreak ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Card>
              <CardContent className="text-center py-12">
                <div className="text-6xl mb-4">☕</div>
                <h2 className="text-2xl font-bold text-text-primary mb-2">Break Week</h2>
                <p className="text-text-secondary">Enjoy your well-deserved rest!</p>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <div className="space-y-3">
            <motion.h2
              className="text-2xl font-bold text-text-primary mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              📝 Tasks
            </motion.h2>

            <AnimatePresence>
              {tasks.map((task, index) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card 
                    hover={false}
                    className={`transition-all duration-300 ${
                      task.completed ? 'opacity-70' : ''
                    }`}
                  >
                    <div className="flex items-start space-x-4">
                      {/* Checkbox */}
                      <motion.button
                        className="flex-shrink-0 mt-1 cursor-pointer"
                        onClick={() => toggleTaskCompletion(task.id)}
                        whileTap={{ scale: 0.9 }}
                      >
                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 ${
                          task.completed
                            ? 'bg-accent-blue border-accent-blue'
                            : 'border-gray-300 hover:border-accent-blue bg-surface'
                        }`}>
                          {task.completed && (
                            <motion.svg
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-3 h-3 text-white"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </motion.svg>
                          )}
                        </div>
                      </motion.button>

                      {/* Task content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <div className="flex-1">
                            <h3 className={`font-semibold text-text-primary mb-1 ${
                              task.completed ? 'line-through text-text-secondary' : ''
                            }`}>
                              {task.task}
                            </h3>
                            <div className="flex flex-wrap items-center gap-2 text-sm">
                              <CategoryBadge category={task.category} showIcon={false} />
                              <span className="text-border">•</span>
                              <span className="text-text-secondary">{task.categoryGoal}</span>
                            </div>
                          </div>

                          <motion.button
                            className="text-border hover:text-text-secondary p-2"
                            onClick={() => handleTaskClick(task.id)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            {expandedTask === task.id ? '▼' : '▶'}
                          </motion.button>
                        </div>


                        {/* Expanded details */}
                        <AnimatePresence>
                          {expandedTask === task.id && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="mt-4 pt-4 border-t border-border"
                            >
                              {task.resources && (
                                <div className="mb-3">
                                  <span className="text-sm font-semibold text-text-secondary mb-2 block">
                                    Resources:
                                  </span>
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

                              <div>
                                <span className="text-sm font-semibold text-text-secondary mb-2 block">
                                  Notes:
                                </span>
                                <textarea
                                  value={task.notes}
                                  onChange={(e) => updateTaskNotes(task.id, e.target.value)}
                                  placeholder="Add your notes here..."
                                  className="input w-full text-sm resize-none"
                                  rows={3}
                                />
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeekView;
