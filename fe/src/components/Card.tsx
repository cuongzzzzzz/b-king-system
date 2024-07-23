// @ts-nocheck

interface CardProps {
  color: string;
}

function Card({ color }: CardProps) {
  return (
    <div>
      <img src="/card.png" className="w-full" alt="" />
      <div
        className={`w-full h-[115px] bg-[#9E947C] rounded-b-lg text-white flex flex-col gap-2 p-3`}
      >
        <p className="text-sm lg:text-[16px]">Sài Gòn - Nha Trang</p>
        <p className="text-[12px] lg:text-sm ">
          <span>Từ 200.000đ</span>{" "}
          <span className=" line-through ml-2">250.000đ</span>
        </p>
      </div>
    </div>
  );
}

export default Card;
