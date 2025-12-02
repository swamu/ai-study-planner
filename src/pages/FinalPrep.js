import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { scheduleData } from '../data/fullScheduleData';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';

const FinalPrep = () => {
  const { finalPrep } = scheduleData;
  const [completedTasks, setCompletedTasks] = useState(() => {
    const saved = localStorage.getItem('finalPrep_completed');
    return saved ? JSON.parse(saved) : {};
  });

  const toggleTask = (sectionId, taskIndex) => {
    const key = `${sectionId}-${taskIndex}`;
    const newCompleted = {
      ...completedTasks,
      [key]: !completedTasks[key]
    };
    setCompletedTasks(newCompleted);
    localStorage.setItem('finalPrep_completed', JSON.stringify(newCompleted));
  };

  const getSectionProgress = (sectionId, tasksLength) => {
    let completed = 0;
    for (let i = 0; i < tasksLength; i++) {
      if (completedTasks[`${sectionId}-${i}`]) completed++;
    }
    return (completed / tasksLength) * 100;
  };

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
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-3">
                Final Prep & <span className="text-gradient">Portfolio</span> 🎯
              </h1>
              <p className="text-lg text-text-secondary max-w-3xl mx-auto">
                {finalPrep.description}
              </p>
              <div className="mt-6 inline-flex items-center space-x-3 px-6 py-3 glass rounded-full">
                <span className="text-text-secondary">💡 Do these at your own pace when you feel ready!</span>
              </div>
            </div>
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
          {finalPrep.sections.map((section) => {
            const progress = getSectionProgress(section.id, section.tasks.length);
            const completedCount = section.tasks.filter((_, i) => 
              completedTasks[`${section.id}-${i}`]
            ).length;

            return (
              <motion.div key={section.id} variants={item}>
                <Card>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-2xl mb-2">{section.name}</CardTitle>
                        <div className="flex items-center space-x-4 text-sm text-text-secondary">
                          <span>⏱️ {section.estimatedWeeks}</span>
                          <span>•</span>
                          <span>📝 {completedCount}/{section.tasks.length} completed</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-gradient">
                          {Math.round(progress)}%
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent>
                    {/* Progress bar */}
                    <div className="w-full bg-gray-100 rounded-full h-2 mb-6">
                      <motion.div
                        className="h-full bg-gradient-to-r from-primary-600 to-accent-purple rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      />
                    </div>

                    {/* Tasks */}
                    <div className="space-y-3">
                      {section.tasks.map((task, index) => {
                        const isCompleted = completedTasks[`${section.id}-${index}`];
                        return (
                          <motion.div
                            key={index}
                            className={`flex items-start space-x-4 p-4 rounded-lg transition-all duration-200 ${
                              isCompleted 
                                ? 'bg-gray-50 opacity-70' 
                                : 'bg-gray-100 hover:bg-white/15'
                            }`}
                            whileHover={{ x: 4 }}
                          >
                            <motion.button
                              onClick={() => toggleTask(section.id, index)}
                              className="flex-shrink-0 mt-1 cursor-pointer"
                              whileTap={{ scale: 0.9 }}
                            >
                              <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 ${
                                isCompleted
                                  ? 'bg-accent-blue border-accent-blue'
                                  : 'border-gray-300 hover:border-accent-blue bg-surface'
                              }`}>
                                {isCompleted && (
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

                            <div className="flex-1">
                              <p className={`text-text-primary ${isCompleted ? 'line-through text-text-secondary' : ''}`}>
                                {task}
                              </p>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Motivational Card */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="bg-gradient-to-br from-primary-600/10 to-accent-purple/10 border-primary-500/20">
            <CardContent className="text-center py-12">
              <div className="text-6xl mb-4">🚀</div>
              <h3 className="text-2xl font-bold text-text-primary mb-3">
                Complete Core Learning First!
              </h3>
              <p className="text-text-secondary max-w-2xl mx-auto mb-4">
                Focus on Months 1-8 first. These final prep items are meant to be done when you feel ready to apply for jobs.
                Take your time and build a strong foundation!
              </p>
              <div className="flex flex-wrap justify-center gap-3 mt-6">
                <span className="px-4 py-2 glass rounded-full text-sm">✨ No Rush</span>
                <span className="px-4 py-2 glass rounded-full text-sm">🎯 Quality Over Speed</span>
                <span className="px-4 py-2 glass rounded-full text-sm">💪 You've Got This</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default FinalPrep;

