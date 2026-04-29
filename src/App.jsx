import React, { useState, useEffect, useRef } from "react";
import {
  Heart,
  Calendar,
  Send,
  VolumeX,
  Sparkles,
  Music,
  Camera,
  ChevronDown,
  MapPin,
} from "lucide-react";

// --- CSS Animations & Global Styles ---
const styleTag = `
  @keyframes customSpin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  .animate-custom-spin { animation: customSpin 12s linear infinite; }
  
  /* Cấu hình Reveal mặc định */
  .reveal-base {
    opacity: 0;
    transition: all 2.5s cubic-bezier(0.16, 1, 0.3, 1);
    will-change: transform, opacity;
  }

  .reveal-left { transform: translateX(-100px); opacity: 0; transition: all 2.5s cubic-bezier(0.16, 1, 0.3, 1); }
  .reveal-right { transform: translateX(100px); opacity: 0; transition: all 2.5s cubic-bezier(0.16, 1, 0.3, 1); }
  .reveal-up { transform: translateY(60px); opacity: 0; transition: all 2.5s cubic-bezier(0.16, 1, 0.3, 1); }

  /* Khi active (được cuộn tới) */
  .active .reveal-left,
  .active .reveal-right,
  .active .reveal-up,
  .active.reveal-up {
    opacity: 1 !important;
    transform: translate(0) !important;
  }

  .delay-500 { transition-delay: 500ms; }
  .delay-1000 { transition-delay: 1000ms; }

  .organic-frame {
    border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
  }
`;

const WEDDING_DATE = new Date("2026-06-09T09:00:00");

// Component bọc hiệu ứng cuộn
const RevealSection = ({ children, className = "", id = "" }) => {
  const ref = useRef(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsActive(true);
      },
      { threshold: 0.1 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id={id}
      ref={ref}
      className={`${isActive ? "active" : ""} ${className}`}
    >
      {children}
    </section>
  );
};

// Component Hình ảnh Gallery dọc
const VerticalImage = ({ src, index }) => {
  const frameStyles = [
    "rounded-2xl md:rounded-[4rem]",
    "rounded-t-full rounded-b-lg",
    "rounded-[2rem] rounded-tl-[8rem] rounded-br-[8rem]",
    "organic-frame",
  ];
  const currentFrame = frameStyles[index % frameStyles.length];

  return (
    <RevealSection className="w-full max-w-4xl mx-auto mb-32 px-4">
      <div
        className={`reveal-up relative group overflow-hidden shadow-2xl aspect-[3/4] md:aspect-[16/10] ${currentFrame} border-[10px] border-white`}
      >
        <img
          src={src}
          alt="Gallery"
          className="w-full h-full object-cover transition-transform duration-[4s] group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-700" />
      </div>
    </RevealSection>
  );
};

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const audioRef = useRef(null);

  const galleryImages = [
    "3F570A46-4F99-445E-BB30-C20A64DB6845.jpeg",
    "4AF0949B-ADB8-4D91-8B7E-557A98E5E6B5.jpeg",
    "4FE73675-DADA-42AE-9B58-F68A0C277BF8.jpeg",
    "7E23916E-29D4-4A1D-9B13-7B04C4BE5298.jpeg",
  ];


  const handleScrollDown = (e) => {
    e.stopPropagation();
    document
      .getElementById("couple-section")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const toggleMusic = () => {
    if (isPlaying) audioRef.current.pause();
    else audioRef.current.play().catch(() => {});
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF9] text-stone-800 font-serif overflow-x-hidden selection:bg-rose-100">
      <style>{styleTag}</style>
      <audio ref={audioRef} loop src="./Beautiful In White.mp3" />

      {/* Music Control */}
      <button
        onClick={toggleMusic}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-lg transition-all ${isPlaying ? "bg-rose-500 text-white" : "bg-white text-stone-400"}`}
      >
        {isPlaying ? (
          <Music className="animate-custom-spin" size={20} />
        ) : (
          <VolumeX size={20} />
        )}
      </button>

      {/* 1. COVER */}
      <section
        className="relative h-screen flex items-center justify-center overflow-hidden cursor-pointer"
        onClick={() => setIsStarted(true)}
      >
        <div className="absolute inset-0 z-0 bg-stone-900 flex items-center justify-center overflow-hidden">
          <img
            src="2.jpg"
            className="absolute inset-0 w-full h-full object-cover blur-2xl scale-110 opacity-40"
            alt="Blur"
          />
          <img
            src="2.jpg"
            className={`relative z-10 h-full w-auto object-contain transition-all duration-[2.5s] ease-out ${isStarted ? "scale-100 blur-[3px]" : "scale-105 blur-0"}`}
            alt="Main"
          />
          <div
            className={`absolute inset-0 z-20 transition-colors duration-[2s] ${isStarted ? "bg-black/50" : "bg-black/20"}`}
          ></div>
        </div>
        {!isStarted && (
          <div className="relative z-30 text-white/70 animate-pulse flex flex-col items-center">
            <Sparkles size={32} className="mb-2" />
            <p className="text-[10px] tracking-[0.5em] uppercase">
              Chạm để mở thiệp
            </p>
          </div>
        )}
        <div
          className={`relative z-30 text-center text-white px-4 transition-all duration-[1.5s] ${isStarted ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        >
          <div
            className={`transition-all duration-1000 transform ${isStarted ? "translate-y-0 opacity-100 delay-[300ms]" : "translate-y-10 opacity-0"}`}
          >
            <Heart
              className="mx-auto text-rose-400 mb-6 animate-pulse"
              fill="currentColor"
              size={40}
            />
          </div>
          <h2
            className={`text-[12px] tracking-[0.8em] uppercase mb-8 text-rose-100 transition-all duration-1000 transform ${isStarted ? "translate-y-0 opacity-100 delay-[600ms]" : "translate-y-10 opacity-0"}`}
          >
            Save Our Date
          </h2>
          <h1
            className={`text-5xl md:text-7xl font-light mb-10 leading-tight transition-all duration-1000 transform ${isStarted ? "translate-y-0 opacity-100 delay-[900ms]" : "translate-y-10 opacity-0"}`}
          >
            Hoàng Hưng <br />{" "}
            <span className="text-rose-300 italic serif">&</span> <br /> Hà
            Phương
          </h1>
          <p
            className={`text-3xl md:text-5xl tracking-[0.4em] font-light transition-all duration-1000 transform ${isStarted ? "translate-y-0 opacity-100 delay-[1500ms]" : "translate-y-10 opacity-0"}`}
          >
            09.06.2026
          </p>
          <div
            onClick={handleScrollDown}
            className={`absolute bottom-[-80px] left-1/2 -translate-x-1/2 cursor-pointer transition-all duration-1000 transform ${isStarted ? "translate-y-0 opacity-70 delay-[1800ms]" : "translate-y-10 opacity-0"}`}
          >
            <ChevronDown className="animate-bounce" size={40} />
          </div>
        </div>
      </section>

      {/* 2. CẶP ĐÔI */}
      <RevealSection
        id="couple-section"
        className="py-40 px-6 bg-white overflow-hidden"
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-24 items-center">
          {/* Phần chú rể (Bên trái mặc định, nhưng dùng order để kiểm soát vị trí trên di động) */}
          <div className="text-center md:text-right order-2 md:order-1 reveal-left delay-500">
            <h3 className="text-stone-400 text-[10px] tracking-[0.4em] uppercase mb-4">
              The Groom
            </h3>
            <h4 className="text-5xl md:text-7xl font-light text-stone-800 mb-8 italic">
              Hoàng Hưng
            </h4>
            <p className="text-stone-500 font-sans leading-relaxed text-sm italic max-w-md ml-auto">
              "Người đàn ông luôn tin rằng tình yêu chân thành là bến đỗ bình
              yên nhất sau mọi bão giông."
            </p>
          </div>

          {/* Ảnh chú rể (Bên phải mặc định) */}
          <div className="order-1 md:order-2 flex justify-center relative reveal-right">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-rose-50 organic-frame z-0 opacity-60 animate-pulse"></div>
            <div className="relative z-10 w-80 h-[35rem] overflow-hidden shadow-2xl rounded-[2.5rem] rounded-tl-[10rem] border-[14px] border-white">
              <img
                src="VHH_0577.jpg"
                className="w-full h-full object-cover"
                alt="Groom"
              />
            </div>
          </div>

          {/* Ảnh cô dâu - GIỮ NẰM BÊN TRÁI trên desktop (md:order-3) */}
          <div className="order-3 md:order-3 flex justify-center relative reveal-left delay-1000">
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-stone-100 organic-frame z-0 opacity-60 animate-pulse"></div>
            <div className="relative z-10 w-80 h-[35rem] overflow-hidden shadow-2xl rounded-[2.5rem] rounded-br-[10rem] border-[14px] border-white">
              <img
                src="VHH_0144.jpg"
                className="w-full h-full object-cover scale-x-[-1]" // Ảnh cô dâu được lật 180 độ
                alt="Bride"
              />
            </div>
          </div>

          {/* Phần nội dung cô dâu - NẰM BÊN PHẢI trên desktop (md:order-4) */}
          <div className="text-center md:text-left order-4 md:order-4 reveal-right delay-750">
            <h3 className="text-stone-400 text-[10px] tracking-[0.4em] uppercase mb-4">
              The Bride
            </h3>
            <h4 className="text-5xl md:text-7xl font-light text-stone-800 mb-8 italic">
              Hà Phương
            </h4>
            <p className="text-stone-500 font-sans leading-relaxed text-sm italic max-w-md mr-auto">
              "Cô gái mang theo nụ cười rạng rỡ và niềm tin vào một câu chuyện
              cổ tích có thật ở đời thường."
            </p>
          </div>
        </div>
      </RevealSection>

      {/* 3. LỜI MỜI & LỊCH & BẢN ĐỒ */}
      <RevealSection className="py-32 px-6 bg-[#FDFBF9] border-y border-stone-100 overflow-hidden">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="reveal-up text-5xl md:text-7xl font-light italic text-stone-800 mb-24">
            Trân Trọng Kính Mời
          </h2>

          <div className="grid lg:grid-cols-2 gap-20">
            {/* KHỐI 1: LỄ VU QUY (Từ trái vào) */}
            <div className="reveal-left space-y-8">
              <div className="calendar-box p-10 rounded-[3rem] shadow-xl shadow-stone-200/50 bg-white relative overflow-hidden border border-rose-50">
                <div className="absolute top-0 right-0 w-32 h-32 bg-rose-50/50 organic-frame -mr-16 -mt-16" />

                <Calendar className="text-rose-400 mx-auto mb-6" size={32} />
                <h5 className="text-3xl mb-6 font-light text-stone-800">
                  Lễ Vu Quy
                </h5>

                {/* Calendar UI Mockup */}
                <div className="mb-8 border-y border-stone-100 py-6">
                  <p className="text-rose-500 font-medium tracking-widest uppercase text-xs mb-2">
                    Tháng 6 - 2026
                  </p>
                  <div className="flex justify-center items-center gap-4">
                    <div className="text-center opacity-30 italic text-sm">
                      Thứ Hai
                    </div>
                    <div className="w-16 h-16 bg-rose-500 text-white rounded-2xl flex flex-col items-center justify-center shadow-lg shadow-rose-200">
                      <span className="text-[10px] uppercase leading-none mb-1">
                        Thứ Ba
                      </span>
                      <span className="text-2xl font-bold leading-none">
                        02
                      </span>
                    </div>
                    <div className="text-center opacity-30 italic text-sm">
                      Thứ Tư
                    </div>
                  </div>

                  {/* Phần lịch âm bổ sung */}
                  <div className="mt-3 flex flex-col items-center gap-1">
                    <p className="text-stone-400 text-[11px] uppercase tracking-[0.2em]">
                      (Tức ngày 17 tháng 04 năm Bính Ngọ)
                    </p>
                    <p className="text-stone-600 font-medium">09:00 Sáng</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-center gap-2 text-stone-800">
                    <MapPin size={16} className="text-rose-400" />
                    <p className="text-lg">Tư gia nhà gái</p>
                  </div>
                  <p className="text-stone-400 text-sm">
                    Thôn Việt Trung, Nam Sầm Sơn, Thanh Hoá
                  </p>
                </div>
              </div>

              {/* Bản đồ Lễ Vu Quy */}
              <div className="reveal-up delay-500 h-64 rounded-[2.5rem] overflow-hidden shadow-lg border-8 border-white map-container">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m13!1m11!1m3!1d668.7349955439929!2d105.83803098328993!3d19.71448391010875!2m2!1f0!2f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2sus!4v1776605768882!5m2!1sen!2sus"
                  className="w-full h-full border-0"
                  allowfullscreen=""
                  loading="lazy"
                ></iframe>
              </div>
            </div>

            {/* KHỐI 2: TIỆC CƯỚI (Từ phải vào) */}
            <div className="reveal-right space-y-8">
              <div className="calendar-box p-10 rounded-[3rem] shadow-xl shadow-stone-200/50 bg-white relative overflow-hidden border border-rose-50">
                <div className="absolute top-0 left-0 w-32 h-32 bg-stone-50 organic-frame -ml-16 -mt-16" />

                <Heart className="text-rose-400 mx-auto mb-6" size={32} />
                <h5 className="text-3xl mb-6 font-light text-stone-800">
                  Tiệc Cưới
                </h5>

                {/* Calendar UI Mockup */}
                <div className="mb-8 border-y border-stone-100 py-6">
                  <p className="text-rose-500 font-medium tracking-widest uppercase text-xs mb-2">
                    Tháng 6 - 2026
                  </p>
                  <div className="flex justify-center items-center gap-4">
                    <div className="text-center opacity-30 italic text-sm">
                      Thứ Hai
                    </div>
                    <div className="w-16 h-16 bg-stone-800 text-white rounded-2xl flex flex-col items-center justify-center shadow-lg shadow-stone-300">
                      <span className="text-[10px] uppercase leading-none mb-1">
                        Thứ Ba
                      </span>
                      <span className="text-2xl font-bold leading-none">
                        09
                      </span>
                    </div>
                    <div className="text-center opacity-30 italic text-sm">
                      Thứ Tư
                    </div>
                  </div>

                  {/* Phần lịch âm bổ sung */}
                  <div className="mt-4 flex flex-col items-center">
                    <p className="text-stone-400 text-[10px] tracking-[0.2em] uppercase mb-1">
                      (Tức ngày 24 tháng 04 năm Bính Ngọ)
                    </p>
                    <p className="text-stone-600 font-medium">09:00 Sáng</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-center gap-2 text-stone-800">
                    <MapPin size={16} className="text-rose-400" />
                    <p className="text-lg">Nhà hàng Thiện An</p>
                  </div>
                  <p className="text-stone-400 text-sm">
                    Thôn 5, Phú Xuân, Đăk Lăk
                  </p>
                </div>
              </div>

              {/* Bản đồ Tiệc Cưới */}
              <div className="reveal-up delay-500 h-64 rounded-[2.5rem] overflow-hidden shadow-lg border-8 border-white map-container">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3892.0!2d108.1!3d12.7!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDQyJzAwLjAiTiAxMDjCsDA2JzAwLjAiRQ!5e0!3m2!1svi!2s!4v1"
                  className="w-full h-full border-0"
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </RevealSection>

      {/* 5. GALLERY */}
      <section className="py-32 bg-white">
        <div className="text-center mb-24">
          <Camera className="mx-auto text-rose-300 mb-6" size={32} />
          <h2 className="text-4xl md:text-6xl font-light italic text-stone-800">
            Our Gallery
          </h2>
        </div>
        <div className="flex flex-col items-center">
          {galleryImages.map((src, i) => (
            <VerticalImage key={i} src={src} index={i} />
          ))}
        </div>
      </section>

      {/* 6. RSVP */}
      <RevealSection className="py-32 px-6 bg-[#FDFBF9]">
        <div className="reveal-up max-w-3xl mx-auto bg-white p-12 md:p-20 rounded-[3rem] shadow-sm text-center">
          <h2 className="text-4xl font-light italic text-stone-800 mb-16">
            Gửi Lời Chúc Phúc
          </h2>
          <form className="space-y-10 text-left">
            <div className="grid md:grid-cols-2 gap-10">
              <input
                type="text"
                placeholder="Tên của bạn"
                className="w-full p-5 bg-stone-50 rounded-2xl outline-none focus:ring-2 focus:ring-rose-100"
              />
              <select className="w-full p-5 bg-stone-50 rounded-2xl outline-none focus:ring-2 focus:ring-rose-100">
                <option>Chắc chắn mình sẽ đến!</option>
                <option>Tiếc quá, mình không thể dự</option>
              </select>
            </div>
            <button className="w-full bg-stone-900 text-white py-6 rounded-2xl text-[10px] uppercase tracking-[0.4em] hover:bg-rose-500 transition-all flex items-center justify-center gap-4">
              Gửi phản hồi <Send size={14} />
            </button>
          </form>
        </div>
      </RevealSection>

      <footer className="py-24 bg-white text-center border-t border-stone-50">
        <Heart
          className="text-rose-100 mx-auto mb-8"
          size={24}
          fill="currentColor"
        />
        <p className="text-stone-800 text-3xl font-light italic">
          Hoàng Hưng & Hà Phương
        </p>
        <p className="text-stone-400 text-[10px] tracking-[0.6em] uppercase">
          June 2026
        </p>
      </footer>
    </div>
  );
}
