"use client";

import Image, { getImageProps } from "next/image";
import { useState, useEffect, useRef } from "react";

export default function Hero() {
  const [bgLoaded, setBgLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Handle cached images that may already be loaded
  useEffect(() => {
    if (imgRef.current?.complete) {
      setBgLoaded(true);
    }
  }, []);

  const common = {
    alt: "Concert background",
    sizes: "100vw",
    priority: true,
  };

  const { props: desktopProps } = getImageProps({
    ...common,
    src: "/images/hero-bg.jpg",
    width: 2400,
    height: 1350,
  });

  const { props: mobileProps } = getImageProps({
    ...common,
    src: "/images/hero-bg-mobile.jpg",
    width: 1080,
    height: 1920,
  });

  return (
    <section className="hero-section relative w-full overflow-hidden">
      {/* Background image container */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Art-directed image (desktop + mobile) with Next optimization */}
        <picture>
          <source media="(max-width: 767px)" srcSet={mobileProps.srcSet} />
          <source media="(min-width: 768px)" srcSet={desktopProps.srcSet} />
          <img
            ref={imgRef}
            {...desktopProps}
            alt="Concert background"
            className="absolute inset-0 w-full h-full object-cover object-center brightness-110 contrast-110"
            onLoad={() => setBgLoaded(true)}
          />
        </picture>
        {/* Gradient overlay on top of image */}
        <div className="absolute inset-0 bg-gradient-to-b from-[rgb(var(--color-black-rgb))] via-[rgb(var(--color-red-950-rgb)/0.4)] to-[rgb(var(--color-black-rgb))]" />
        {/* Vignette overlay for darkened borders */}
        <div className="hero-vignette absolute inset-0 bg-[radial-gradient(ellipse_42%_65%_at_center,rgb(var(--color-black-rgb)/0)_0%,rgb(var(--color-black-rgb)/0)_70%,rgb(var(--color-black-rgb)/0.85)_85%,rgb(var(--color-black-rgb)/1)_100%)]" />
        {/* Edge gradient overlay for smoothing top/bottom */}
        <div className="hero-edge-gradient absolute inset-0" />
        {/* Fallback gradient overlay for when image is missing */}
        <div className="absolute inset-0 bg-gradient-to-t from-[rgb(var(--color-black-rgb)/0.8)] via-transparent to-[rgb(var(--color-black-rgb)/0.4)]" />
      </div>

      {/* Content */}
      <div className="hero-content relative z-10 flex flex-col items-center justify-center text-center px-[var(--section-padding-x)] mt-[var(--hero-offset)] md:mt-[var(--hero-offset-md)]">
        {/* Logo area with staggered fade-in animations - only shows after bg loads */}
        {bgLoaded && (
          <div className="flex flex-col items-center max-w-full overflow-hidden">
            {/* PINK SIZE row */}
            <div className="flex items-center justify-center gap-[var(--hero-logo-gap)] md:gap-[var(--hero-logo-gap-md)] max-w-full">
              {/* PINK logo */}
              <div className="opacity-0 animate-[fadeIn_1s_ease-out_0.4s_forwards] shrink">
                <Image
                  src="/images/logo-pink.png"
                  alt="PINK"
                  width={400}
                  height={100}
                  className="h-[var(--hero-logo-height)] md:h-[var(--hero-logo-height-md)] lg:h-[var(--hero-logo-height-lg)] w-auto max-w-full mr-[var(--hero-logo-margin-right)]"
                  priority
                />
              </div>
              {/* SIZE logo */}
              <div className="opacity-0 animate-[fadeIn_1s_ease-out_1.0s_forwards] shrink">
                <Image
                  src="/images/logo-size.png"
                  alt="SIZE"
                  width={400}
                  height={100}
                  className="h-[var(--hero-logo-height)] md:h-[var(--hero-logo-height-md)] lg:h-[var(--hero-logo-height-lg)] w-auto max-w-full"
                  priority
                />
              </div>
            </div>
            {/* Tribute logo */}
            <div className="mt-[var(--hero-tribute-margin-top)] md:mt-[var(--hero-tribute-margin-top-md)] opacity-0 animate-[fadeIn_1s_ease-out_2.0s_forwards] w-full flex justify-center lg:w-auto">
              <Image
                src="/images/logo-tribute.png"
                alt="Pink Floyd Tribute"
                width={500}
                height={80}
                className="w-[35%] h-auto lg:w-auto lg:h-[var(--hero-tribute-height-lg)]"
                priority
              />
            </div>
          </div>
        )}
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll absolute bottom-[var(--hero-scroll-bottom)] left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <a href="#bio" className="text-[rgb(var(--color-white-rgb))]">
          <svg
            className="w-[var(--hero-scroll-size)] h-[var(--hero-scroll-size)]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </a>
      </div>
    </section>
  );
}
