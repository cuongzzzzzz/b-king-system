// @ts-nocheck

import { useLocation } from "react-router-dom";

interface IconGroupProps {
  children: React.ReactNode;
  title: string;
  slug: string;
  type: string
  onClick: () => void
}

function IconGroup({ children, title, slug, type, onClick }: IconGroupProps) {
  // const path = useLocation();
  // console.log(path);
  const color = slug === type ? "#2474E5" : "#ffffff";
  console.log(type)

  return (
    <div
      className={`md:px-5 px-1 h-[60px] hover:text-[#2474E5] flex justify-center items-center text-[${color}] relative`}
      onClick={onClick}
    >
      {children}
      <span className="px-3">{title}</span>
      {slug === type && (
        <div
          className={`absolute bottom-0 h-[2px] inset-x-0 bg-[${color}]`}
        ></div>
      )}
    </div>
  );
}

export default IconGroup;
