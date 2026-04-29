import React, { useState } from "react";
import "./index.css";

import { MusicPlayer } from "./components/UI/MusicPlayer";
import { Cover } from "./components/Wedding/Cover";
import { Couple } from "./components/Wedding/Couple";
import { Events } from "./components/Wedding/Events";
import { WeddingCalendar } from "./components/Wedding/WeddingCalendar";
import { Gallery } from "./components/Wedding/Gallery";
import { RSVP } from "./components/Wedding/RSVP";
import { Calendar, Heart } from "lucide-react";

export default function App() {
  const [isStarted, setIsStarted] = useState(false);

  return (
    <div className="min-h-screen bg-[#FDFBF9] text-stone-800 font-serif overflow-x-hidden selection:bg-rose-100">
      <MusicPlayer />
      
      <Cover isStarted={isStarted} setIsStarted={setIsStarted} />

      {/* Chỉ render các phần dưới khi đã "Mở thiệp" hoặc render luôn tùy bạn */}
      <div className={isStarted ? "opacity-100" : "opacity-0"}>
        <Couple />
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
    </div>
  );
}