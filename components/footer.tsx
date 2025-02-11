"use client";

import { useState, useEffect } from "react";
import { footerData } from "@/data/footer-data";

export function Footer() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;

      // Show footer when user is at the bottom
      const isAtBottom = scrollTop + windowHeight >= documentHeight - 1;
      setIsVisible(isAtBottom);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 w-full bg-black transition-all duration-300 ease-in-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-full"
      }`}
    >
      <div className="bg-black border-t border-gray-800">
        <div className="w-full max-w-none px-4 py-3 flex items-center justify-between">
          {/* Performance Metric */}
          <div className="flex items-center">
            <div className="flex items-center space-x-1.5 bg-[#ff919d]/10 text-[#ff919d] px-3 py-1 rounded-full text-sm">
              <svg
                viewBox="0 0 24 24"
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
              <span className="font-medium">
                {footerData.performanceMetric.value}
              </span>
              <span className="text-[#ff919d]/70 text-xs">
                {footerData.performanceMetric.unit}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            {footerData.actionButtons.map((button, index) => (
              <button
                key={index}
                className="p-2 hover:bg-gray-700/30 rounded-lg transition-colors"
              >
                <button.icon className="w-5 h-5 text-gray-400" />
                <span className="sr-only">{button.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
