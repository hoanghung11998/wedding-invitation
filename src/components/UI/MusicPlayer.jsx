import React, { useRef, useState, useEffect } from "react";
import { Music } from "lucide-react";

export const MusicPlayer = ({ isStarted }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // Tự động phát nhạc khi thiệp được mở (isStarted = true)
  useEffect(() => {
    if (isStarted && !isPlaying) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => console.log("Autoplay blocked by browser"));
    }
  }, [isStarted]);

  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      <audio ref={audioRef} loop src="./Perfect.mp3" />
      
      <button
        onClick={toggleMusic}
        className="fixed bottom-8 right-8 z-[100] group"
      >
       

        {/* Cấu trúc Đĩa Nhạc */}
        <div 
          className={`relative w-14 h-14 rounded-full bg-stone-900 border-4 border-stone-800 shadow-2xl flex items-center justify-center overflow-hidden
            ${isPlaying ? "animate-vinyl" : "pause-animation"}
          `}
        >
          {/* Các vòng tròn rãnh đĩa than */}
          <div className="absolute inset-0 border-[1px] border-white/5 rounded-full m-1"></div>
          <div className="absolute inset-0 border-[1px] border-white/5 rounded-full m-3"></div>
          
          {/* Tâm đĩa nhạc (Label) */}
          <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors duration-500 ${
            isPlaying ? "bg-rose-500" : "bg-stone-600"
          }`}>
            <Music size={10} className="text-white" />
          </div>

          {/* Hiệu ứng bóng đổ đĩa */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent"></div>
        </div>

      
      </button>
    </>
  );
};