import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { scheduleData } from '../data/fullScheduleData';
import { useTaskDatabase } from '../context/TaskDatabaseContext';
import ProgressRing from '../components/ui/ProgressRing';
import ProgressBar from '../components/ui/ProgressBar';
import CategoryBadge from '../components/ui/CategoryBadge';
import DifficultyBadge from '../components/ui/DifficultyBadge';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';

const Dashboard = () => {
  const { getMonthProgress, getOverallProgress, tasks } = useTaskDatabase();

  // Calculate category breakdown
  const categoryStats = React.useMemo(() => {
    const stats = {};
    tasks.forEach(task => {
      if (!stats[task.category]) {
        stats[task.category] = { total: 0, completed: 0 };
      }
      stats[task.category].total++;
      if (task.completed) stats[task.category].completed++;
    });
    return stats;
  }, [tasks]);

  const overallProgress = getOverallProgress();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-surface border-b border-border">
        <div className="container-custom py-8">
          <h1 className="text-3xl font-semibold text-text-primary mb-2">
            AI Engineering Study Plan
          </h1>
          <p className="text-text-secondary">
            Flexible, week-based learning path • 8 months core + final prep when ready
          </p>
        </div>
      </div>

      <div className="container-custom py-8">
        {/* Overall Progress Section */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8"
        >
          {/* Main Progress Card */}
          <motion.div variants={item}>
            <Card className="text-center h-full">
              <CardHeader>
                <CardTitle>Overall Progress</CardTitle>
                <p className="text-sm text-text-secondary mt-1">
                  {tasks.filter(t => t.completed).length} of {tasks.length} tasks
                </p>
              </CardHeader>
              <CardContent className="flex justify-center py-4">
                <ProgressRing progress={overallProgress} size={120} />
              </CardContent>
            </Card>
          </motion.div>

          {/* Category Breakdown */}
          <motion.div variants={item} className="lg:col-span-2">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Category Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(categoryStats).slice(0, 5).map(([category, stats]) => {
                  const progress = (stats.completed / stats.total) * 100;
                  return (
                    <div key={category} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <CategoryBadge category={category} />
                        <span className="text-sm text-text-secondary">
                          {stats.completed}/{stats.total}
                        </span>
                      </div>
                      <ProgressBar progress={progress} height={6} />
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Month Grid */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-text-primary mb-4">
            8-Month Core Curriculum
          </h2>
          
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          >
            {scheduleData.months.map((month) => {
              const monthProgress = getMonthProgress(month.id);
              
              return (
                <motion.div key={month.id} variants={item}>
                  <Link to={`/month/${month.id}`}>
                    <Card hover className="h-full transition-shadow duration-200 hover:shadow-md">
                      <CardHeader>
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1 min-w-0">
                            <span className="text-xs font-medium text-accent-blue">
                              MONTH {month.id}
                            </span>
                            <CardTitle className="text-base mt-1 truncate-1">
                              {month.name}
                            </CardTitle>
                          </div>
                          <div className="flex-shrink-0 ml-2">
                            <ProgressRing 
                              progress={monthProgress} 
                              size={48} 
                              strokeWidth={4}
                              showLabel={false}
                            />
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent>
                        {/* Theme */}
                        <p className="text-sm text-text-secondary mb-3 truncate-2">
                          {month.theme}
                        </p>

                        {/* Week count and difficulty - show unique difficulties */}
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <span className="text-xs text-text-tertiary">
                            {month.weeks.length} weeks
                          </span>
                          <div className="flex gap-1 flex-wrap">
                            {[...new Set(month.weeks.map(w => w.difficulty))].slice(0, 2).map((diff, i) => (
                              <DifficultyBadge 
                                key={i} 
                                difficulty={diff}
                              />
                            ))}
                          </div>
                        </div>

                        {/* Progress bar */}
                        <div className="mt-3">
                          <ProgressBar progress={monthProgress} height={4} />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Quick Stats */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          <motion.div variants={item}>
            <Card className="text-center">
              <CardContent className="py-6">
                <div className="text-3xl mb-2">🎯</div>
                <div className="text-2xl font-semibold text-text-primary mb-1">
                  {tasks.filter(t => t.completed).length}
                </div>
                <div className="text-sm text-text-secondary">Tasks Completed</div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Card className="text-center">
              <CardContent className="py-6">
                <div className="text-3xl mb-2">📚</div>
                <div className="text-2xl font-semibold text-text-primary mb-1">
                  {scheduleData.months.length}
                </div>
                <div className="text-sm text-text-secondary">Months Total</div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Card className="text-center">
              <CardContent className="py-6">
                <div className="text-3xl mb-2">⚡</div>
                <div className="text-2xl font-semibold text-text-primary mb-1">
                  {tasks.length - tasks.filter(t => t.completed).length}
                </div>
                <div className="text-sm text-text-secondary">Tasks Remaining</div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
