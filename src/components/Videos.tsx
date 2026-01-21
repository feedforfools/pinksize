"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { getVideos, Video } from "@/lib/supabase";

// VHS Tracking effect overlay
function VHSOverlay() {
  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
      {/* Scanlines */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgb(var(--color-black-rgb) / 0.3) 2px, rgb(var(--color-black-rgb) / 0.3) 4px)",
        }}
      />
      {/* Color aberration on edges */}
      <div className="absolute inset-0 opacity-30 mix-blend-screen bg-gradient-to-r from-[rgb(var(--color-red-500-rgb)/0.2)] via-transparent to-[rgb(var(--color-cyan-500-rgb)/0.2)]" />
    </div>
  );
}

// Retro TV Frame component
function RetroTV({
  video,
  isActive,
  onClick,
}: {
  video: Video;
  isActive: boolean;
  onClick: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [glitchOffset, setGlitchOffset] = useState(0);

  // Random glitch effect
  useEffect(() => {
    if (isHovered) {
      const interval = setInterval(() => {
        if (Math.random() > 0.7) {
          setGlitchOffset(Math.random() * 4 - 2);
          setTimeout(() => setGlitchOffset(0), 50);
        }
      }, 200);
      return () => clearInterval(interval);
    }
  }, [isHovered]);

  return (
    <div
      className={`relative cursor-pointer transition-all duration-500 ${
        isActive ? "scale-100" : "hover:scale-105"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* TV Outer Frame - Wood/Plastic casing */}
      <div
        className={`relative rounded-lg p-3 md:p-4 transition-all duration-300 ${
          isHovered
            ? "bg-gradient-to-b from-[rgb(var(--color-zinc-700-rgb))] via-[rgb(var(--color-zinc-800-rgb))] to-[rgb(var(--color-zinc-900-rgb))] shadow-[var(--shadow-glow-red-wide)]"
            : "bg-gradient-to-b from-[rgb(var(--color-zinc-800-rgb))] via-[rgb(var(--color-zinc-900-rgb))] to-[rgb(var(--color-black-rgb))]"
        }`}
        style={{
          boxShadow: isHovered
            ? "inset 0 2px 4px rgb(var(--color-white-rgb) / 0.1), 0 10px 40px rgb(var(--color-black-rgb) / 0.8)"
            : "inset 0 1px 2px rgb(var(--color-white-rgb) / 0.05), 0 5px 20px rgb(var(--color-black-rgb) / 0.5)",
        }}
      >
        {/* TV Screen bezel */}
        <div className="relative rounded bg-[rgb(var(--color-black-rgb))] p-1 md:p-2">
          {/* Inner glow effect */}
          <div
            className={`absolute inset-0 rounded transition-opacity duration-300 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
            style={{
              boxShadow: "inset 0 0 20px rgb(var(--color-blue-glow-rgb) / 0.2)",
            }}
          />

          {/* Screen with CRT curve effect */}
          <div
            className="relative aspect-video overflow-hidden rounded-sm"
            style={{
              transform: `translateX(${glitchOffset}px)`,
              boxShadow: "inset 0 0 60px rgb(var(--color-black-rgb) / 0.5)",
            }}
          >
            {/* YouTube Thumbnail */}
            <Image
              src={`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`}
              alt={video.title}
              fill
              className={`object-cover transition-all duration-300 ${
                isHovered
                  ? "brightness-110 contrast-110"
                  : "brightness-90 contrast-90 saturate-90"
              }`}
            />

            {/* CRT Screen curvature overlay */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse 120% 120% at 50% 50%, transparent 50%, rgb(var(--color-black-rgb) / 0.4) 100%)",
              }}
            />

            {/* VHS Effects */}
            <VHSOverlay />

            {/* Phosphor glow when hovered */}
            <div
              className={`absolute inset-0 transition-opacity duration-300 ${
                isHovered ? "opacity-30" : "opacity-0"
              }`}
              style={{
                background:
                  "radial-gradient(ellipse at center, rgb(var(--color-blue-glow-rgb) / 0.3) 0%, transparent 70%)",
              }}
            />

            {/* Play button overlay */}
            <div
              className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[rgb(var(--color-red-600-rgb)/0.9)] flex items-center justify-center backdrop-blur-sm border-2 border-[rgb(var(--color-white-rgb)/0.3)] shadow-[var(--shadow-play-button)]">
                <svg
                  className="w-8 h-8 md:w-10 md:h-10 text-[rgb(var(--color-white-rgb))] ml-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>

            {/* VHS timestamp */}
            <div className="absolute bottom-2 right-2 font-mono text-xs text-[rgb(var(--color-green-400-rgb)/0.8)] bg-[rgb(var(--color-black-rgb)/0.6)] px-2 py-0.5 rounded">
              {video.year}
              {video.badge && ` • ${video.badge}`}
            </div>
          </div>
        </div>

        {/* TV Controls - decorative knobs */}
        <div className="flex items-center justify-between mt-2 md:mt-3 px-2">
          <div className="flex gap-2">
            <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-gradient-to-b from-[rgb(var(--color-zinc-600-rgb))] to-[rgb(var(--color-zinc-800-rgb))] border border-[rgb(var(--color-zinc-700-rgb))]" />
            <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-gradient-to-b from-[rgb(var(--color-zinc-600-rgb))] to-[rgb(var(--color-zinc-800-rgb))] border border-[rgb(var(--color-zinc-700-rgb))]" />
          </div>
          {/* Power LED */}
          <div
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              isHovered
                ? "bg-[rgb(var(--color-red-500-rgb))] shadow-[var(--shadow-glow-red-small)]"
                : "bg-[rgb(var(--color-red-900-rgb))]"
            }`}
          />
        </div>
      </div>

      {/* Video Title - VHS Label style */}
      <div className="mt-3 text-center">
        <div
          className={`inline-block px-3 py-1 rounded transition-all duration-300 ${
            isHovered
              ? "bg-[rgb(var(--color-zinc-800-rgb)/0.8)] text-[rgb(var(--color-white-rgb))]"
              : "bg-transparent text-[rgb(var(--color-zinc-400-rgb))]"
          }`}
        >
          <p className="font-bold text-[length:var(--video-card-title-size)] md:text-[length:var(--video-card-title-size-md)] tracking-wide uppercase">
            {video.title}
          </p>
        </div>
      </div>
    </div>
  );
}

// Video Modal
function VideoModal({ video, onClose }: { video: Video; onClose: () => void }) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-[var(--video-modal-padding)] md:p-[var(--video-modal-padding-lg)]"
      onClick={onClose}
    >
      {/* Backdrop with static noise */}
      <div className="absolute inset-0 bg-[rgb(var(--color-black-rgb)/0.95)] backdrop-blur-sm">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Modal Content - Large Retro TV */}
      <div
        className="relative w-full max-w-5xl animate-[fadeIn_0.3s_ease-out]"
        style={{
          maxHeight: "calc(100vh - 32px)",
          maxWidth: "min(64rem, calc((100vh - 32px - 5rem) * 16 / 9))",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* TV Frame */}
        <div className="bg-gradient-to-b from-[rgb(var(--color-zinc-700-rgb))] via-[rgb(var(--color-zinc-800-rgb))] to-[rgb(var(--color-zinc-900-rgb))] rounded-lg sm:rounded-xl p-2 sm:p-4 md:p-6 shadow-2xl">
          <div className="bg-[rgb(var(--color-black-rgb))] rounded-md sm:rounded-lg p-1 sm:p-2 md:p-3">
            <div
              className="relative aspect-video rounded overflow-hidden"
              style={{
                boxShadow: "inset 0 0 100px rgb(var(--color-black-rgb) / 0.5)",
              }}
            >
              <iframe
                src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
                title={video.title}
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              <VHSOverlay />
            </div>
          </div>

          {/* TV Bottom with controls */}
          <div className="flex items-center justify-between mt-2 sm:mt-[var(--video-modal-controls-margin-top)] px-1 sm:px-[var(--video-modal-controls-padding-x)]">
            <div className="flex gap-1.5 sm:gap-3">
              <div className="w-4 h-4 sm:w-6 sm:h-6 rounded-full bg-gradient-to-b from-[rgb(var(--color-zinc-500-rgb))] to-[rgb(var(--color-zinc-700-rgb))] border sm:border-2 border-[rgb(var(--color-zinc-600-rgb))]" />
              <div className="w-4 h-4 sm:w-6 sm:h-6 rounded-full bg-gradient-to-b from-[rgb(var(--color-zinc-500-rgb))] to-[rgb(var(--color-zinc-700-rgb))] border sm:border-2 border-[rgb(var(--color-zinc-600-rgb))]" />
            </div>
            <p className="text-[rgb(var(--color-white-rgb))] font-bold text-xs sm:text-[length:var(--video-modal-title-size)] md:text-[length:var(--video-modal-title-size-md)] tracking-wider uppercase truncate max-w-[50%]">
              {video.title}
            </p>
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[rgb(var(--color-red-500-rgb))] shadow-[var(--shadow-glow-red-soft)] animate-pulse" />
          </div>
        </div>

        {/* Close button - positioned inside on small screens */}
        <button
          onClick={onClose}
          className="absolute top-1 right-1 sm:-top-3 sm:-right-3 md:-top-4 md:-right-4 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[rgb(var(--color-zinc-800-rgb)/0.9)] sm:bg-[rgb(var(--color-zinc-800-rgb))] border-2 border-[rgb(var(--color-zinc-600-rgb))] text-[rgb(var(--color-white-rgb))] flex items-center justify-center hover:bg-[rgb(var(--color-red-600-rgb))] hover:border-[rgb(var(--color-red-500-rgb))] transition-colors z-10"
        >
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default function Videos() {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchVideos() {
      try {
        const data = await getVideos();
        if (isMounted) {
          setVideos(data);
        }
      } catch (error) {
        console.error("Error fetching videos:", error);
        if (isMounted) {
          setVideos([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchVideos();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (
      selectedVideo &&
      !videos.some((video) => video.id === selectedVideo.id)
    ) {
      setSelectedVideo(null);
    }
  }, [videos, selectedVideo]);

  return (
    <section
      id="video"
      className="relative bg-[rgb(var(--color-black-rgb))] text-[rgb(var(--color-white-rgb))] py-[var(--section-padding-y)] overflow-hidden"
    >
      {/* Ambient background */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[rgb(var(--color-red-950-rgb)/0.2)] via-transparent to-[rgb(var(--color-purple-950-rgb)/0.2)]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-[var(--section-padding-x)]">
        <h2 className="text-[length:var(--section-title-size)] md:text-[length:var(--section-title-size-lg)] font-bold tracking-tight mb-[var(--section-title-margin-bottom)] text-center">
          VIDEO
        </h2>

        {loading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[rgb(var(--color-white-rgb))]" />
          </div>
        ) : videos.length === 0 ? (
          <p className="text-center text-[rgb(var(--color-gray-400-rgb))] text-[length:var(--body-text-lg)]">
            Nessun video disponibile
          </p>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-[var(--video-grid-gap)] md:gap-[var(--video-grid-gap-md)]">
            {videos.map((video) => (
              <RetroTV
                key={video.id}
                video={video}
                isActive={selectedVideo?.id === video.id}
                onClick={() => setSelectedVideo(video)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <VideoModal
          video={selectedVideo}
          onClose={() => setSelectedVideo(null)}
        />
      )}
    </section>
  );
}
