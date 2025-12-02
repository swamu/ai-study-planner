import React from 'react';

const difficultyConfig = {
  'EASY': { class: 'badge-easy', label: 'Easy' },
  'Easy': { class: 'badge-easy', label: 'Easy' },
  'MODERATE': { class: 'badge-moderate', label: 'Moderate' },
  'Moderate': { class: 'badge-moderate', label: 'Moderate' },
  'HARD': { class: 'badge-hard', label: 'Hard' },
  'Hard': { class: 'badge-hard', label: 'Hard' },
  'FLEXIBLE': { class: 'badge-flexible', label: 'Flexible' },
  'Flexible': { class: 'badge-flexible', label: 'Flexible' },
};

const DifficultyBadge = ({ difficulty, showIcon = false }) => {
  const config = difficultyConfig[difficulty] || { class: 'badge-easy', label: difficulty };

  return (
    <span className={`badge ${config.class}`}>
      <span>{config.label}</span>
    </span>
  );
};

export default DifficultyBadge;
