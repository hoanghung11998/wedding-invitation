import React, { useState, useEffect } from "react";
import { Heart, Gift, X, Check } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { createPortal } from "react-dom"; // Dùng Portal để đẩy Popup ra ngoài cùng body

export const RSVP = () => {
  const [showForm, setShowForm] = useState(false);
  const [showQr, setShowQr] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    status: "Chắc chắn mình sẽ đến!",
    message: "",
  });

  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  const PHONE_NUMBER = "0345678910";
  const FB_ID = "username";

  useEffect(() => {
    let timer;
    if (isSubmitted) {
      timer = setTimeout(() => {
        setShowForm(false);
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({ name: "", status: "Chắc chắn mình sẽ đến!", message: "" });
        }, 500);
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [isSubmitted]);

  const sendToSocial = (platform) => {
    // Logic gửi tin nhắn giữ nguyên...
    setIsSubmitted(true);
    if (platform === "zalo") window.open(`https://zalo.me/${PHONE_NUMBER}`, "_blank");
    else window.open(`https://m.me/${FB_ID}`, "_blank");
  };

  // Helper component để hiển thị Modal ở cấp cao nhất của tài liệu (Chống bị đẩy lệch)
  const ModalPortal = ({ children }) => {
    return createPortal(
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 pointer-events-auto">
        {children}
      </div>,
      document.body
    );
  };

  return (
    <section ref={ref} className="relative py-24 px-6 overflow-hidden">
      {/* Background Section giữ nguyên */}
      <div className="absolute inset-0 z-0 bg-stone-900 overflow-hidden">
        <img src="VHH_0752.jpg" className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-40 scale-110" alt="bg" />
        <img src="VHH_0752.jpg" className="relative w-full h-full object-contain z-10 opacity-30" alt="main" />
        <div className="absolute inset-0 z-20 bg-stone-900/40"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center text-white">
        <Heart 
          className={`mx-auto text-rose-400 mb-8 transition-all duration-1000 ${inView ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`} 
          size={48} 
          fill="currentColor" 
        />

        <div className={`space-y-4 transition-all duration-1000 delay-300 ${inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="text-4xl md:text-6xl font-light italic">Lời Chúc & Xác Nhận</h2>
          <p className="text-rose-100/70 tracking-[0.2em] text-[10px] md:text-xs uppercase px-4 leading-relaxed">
            Sự hiện diện của bạn là niềm vinh hạnh của gia đình chúng tôi
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6 pt-12 px-4">
          <button
            onClick={() => setShowForm(true)}
            className={`w-full md:w-72 bg-white text-stone-900 py-5 rounded-full text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-rose-50 transition-all duration-1000 delay-500 shadow-xl flex items-center justify-center gap-3
              ${inView ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}
          >
            <Check size={16} /> Xác nhận tham dự
          </button>

          <button
            onClick={() => setShowQr(true)}
            className={`w-full md:w-72 bg-transparent border border-white/30 backdrop-blur-md text-white py-5 rounded-full text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-white/10 transition-all duration-1000 delay-700 flex items-center justify-center gap-3
              ${inView ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`}
          >
            <Gift size={16} /> Gửi quà mừng cưới
          </button>
        </div>
      </div>

      {/* POPUP QR CODE - Dùng Portal để không bao giờ bị lệch */}
      {showQr && (
        <ModalPortal>
          <div className="absolute inset-0 bg-stone-900/80 backdrop-blur-md animate-in fade-in duration-300" onClick={() => setShowQr(false)}></div>
          <div className="relative w-full max-w-sm bg-white rounded-[2.5rem] p-8 shadow-2xl animate-in zoom-in duration-300 text-center">
            <button onClick={() => setShowQr(false)} className="absolute top-6 right-6 text-stone-300 hover:text-stone-800"><X size={24} /></button>
            <h3 className="text-2xl font-light italic text-stone-800 mb-6">Gửi Quà Chúc Phúc</h3>
            <div className="bg-rose-50 p-4 rounded-3xl inline-block mb-4">
              <img src="IMG_6831.JPG" alt="QR" className="w-56 h-56 rounded-2xl border-4 border-white object-contain shadow-sm" />
            </div>
            <p className="text-[11px] text-rose-400 italic mb-6">"Trân trọng cảm ơn sự thương quý từ bạn"</p>
            <button onClick={() => setShowQr(false)} className="w-full py-4 bg-stone-50 text-stone-400 text-[10px] uppercase tracking-widest rounded-xl">Đóng</button>
          </div>
        </ModalPortal>
      )}

      {/* POPUP FORM RSVP - Dùng Portal */}
      {showForm && (
        <ModalPortal>
          <div className="absolute inset-0 bg-stone-900/90 backdrop-blur-md animate-in fade-in duration-300" onClick={() => !isSubmitted && setShowForm(false)}></div>
          <div className="relative w-full max-w-xl bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl animate-in zoom-in duration-300 overflow-hidden">
            {!isSubmitted ? (
              <div className="space-y-6">
                <button onClick={() => setShowForm(false)} className="absolute top-6 right-6 text-stone-300 hover:text-stone-800"><X size={28} /></button>
                <h3 className="text-3xl font-light italic text-stone-800 mb-8 text-center">Xác nhận tham dự</h3>
                
                {/* Inputs giữ nguyên logic của bạn */}
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[9px] uppercase tracking-widest text-stone-400 ml-2 font-bold">Tên của bạn</label>
                    <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Nhập tên của bạn..." className="w-full p-4 bg-stone-50 rounded-2xl border border-stone-100 outline-none focus:ring-2 focus:ring-rose-200 transition-all" />
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-[9px] uppercase tracking-widest text-stone-400 ml-2 font-bold">Bạn sẽ tham gia chứ?</label>
                    <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} className="w-full p-4 bg-stone-50 rounded-2xl border border-stone-100 outline-none focus:ring-2 focus:ring-rose-200 transition-all appearance-none">
                      <option>Chắc chắn mình sẽ đến!</option>
                      <option>Tiếc quá, mình không thể dự</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] uppercase tracking-widest text-stone-400 ml-2 font-bold">Lời nhắn gửi</label>
                    <textarea rows="3" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} placeholder="Gửi lời chúc đến chúng mình..." className="w-full p-4 bg-stone-50 rounded-2xl border border-stone-100 outline-none focus:ring-2 focus:ring-rose-200 transition-all resize-none" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-8 pt-4">
                   <button onClick={() => sendToSocial("zalo")} className="flex flex-col items-center gap-2 group">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Icon_of_Zalo.svg" className="w-12 h-12 group-hover:scale-110 transition-transform" alt="Zalo" />
                      <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Zalo</span>
                   </button>
                   <button onClick={() => sendToSocial("messenger")} className="flex flex-col items-center gap-2 group">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/b/be/Facebook_Messenger_logo_2020.svg" className="w-12 h-12 group-hover:scale-110 transition-transform" alt="Messenger" />
                      <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Messenger</span>
                   </button>
                </div>
              </div>
            ) : (
              <div className="py-10 flex flex-col items-center text-center space-y-6">
                <Heart size={64} className="text-rose-500 fill-rose-500 animate-bounce" />
                <h3 className="text-3xl font-light italic text-stone-800">Cảm ơn {formData.name.split(" ").pop()}!</h3>
                <p className="text-stone-500 text-sm max-w-[280px]">Lời chúc đã được gửi đi. Hẹn gặp bạn trong ngày vui!</p>
              </div>
            )}
          </div>
        </ModalPortal>
      )}
    </section>
  );
};