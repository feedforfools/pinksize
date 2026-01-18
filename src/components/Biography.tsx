"use client";

import { useEffect, useRef, useState } from "react";

const bandMembers = [
  {
    name: "Matteo Ballarin",
    role: "Chitarra e Voce",
    image: "/images/members/matteo.jpg",
  },
  {
    name: "Andrea Ghion",
    role: "Basso e Voce",
    image: "/images/members/andrea.jpg",
  },
  {
    name: "Denis Ronchese",
    role: "Tastiere e Voce",
    image: "/images/members/denis.jpg",
  },
  {
    name: "Manuel Smaniotto",
    role: "Batteria e Percussioni",
    image: "/images/members/manuel.jpg",
  },
];

export default function Biography() {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const rect = parallaxRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Only apply parallax when the element is in view
        if (rect.top < windowHeight && rect.bottom > 0) {
          const scrolled = windowHeight - rect.top;
          setOffsetY(scrolled * 0.15); // Parallax speed factor
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="biografia"
      className="bg-[rgb(var(--color-black-rgb))] text-[rgb(var(--color-white-rgb))]"
    >
      {/* Biography Content */}
      <div className="max-w-6xl mx-auto px-[var(--section-padding-x)] py-[var(--section-padding-y)]">
        <h2 className="text-[length:var(--section-title-size)] md:text-[length:var(--section-title-size-lg)] font-bold text-center mb-[var(--section-title-margin-bottom)] tracking-tight">
          BIOGRAFIA
        </h2>

        <p className="text-[rgb(var(--color-white-rgb))] text-[length:var(--body-text-lg)] text-center max-w-6xl mx-auto mb-[var(--bio-paragraph-margin-bottom)] leading-relaxed">
          Dal 2005 vi facciamo emozionare proponendo con grande passione le
          sonorità tipiche dei Pink Floyd a 360 gradi.
          <br />
          La scaletta abbraccia tutta la discografia, dalla psichedelia di
          Astronomy Domine ed Echoes, passando per l&apos;evoluzione degli anni
          &apos;70 (Atom Heart Mother, Dark Side of the Moon, Wish You Were
          Here, Animals e The Wall), fino al loro ultimo album in studio.
        </p>

        {/* Band Members */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-[var(--bio-member-gap)] md:gap-[var(--bio-member-gap-md)]">
          {bandMembers.map((member) => (
            <div key={member.name} className="text-center">
              {/* Circular Photo Placeholder */}
              <div className="relative mx-auto w-[var(--bio-member-photo)] h-[var(--bio-member-photo)] md:w-[var(--bio-member-photo-md)] md:h-[var(--bio-member-photo-md)] mb-[var(--bio-member-photo-margin-bottom)]">
                <div className="absolute inset-0 rounded-full border-5 border-[rgb(var(--color-white-rgb))] overflow-hidden">
                  <div
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${member.image})` }}
                  />
                  {/* Fallback placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center"></div>
                </div>
              </div>
              <h3 className="text-[rgb(var(--color-white-rgb))] font-bold text-[length:var(--bio-member-name-size)] md:text-[length:var(--bio-member-name-size-md)]">
                {member.name}
              </h3>
              <p className="text-[rgb(var(--color-gray-400-rgb))] text-[length:var(--bio-member-role-size)] md:text-[length:var(--bio-member-role-size-md)]">
                {member.role}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Band Group Photo with Parallax - Full bleed element outside padded content */}
      <div
        ref={parallaxRef}
        className="w-full h-[var(--bio-parallax-height)] md:h-[var(--bio-parallax-height-md)] relative overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-[url('/images/band-group.jpg')] bg-cover bg-no-repeat"
          style={{
            backgroundPosition: `center calc(-12% - ${offsetY}px)`,
            transform: `translateY(-${offsetY * 0.2}px)`,
            height: "120%",
            top: "-10%",
          }}
        />
      </div>
    </section>
  );
}
