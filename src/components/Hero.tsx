"use client";

import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background placeholder - replace with actual image */}
      <div className="absolute inset-0 bg-gradient-to-b from-[rgb(var(--color-black-rgb))] via-[rgb(var(--color-red-950-rgb)/0.4)] to-[rgb(var(--color-black-rgb))]">
        {/* Placeholder for concert background image */}
        <div className="absolute inset-0 bg-[url('/images/hero-bg.jpg')] bg-cover bg-center bg-no-repeat bg-[length:110%_110%] opacity-80 brightness-115 contrast-110" />
        {/* Vignette overlay for darkened borders */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_42%_65%_at_center,rgb(var(--color-black-rgb)/0)_0%,rgb(var(--color-black-rgb)/0)_70%,rgb(var(--color-black-rgb)/0.85)_85%,rgb(var(--color-black-rgb)/1)_100%)]" />
        {/* Fallback gradient overlay for when image is missing */}
        <div className="absolute inset-0 bg-gradient-to-t from-[rgb(var(--color-black-rgb)/0.8)] via-transparent to-[rgb(var(--color-black-rgb)/0.4)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-[var(--section-padding-x)] mt-[var(--hero-offset)] md:mt-[var(--hero-offset-md)]">
        {/* Logo area with staggered fade-in animations */}
        <div className="flex flex-col items-center">
          {/* PINK SIZE row */}
          <div className="flex items-center justify-center gap-[var(--hero-logo-gap)] md:gap-[var(--hero-logo-gap-md)]">
            {/* PINK logo - fades in first */}
            <div className="opacity-0 animate-[fadeIn_1s_ease-out_0.2s_forwards]">
              <Image
                src="/images/logo-pink.png"
                alt="PINK"
                width={400}
                height={100}
                className="h-[var(--hero-logo-height)] md:h-[var(--hero-logo-height-md)] lg:h-[var(--hero-logo-height-lg)] w-auto mr-[var(--hero-logo-margin-right)]"
                priority
              />
            </div>
            {/* SIZE logo - fades in second */}
            <div className="opacity-0 animate-[fadeIn_1s_ease-out_0.6s_forwards]">
              <Image
                src="/images/logo-size.png"
                alt="SIZE"
                width={400}
                height={100}
                className="h-[var(--hero-logo-height)] md:h-[var(--hero-logo-height-md)] lg:h-[var(--hero-logo-height-lg)] w-auto"
                priority
              />
            </div>
          </div>
          {/* Tribute logo - fades in third */}
          <div className="mt-[var(--hero-tribute-margin-top)] md:mt-[var(--hero-tribute-margin-top-md)] opacity-0 animate-[fadeIn_1s_ease-out_1.1s_forwards]">
            <Image
              src="/images/logo-tribute.png"
              alt="Pink Floyd Tribute"
              width={500}
              height={80}
              className="h-[var(--hero-tribute-height)] md:h-[var(--hero-tribute-height-md)] lg:h-[var(--hero-tribute-height-lg)] w-auto"
              priority
            />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-[var(--hero-scroll-bottom)] left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <a href="#biografia" className="text-[rgb(var(--color-white-rgb))]">
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
