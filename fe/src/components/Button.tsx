interface ButtonProps {
  size: "normal" | "lg";
  color: "black" | "white";
  bg: "white" | "yellow";
  children: string;
  rounded: boolean;
  isSubmit: boolean;
  onClick: () => void;
}

function Button({
  size = "normal",
  color = "black",
  children,
  bg = "white",
  rounded = true,
  isSubmit = false,
  onClick,
}: ButtonProps) {
  const sizes = {
    normal: "py-1 px-3 ",
    lg: "py-3 px-4 ",
  };
  const bgs = {
    yellow: "bg-yellow-400",
    white: "bg-white",
  };
  const colors = {
    white: "text-white",
    black: "text-black",
  };
  return (
    <button
      className={`${sizes[size]} ${bgs[bg]} ${colors[color]} ${
        rounded ? "rounded" : ""
      } flex items-center justify-center`}
      type={isSubmit ? "submit" : "button"}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
