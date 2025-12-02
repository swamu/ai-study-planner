import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { scheduleData } from '../data/fullScheduleData';
import { useTaskDatabase } from '../context/TaskDatabaseContext';
import ProgressRing from '../components/ui/ProgressRing';
import ProgressBar from '../components/ui/ProgressBar';
import CategoryBadge from '../components/ui/CategoryBadge';
import DifficultyBadge from '../components/ui/DifficultyBadge';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';

const MonthView = () => {
  const { monthId } = useParams();
  const navigate = useNavigate();
  const { getMonthProgress, getWeekProgress, getTasksByWeek } = useTaskDatabase();
  
  const month = scheduleData.months.find(m => m.id === parseInt(monthId));

  if (!month) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center">
        <Card>
          <CardContent className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-2xl font-bold text-text-primary mb-2">Month Not Found</h2>
            <Link to="/" className="text-primary-400 hover:text-primary-300">
              ← Back to Dashboard
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const monthProgress = getMonthProgress(month.id);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 }
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
              onClick={() => navigate('/')}
              className="flex items-center space-x-2 text-text-secondary hover:text-text-primary transition-colors mb-4"
            >
              <span>←</span>
              <span>Back to Dashboard</span>
            </button>

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <span className="text-sm font-semibold text-primary-400">
                    MONTH {month.id}
                  </span>
                  <span className="text-border">•</span>
                  <span className="text-sm text-text-secondary">4 Weeks • Start Anytime</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-3">
                  {month.name}
                </h1>
                <p className="text-lg text-text-secondary max-w-3xl">
                  {month.theme}
                </p>
              </div>

              <div className="flex-shrink-0">
                <Card className="inline-block">
                  <CardContent className="flex items-center space-x-4 py-4">
                    <ProgressRing progress={monthProgress} size={100} strokeWidth={6} />
                    <div>
                      <div className="text-sm text-text-secondary mb-1">Month Progress</div>
                      <div className="text-2xl font-bold text-text-primary">
                        {month.weeks.length} weeks
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Week Timeline */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.h2
          className="text-2xl font-bold text-text-primary mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          📅 Weekly Breakdown
        </motion.h2>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-6"
        >
          {month.weeks.map((week, index) => {
            const weekProgress = getWeekProgress(month.id, week.id);
            const weekTasks = getTasksByWeek(month.id, week.id);
            const isBreak = week.isBreak;

            return (
              <motion.div key={week.id} variants={item}>
                <Link to={`/month/${month.id}/week/${week.id}`}>
                  <Card hover className="relative overflow-hidden">
                    {/* Week header */}
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      <div className="flex-1">
                        <CardHeader>
                          <div className="flex items-center space-x-3 mb-2">
                            <span className="text-2xl">
                              {isBreak ? '☕' : '📚'}
                            </span>
                            <div>
                              <div className="flex items-center space-x-2 mb-1">
                                <CardTitle className="text-xl">
                                  {week.name}
                                </CardTitle>
                                {!isBreak && (
                                  <DifficultyBadge difficulty={week.difficulty} animate />
                                )}
                              </div>
                            </div>
                          </div>
                        </CardHeader>

                        {/* Categories */}
                        {!isBreak && week.categories && (
                          <CardContent>
                            <div className="flex flex-wrap gap-2">
                              {week.categories.map((cat, i) => (
                                <CategoryBadge key={i} category={cat.name} animate />
                              ))}
                            </div>
                          </CardContent>
                        )}
                      </div>

                      {/* Progress */}
                      <div className="flex items-center space-x-6 px-6">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-text-primary mb-1">
                            {weekTasks.filter(t => t.completed).length}
                          </div>
                          <div className="text-xs text-text-secondary">Completed</div>
                        </div>

                        <div className="flex-shrink-0">
                          <ProgressRing 
                            progress={weekProgress} 
                            size={80} 
                            strokeWidth={6}
                            showLabel={false}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Progress bar */}
                    <div className="mt-4">
                      <ProgressBar progress={weekProgress} />
                    </div>

                    {/* Hover indicator */}
                    <motion.div
                      className="absolute top-0 right-0 m-4 text-border"
                      whileHover={{ x: 5 }}
                    >
                      →
                    </motion.div>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Summary Stats */}
        <motion.div
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardContent className="text-center py-6">
              <div className="text-4xl mb-2">📊</div>
              <div className="text-2xl font-bold text-gradient mb-1">
                {Math.round(monthProgress)}%
              </div>
              <div className="text-sm text-text-secondary">Month Progress</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="text-center py-6">
              <div className="text-4xl mb-2">📝</div>
              <div className="text-2xl font-bold text-gradient mb-1">
                {month.weeks.length}
              </div>
              <div className="text-sm text-text-secondary">Total Weeks</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="text-center py-6">
              <div className="text-4xl mb-2">✅</div>
              <div className="text-2xl font-bold text-gradient mb-1">
                {month.weeks.filter(w => getWeekProgress(month.id, w.id) === 100).length}
              </div>
              <div className="text-sm text-text-secondary">Completed Weeks</div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default MonthView;
