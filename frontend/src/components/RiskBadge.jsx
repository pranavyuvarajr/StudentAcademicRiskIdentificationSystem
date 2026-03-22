import React from 'react';

const colors = {
  HIGH:   { bg: '#fee2e2', color: '#dc2626', border: '#fca5a5' },
  MEDIUM: { bg: '#fef3c7', color: '#d97706', border: '#fcd34d' },
  LOW:    { bg: '#dcfce7', color: '#16a34a', border: '#86efac' },
};

export default function RiskBadge({ level }) {
  const c = colors[level] || colors.LOW;
  return (
    <span style={{
      background: c.bg,
      color: c.color,
      border: `1px solid ${c.border}`,
      borderRadius: 20,
      padding: '2px 10px',
      fontSize: 12,
      fontWeight: 700,
    }}>
      {level}
    </span>
  );
}
