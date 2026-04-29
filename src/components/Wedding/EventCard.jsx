import React from "react";
import { Calendar, Heart, MapPin, Navigation } from "lucide-react";
import { useInView } from "react-intersection-observer";

export const EventCard = ({
  title,
  date,
  lunarDate,
  time,
  location,
  address,
  address2,
  mapUrl,
  type = "bride",
  side = "left", // 'left' hoặc 'right' để quyết định hướng bay vào
  delay = 0,    // Độ trễ (ms) trước khi animation bắt đầu
}) => {
  // Cấu hình theo dõi phần tử lọt vào màn hình
  const { ref, inView } = useInView({
    triggerOnce: true, // Chỉ chạy animation một lần duy nhất
    threshold: 0.2,    // Chạy khi 20% thẻ lọt vào màn hình
  });

  const handleOpenMap = () => {
    if (mapUrl) {
      window.open(mapUrl, "_blank", "noopener,noreferrer");
    }
  };

  // Định nghĩa class animation dựa trên 'side' và trạng thái 'inView'
  const animationClass = side === "left" 
    ? (inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-16") // Bay từ trái sang
    : (inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-16");  // Bay từ phải sang

  return (
    <div
      ref={ref} // Gán ref để theo dõi
      className={`h-full transition-all duration-1000 ease-out ${animationClass}`}
      style={{ 
        // Thêm độ delay động bằng Inline Style
        transitionDelay: `${delay}ms` 
      }}
    >
      <div className="calendar-box p-8 md:p-10 rounded-[3rem] shadow-xl shadow-stone-200/50 bg-white relative overflow-hidden border border-rose-50 h-full flex flex-col justify-between transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
        <div
          className={`absolute top-0 ${side === "left" ? "right-0" : "left-0"} w-32 h-32 bg-rose-50/50 organic-frame -mr-16 -mt-16`}
        />

        <div>
          {type === "bride" ? (
            <Calendar className="text-rose-400 mx-auto mb-6" size={32} />
          ) : (
            <Heart className="text-rose-400 mx-auto mb-6" size={32} />
          )}

          <h5 className="text-3xl mb-6 font-light text-stone-800">{title}</h5>

          {/* Lịch trình */}
          <div className="mb-8 border-y border-stone-100 py-6">
            <p className="text-rose-500 font-medium tracking-widest uppercase text-[10px] mb-4">
              Tháng 6 - 2026
            </p>

            <div className="flex justify-center items-center gap-4">
              <div className="text-center opacity-30 italic text-sm">
                Thứ Hai
              </div>
              <div
                className={`w-16 h-16 ${type === "bride" ? "bg-rose-500" : "bg-stone-800"} text-white rounded-2xl flex flex-col items-center justify-center shadow-lg transform transition-transform hover:scale-105`}
              >
                <span className="text-[9px] uppercase leading-none mb-1 font-medium">
                  Thứ Ba
                </span>
                <span className="text-2xl font-bold leading-none">{date}</span>
              </div>
              <div className="text-center opacity-30 italic text-sm">
                Thứ Tư
              </div>
            </div>

            <div className="mt-5 flex flex-col items-center gap-1">
              <p className="text-stone-400 text-[10px] uppercase tracking-[0.2em] font-sans">
                {lunarDate}
              </p>
              <p className="text-stone-700 font-medium text-lg italic">
                {time}
              </p>
            </div>
          </div>

          {/* Thông tin địa điểm */}
          <div className="space-y-1 mb-10">
            <div className="flex items-center justify-center gap-2 text-stone-800">
              <MapPin size={18} className="text-rose-400" />
              <p className="text-xl font-light">{location}</p>
            </div>
            <p className="text-stone-400 text-sm leading-relaxed px-4">
              {address} <br /> {address2}
            </p>
          </div>
        </div>

        <button
          onClick={handleOpenMap}
          className="w-full py-5 bg-stone-900 text-white rounded-2xl flex items-center justify-center gap-3 hover:bg-rose-500 transition-all duration-500 group shadow-lg"
        >
          <Navigation size={18} className="group-hover:animate-pulse" />
          <span className="text-[11px] uppercase tracking-[0.3em] font-semibold">
            Chỉ đường tới buổi lễ
          </span>
        </button>
      </div>
    </div>
  );
};

