import React from 'react';
import '../App.css'; 

export default function SeverityBadge({ level }) {
  const badgeClass = `badge badge-${level}`;
  return <span className={badgeClass}>{level.toUpperCase()}</span>;
}
