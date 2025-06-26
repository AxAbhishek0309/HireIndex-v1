import React from 'react';
import { getScoreColor } from '@/lib/types';

interface ProgressBarProps {
  score: number;
  label?: string;
  showValue?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ 
  score, 
  label, 
  showValue = true, 
  size = 'md' 
}) => {
  const scoreColor = getScoreColor(score);
  
  const getHeightClass = () => {
    switch (size) {
      case 'sm': return 'h-2';
      case 'lg': return 'h-4';
      default: return 'h-2.5';
    }
  };
  
  return (
    <div className="w-full">
      {(label || showValue) && (
        <div className="flex justify-between mb-1">
          {label && <span className="text-sm font-medium text-gray-700">{label}</span>}
          {showValue && <span className="text-sm font-medium text-gray-700">{score}/100</span>}
        </div>
      )}
      <div className={`w-full bg-gray-200 rounded-full ${getHeightClass()}`}>
        <div 
          className={`${scoreColor} ${getHeightClass()} rounded-full`} 
          style={{ width: `${score}%` }}
        ></div>
      </div>
    </div>
  );
};
