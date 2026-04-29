import React, { useState, useEffect } from "react";
import { Send, Heart, Gift, X, Check, MessageCircle } from "lucide-react";
import { RevealSection } from "./RevealSection";

export const RSVP = () => {
  const [showForm, setShowForm] = useState(false);
  const [showQr, setShowQr] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    status: "Chắc chắn mình sẽ đến!",
    message: "",
  });

  const PHONE_NUMBER = "0345678910"; // THAY SỐ ĐIỆN THOẠI CỦA BẠN VÀO ĐÂY (Dùng cho Zalo)
  const FB_ID = "username"; // THAY USERNAME FACEBOOK CỦA BẠN VÀO ĐÂY (Dùng cho Messenger)

  useEffect(() => {
    let timer;
    if (isSubmitted) {
      timer = setTimeout(() => {
        setShowForm(false);
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({
            name: "",
            status: "Chắc chắn mình sẽ đến!",
            message: "",
          });
        }, 500);
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [isSubmitted]);

  const sendToSocial = (platform) => {
    const fullText = `Chào Hưng & Phương, mình là ${formData.name}. ${formData.status}. Lời nhắn: ${formData.message}`;
    const encodedText = encodeURIComponent(fullText);

    if (platform === "zalo") {
      window.open(`https://zalo.me/${PHONE_NUMBER}`, "_blank");
    } else {
      window.open(`https://m.me/${FB_ID}`, "_blank");
    }
    setIsSubmitted(true);
  };

  return (
    <section className="relative py-20 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0 bg-stone-900 overflow-hidden">
        <img
          src="VHH_0752.jpg"
          className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-50 scale-110"
          alt="bg"
        />
        <img
          src="VHH_0752.jpg"
          className="relative w-full h-full object-contain z-10 opacity-50"
          alt="main"
        />
        <div className="absolute inset-0 z-20 bg-stone-900/40"></div>
      </div>

      <RevealSection className="relative z-10 max-w-4xl mx-auto">
        <div className="text-center text-white space-y-8">
          <Heart
            className="mx-auto text-rose-400 animate-pulse"
            size={48}
            fill="currentColor"
          />

          <div className="space-y-4 reveal-up">
            <h2 className="text-4xl md:text-6xl font-light italic">
              Lời Chúc & Xác Nhận
            </h2>
            <p className="text-rose-100/80 tracking-[0.2em] text-sm uppercase px-4">
              Sự hiện diện của bạn là niềm vinh hạnh của gia đình chúng tôi
            </p>
          </div>

          {/* Hiệu ứng di chuyển từ 2 bên vào cho 2 nút chính */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 pt-10 px-4">
            <button
              onClick={() => setShowForm(true)}
              className="reveal-left w-full md:w-72 bg-white text-stone-900 py-6 rounded-full text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-rose-50 transition-all shadow-xl flex items-center justify-center gap-3 group"
            >
              <Check
                size={16}
                className="group-hover:scale-125 transition-transform"
              />{" "}
              Xác nhận tham dự
            </button>

            <button
              onClick={() => setShowQr(true)}
              className="reveal-right w-full md:w-72 bg-transparent border border-white/30 backdrop-blur-md text-white py-6 rounded-full text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-3 group"
            >
              <Gift size={16} className="group-hover:animate-bounce" /> Gửi quà
              mừng cưới
            </button>
          </div>
        </div>

        {/* Modal QR Code */}
        {showQr && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div
              className="absolute inset-0 bg-stone-900/60 backdrop-blur-md animate-in fade-in"
              onClick={() => setShowQr(false)}
            ></div>
            <div className="relative w-full max-w-sm bg-white rounded-[2.5rem] p-8 shadow-2xl animate-in zoom-in duration-300 text-center">
              <button
                onClick={() => setShowQr(false)}
                className="absolute top-6 right-6 text-stone-300 hover:text-stone-800"
              >
                <X size={24} />
              </button>
              <div className="space-y-6">
                <h3 className="text-2xl font-light italic text-stone-800">
                  Gửi Quà Chúc Phúc
                </h3>
                <div className="relative group">
                  <div className="absolute -inset-2 bg-rose-50 rounded-3xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
                  <img
                    src="IMG_6831.JPG"
                    alt="QR"
                    className="relative w-56 h-56 mx-auto rounded-2xl border-4 border-white object-contain bg-white shadow-sm"
                  />
                </div>
                <p className="text-[11px] text-rose-400 italic">
                  "Trân trọng cảm ơn sự thương quý từ bạn"
                </p>
                <button
                  onClick={() => setShowQr(false)}
                  className="w-full py-4 bg-stone-50 text-stone-400 text-[10px] uppercase tracking-widest rounded-xl"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal Form RSVP */}
        {showForm && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div
              className="absolute inset-0 bg-stone-900/80 backdrop-blur-md animate-in fade-in"
              onClick={() => !isSubmitted && setShowForm(false)}
            ></div>

            <div className="relative w-full max-w-xl bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl animate-in zoom-in duration-300 overflow-hidden">
              {!isSubmitted ? (
                <div className="animate-in fade-in">
                  <button
                    onClick={() => setShowForm(false)}
                    className="absolute top-6 right-6 text-stone-300 hover:text-stone-800"
                  >
                    <X size={28} />
                  </button>
                  <h3 className="text-3xl font-light italic text-stone-800 mb-8 text-center">
                    Xác nhận tham dự
                  </h3>

                  <div className="space-y-5">
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-widest text-stone-400 ml-2 font-bold">
                        Tên của bạn
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="Nhập tên của bạn..."
                        className="w-full p-4 bg-stone-50 rounded-2xl border border-stone-100 outline-none focus:ring-2 focus:ring-rose-200 transition-all"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-widest text-stone-400 ml-2 font-bold">
                        Bạn sẽ tham gia chứ?
                      </label>
                      <select
                        value={formData.status}
                        onChange={(e) =>
                          setFormData({ ...formData, status: e.target.value })
                        }
                        className="w-full p-4 bg-stone-50 rounded-2xl border border-stone-100 outline-none focus:ring-2 focus:ring-rose-200 transition-all appearance-none"
                      >
                        <option>Chắc chắn mình sẽ đến!</option>
                        <option>Tiếc quá, mình không thể dự</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-widest text-stone-400 ml-2 font-bold">
                        Lời nhắn gửi
                      </label>
                      <textarea
                        rows="3"
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        placeholder="Gửi lời chúc đến chúng mình..."
                        className="w-full p-4 bg-stone-50 rounded-2xl border border-stone-100 outline-none focus:ring-2 focus:ring-rose-200 transition-all resize-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-8 mt-8">
                      {/* Nút Zalo - Tối giản hoàn toàn */}
                      <button
                        onClick={() => sendToSocial("zalo")}
                        className="flex flex-col items-center justify-center space-y-3 group transition-all active:scale-90"
                      >
                        <div className="relative">
                          <img
                            src="https://upload.wikimedia.org/wikipedia/commons/9/91/Icon_of_Zalo.svg"
                            alt="Zalo"
                            className="w-12 h-12 transition-transform duration-300 group-hover:-translate-y-1 group-hover:drop-shadow-md"
                          />
                        </div>
                        <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-stone-400 group-hover:text-stone-800 transition-colors">
                          Zalo
                        </span>
                      </button>

                      {/* Nút Messenger - Tối giản hoàn toàn */}
                      <button
                        onClick={() => sendToSocial("messenger")}
                        className="flex flex-col items-center justify-center space-y-3 group transition-all active:scale-90"
                      >
                        <div className="relative">
                          <img
                            src="https://upload.wikimedia.org/wikipedia/commons/b/be/Facebook_Messenger_logo_2020.svg"
                            alt="Messenger"
                            className="w-12 h-12 transition-transform duration-300 group-hover:-translate-y-1 group-hover:drop-shadow-md"
                          />
                        </div>
                        <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-stone-400 group-hover:text-stone-800 transition-colors">
                          Messenger
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="py-10 flex flex-col items-center text-center space-y-6 animate-in slide-in-from-bottom-8 duration-700">
                  <div className="relative">
                    <div className="absolute inset-0 animate-ping rounded-full bg-rose-100 opacity-25"></div>
                    <div className="relative bg-rose-50 p-8 rounded-full">
                      <Heart
                        size={48}
                        className="text-rose-500 fill-rose-500 animate-bounce"
                      />
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-green-500 text-white p-2 rounded-full shadow-lg">
                      <Check size={20} strokeWidth={3} />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-3xl font-light italic text-stone-800">
                      Cảm ơn {formData.name.split(" ").pop()}!
                    </h3>
                    <p className="text-stone-500 font-light leading-relaxed max-w-[280px] mx-auto text-sm">
                      Lời chúc của bạn đã được chuyển tiếp. <br />
                      Hẹn gặp bạn trong ngày vui của chúng mình!
                    </p>
                  </div>
                  <div className="pt-6 w-full max-w-[200px]">
                    <div className="h-[2px] w-full bg-stone-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-rose-300 origin-left"
                        style={{
                          animation: "progress-close 5s linear forwards",
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </RevealSection>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes progress-close { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        .reveal-left { animation: slide-left 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
        .reveal-right { animation: slide-right 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
        @keyframes slide-left { from { opacity: 0; transform: translateX(-50px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes slide-right { from { opacity: 0; transform: translateX(50px); } to { opacity: 1; transform: translateX(0); } }
      `,
        }}
      />
    </section>
  );
};
