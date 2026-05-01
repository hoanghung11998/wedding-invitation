import React from "react";
import { VerticalImage } from "../UI/VerticalImage";

const GALLERY_IMAGES = [
  "VHH_0158.jpg",
  "VHH_0213.jpg",
  "VHH_0295.jpg",
  "VHH_0442.jpg",
  "VHH_0507.jpg",
  "VHH_1031.jpg",
  "VHH_0804.jpg",
  "VHH_0870.jpg",
  "VHH_1074.jpg",
  "VHH_0599.jpg",
  "VHH_1431.jpg",
  "VHH_1306.jpg",
  "VHH_1314.jpg",
  "VHH_1341.jpg",
  "VHH_1364.jpg",
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
          Kỷ Niệm Của Chúng Mình
        </h2>
        <div className="w-12 h-[1px] bg-rose-300 mx-auto mt-4"></div>
      </div>

      <div className="max-w-6xl mx-auto px-2 md:px-4 space-y-4 md:space-y-8">
        {imageRows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className={`flex w-full gap-2 md:gap-8 justify-center ${
              row.length === 2 ? "px-[5%] md:px-20" : ""
            }`}
          >
            {row.map((src, i) => {
              // Xác định hướng bay: trái sang, giữa trồi lên, phải sang
              let side = "up";
              if (i === 0) side = "left";
              if (i === row.length - 1) side = "right";

              // Delay dạng số (ms) để Stagger mượt mà
              // Mỗi ảnh trong hàng hiện cách nhau 200ms
              const delayValue = i * 200;

              return (
                <div
                  key={i}
                  className={`${row.length === 3 ? "w-1/3" : "w-1/2"} flex-shrink-0`}
                >
                  <VerticalImage
                    src={src}
                    index={i + rowIndex * 3}
                    side={side}
                    delay={delayValue}
                  />
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );
};
