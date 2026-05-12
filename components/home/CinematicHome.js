'use client';

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { industryScenes } from './industryScenes';

gsap.registerPlugin(ScrollTrigger);

const HomeDroneCanvas = dynamic(() => import('./HomeDroneCanvas'), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-white">
      <div className="h-16 w-16 rounded-full border border-nk-border border-t-nk-cyan" />
    </div>
  ),
});

function clamp(value, min = 0, max = 1) {
  return Math.min(Math.max(value, min), max);
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 768);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return isMobile;
}

export default function CinematicHome() {
  const journeyRef = useRef(null);
  const frameRef = useRef(null);
  const rafRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const isMobile = useIsMobile();

  useLayoutEffect(() => {
    if (!journeyRef.current || !frameRef.current) return undefined;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: journeyRef.current,
        start: 'top top',
        end: () => `+=${window.innerHeight * (industryScenes.length - 1)}`,
        pin: frameRef.current,
        pinSpacing: true,
        scrub: 0.9,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          cancelAnimationFrame(rafRef.current);
          rafRef.current = requestAnimationFrame(() => setProgress(self.progress));
        },
      });
    }, journeyRef);

    ScrollTrigger.refresh();

    return () => {
      cancelAnimationFrame(rafRef.current);
      ctx.revert();
    };
  }, []);

  const sceneState = useMemo(() => {
    const raw = clamp(progress) * (industryScenes.length - 1);
    const activeIndex = Math.min(Math.round(raw), industryScenes.length - 1);
    return {
      scene: industryScenes[activeIndex],
      activeIndex,
      percentage: Math.round((activeIndex / (industryScenes.length - 1)) * 100),
    };
  }, [progress]);

  const isFinal = sceneState.scene.id === 'final';
  const isIntro = sceneState.scene.id === 'intro';

  const prevScene = useMemo(() => {
    const raw = clamp(progress) * (industryScenes.length - 1);
    const prev = Math.max(Math.floor(raw) - 1, 0);
    return industryScenes[prev];
  }, [progress]);

  return (
    <div className="overflow-x-hidden bg-white">
      <section ref={journeyRef} className="relative bg-white pt-16">
        <div ref={frameRef} className="relative h-[calc(100svh-4rem)] min-h-[620px] overflow-hidden bg-white md:min-h-[680px]">

          {/* WebP cinematic backgrounds — cross-fade and parallax per scene */}
          <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-[#F8F9FA]">
            {industryScenes.map((s, i) => {
              if (!s.bgImage) return null;
              
              // Calculate local progress for parallax and fading
              const localProgress = (progress * (industryScenes.length - 1)) - i;
              
              // Hide completely if out of range to save performance
              if (Math.abs(localProgress) > 1.5) return null;
              
              const isActive = Math.abs(localProgress) <= 1;
              const opacity = clamp(1 - Math.abs(localProgress));
              // Slow push-in/pull-out and vertical slide for cinematic depth
              const scale = 1.05 + (localProgress * 0.035);
              const yOffset = localProgress * 4;
              
              return (
                <div
                  key={s.id}
                  className="absolute inset-0"
                  style={{
                    opacity: opacity,
                    zIndex: Math.abs(localProgress) < 0.5 ? 1 : 0,
                  }}
                >
                  <img
                    src={s.bgImage}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 h-full w-full object-cover"
                    style={{
                      transform: `scale(${scale}) translateY(${yOffset}%)`,
                      transformOrigin: 'center center',
                    }}
                  />
                  {/* Cinematic light sweep transition overlay */}
                  <div 
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(${180 + localProgress * 30}deg, rgba(255,255,255,0) 0%, rgba(255,255,255,${Math.abs(localProgress) * 0.3}) 100%)`,
                      mixBlendMode: 'soft-light'
                    }}
                  />
                </div>
              );
            })}

            {/* Atmosphere haze — layered depth blending 3D with background */}
            <div
              className="absolute inset-0 z-10"
              style={{
                background:
                  'linear-gradient(to bottom, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.05) 30%, rgba(255,255,255,0.05) 70%, rgba(255,255,255,0.5) 100%)',
              }}
            />


          </div>

          <div className="absolute inset-0 z-[1]">
            <HomeDroneCanvas progress={progress} isMobile={isMobile} />
          </div>

          <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_50%_18%,rgba(0,174,239,0.07),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.55)_92%)]" />
          <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-28 bg-gradient-to-b from-white via-white/80 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-36 bg-gradient-to-t from-white via-white/80 to-transparent" />

          <div className="pointer-events-none absolute inset-0 z-20">
            <div className="mx-auto flex h-full max-w-7xl items-center px-5 sm:px-8 lg:px-10">
              <motion.div
                key={sceneState.scene.id}
                initial={false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className={[
                  'max-w-[22rem] sm:max-w-[30rem]',
                  isFinal ? 'mx-auto text-center' : '',
                  isIntro ? 'self-center' : '',
                  !isFinal && !isIntro && sceneState.activeIndex % 2 === 0 ? 'ml-auto text-right' : '',
                ].join(' ')}
              >
                {!isFinal && !isIntro && (
                  <p className="mb-3 font-mono text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-nk-cyan">
                    {String(sceneState.activeIndex).padStart(2, '0')}
                  </p>
                )}
                <h1 className={isIntro || isFinal ? 'font-display text-4xl font-semibold leading-tight text-nk-navy sm:text-6xl lg:text-7xl' : 'font-display text-4xl font-semibold leading-tight text-nk-navy sm:text-6xl'}>
                  {sceneState.scene.label}
                </h1>
                <p className="mt-5 max-w-md text-base leading-7 text-nk-secondary sm:text-lg">
                  {sceneState.scene.subline}
                </p>
                {isFinal && (
                  <div className="pointer-events-auto mt-8">
                    <Link
                      href="/philosophy"
                      className="inline-flex items-center gap-2 rounded-full bg-nk-cyan px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_44px_rgba(0,174,239,0.24)] transition hover:bg-[#009BD8] focus:outline-none focus:ring-2 focus:ring-nk-cyan focus:ring-offset-2"
                    >
                      See The Philosophy
                      <ArrowRight size={17} />
                    </Link>
                  </div>
                )}
              </motion.div>
            </div>
          </div>

          <div className="pointer-events-none absolute bottom-6 left-5 right-5 z-20 flex items-center justify-between sm:left-8 sm:right-8 lg:left-10 lg:right-10">
            <div className="hidden items-center gap-2 sm:flex">
              {industryScenes.map((scene, index) => {
                const isPast = index < sceneState.activeIndex;
                const isActive = index === sceneState.activeIndex;
                return (
                  <div key={scene.id} className="flex items-center gap-2">
                    <div 
                      className={`relative flex h-2 w-2 items-center justify-center rounded-full transition-colors duration-500 ${
                        isActive ? 'bg-nk-cyan' : isPast ? 'bg-[#A0B0C0]' : 'bg-transparent border border-[#A0B0C0]'
                      }`}
                    >
                      {isActive && (
                        <div className="absolute h-5 w-5 rounded-full border border-nk-cyan animate-ping opacity-30" />
                      )}
                    </div>
                    {index < industryScenes.length - 1 && (
                      <div 
                        className={`h-[1px] w-4 transition-colors duration-500 ${
                          isPast ? 'bg-[#A0B0C0]' : 'bg-transparent'
                        }`} 
                      />
                    )}
                  </div>
                );
              })}
            </div>
            <div className="ml-auto flex items-center gap-3">
              <div className="h-px w-20 bg-[#D0DCE8] sm:w-32">
                <div className="h-px bg-nk-cyan" style={{ width: `${sceneState.percentage}%` }} />
              </div>
              <span className="font-mono text-[0.66rem] uppercase tracking-[0.22em] text-nk-secondary">
                Scroll
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
