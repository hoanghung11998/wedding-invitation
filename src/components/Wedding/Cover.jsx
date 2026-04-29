import React, { useEffect } from "react";
import { Heart, Sparkles, ChevronDown } from "lucide-react";

export const Cover = ({ isStarted, setIsStarted }) => {
  
  useEffect(() => {
  if (isStarted) {
    const timer = setTimeout(() => {
      const nextSection = document.getElementById("couple-section");
      if (nextSection) {
        // Cách cuộn chính xác hơn: tính khoảng cách từ đỉnh trang
        const offsetTop = nextSection.offsetTop;
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth"
        });
      }
    }, 2500); // Đảm bảo thời gian này khớp với transition của ảnh (2.5s)
    return () => clearTimeout(timer);
  }
}, [isStarted]);

  const handleScrollDown = (e) => {
  e.stopPropagation(); // Ngăn sự kiện click lan ra Cover
  const nextSection = document.getElementById("couple-section");
  if (nextSection) {
    window.scrollTo({
      top: nextSection.offsetTop,
      behavior: "smooth"
    });
  }
};

  return (
    <section 
      className="relative h-screen flex items-center justify-center overflow-hidden cursor-pointer" 
      onClick={() => setIsStarted(true)}
    >
      <div className="absolute inset-0 z-0 bg-stone-900 flex items-center justify-center overflow-hidden">
        <img src="2.jpg" className="absolute inset-0 w-full h-full object-cover blur-2xl scale-110 opacity-40" alt="Blur" />
        <img 
          src="2.jpg" 
          className={`relative z-10 h-full w-auto object-contain transition-all duration-[2.5s] ${
            isStarted ? "scale-100 blur-[3px]" : "scale-105 blur-0"
          }`} 
          alt="Main" 
        />
        <div className={`absolute inset-0 z-20 transition-colors duration-[2s] ${
          isStarted ? "bg-black/50" : "bg-black/20"
        }`}></div>
      </div>
      
      {!isStarted && (
        <div className="relative z-30 text-white/70 animate-pulse flex flex-col items-center">
          <Sparkles size={32} className="mb-2" />
          <p className="text-[10px] tracking-[0.5em] uppercase">Chạm để mở thiệp</p>
        </div>
      )}

      <div className={`relative z-30 text-center text-white px-4 transition-all duration-[1.5s] ${
        isStarted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
      }`}>
        <Heart className="mx-auto text-rose-400 mb-6 animate-pulse" fill="currentColor" size={40} />
        <h2 className="text-[12px] tracking-[0.8em] uppercase mb-8 text-rose-100">Save Our Date</h2>
        <h1 className="text-5xl md:text-7xl font-light mb-10 leading-tight">
          Hoàng Hưng <br /> <span className="text-rose-300 italic serif">&</span> <br /> Hà Phương
        </h1>
        <p className="text-3xl md:text-5xl tracking-[0.4em] font-light">09.06.2026</p>
        
        {/* Nút ChevronDown */}
        <div onClick={handleScrollDown} className="absolute bottom-[-80px] left-1/2 -translate-x-1/2 cursor-pointer opacity-70">
          <ChevronDown className="animate-bounce" size={40} />
        </div>
      </div>
    </section>
  );
};