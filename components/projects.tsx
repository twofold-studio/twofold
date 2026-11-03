"use client";

import { useCallback, useEffect, useRef, useLayoutEffect, useState } from "react";
import { useOverlay } from "@/lib/overlay-context";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
  AnimatePresence,
} from "motion/react";
import { WaterRipple } from "./water-ripple";
import { work, type Work } from "@/lib/content";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function BlobCursor({ isVisible }: { isVisible: boolean }) {
  const blobRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { damping: 30, stiffness: 400, mass: 0.2 });
  const smoothY = useSpring(mouseY, { damping: 30, stiffness: 400, mass: 0.2 });
  const velocityX = useVelocity(smoothX);
  const velocityY = useVelocity(smoothY);

  const speed = useTransform(() => Math.sqrt(velocityX.get() ** 2 + velocityY.get() ** 2));
  const scaleAlongMotion = useTransform(speed, [0, 800, 2000], [1, 1.3, 1.6]);
  const scalePerp = useTransform(speed, [0, 800, 2000], [1, 0.8, 0.65]);
  const rotate = useTransform(() => Math.atan2(velocityY.get(), velocityX.get()) * (180 / Math.PI));

  useEffect(() => {
    let rafId: number | null = null;
    let lastX = 0, lastY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      lastX = e.clientX;
      lastY = e.clientY;
      if (rafId === null) {
        rafId = requestAnimationFrame(() => {
          mouseX.set(lastX);
          mouseY.set(lastY);
          rafId = null;
        });
      }
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [mouseX, mouseY]);

  return (
    <motion.div
      ref={blobRef}
      className="pointer-events-none fixed z-50 flex items-center justify-center"
      style={{ left: smoothX, top: smoothY, x: "-50%", y: "-50%" }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0 }}
      transition={{ opacity: { duration: 0.3, ease: "easeOut" }, scale: { duration: 0.3, ease: [0.34, 1.56, 0.64, 1] } }}
    >
      <motion.div style={{ rotate }}>
        <motion.div
          className="flex h-20 w-20 items-center justify-center rounded-full bg-foreground"
          style={{ scaleX: scaleAlongMotion, scaleY: scalePerp }}
        >
          <motion.span
            className="text-sm font-medium uppercase tracking-wide text-background"
            style={{
              rotate: useTransform(rotate, (r) => -r),
              scaleX: useTransform(scaleAlongMotion, (s) => 1 / s),
              scaleY: useTransform(scalePerp, (s) => 1 / s),
            }}
          >
            View
          </motion.span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function useElementWidth<T extends HTMLElement>(ref: React.RefObject<T | null>): number {
  const [width, setWidth] = useState(0);
  useLayoutEffect(() => {
    const updateWidth = () => ref.current && setWidth(ref.current.offsetWidth);
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, [ref]);
  return width;
}

function VelocityText({ children, baseVelocity = 100, className = "" }: { children: React.ReactNode; baseVelocity?: number; className?: string }) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], { clamp: false });
  const copyRef = useRef<HTMLSpanElement>(null);
  const copyWidth = useElementWidth(copyRef);

  const wrap = (min: number, max: number, v: number) => {
    const range = max - min;
    return ((((v - min) % range) + range) % range) + min;
  };

  const x = useTransform(baseX, (v) => (copyWidth === 0 ? "0px" : `${wrap(-copyWidth, 0, v)}px`));
  const directionFactor = useRef(1);

  useAnimationFrame((_, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
    if (velocityFactor.get() < 0) directionFactor.current = -1;
    else if (velocityFactor.get() > 0) directionFactor.current = 1;
    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="relative overflow-hidden w-full">
      <motion.div className="flex whitespace-nowrap" style={{ x }}>
        {Array.from({ length: 6 }, (_, i) => (
          <span className={`shrink-0 ${className}`} key={i} ref={i === 0 ? copyRef : null}>
            {children}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

function useCoarsePointer(): boolean {
  const [coarse, setCoarse] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(hover: none)");
    const update = () => setCoarse(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return coarse;
}

function ArrowUpRight({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 17L17 7M17 7H7M17 7V17" />
    </svg>
  );
}

function ProjectOverlay({ project, onClose }: { project: Work | null; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    document.body.style.overflow = project ? "hidden" : "";
    if (project) closeRef.current?.focus();
    return () => { document.body.style.overflow = ""; };
  }, [project]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => project && e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose, project]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="work-dialog-title"
          className="fixed inset-0 z-100 bg-background"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div data-lenis-prevent className="h-full overflow-y-auto overscroll-contain">
            <button
              ref={closeRef}
              onClick={onClose}
              className="focus-ring fixed right-4 top-4 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-foreground text-background transition-transform hover:scale-105 active:scale-95 sm:right-8 sm:top-8 md:h-14 md:w-14"
              aria-label="Close project"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <div className="mx-auto max-w-360 px-6 pb-24 pt-24 sm:px-12 sm:pt-28 lg:px-24 2xl:max-w-450">
              <motion.div
                className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,4fr)] lg:gap-20"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <div>
                  <p className="mb-6 text-sm font-medium uppercase tracking-widest text-muted-foreground">{project.kind}</p>
                  <h2 id="work-dialog-title" className="text-[clamp(3rem,8vw,7.5rem)] font-medium leading-[0.95] tracking-tight text-foreground">
                    <span className="block">{project.name}</span>
                    <span className="block font-serif font-normal italic text-accent">{project.kicker}</span>
                  </h2>
                </div>
                <div className="flex flex-col justify-end gap-6">
                  {project.story.map((para) => (
                    <p key={para.slice(0, 24)} className="text-lg leading-relaxed text-foreground/80">{para}</p>
                  ))}
                  <dl className="grid grid-cols-2 gap-6 border-t border-border pt-6 text-sm">
                    <div>
                      <dt className="mb-2 text-muted-foreground">Stack</dt>
                      <dd className="flex flex-wrap gap-2">
                        {project.stack.map((t) => (
                          <span key={t} className="rounded-full border border-border px-3 py-1 text-foreground">{t}</span>
                        ))}
                      </dd>
                    </div>
                    <div>
                      <dt className="mb-2 text-muted-foreground">Built by</dt>
                      <dd className="text-foreground">{project.builtBy}</dd>
                    </div>
                  </dl>
                  {project.link && (
                    <a
                      href={project.link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="focus-ring inline-flex w-fit items-center gap-3 rounded-full bg-foreground px-6 py-3 text-base font-medium text-background transition-opacity hover:opacity-85"
                    >
                      {project.link.label}
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </motion.div>

              <div className="mt-16 flex flex-col gap-12 lg:mt-24 lg:gap-16">
                {project.images.map((img, i) => (
                  <motion.figure
                    key={img.src}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img.src}
                      alt={img.caption}
                      loading={i === 0 ? "eager" : "lazy"}
                      className="w-full rounded-2xl border border-border sm:rounded-3xl"
                    />
                    <figcaption className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">{img.caption}</figcaption>
                  </motion.figure>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ProjectItem({ project, index, onHover, onClick, coarse }: { project: Work; index: number; onHover: (isHovering: boolean) => void; onClick: () => void; coarse: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const canvasWrapperRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  const [maskRadius, setMaskRadius] = useState(0);
  const [hovered, setHovered] = useState(false);
  const isEven = index % 2 === 0;

  const xTo = useRef<gsap.QuickToFunc | null>(null);
  const yTo = useRef<gsap.QuickToFunc | null>(null);
  const scaleTo = useRef<gsap.QuickToFunc | null>(null);

  useEffect(() => {
    if (!canvasWrapperRef.current) return;
    xTo.current = gsap.quickTo(canvasWrapperRef.current, "x", { duration: 0.8, ease: "power3.out" });
    yTo.current = gsap.quickTo(canvasWrapperRef.current, "y", { duration: 0.8, ease: "power3.out" });
    scaleTo.current = gsap.quickTo(canvasWrapperRef.current, "scale", { duration: 0.6, ease: "power2.out" });
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = imageContainerRef.current?.getBoundingClientRect();
    if (!rect || !xTo.current || !yTo.current) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    xTo.current(-x * 24);
    yTo.current(-y * 24);
  };

  const handleMouseEnter = () => { onHover(true); setHovered(true); scaleTo.current?.(1.1); };
  const handleMouseLeave = () => { onHover(false); setHovered(false); xTo.current?.(0); yTo.current?.(0); scaleTo.current?.(1.06); };

  useEffect(() => {
    if (!containerRef.current) return;
    const title = titleRef.current, desc = descRef.current;
    gsap.set(title, { y: 60, opacity: 0 });
    gsap.set(desc, { y: 40, opacity: 0 });

    const maskTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%",
        end: "top 10%",
        scrub: 1.5,
        invalidateOnRefresh: true,
        onUpdate: (self) => setMaskRadius(self.progress * 1600),
        onLeaveBack: () => setMaskRadius(0),
      },
    });
    maskTl.to({}, { duration: 1 });

    const textTl = gsap.timeline({
      scrollTrigger: { trigger: containerRef.current, start: "top 60%", toggleActions: "play none none reverse" },
    });
    textTl.to(title, { y: 0, opacity: 1, duration: 1, ease: "power3.out" })
      .to(desc, { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }, "-=0.6");

    return () => { maskTl.kill(); textTl.kill(); };
  }, []);

  return (
    <div ref={containerRef} className="py-14 md:py-24">
      <div className="mx-auto max-w-360 px-6 sm:px-12 lg:px-24 2xl:max-w-450 3xl:max-w-550">
        <div className={`flex flex-col gap-8 ${isEven ? "md:flex-row" : "md:flex-row-reverse"} md:items-center md:gap-16`}>
          <div
            ref={imageContainerRef}
            className="relative aspect-16/10 w-full cursor-pointer overflow-hidden rounded-3xl md:w-3/5 md:rounded-[2.5rem]"
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            aria-hidden="true"
          >
            <div
              ref={canvasWrapperRef}
              className="absolute inset-0 h-full w-full"
              style={{ willChange: "transform", transformStyle: "preserve-3d", backfaceVisibility: "hidden", transform: "scale(1.06)" }}
            >
              <WaterRipple src={project.cover} maskRadius={maskRadius} active={hovered || coarse} />
            </div>
          </div>
          <div className={`flex flex-col md:w-2/5 ${isEven ? "" : "md:items-end md:text-right"}`}>
            <span className="mb-6 text-sm font-medium uppercase tracking-widest text-muted-foreground">
              0{index + 1} · {project.kind}
            </span>
            <h3 ref={titleRef} className="mb-6 text-[clamp(2.5rem,5.5vw,6rem)] leading-[1.02] tracking-tight text-foreground">
              <span className="font-medium">{project.name}</span>
              <br />
              <span className="font-serif font-normal italic text-accent">{project.kicker}</span>
            </h3>
            <div ref={descRef} className={`flex flex-col gap-6 ${isEven ? "" : "md:items-end"}`}>
              <p className="max-w-lg text-lg leading-relaxed text-muted-foreground md:text-xl">{project.summary}</p>
              <p className="text-sm text-foreground/60">{project.stack.join(" · ")}</p>
              <button
                type="button"
                onClick={onClick}
                className="focus-ring group inline-flex w-fit items-center gap-3 rounded-full border border-foreground/20 px-5 py-2.5 text-base font-medium text-foreground transition-colors hover:bg-foreground hover:text-background"
              >
                Read the case
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Projects() {
  const [isCursorVisible, setIsCursorVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Work | null>(null);
  const { setIsOverlayOpen } = useOverlay();
  const coarse = useCoarsePointer();

  const activeProject = useRef<string | null>(null);

  useEffect(() => {
    const syncHistory = () => {
      const slug = window.history.state?.twofoldProject;
      const project = work.find((item) => item.slug === slug) ?? null;
      activeProject.current = project?.slug ?? null;
      setSelectedProject(project);
      setIsOverlayOpen(Boolean(project));
    };
    window.addEventListener("popstate", syncHistory);
    syncHistory();
    return () => window.removeEventListener("popstate", syncHistory);
  }, [setIsOverlayOpen]);

  const handleProjectClick = (project: Work) => {
    if (activeProject.current) return;
    activeProject.current = project.slug;
    window.history.pushState({ ...window.history.state, twofoldProject: project.slug }, "");
    setIsCursorVisible(false);
    setSelectedProject(project);
    setIsOverlayOpen(true);
  };

  const handleClose = useCallback(() => {
    if (!activeProject.current) return;
    activeProject.current = null;
    setSelectedProject(null);
    setIsOverlayOpen(false);
    if (window.history.state?.twofoldProject) window.history.back();
  }, [setIsOverlayOpen]);

  return (
    <section id="projects" className="projects relative bg-background py-24" aria-label="Selected work">
      {!coarse && <BlobCursor isVisible={isCursorVisible} />}
      <ProjectOverlay project={selectedProject} onClose={handleClose} />
      <div className="pb-10 md:pb-16" aria-hidden="true">
        <VelocityText baseVelocity={80} className="px-8 text-[clamp(4rem,12vw,14rem)] font-medium uppercase italic tracking-tight text-foreground">
          Selected <span className="font-serif font-normal normal-case text-accent">work</span>&nbsp;
        </VelocityText>
      </div>
      <h2 className="sr-only">Selected work</h2>
      <div className="flex flex-col">
        {work.map((project, index) => (
          <ProjectItem
            key={project.slug}
            project={project}
            index={index}
            coarse={coarse}
            onHover={setIsCursorVisible}
            onClick={() => handleProjectClick(project)}
          />
        ))}
      </div>
    </section>
  );
}
