import React from "react";
import { RevealSection } from "../Wedding/RevealSection";
import { EventCard } from "../Wedding/EventCard"; 
import { useInView } from "react-intersection-observer";

export const WeddingImages = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2, 
  });

  return (
    <div 
      ref={ref} 
      className="flex items-center justify-center gap-2 md:gap-8 mb-20 md:mb-32 max-w-5xl mx-auto h-[250px] md:h-[550px] antialiased px-2"
    >
      {/* 1. Ảnh trái - Bay từ trái sang */}
      <div 
        className={`w-[28%] md:w-1/4 h-[75%] overflow-hidden shadow-lg bg-stone-100 transition-all duration-[1200ms] ease-out delay-300
          ${inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"}`}
      >
        <img
          src="VHH_0171.jpg"
          className="w-full h-full object-cover transition-transform duration-[2s] hover:scale-110"
          alt="Wedding decor 1"
        />
      </div>

      {/* 2. Ảnh giữa - Trồi từ dưới lên và phóng to nhẹ */}
      <div 
        className={`w-[40%] md:w-1/3 h-full overflow-hidden shadow-2xl border-[5px] md:border-[12px] border-white bg-stone-100 relative z-10 transition-all duration-[1500ms] ease-out
          ${inView ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-16 scale-95"}`}
      >
        <img
          src="1.jpg"
          className="w-full h-full object-cover transition-transform duration-[2s] hover:scale-110"
          alt="Wedding decor 2"
        />
      </div>

      {/* 3. Ảnh phải - Bay từ phải sang */}
      <div 
        className={`w-[28%] md:w-1/4 h-[75%] overflow-hidden shadow-lg bg-stone-100 transition-all duration-[1200ms] ease-out delay-500
          ${inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"}`}
      >
        <img
          src="VHH_0526.jpg"
          className="w-full h-full object-cover transition-transform duration-[2s] hover:scale-110"
          alt="Wedding decor 3"
        />
      </div>
    </div>
  );
};
export const Events = () => {
  return (
    <RevealSection className="py-12 md:py-24 px-4 md:px-6 bg-[#FDFBF9] border-y border-stone-100 overflow-hidden">
      <div className="max-w-6xl mx-auto text-center">
        
        {/* Tiêu đề */}
        <h2 className="reveal-up text-4xl md:text-7xl font-light italic text-stone-800 mb-12 md:mb-20 px-2">
          Trân Trọng Kính Mời
        </h2>

        <WeddingImages />

        {/* Danh sách sự kiện với Animation Delay */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 lg:gap-20 px-2 md:px-0">
          
          <EventCard
            title="Lễ Vu Quy"
            date="02"
            lunarDate="(Tức ngày 17 tháng 04 năm Bính Ngọ)"
            time="09:00 Sáng"
            location="Tư gia nhà gái"
            address="Thôn Việt Trung, Nam Sầm Sơn"
            address2="Thanh Hóa"
            mapUrl="https://maps.app.goo.gl/BfGRRb9U5rkmFUtF8"
            side="left"   
            delay={200}   
          />

          <EventCard
            title="Tiệc Cưới"
            date="09"
            lunarDate="(Tức ngày 24 tháng 04 năm Bính Ngọ)"
            time="09:00 Sáng"
            location="Nhà hàng Thiện An"
            address="Thôn 5, Phú Xuân, Krông Năng"
            address2="Đắk Lắk"
            mapUrl="https://maps.google.com/?q=Nhà+hàng+Thiện+An+Krông+Năng"
            type="groom"
            side="right"  
            delay={500}   
          />
          
        </div>
      </div>
    </RevealSection>
  );
};