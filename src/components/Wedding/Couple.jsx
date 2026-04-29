import React from "react";
import { Heart } from "lucide-react";
import { RevealSection } from "./RevealSection";
import { useInView } from "react-intersection-observer";

export const FamilyInfo = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <div ref={ref} className="w-full max-w-5xl mx-auto mb-12 md:mb-20 px-2 overflow-hidden">
      <div className="grid grid-cols-2 gap-4 md:gap-32 items-start relative py-4">
        
        {/* 1. Nhà Trai - Bay từ trái sang */}
        <div className={`flex flex-col space-y-4 text-center transition-all duration-[1200ms] ease-out delay-300
          ${inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"}`}>
          <div className="space-y-1">
            <h6 className="text-[8px] md:text-[10px] uppercase tracking-[0.3em] md:tracking-[0.5em] text-rose-400 font-bold">
              Nhà trai
            </h6>
            <div className="w-8 h-[1px] bg-rose-200 mx-auto mt-1"></div>
          </div>

          <div className="space-y-2">
            <p className="text-[13px] md:text-2xl text-stone-800 font-light italic leading-tight">
              ÔNG <br className="md:hidden" />
              <span className="font-normal not-italic block md:inline uppercase text-[12px] md:text-2xl tracking-wide">
                Hoàng Xuân Huệ
              </span>
            </p>
            <p className="text-[13px] md:text-2xl text-stone-800 font-light italic leading-tight">
              BÀ <br className="md:hidden" />
              <span className="font-normal not-italic block md:inline uppercase text-[12px] md:text-2xl tracking-wide">
                Nguyễn Thị Lý
              </span>
            </p>
          </div>
          <div className="text-[10px] md:text-sm text-stone-400 font-light italic tracking-wide mt-1">
            Phú Xuân, Đăk Lăk
          </div>
        </div>

        {/* 2. Đường kẻ dọc phân cách - Hiệu ứng mọc từ dưới lên */}
        <div className={`absolute left-1/2 top-0 bottom-0 w-[1px] bg-stone-100 -translate-x-1/2 transition-all duration-[1500ms] ease-in-out delay-700 origin-bottom
          ${inView ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"}`}>
        </div>

        {/* 3. Nhà Gái - Bay từ phải sang */}
        <div className={`flex flex-col space-y-4 text-center transition-all duration-[1200ms] ease-out delay-1000
          ${inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"}`}>
          <div className="space-y-1">
            <h6 className="text-[8px] md:text-[10px] uppercase tracking-[0.3em] md:tracking-[0.5em] text-rose-400 font-bold">
              Nhà gái
            </h6>
            <div className="w-8 h-[1px] bg-rose-200 mx-auto mt-1"></div>
          </div>

          <div className="space-y-2">
            <p className="text-[13px] md:text-2xl text-stone-800 font-light italic leading-tight">
              ÔNG <br className="md:hidden" />
              <span className="font-normal not-italic block md:inline uppercase text-[12px] md:text-2xl tracking-wide">
                Nguyễn Sỹ Nam
              </span>
            </p>
            <p className="text-[13px] md:text-2xl text-stone-800 font-light italic leading-tight">
              BÀ <br className="md:hidden" />
              <span className="font-normal not-italic block md:inline uppercase text-[12px] md:text-2xl tracking-wide">
                Mai Thị Hiền
              </span>
            </p>
          </div>
          <div className="text-[10px] md:text-sm text-stone-400 font-light italic tracking-wide mt-1">
            Nam Sầm Sơn, Thanh Hóa
          </div>
        </div>
      </div>
    </div>
  );
};

const HeartConfetti = () => {
  const colors = [
    "text-rose-400",
    "text-pink-300",
    "text-rose-500",
    "text-orange-200",
  ];

  return (
    <div className="absolute top-[65%] md:top-[60%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none flex items-center justify-center">
      <div className="relative">
        <Heart
          size={50}
          className="md:w-[80px] md:h-[80px] text-rose-400/90 fill-rose-400/30 animate-pulse glow-heart"
          strokeWidth={1.5}
        />
      </div>

      {/* Các hạt tim bùng nổ */}
      {[...Array(25)].map((_, i) => {
        const size = Math.random() * 15 + 8;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const delay = (Math.random() * 0.8 + 2.2).toFixed(2);

        return (
          <Heart
            key={i}
            size={size}
            className={`confetti-particle-pro absolute opacity-0 fill-current ${color}`}
            style={{
              "--tw-x": `${(Math.random() - 0.5) * 350}px`,
              "--tw-y": `${(Math.random() - 0.7) * 350}px`,
              "--tw-r": `${Math.random() * 1000}deg`,
              "--delay": `${delay}s`,
            }}
          />
        );
      })}
    </div>
  );
};


export const Couple = () => {
  // Hook để theo dõi toàn bộ section
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div
      id="couple-section"
      ref={ref}
      className="py-20 md:py-40 px-4 bg-white overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        
        {/* 1. Thông tin phụ huynh */}
        <div className={`transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <FamilyInfo />
        </div>

        {/* Container chứa cặp đôi */}
        <div className="relative flex flex-row items-start justify-center pt-24 md:pt-32 pb-10 gap-4 md:gap-12">
          
          {/* Điểm nhấn bùng nổ */}
          {inView && <HeartConfetti />}

          {/* 2. TIÊU ĐỀ BÁO TIN */}
          <div className={`absolute top-0 left-0 right-0 text-center flex flex-col items-center space-y-2 transition-all duration-1000 delay-300
            ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
            <div className="text-[10px] md:text-[12px] uppercase tracking-[0.5em] md:tracking-[0.8em] text-rose-400 font-bold">
              Trân trọng báo tin
            </div>
            <div className="text-2xl md:text-5xl font-light text-stone-400 font-serif px-2 italic">
              Lễ Thành Hôn Của Hai Con Chúng Tôi
            </div>
          </div>

          {/* CỘT CHÚ RỂ - Bay từ trái sang */}
          <div className={`flex flex-col items-center z-10 w-1/2 md:w-80 transition-all duration-[1500ms] ease-out delay-500
            ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
            
            <div className="mb-6 md:mb-10 text-center min-h-[80px] flex flex-col justify-end">
              <h3 className="text-stone-400 text-[9px] md:text-[11px] tracking-[0.3em] uppercase mb-1">
                Chú rể
              </h3>
              <h4 className="text-4xl md:text-7xl text-rose-800 font-script leading-none">
                Hoàng Hưng
              </h4>
            </div>

            <div className="relative w-full aspect-[2/3] overflow-hidden shadow-2xl rounded-t-full border-[6px] md:border-[12px] border-white ring-1 ring-stone-100 transition-transform hover:scale-[1.03] duration-700">
              <img
                src="VHH_0577.jpg"
                className="absolute inset-0 w-full h-full object-cover scale-x-[-1] object-top"
                alt="Groom"
              />
            </div>
          </div>

          {/* CỘT CÔ DÂU - Bay từ phải sang */}
          <div className={`flex flex-col items-center z-10 w-1/2 md:w-80 transition-all duration-[1500ms] ease-out delay-700
            ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
            
            <div className="mb-6 md:mb-10 text-center min-h-[80px] flex flex-col justify-end">
              <h3 className="text-stone-400 text-[9px] md:text-[11px] tracking-[0.3em] uppercase mb-1">
                Cô dâu
              </h3>
              <h4 className="text-4xl md:text-7xl text-rose-800 font-script leading-none">
                Hà Phương
              </h4>
            </div>

            <div className="relative w-full aspect-[2/3] overflow-hidden shadow-2xl rounded-t-full border-[6px] md:border-[12px] border-white ring-1 ring-stone-100 transition-transform hover:scale-[1.03] duration-700">
              <img
                src="VHH_0144.jpg"
                className="absolute inset-0 w-full h-full object-cover object-top"
                alt="Bride"
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};