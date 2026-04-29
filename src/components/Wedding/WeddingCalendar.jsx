import React from "react";
import { RevealSection } from "../Wedding/RevealSection";
import { Heart } from "lucide-react";
import { useInView } from "react-intersection-observer";

export const WeddingCalendar = () => {
  const daysOfWeek = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
  const days = Array.from({ length: 30 }, (_, i) => i + 1);
  const highlighted = [2, 9];

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <RevealSection className="py-12 bg-[#FDFBF9]">
      <div ref={ref} className="max-w-md mx-auto px-6">
        {/* Header Title */}
        <div className={`text-center mb-12 transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl font-light italic text-stone-800 mb-2">Tháng Sáu</h2>
          <div className="w-10 h-[1px] bg-rose-300 mx-auto"></div>
          <p className="text-[10px] tracking-[0.3em] uppercase text-stone-400 mt-4">June 2026</p>
        </div>

        {/* Header các thứ trong tuần */}
        <div className="grid grid-cols-7 mb-4 border-b border-stone-100 pb-2">
          {daysOfWeek.map((day, index) => (
            <div 
              key={day} 
              style={{ transitionDelay: `${index * 50}ms` }}
              className={`text-center text-[10px] font-bold text-stone-400 uppercase tracking-widest transition-all duration-700 ${inView ? 'opacity-100' : 'opacity-0'}`}
            >
              {day}
            </div>
          ))}
        </div>

        {/* Các ngày trong tháng */}
        <div className="grid grid-cols-7 gap-y-3">
          {/* Ô trống cho Thứ Hai (Tháng 6/2026 bắt đầu vào Thứ Hai, ô CN trống) */}
          <div className="h-10 w-10"></div> 

          {days.map((day, index) => {
            const isHighlight = highlighted.includes(day);
            return (
              <div 
                key={day} 
                style={{ 
                  transitionDelay: `${(index + 7) * 30}ms`, // Tạo hiệu ứng hiện lần lượt
                }}
                className={`
                  relative h-10 w-10 flex items-center justify-center text-sm font-serif transition-all duration-500
                  ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
                  ${isHighlight ? "text-white z-10" : "text-stone-600"}
                `}
              >
                {/* Vòng tròn highlight có animation riêng */}
                {isHighlight && (
                  <div className={`absolute inset-0 bg-rose-400 rounded-full -z-10 animate-calendar-pop`} 
                       style={{ animationDelay: `${(index + 7) * 30 + 500}ms` }}>
                  </div>
                )}
                
                {day}

                {/* Trái tim nhỏ bên dưới ngày highlight */}
                {isHighlight && (
                  <Heart 
                    size={8} 
                    fill="currentColor" 
                    className={`absolute -bottom-1 text-white opacity-80 animate-bounce`}
                    style={{ animationDelay: `${(index + 7) * 30 + 800}ms` }}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Chú thích nhỏ */}
        <div className={`mt-16 text-center transition-all duration-1000 delay-[1500ms] ${inView ? 'opacity-100' : 'opacity-0'}`}>
          <p className="text-stone-400 text-xs italic font-light">
            "Hai trái tim, một nhịp đập, một hành trình mới bắt đầu..."
          </p>
        </div>
      </div>
    </RevealSection>
  );
};