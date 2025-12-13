// src/components/Swiper.tsx
import { useRef } from "react";
import meilLogo from "@/assets/swiper/meil.png";
import mahabalaLogo from "@/assets/swiper/Mahabala.png";
import tnebLogo from "@/assets/swiper/tneb (1).jpg";
import ptlLogo from "@/assets/swiper/PTL.png";
import shahLogo from "@/assets/swiper/Shah.png";
import greenLogo from "@/assets/swiper/Green.png";
import admireLogo from "@/assets/swiper/admire.png";
import bhelLogo from "@/assets/swiper/bhel.png";
import Sterlite from "@/assets/swiper/Sterlite.png";
import ltLogo from "@/assets/swiper/lt.jpg";
import nlcLogo from "@/assets/swiper/NLC.png";
import venusLogo from "@/assets/swiper/venusenergy.png";

export function Swiper() {
  const partners = [
    { name: "TNEB", logo: tnebLogo },
    { name: "PTL", logo: ptlLogo },
    { name: "Shah", logo: shahLogo },
    { name: "Shah", logo: Sterlite },
    { name: "Bhel", logo: bhelLogo },
    { name: "LT", logo: ltLogo },
    { name: "NLC", logo: nlcLogo },
    { name: "Venus Energy", logo: venusLogo },
  ];

  return (
    <section className="py-16 overflow-hidden bg-gradient-to-b from-white to-gray-50">
      <div className="px-4 mx-auto max-w-[1440px] sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
        

             <span className="inline-block px-5 py-2 bg-[#03045e] text-white font-semibold rounded-full text-sm mb-6">
           Trusted By
          </span>
      
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 text-[#03045e]">
         Our Valued
   <span className="text-[#03045e] ml-2">
                     Partners

        </span>
        </h2>
        </div>

        {/* Infinite Scrolling Container */}
        <div className="relative">
          {/* Gradient Overlays */}

          {/* Scrolling Track */}
          <div className="flex animate-scroll">
            {/* First set of logos */}
            {partners.map((partner, idx) => (
              <div
                key={`first-${idx}`}
                className="flex-shrink-0 w-[200px] h-[120px] mx-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 flex items-center justify-center p-6 group"
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="object-contain max-w-full max-h-full transition-all duration-300 grayscale group-hover:grayscale-0 opacity-70 group-hover:opacity-100"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                    if (target.parentElement) {
                      target.parentElement.innerHTML = `<div class="text-[#0A1F44] font-bold text-lg text-center">${partner.name}</div>`;
                    }
                  }}
                />
              </div>
            ))}
            {/* Duplicate set for seamless loop */}
            {partners.map((partner, idx) => (
              <div
                key={`second-${idx}`}
                className="flex-shrink-0 w-[200px] h-[120px] mx-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 flex items-center justify-center p-6 group"
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="object-contain max-w-full max-h-full transition-all duration-300 grayscale group-hover:grayscale-0 opacity-70 group-hover:opacity-100"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                    if (target.parentElement) {
                      target.parentElement.innerHTML = `<div class="text-[#0A1F44] font-bold text-lg text-center">${partner.name}</div>`;
                    }
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CSS Animation */}
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          animation: scroll 40s linear infinite;
        }

        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
