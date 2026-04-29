import React, { useState, useEffect, useRef } from "react";

export const RevealSection = ({ children, className = "", id = "" }) => {
  const ref = useRef(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsActive(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id={id} ref={ref} className={`${isActive ? "active" : ""} ${className}`}>
      {children}
    </section>
  );
};