import { useEffect, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

export const useSupabaseSync = (userId, tasks, setTasks) => {
  const isConfigured = isSupabaseConfigured();

  // Load tasks from Supabase on mount
  useEffect(() => {
    if (!isConfigured || !userId) return;

    const loadTasks = async () => {
      try {
        const { data, error } = await supabase
          .from('tasks')
          .select('*')
          .eq('user_id', userId)
          .order('id');

        if (error) {
          console.error('Error loading tasks:', error);
          return;
        }

        if (data && data.length > 0) {
          // Convert database format to app format
          const loadedTasks = data.map(dbTask => ({
            id: dbTask.task_id,
            monthId: dbTask.month_id,
            weekId: dbTask.week_id,
            monthName: dbTask.month_name,
            weekName: dbTask.week_name,
            category: dbTask.category,
            categoryGoal: dbTask.category_goal,
            task: dbTask.task_text,
            startDate: dbTask.start_date,
            endDate: dbTask.end_date,
            difficulty: dbTask.difficulty,
            completed: dbTask.completed,
            notes: dbTask.notes || '',
            resources: dbTask.resources || ''
          }));
          setTasks(loadedTasks);
        }
      } catch (err) {
        console.error('Failed to load tasks:', err);
      }
    };

    loadTasks();
  }, [userId, isConfigured, setTasks]);

  // Save tasks to Supabase
  const saveTasks = useCallback(async (tasksToSave) => {
    if (!isConfigured || !userId) return;

    try {
      // Convert app format to database format
      const dbTasks = tasksToSave.map(task => ({
        user_id: userId,
        task_id: task.id,
        month_id: task.monthId,
        week_id: task.weekId,
        month_name: task.monthName,
        week_name: task.weekName,
        category: task.category,
        category_goal: task.categoryGoal,
        task_text: task.task,
        start_date: task.startDate,
        end_date: task.endDate,
        difficulty: task.difficulty,
        completed: task.completed,
        notes: task.notes,
        resources: task.resources
      }));

      // Upsert (update or insert)
      const { error } = await supabase
        .from('tasks')
        .upsert(dbTasks, { 
          onConflict: 'user_id,task_id',
          ignoreDuplicates: false 
        });

      if (error) {
        console.error('Error saving tasks:', error);
      }
    } catch (err) {
      console.error('Failed to save tasks:', err);
    }
  }, [userId, isConfigured]);

  return { saveTasks, isConfigured };
};

