import React, { useEffect } from "react";
import { Heart, Sparkles, ChevronDown } from "lucide-react";

export const Cover = ({ isStarted, setIsStarted }) => {
  
  useEffect(() => {
  if (isStarted) {
    // Tăng thời gian chờ để khớp với hiệu ứng mờ ảnh (2.5s)
    // và đảm bảo React đã đưa "couple-section" vào DOM
    const timer = setTimeout(() => {
      const nextSection = document.getElementById("couple-section");
      
      if (nextSection) {
        // Tính toán vị trí chính xác
        const offsetTop = nextSection.getBoundingClientRect().top + window.pageYOffset;
        
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth"
        });
      } else {
        // Nếu chưa tìm thấy (do máy chậm), thử lại sau 100ms
        console.log("Đang tìm section...");
      }
    }, 2600); 

    return () => clearTimeout(timer);
  }
}, [isStarted]);

  const handleScrollDown = (e) => {
    e.stopPropagation(); // Không kích hoạt ngược lại hàm setIsStarted của cha
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
      className={`relative h-screen flex items-center justify-center overflow-hidden transition-all duration-700 ${
        isStarted ? "cursor-default" : "cursor-pointer"
      }`} 
      onClick={() => !isStarted && setIsStarted(true)}
    >
      {/* Background Images */}
      <div className="absolute inset-0 z-0 bg-stone-900 flex items-center justify-center overflow-hidden">
        <img 
          src="2.jpg" 
          className="absolute inset-0 w-full h-full object-cover blur-2xl scale-110 opacity-40" 
          alt="Blur" 
        />
        <img 
          src="2.jpg" 
          className={`relative z-10 h-full w-auto object-contain transition-all duration-[2.5s] ease-in-out ${
            isStarted ? "scale-100 blur-[3px]" : "scale-105 blur-0"
          }`} 
          alt="Main" 
        />
        <div className={`absolute inset-0 z-20 transition-colors duration-[2s] ${
          isStarted ? "bg-black/50" : "bg-black/20"
        }`}></div>
      </div>
      
      {/* Lớp phủ hướng dẫn khi chưa mở */}
      {!isStarted && (
        <div className="relative z-30 text-white/70 animate-pulse flex flex-col items-center">
          <Sparkles size={32} className="mb-2" />
          <p className="text-[10px] tracking-[0.5em] uppercase">Chạm để mở thiệp</p>
        </div>
      )}

      {/* Nội dung chính hiện ra sau khi click */}
      <div className={`relative z-30 text-center text-white px-4 transition-all duration-[1.5s] delay-500 ${
        isStarted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
      }`}>
        <Heart className="mx-auto text-rose-400 mb-6 animate-pulse" fill="currentColor" size={40} />
        <h2 className="text-[12px] tracking-[0.8em] uppercase mb-8 text-rose-100">Save Our Date</h2>
        <h1 className="text-5xl md:text-7xl font-light mb-10 leading-tight">
          Hoàng Hưng <br /> <span className="text-rose-300 italic serif">&</span> <br /> Hà Phương
        </h1>
        <p className="text-3xl md:text-5xl tracking-[0.4em] font-light">09.06.2026</p>
        
        {/* Nút Cuộn xuống */}
        <div 
          onClick={handleScrollDown} 
          className="absolute bottom-[-100px] left-1/2 -translate-x-1/2 cursor-pointer opacity-70 hover:opacity-100 transition-opacity"
        >
          <ChevronDown className="animate-bounce" size={40} />
        </div>
      </div>
    </section>
  );
};