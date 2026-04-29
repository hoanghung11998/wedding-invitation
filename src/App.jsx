import React, { useState, useEffect } from "react";
import "./index.css";

import { MusicPlayer } from "./components/UI/MusicPlayer";
import { Cover } from "./components/Wedding/Cover";
import { Couple } from "./components/Wedding/Couple";
import { Events } from "./components/Wedding/Events";
import { WeddingCalendar } from "./components/Wedding/WeddingCalendar";
import { Gallery } from "./components/Wedding/Gallery";
import { RSVP } from "./components/Wedding/RSVP";
import { Heart } from "lucide-react";

export default function App() {
  const [isStarted, setIsStarted] = useState(false);

  // Khóa scroll khi chưa mở thiệp để tránh người dùng kéo xuống vùng trống
  useEffect(() => {
    if (!isStarted) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isStarted]);

  return (
    <div className="min-h-screen bg-[#FDFBF9] text-stone-800 font-serif overflow-x-hidden selection:bg-rose-100">
      <MusicPlayer />
      
      {/* Component Cover luôn hiển thị */}
      <Cover isStarted={isStarted} setIsStarted={setIsStarted} />

      {isStarted && (
        <div className="animate-fade-in">
          <div id="couple-section">
            <Couple />
          </div>
          <Events />
          <WeddingCalendar />
          <Gallery />
          <RSVP />
          
          <footer className="py-12 bg-white text-center border-t border-stone-50">
            <Heart className="text-rose-100 mx-auto mb-8" size={24} fill="currentColor" />
            <p className="text-stone-800 text-3xl font-light italic">Hoàng Hưng & Hà Phương</p>
            <p className="text-stone-400 text-[10px] tracking-[0.6em] uppercase">June 2026</p>
          </footer>
        </div>
      )}
    </div>
  );
}