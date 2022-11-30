import React from "react";

export default function MainButton({ buttonText, onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-[#a631f0] text-sm md:text-base w-[120px] md:w-[130px] mx-2 shadow-xl hover:shadow-2xl hover:bg-[#ababff] text-white font-bold py-1 px-3 rounded-[25px]"
    >
      {buttonText}
    </button>
  );
}
