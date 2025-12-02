import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { scheduleData } from '../data/fullScheduleData';
import { useTaskDatabase } from '../context/TaskDatabaseContext';
import ProgressRing from '../components/ui/ProgressRing';
import ProgressBar from '../components/ui/ProgressBar';
import CategoryBadge from '../components/ui/CategoryBadge';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';

const Progress = () => {
  const { tasks, getMonthProgress } = useTaskDatabase();

  // Calculate various statistics
  const stats = useMemo(() => {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(t => t.completed).length;
    const overallProgress = (completedTasks / totalTasks) * 100;

    // Category breakdown
    const categoryStats = {};
    tasks.forEach(task => {
      if (!categoryStats[task.category]) {
        categoryStats[task.category] = { total: 0, completed: 0 };
      }
      categoryStats[task.category].total++;
      if (task.completed) categoryStats[task.category].completed++;
    });

    // Difficulty breakdown
    const difficultyStats = {};
    tasks.forEach(task => {
      if (!difficultyStats[task.difficulty]) {
        difficultyStats[task.difficulty] = { total: 0, completed: 0 };
      }
      difficultyStats[task.difficulty].total++;
      if (task.completed) difficultyStats[task.difficulty].completed++;
    });

    // Month progress
    const monthProgress = scheduleData.months.map(month => ({
      id: month.id,
      name: month.name,
      progress: getMonthProgress(month.id)
    }));

    return {
      totalTasks,
      completedTasks,
      pendingTasks: totalTasks - completedTasks,
      overallProgress,
      categoryStats,
      difficultyStats,
      monthProgress
    };
  }, [tasks, getMonthProgress]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
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
            <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-3">
              Progress <span className="text-gradient">Analytics</span> 📊
            </h1>
            <p className="text-lg text-text-secondary">
              Track your journey through the 10-month study plan
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-8"
        >
          {/* Overall Progress Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main progress ring */}
            <motion.div variants={item}>
              <Card className="h-full">
                <CardContent className="text-center py-8">
                  <h3 className="text-lg font-semibold text-text-primary mb-6">
                    Overall Completion
                  </h3>
                  <div className="flex justify-center mb-4">
                    <ProgressRing progress={stats.overallProgress} size={180} strokeWidth={12} />
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div>
                      <div className="text-2xl font-bold text-green-400">{stats.completedTasks}</div>
                      <div className="text-xs text-text-secondary">Completed</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-amber-400">{stats.pendingTasks}</div>
                      <div className="text-xs text-text-secondary">Pending</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Stats cards */}
            <motion.div variants={item} className="lg:col-span-2 grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="text-center py-6">
                  <div className="text-5xl mb-3">🎯</div>
                  <div className="text-3xl font-bold text-gradient mb-1">
                    {stats.totalTasks}
                  </div>
                  <div className="text-sm text-text-secondary">Total Tasks</div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="text-center py-6">
                  <div className="text-5xl mb-3">📅</div>
                  <div className="text-3xl font-bold text-gradient mb-1">
                    {scheduleData.months.length}
                  </div>
                  <div className="text-sm text-text-secondary">Months</div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="text-center py-6">
                  <div className="text-5xl mb-3">⚡</div>
                  <div className="text-3xl font-bold text-gradient mb-1">
                    {Math.round((stats.completedTasks / stats.totalTasks) * 100)}%
                  </div>
                  <div className="text-sm text-text-secondary">Completion Rate</div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="text-center py-6">
                  <div className="text-5xl mb-3">🔥</div>
                  <div className="text-3xl font-bold text-gradient mb-1">
                    {stats.monthProgress.filter(m => m.progress === 100).length}
                  </div>
                  <div className="text-sm text-text-secondary">Completed Months</div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Category Breakdown */}
          <motion.div variants={item}>
            <Card>
              <CardHeader>
                <CardTitle>📚 Progress by Category</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {Object.entries(stats.categoryStats)
                    .sort(([, a], [, b]) => b.total - a.total)
                    .map(([category, data]) => {
                      const progress = (data.completed / data.total) * 100;
                      return (
                        <div key={category}>
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-3">
                              <CategoryBadge category={category} animate />
                              <span className="text-sm text-text-secondary">
                                {data.completed} / {data.total} tasks
                              </span>
                            </div>
                            <div className="flex items-center space-x-4">
                              <span className="text-lg font-bold text-gradient">
                                {Math.round(progress)}%
                              </span>
                              <div className="w-16">
                                <ProgressRing 
                                  progress={progress} 
                                  size={50} 
                                  strokeWidth={4}
                                  showLabel={false}
                                />
                              </div>
                            </div>
                          </div>
                          <ProgressBar progress={progress} height={8} />
                        </div>
                      );
                    })}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Difficulty Breakdown */}
          <motion.div variants={item}>
            <Card>
              <CardHeader>
                <CardTitle>⚡ Progress by Difficulty</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {Object.entries(stats.difficultyStats)
                    .sort(([a], [b]) => {
                      const order = { 'EASY': 1, 'MODERATE': 2, 'HARD': 3, 'FLEXIBLE': 4 };
                      return (order[a] || 5) - (order[b] || 5);
                    })
                    .map(([difficulty, data]) => {
                      const progress = (data.completed / data.total) * 100;
                      return (
                        <div key={difficulty} className="text-center">
                          <div className="flex justify-center mb-3">
                            <ProgressRing 
                              progress={progress} 
                              size={100} 
                              strokeWidth={6}
                            />
                          </div>
                          <div className="text-lg font-semibold text-text-primary mb-1">
                            {difficulty.charAt(0) + difficulty.slice(1).toLowerCase()}
                          </div>
                          <div className="text-sm text-text-secondary">
                            {data.completed}/{data.total} tasks
                          </div>
                        </div>
                      );
                    })}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Month Progress */}
          <motion.div variants={item}>
            <Card>
              <CardHeader>
                <CardTitle>📅 Progress by Month</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {stats.monthProgress.map((month) => (
                    <div key={month.id}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <span className="text-sm font-semibold text-primary-400 min-w-[60px]">
                            Month {month.id}
                          </span>
                          <span className="text-sm text-text-secondary line-clamp-1">
                            {month.name}
                          </span>
                        </div>
                        <span className="text-sm font-bold text-gradient ml-4">
                          {Math.round(month.progress)}%
                        </span>
                      </div>
                      <ProgressBar progress={month.progress} height={6} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Performance Summary */}
          <motion.div variants={item}>
            <Card className="bg-gradient-to-br from-primary-600/10 to-accent-purple/10 border-primary-500/20">
              <CardContent className="text-center py-12">
                <div className="text-6xl mb-4">
                  {stats.overallProgress >= 80 ? '🏆' : stats.overallProgress >= 50 ? '🎯' : stats.overallProgress >= 25 ? '💪' : '🚀'}
                </div>
                <h3 className="text-2xl font-bold text-text-primary mb-2">
                  {stats.overallProgress >= 80 ? 'Outstanding Progress!' :
                   stats.overallProgress >= 50 ? 'Great Work!' :
                   stats.overallProgress >= 25 ? 'Keep It Up!' :
                   'Just Getting Started!'}
                </h3>
                <p className="text-text-secondary max-w-2xl mx-auto">
                  {stats.overallProgress >= 80 
                    ? "You're crushing it! Keep up the incredible momentum."
                    : stats.overallProgress >= 50
                    ? "You're over halfway there. The finish line is in sight!"
                    : stats.overallProgress >= 25
                    ? "Solid progress! Stay consistent and you'll get there."
                    : "Every journey starts with a single step. You've got this!"}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Progress;
