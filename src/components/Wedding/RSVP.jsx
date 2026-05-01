import React, { useState, useEffect } from "react";
import { Heart, Gift, X, Check, Loader2, ChevronDown } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { createPortal } from "react-dom";

const ModalPortal = ({ children }) => {
  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-auto">
      {children}
    </div>,
    document.body
  );
};

export const RSVP = () => {
  const [showForm, setShowForm] = useState(false);
  const [showQr, setShowQr] = useState(false); 
  const [isSending, setIsSending] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    status: "Chắc chắn mình sẽ đến!",
    message: "",
  });

  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return alert("Vui lòng nhập tên của bạn");

    setIsSending(true);
    try {
      const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzlEY20S0NUZtg7ZRcM8pbTahdKvqDvIHENFUVBMBBccI9j5XjbWjTSS-FfM2ULpvEX/exec";
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      setIsSubmitted(true);
    } catch (error) {
      console.error("Lỗi:", error);
      alert("Có lỗi xảy ra, vui lòng thử lại sau!");
    } finally {
      setIsSending(false);
    }
  };

  useEffect(() => {
    let timer;
    if (isSubmitted) {
      timer = setTimeout(() => handleCloseModal(), 10000);
    }
    return () => clearTimeout(timer);
  }, [isSubmitted]);

  const handleCloseModal = () => {
    setShowForm(false);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", status: "Chắc chắn mình sẽ đến!", message: "" });
    }, 500);
  };

  return (
    <section ref={ref} className="relative py-24 px-6 overflow-hidden">
      <div className="absolute inset-0 z-0 bg-stone-900 overflow-hidden">
        <img src="VHH_0752.jpg" className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-40 scale-110" alt="bg" />
        <div className="absolute inset-0 z-20 bg-stone-900/40"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center text-white">
        <Heart className={`mx-auto text-rose-400 mb-8 transition-all duration-1000 ${inView ? "scale-100 opacity-100" : "scale-0 opacity-0"}`} size={48} fill="currentColor" />
        <h2 className="text-4xl md:text-6xl font-light italic">Lời Chúc & Xác Nhận</h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 pt-12">
          <button onClick={() => setShowForm(true)} className="w-full md:w-72 bg-white text-stone-900 py-5 rounded-full font-bold uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl">
            <Check size={16} /> Xác nhận tham dự
          </button>
        </div>
      </div>

      {/* MODAL RSVP */}
      {showForm && (
        <ModalPortal>
          {/* Overlay: Chỉ đóng khi click trực tiếp vào lớp nền */}
          <div
            className="fixed inset-0 bg-stone-900/90 backdrop-blur-md z-[100] animate-in fade-in duration-300"
            onClick={() => !isSubmitted && !isSending && setShowForm(false)}
          ></div>

          {/* Modal Container: Thêm stopPropagation để click vào form không bị đóng */}
          <div 
            onClick={(e) => e.stopPropagation()} 
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-xl bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl z-[101] animate-in zoom-in duration-300 overflow-hidden"
          >
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <button type="button" onClick={() => setShowForm(false)} className="absolute top-6 right-6 text-stone-300 hover:text-stone-800">
                  <X size={28} />
                </button>

                <h3 className="text-3xl font-light italic text-stone-800 text-center">Xác nhận tham dự</h3>

                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[9px] uppercase tracking-widest text-stone-400 font-bold ml-2">Tên của bạn</label>
                    <input
                      required
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Nhập tên của bạn..."
                      className="w-full p-4 bg-stone-50 rounded-2xl border border-stone-100 outline-none focus:ring-2 focus:ring-rose-200 text-stone-800"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] uppercase tracking-widest text-stone-400 font-bold ml-2">Bạn sẽ tham gia chứ?</label>
                    <div className="relative">
                      <select
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        className="w-full p-4 bg-stone-50 rounded-2xl border border-stone-100 outline-none focus:ring-2 focus:ring-rose-200 appearance-none cursor-pointer text-stone-800"
                      >
                        <option>Chắc chắn mình sẽ đến!</option>
                        <option>Tiếc quá, mình không thể dự</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-stone-400" size={18} />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] uppercase tracking-widest text-stone-400 font-bold ml-2">Lời nhắn gửi</label>
                    <textarea
                      rows="3"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Gửi lời chúc đến chúng mình..."
                      className="w-full p-4 bg-stone-50 rounded-2xl border border-stone-100 outline-none focus:ring-2 focus:ring-rose-200 resize-none text-stone-800"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSending}
                    className={`relative w-full py-4 bg-rose-400 text-white font-bold uppercase tracking-[0.3em] rounded-2xl transition-all ${isSending ? "bg-rose-300 cursor-not-allowed" : "hover:bg-rose-500"}`}
                  >
                    {!isSending ? "Gửi lời chúc yêu thương" : <Loader2 className="animate-spin mx-auto" size={24} />}
                  </button>
                </div>
              </form>
            ) : (
              <div className="py-10 flex flex-col items-center text-center space-y-6 animate-in fade-in zoom-in duration-500">
                <div className="relative">
                  <Heart size={80} className="text-rose-500 fill-rose-500 animate-bounce" />
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-rose-200 rounded-full animate-ping"></div>
                </div>
                <h3 className="text-3xl font-light italic text-stone-800">Cảm ơn {formData.name.split(" ").pop()}!</h3>
                <p className="text-stone-500 text-sm">Lời chúc đã được gửi đi. Hẹn gặp bạn trong ngày vui!</p>
                <button onClick={handleCloseModal} className="px-10 py-3 border border-rose-200 text-rose-400 rounded-xl font-medium">Đóng</button>
              </div>
            )}
          </div>
        </ModalPortal>
      )}
    </section>
  );
};