export const HighlightsList = ({ items }: { items: { label: string; value: string }[] }) => (
  <ul className="w-full list-none p-0 m-0">
    {items.map((item, idx) => (
      <li key={idx} className="w-full h-[65px] px-[20px] grid grid-cols-2 items-center border-t border-light-gray transition-colors duration-200 hover:bg-brand-hover-blue group cursor-default">
        <span className="antialiased leading-none text-[1rem] font-medium text-dark-gray group-hover:text-white transition-colors duration-200">
          {item.label}
        </span>
        <span className="antialiased leading-none text-[1rem] font-medium text-black group-hover:text-white transition-colors duration-200">
          {item.value}
        </span>
      </li>
    ))}
  </ul>
);