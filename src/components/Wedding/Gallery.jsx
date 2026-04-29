import React from "react";
import { VerticalImage } from "../UI/VerticalImage";
import { RevealSection } from "../Wedding/RevealSection";

const GALLERY_IMAGES = [
  "VHH_0171.jpg",
  "VHH_0804.jpg",
  "VHH_0870.jpg",
  "VHH_1074.jpg",
  "VHH_1431.jpg",
  "VHH_0599.jpg",


];

export const Gallery = () => {
  const renderRows = () => {
    let rows = [];
    let tempImages = [...GALLERY_IMAGES];
    let counter = 0;

    while (tempImages.length > 0) {
      // Luân phiên hàng 3 ảnh và hàng 2 ảnh
      let size = counter % 2 === 0 ? 3 : 2;
      rows.push(tempImages.splice(0, size));
      counter++;
    }
    return rows;
  };

  const imageRows = renderRows();

  return (
    <section className="py-20 md:py-32 bg-white overflow-hidden">
      <div className="text-center mb-16 md:mb-24 px-4">
        <h2 className="text-3xl md:text-6xl font-light italic text-stone-800 uppercase tracking-widest">
          Kỷ Niệm Của Chúng Tôi
        </h2>
        <div className="w-12 h-[1px] bg-rose-300 mx-auto mt-4"></div>
      </div>

      <div className="max-w-6xl mx-auto px-2 md:px-4 space-y-2 md:space-y-8">
        {imageRows.map((row, rowIndex) => (
          <RevealSection key={rowIndex} threshold={0.1}>
            <div 
              className={`flex w-full gap-2 md:gap-8 justify-center ${
                row.length === 2 ? "px-[10%] md:px-20" : ""
              }`}
            >
              {row.map((src, i) => {
                let side = "up"; 
                if (i === 0) side = "left";
                if (i === row.length - 1) side = "right";
                
                const delays = ["", "delay-200", "delay-400"];

                return (
                  <div 
                    key={i} 
                    className={`${row.length === 3 ? "w-1/3" : "w-1/2"} flex-shrink-0`}
                  >
                    <VerticalImage
                      src={src}
                      index={i + rowIndex * 3}
                      side={side}
                      delay={delays[i]}
                      // Bạn nên truyền thêm class vào VerticalImage để nó fill đầy thẻ div này
                      className="w-full h-full object-cover shadow-sm md:shadow-xl"
                    />
                  </div>
                );
              })}
            </div>
          </RevealSection>
        ))}
      </div>
    </section>
  );
};