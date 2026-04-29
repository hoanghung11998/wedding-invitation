import React from "react";
import { useInView } from "react-intersection-observer";

export const VerticalImage = ({ src, index, side = "up", delay = 0 }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const getInitialPosition = () => {
    switch (side) {
      case "left": return "-translate-x-12";
      case "right": return "translate-x-12";
      case "up": return "translate-y-12";
      default: return "translate-y-12";
    }
  };

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`w-full transition-all duration-[1200ms] ease-out
        ${inView ? "opacity-100 translate-x-0 translate-y-0" : `opacity-0 ${getInitialPosition()}`}
      `}
    >
      <div className="relative group overflow-hidden shadow-lg rounded-sm aspect-[3/4] border-[4px] md:border-[10px] border-white bg-stone-50 transition-all duration-800 hover:shadow-2xl">
        <img
          src={src}
          alt={`Gallery ${index}`}
          className="w-full h-full object-cover transition-transform duration-[4s] group-hover:scale-110"
        />
      </div>
    </div>
  );
};