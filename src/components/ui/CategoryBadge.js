import React from 'react';

const categoryConfig = {
  'GenAI': { class: 'badge-genai', icon: '🤖' },
  'Agentic AI': { class: 'badge-agentic', icon: '🧠' },
  'Agentic': { class: 'badge-agentic', icon: '🧠' },
  'HLD': { class: 'badge-hld', icon: '🏗️' },
  'DSA': { class: 'badge-dsa', icon: '💻' },
  'Revision': { class: 'badge-revision', icon: '📝' },
  'Project': { class: 'badge-project', icon: '🚀' },
};

const CategoryBadge = ({ category, showIcon = false }) => {
  const config = categoryConfig[category] || { class: 'badge-genai', icon: '📌' };

  return (
    <span className={`badge ${config.class}`}>
      {showIcon && <span>{config.icon}</span>}
      <span>{category}</span>
    </span>
  );
};

export default CategoryBadge;
