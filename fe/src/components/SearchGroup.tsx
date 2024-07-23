import { ReactNode } from "react";
import { UseFormRegister, FieldValues } from "react-hook-form";

interface SearchGroupProps {
  type: "select" | "date";
  data: { value: string; text: string }[];
  register: UseFormRegister<FieldValues>;
  name: string;
  icon: ReactNode;
  title: string;
}

const SearchGroup = ({
  type,
  data,
  register,
  name,
  icon,
  title,
}: SearchGroupProps) => {
  return (
    <div className="relative z-10 h-full">
      <div className="outline-none my-select bg-transparent w-full h-full "></div>
      <div className="absolute inset-0 p-3 flex items-center gap-2 w-full">
        <div>{icon}</div>
        <div className="w-full">
          <div className="text-[12px] text-slate-300">{title}</div>
          <div className="text-sm">
            {type === "select" ? (
              <select
                className="appearance-none outline-none border-none w-full"
                {...register(name as string)}
              >
                {data?.map((item, index) => {
                  return (
                    <option key={index} value={item.value}>
                      {item.text}
                    </option>
                  );
                })}
              </select>
            ) : (
              <input
                type="date"
                className="appearance-none border-none outline-none"
                {...register(name as string)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchGroup;
