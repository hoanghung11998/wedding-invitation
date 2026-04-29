import React from "react";
import { RevealSection } from "../Wedding/RevealSection";
import { Heart } from "lucide-react";

export const WeddingCalendar = () => {
  const daysOfWeek = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
  
  // Mảng ngày của tháng 6/2026 (Tháng 6/2026 bắt đầu từ Thứ 2)
  // Để lịch đẹp, ta thêm các ô trống (null) cho đến ngày bắt đầu
  const days = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 
    17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30
  ];

  const highlighted = [2, 9];

  return (
    <RevealSection className="py-6 bg-[#FDFBF9]">
      <div className="max-w-md mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-light italic text-stone-800 mb-2">Tháng Sáu</h2>
          <div className="w-10 h-[1px] bg-rose-300 mx-auto"></div>
          <p className="text-[10px] tracking-[0.3em] uppercase text-stone-400 mt-4">June 2026</p>
        </div>

        {/* Header các thứ trong tuần */}
        <div className="grid grid-cols-7 mb-4 border-b border-stone-100 pb-2">
          {daysOfWeek.map((day) => (
            <div key={day} className="text-center text-[10px] font-bold text-stone-400 uppercase tracking-widest">
              {day}
            </div>
          ))}
        </div>

        {/* Các ngày trong tháng */}
        <div className="grid grid-cols-7 gap-y-2">
          {/* Tháng 6/2026 bắt đầu vào Thứ 2, nên CN sẽ trống */}
          <div className="calendar-day"></div> 

          {days.map((day) => {
            const isHighlight = highlighted.includes(day);
            return (
              <div 
                key={day} 
                className={`calendar-day font-serif ${isHighlight ? "highlight-date" : ""}`}
              >
                {day}
                {isHighlight && (
                  <Heart 
                    size={8} 
                    fill="currentColor" 
                    className="absolute -bottom-1 text-white opacity-80" 
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Chú thích nhỏ bên dưới */}
        <div className="mt-12 text-center space-y-2">
          <p className="text-stone-400 text-xs italic font-light">
            "Hai trái tim, một nhịp đập, một hành trình mới bắt đầu..."
          </p>
        </div>
      </div>
    </RevealSection>
  );
};