import React from "react";

export const VerticalImage = ({ src, index, side, delay }) => {
  // Mapping class dựa trên prop side
  const sideClasses = {
    left: "reveal-left",
    right: "reveal-right",
    up: "reveal-up"
  };

  const revealClass = sideClasses[side] || "reveal-up";

  return (
    <div className={`${revealClass} ${delay} w-full will-change-transform`}>
      <div className="relative group overflow-hidden shadow-lg rounded-sm aspect-[3/4] border-[6px] md:border-[10px] border-white bg-stone-50 transition-all duration-800 hover:shadow-2xl antialiased">
        <img
          src={src}
          alt={`Gallery ${index}`}
          className="transition-transform duration-[4s] group-hover:scale-105 transform-gpu"
          loading="lazy"
        />
      </div>
    </div>
  );
};