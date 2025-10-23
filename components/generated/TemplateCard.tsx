import React from 'react';

interface TemplateCardProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  className?: string;
}

const TemplateCard: React.FC<TemplateCardProps> = ({
  children,
  header,
  className
}) => {
  return (
    <div className={`bg-white rounded-lg border border-gray-200 shadow-md hover:shadow-lg transition-shadow ${className || ''}`}>
      {header && (
        <div className="px-6 py-4 border-b border-gray-200">
          {header}
        </div>
      )}
      <div className="px-6 py-4">
        {children}
      </div>
    </div>
  );
};

export default TemplateCard;
