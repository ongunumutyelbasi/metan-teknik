export const BoxContentList = ({ data }: { data: { quant: string; item: string }[] }) => (
  <ul className="list-none pb-[40px] m-0">
    {data.map((entry, index) => (
      <li key={index} className="h-[56px] flex items-center border-b border-light-gray">
        <div className="flex items-center gap-2">
          <span className="antialiased subpixel-antialiased text-[.65rem] font-normal text-black leading-[1.2]">
            ({entry.quant})
          </span>
          <span className="antialiased subpixel-antialiased text-[.65rem] font-normal text-black leading-[1.2]">
            {entry.item}
          </span>
        </div>
      </li>
    ))}
  </ul>
);