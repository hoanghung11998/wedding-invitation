import React from "react";
import { Calendar, Heart, MapPin, Navigation, Users } from "lucide-react";
import { RevealSection } from "./RevealSection";

/**
 * Component con cho từng thẻ sự kiện
 */
const EventCard = ({
  title,
  date,
  lunarDate,
  time,
  location,
  address,
  address2,
  mapUrl,
  type = "bride",
  side = "left",
}) => {
  const handleOpenMap = () => {
    if (mapUrl) {
      window.open(mapUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div
      className={`${side === "left" ? "reveal-left" : "reveal-right"} space-y-8 h-full`}
    >
      <div className="calendar-box p-8 md:p-10 rounded-[3rem] shadow-xl shadow-stone-200/50 bg-white relative overflow-hidden border border-rose-50 h-full flex flex-col justify-between transition-all duration-500 hover:shadow-2xl">
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

export const Events = () => {
  return (
    <RevealSection className="py-8 md:py-16 px-4 md:px-6 bg-[#FDFBF9] border-y border-stone-100 overflow-hidden">
      <div className="max-w-6xl mx-auto text-center">
        {/* Tiêu đề - Chỉnh font size nhỏ lại trên mobile */}
        <h2 className="reveal-up text-4xl md:text-7xl font-light italic text-stone-800 mb-8 md:mb-12 px-2">
          Trân Trọng Kính Mời
        </h2>

        {/* Cụm 3 ảnh - Xử lý responsive */}
        <div className="flex items-center justify-center gap-2 md:gap-8 mb-16 md:mb-24 max-w-5xl mx-auto h-[250px] md:h-[500px] antialiased">
          
          {/* Ảnh trái - Trên mobile rộng hơn một chút */}
          <div className="reveal-left delay-300 w-[28%] md:w-1/4 h-[70%] overflow-hidden shadow-lg will-change-transform bg-stone-100">
            <img
              src="VHH_0171.jpg"
              className="w-full h-full object-cover transition-transform duration-1500 hover:scale-105"
              alt="Wedding decor 1"
            />
          </div>

          {/* Ảnh giữa - Điểm nhấn chính */}
          <div className="reveal-up delay-100 w-[40%] md:w-1/3 h-full overflow-hidden shadow-2xl border-[4px] md:border-[10px] border-white will-change-transform bg-stone-100 relative z-10">
            <img
              src="1.jpg"
              className="w-full h-full object-cover transition-transform duration-1500 hover:scale-105"
              alt="Wedding decor 2"
            />
          </div>

          {/* Ảnh phải */}
          <div className="reveal-right delay-500 w-[28%] md:w-1/4 h-[70%] overflow-hidden shadow-lg will-change-transform bg-stone-100">
            <img
              src="VHH_0526.jpg"
              className="w-full h-full object-cover transition-transform duration-1500 hover:scale-105"
              alt="Wedding decor 3"
            />
          </div>
        </div>

        {/* Danh sách sự kiện - Đảm bảo grid nhảy dòng trên mobile (đã có lg:grid-cols-2) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-20 px-2 md:px-0 delay-1300">
          <EventCard
            title="Lễ Vu Quy"
            date="02"
            lunarDate="(Tức ngày 17 tháng 04 năm Bính Ngọ)"
            time="09:00 Sáng"
            location="Tư gia nhà gái"
            address="Thôn Việt Trung, Nam Sầm Sơn"
            address2="Thanh Hóa"
            mapUrl="https://maps.app.goo.gl/Y6gNiBYszJBjw4op8"
            side="left"
          />

          <EventCard
            title="Tiệc Cưới"
            date="09"
            lunarDate="(Tức ngày 24 tháng 04 năm Bính Ngọ)"
            time="09:00 Sáng"
            location="Nhà hàng Thiện An"
            address="Thôn 5, Phú Xuân, Krông Năng"
            address2="Đắk Lắk"
            mapUrl="https://maps.app.goo.gl/B2Lr6zWw4ogZLXgZ7"
            type="groom"
            side="right"
          />
        </div>
      </div>
    </RevealSection>
  );
};