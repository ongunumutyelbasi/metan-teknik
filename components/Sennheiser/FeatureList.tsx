// components/Sennheiser/FeatureList.tsx
export const FeatureList = ({ items }: { items: string[] }) => (
  <ul className="px-[20px] grid grid-cols-1 gap-y-3">
    {items.map((item, index) => (
      <li key={index} className="antialiased subpixel-antialiased flex items-start gap-3 text-[1rem] font-normal leading-[1.1] text-black">
        <span className="flex-shrink-0 mt-[7px]"> 
          <svg width="5" height="5" viewBox="0 0 6 6" fill="none">
            <circle cx="3" cy="3" r="3" fill="currentColor" />
          </svg>
        </span>
        <span>{item}</span>
      </li>
    ))}
  </ul>
);