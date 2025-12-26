import React from 'react';

/**
 * @param {Object} props
 * @param {number} props.current - current slide index (1-based)
 * @param {number} props.total - total slides count
 * @param {number} [props.duration] - duration in ms for the circle animation
 * @param {string} [props.className]
 */
export default function PaginationCounter({ 
  current = 1, 
  total = 1, 
  duration = 0,
  className = '' 
}) {
  const size = 50;
  const strokeWidth = 2;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;

  return (
    <div className={`relative flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      {/* progress circle - only shows if duration is passed */}
      {duration > 0 && (
        <svg 
          key={current} // forces re-render to reset animation on slide change
          className='absolute -rotate-90' 
          width={size} 
          height={size}
        >
          {/* background ring */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill='transparent'
            stroke='#e5e7eb'
            strokeWidth={strokeWidth}
          />
          {/* animated foreground ring */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill='transparent'
            stroke='var(--color-brand-blue)'
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            style={{
              animation: `countdown ${duration}ms linear forwards`
            }}
          />
          <style>{`
            @keyframes countdown {
              from { stroke-dashoffset: ${circumference}; }
              to { stroke-dashoffset: 0; }
            }
          `}</style>
        </svg>
      )}

      {/* counter text */}
      <div className='text-[13px] font-medium text-black tabular-nums relative z-10'>
        {current} / {total}
      </div>
    </div>
  );
}