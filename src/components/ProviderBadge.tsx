import React from 'react';

interface ProviderBadgeProps {
  name: string;
  color: string;
  isActive?: boolean;
}

const getColorClasses = (color: string) => {
  const colors = {
    emerald: 'bg-emerald-400 text-emerald-400',
    purple: 'bg-purple-400 text-purple-400',
    cyan: 'bg-cyan-400 text-cyan-400',
    pink: 'bg-pink-400 text-pink-400',
    blue: 'bg-blue-400 text-blue-400'
  };

  return colors[color as keyof typeof colors] || colors.blue;
};

const ProviderBadge: React.FC<ProviderBadgeProps> = ({ name, color, isActive = true }) => {
  const colorClasses = getColorClasses(color);
  const [bgColor, textColor] = colorClasses.split(' ');

  return (
    <div className={`
      flex items-center space-x-2 
      ${isActive ? textColor : 'text-gray-500'}
      transition-colors duration-200
      text-sm
    `}>
      <div className={`
        w-2 h-2 rounded-full 
        ${isActive ? bgColor : 'bg-gray-500'}
        transition-colors duration-200
      `} />
      <span>{name}</span>
    </div>
  );
};

export default ProviderBadge; 