"use client";

import type { HTMLProps, ReactNode, RefObject } from "react";
import { memo, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ParticleBackground from "@/components/ParticleBackground";

const beamPathData = [
  "M-380 -189C-380 -189 -312 216 152 343C616 470 684 875 684 875",
  "M-358 -213C-358 -213 -290 192 174 319C638 446 706 851 706 851",
  "M-336 -237C-336 -237 -268 168 196 295C660 422 728 827 728 827",
  "M-314 -261C-314 -261 -246 144 218 271C682 398 750 803 750 803",
  "M-292 -285C-292 -285 -224 120 240 247C704 374 772 779 772 779",
  "M-270 -309C-270 -309 -202 96 262 223C726 350 794 755 794 755",
  "M-248 -333C-248 -333 -180 72 284 199C748 326 816 731 816 731",
  "M-226 -357C-226 -357 -158 48 306 175C770 302 838 707 838 707",
  "M-204 -381C-204 -381 -136 24 328 151C792 278 860 683 860 683",
  "M-182 -405C-182 -405 -114 0 350 127C814 254 882 659 882 659",
  "M-160 -429C-160 -429 -92 -24 372 103C836 230 904 635 904 635",
  "M-138 -453C-138 -453 -70 -48 394 79C858 206 926 611 926 611",
  "M-116 -477C-116 -477 -48 -72 416 55C880 182 948 587 948 587",
  "M-94 -501C-94 -501 -26 -96 438 31C902 158 970 563 970 563",
  "M-72 -525C-72 -525 -4 -120 460 7C924 134 992 539 992 539",
  "M-50 -549C-50 -549 18 -144 482 -17C946 110 1014 515 1014 515",
  "M-28 -573C-28 -573 40 -168 504 -41C968 86 1036 491 1036 491",
  "M-6 -597C-6 -597 62 -192 526 -65C990 62 1058 467 1058 467",
  "M16 -621C16 -621 84 -216 548 -89C1012 38 1080 443 1080 443",
  "M38 -645C38 -645 106 -240 570 -113C1034 14 1102 419 1102 419",
] as const;

const beamAnimations = beamPathData.map((_, index) => ({
  duration: 4 + (index % 5) * 0.8,
  delay: index * 0.15,
}));

const explosionVectors = Array.from({ length: 14 }, (_, index) => ({
  id: index,
  initialX: 0,
  initialY: 0,
  directionX: ((index * 17) % 50) - 25,
  directionY: -8 - ((index * 11) % 36),
  duration: 0.45 + (index % 5) * 0.18,
}));

const collisionBeamOptions = [
  { initialX: 14, translateX: 14, duration: 5, repeatDelay: 1.5, delay: 0, className: "" },
  { initialX: 64, translateX: 64, duration: 4.2, repeatDelay: 2.4, delay: 0.2, className: "h-6" },
  { initialX: 122, translateX: 122, duration: 5.8, repeatDelay: 1.8, delay: 0.45, className: "" },
  { initialX: 178, translateX: 178, duration: 5.2, repeatDelay: 2.8, delay: 0.7, className: "h-10" },
  { initialX: 238, translateX: 238, duration: 4.3, repeatDelay: 2.3, delay: 0.9, className: "" },
  { initialX: 296, translateX: 296, duration: 6.4, repeatDelay: 2.1, delay: 1.1, className: "h-14" },
  { initialX: 352, translateX: 352, duration: 5.1, repeatDelay: 2.6, delay: 1.35, className: "" },
  { initialX: 408, translateX: 408, duration: 4.6, repeatDelay: 3.1, delay: 1.55, className: "h-6" },
] as const;

const boxColors = [
  "rgb(125 211 252)",
  "rgb(249 168 212)",
  "rgb(134 239 172)",
  "rgb(253 224 71)",
  "rgb(252 165 165)",
  "rgb(216 180 254)",
  "rgb(147 197 253)",
  "rgb(165 180 252)",
  "rgb(196 181 253)",
] as const;

const joinClasses = (...values: Array<string | false | null | undefined>) =>
  values.filter(Boolean).join(" ");

function ShowcaseCard({
  eyebrow,
  title,
  children,
  className,
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <article className={joinClasses("background-demo-card", className)}>
      <div className="background-demo-card__scene">{children}</div>
      <div className="background-demo-card__label">
        <div className="background-demo-card__eyebrow">{eyebrow}</div>
        <div className="background-demo-card__title">{title}</div>
      </div>
    </article>
  );
}

function BackgroundBeamsPreview() {
  return (
    <div className="background-demo-beams-wrap">
      <svg
        className="background-demo-beams"
        fill="none"
        viewBox="0 0 696 316"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <g opacity="0.06">
          {beamPathData.map((path, index) => (
            <path key={`static-${index}`} d={path} stroke="white" strokeWidth="0.5" />
          ))}
        </g>

        {beamPathData.map((path, index) => (
          <motion.path
            key={`beam-${index}`}
            d={path}
            stroke={`url(#background-demo-gradient-${index})`}
            strokeWidth="1"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: [0, 1],
              opacity: [0, 0.6, 0.6, 0],
            }}
            transition={{
              duration: beamAnimations[index].duration,
              delay: beamAnimations[index].delay,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        ))}

        <defs>
          {beamPathData.map((_, index) => (
            <linearGradient
              key={`gradient-${index}`}
              id={`background-demo-gradient-${index}`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#18CCFC" stopOpacity="0" />
              <stop offset="20%" stopColor="#18CCFC" stopOpacity="1" />
              <stop offset="50%" stopColor="#6344F5" stopOpacity="1" />
              <stop offset="80%" stopColor="#AE48FF" stopOpacity="1" />
              <stop offset="100%" stopColor="#AE48FF" stopOpacity="0" />
            </linearGradient>
          ))}
        </defs>
      </svg>
    </div>
  );
}

const getBoxColor = (rowIndex: number, colIndex: number) =>
  boxColors[(rowIndex * 7 + colIndex * 3) % boxColors.length];

const BoxCell = memo(function BoxCell({
  showPlus,
  color,
}: {
  showPlus: boolean;
  color: string;
}) {
  return (
    <motion.div
      className="relative h-8 w-16 border-r border-t border-slate-700"
      whileHover={{
        backgroundColor: color,
        transition: { duration: 0 },
      }}
      transition={{ duration: 2 }}
    >
      {showPlus ? (
        <svg
          className="pointer-events-none absolute -left-[22px] -top-[14px] h-6 w-10 text-slate-700"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 6v12m6-6H6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : null}
    </motion.div>
  );
});

const BoxRow = memo(function BoxRow({
  rowIndex,
  cols,
}: {
  rowIndex: number;
  cols: number;
}) {
  return (
    <div className="relative h-8 w-16 border-l border-slate-700">
      {Array.from({ length: cols }).map((_, colIndex) => (
        <BoxCell
          key={colIndex}
          color={getBoxColor(rowIndex, colIndex)}
          showPlus={rowIndex % 2 === 0 && colIndex % 2 === 0}
        />
      ))}
    </div>
  );
});

function Boxes({
  className,
  rows = 22,
  cols = 18,
}: {
  className?: string;
  rows?: number;
  cols?: number;
}) {
  const rowElements = useMemo(
    () =>
      Array.from({ length: rows }).map((_, rowIndex) => (
        <BoxRow key={rowIndex} rowIndex={rowIndex} cols={cols} />
      )),
    [rows, cols],
  );

  return (
    <div
      className={joinClasses("pointer-events-auto absolute inset-0 z-0 flex", className)}
      style={{
        transform: "translate(-50%, -50%) skewX(-48deg) skewY(14deg) scale(0.675)",
        transformOrigin: "center center",
        top: "50%",
        left: "50%",
        width: "300vw",
        height: "300vh",
      }}
    >
      {rowElements}
    </div>
  );
}

function BoxesPreview() {
  return (
    <div className="background-demo-boxes-stage">
      <Boxes />
      <div className="background-demo-boxes-mask" />
    </div>
  );
}

const Explosion = ({ className, style, ...props }: HTMLProps<HTMLDivElement>) => {
  return (
    <div {...props} className={joinClasses("background-demo-explosion", className)} style={style}>
      <motion.div
        animate={{ opacity: 1 }}
        className="background-demo-explosion__flare"
        exit={{ opacity: 0 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 1.1, ease: "easeOut" }}
      />
      {explosionVectors.map((span) => (
        <motion.span
          key={span.id}
          animate={{
            x: span.directionX,
            y: span.directionY,
            opacity: 0,
          }}
          className="background-demo-explosion__spark"
          initial={{ x: span.initialX, y: span.initialY, opacity: 1 }}
          transition={{ duration: span.duration, ease: "easeOut" }}
        />
      ))}
    </div>
  );
};

const CollisionMechanism = memo(function CollisionMechanism({
  containerRef,
  parentRef,
  beamOptions,
}: {
  containerRef: RefObject<HTMLDivElement | null>;
  parentRef: RefObject<HTMLDivElement | null>;
  beamOptions: {
    initialX?: number;
    translateX?: number;
    initialY?: number;
    translateY?: number;
    rotate?: number;
    className?: string;
    duration?: number;
    delay?: number;
    repeatDelay?: number;
  };
}) {
  const beamRef = useRef<HTMLDivElement>(null);
  const [collision, setCollision] = useState<{
    detected: boolean;
    coordinates: { x: number; y: number } | null;
  }>({
    detected: false,
    coordinates: null,
  });
  const [beamKey, setBeamKey] = useState(0);
  const [cycleCollisionDetected, setCycleCollisionDetected] = useState(false);

  useEffect(() => {
    const checkCollision = () => {
      if (beamRef.current && containerRef.current && parentRef.current && !cycleCollisionDetected) {
        const beamRect = beamRef.current.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();
        const parentRect = parentRef.current.getBoundingClientRect();

        if (beamRect.bottom >= containerRect.top) {
          const relativeX = beamRect.left - parentRect.left + beamRect.width / 2;
          const relativeY = beamRect.bottom - parentRect.top;

          setCollision({
            detected: true,
            coordinates: { x: relativeX, y: relativeY },
          });
          setCycleCollisionDetected(true);
        }
      }
    };

    const animationInterval = window.setInterval(checkCollision, 50);

    return () => window.clearInterval(animationInterval);
  }, [containerRef, cycleCollisionDetected, parentRef]);

  useEffect(() => {
    if (!collision.detected || !collision.coordinates) {
      return;
    }

    const clearTimer = window.setTimeout(() => {
      setCollision({ detected: false, coordinates: null });
      setCycleCollisionDetected(false);
    }, 1400);

    const replayTimer = window.setTimeout(() => {
      setBeamKey((current) => current + 1);
    }, 1400);

    return () => {
      window.clearTimeout(clearTimer);
      window.clearTimeout(replayTimer);
    };
  }, [collision]);

  return (
    <>
      <motion.div
        animate="animate"
        className={joinClasses("background-demo-collision__beam", beamOptions.className)}
        initial={{
          translateY: beamOptions.initialY ?? "-160px",
          translateX: beamOptions.initialX ?? "0px",
          rotate: beamOptions.rotate ?? 0,
        }}
        key={beamKey}
        ref={beamRef}
        transition={{
          duration: beamOptions.duration ?? 8,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
          ease: "linear",
          delay: beamOptions.delay ?? 0,
          repeatDelay: beamOptions.repeatDelay ?? 0,
        }}
        variants={{
          animate: {
            translateY: beamOptions.translateY ?? "520px",
            translateX: beamOptions.translateX ?? "0px",
            rotate: beamOptions.rotate ?? 0,
          },
        }}
      />
      <AnimatePresence>
        {collision.detected && collision.coordinates ? (
          <Explosion
            key={`${collision.coordinates.x}-${collision.coordinates.y}`}
            style={{
              left: `${collision.coordinates.x}px`,
              top: `${collision.coordinates.y}px`,
              transform: "translate(-50%, -50%)",
            }}
          />
        ) : null}
      </AnimatePresence>
    </>
  );
});

function CollisionPreview() {
  const containerRef = useRef<HTMLDivElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);

  return (
    <div className="background-demo-collision-stage" ref={parentRef}>
      {collisionBeamOptions.map((beam) => (
        <CollisionMechanism
          key={`${beam.initialX}-${beam.delay}`}
          beamOptions={beam}
          containerRef={containerRef}
          parentRef={parentRef}
        />
      ))}
      <div className="background-demo-collision__groundline" ref={containerRef} />
    </div>
  );
}

export default function BackgroundShowcase() {
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <ShowcaseCard
        eyebrow="Current Site Background"
        title="Particle Background"
        className="background-demo-card--particles"
      >
        <ParticleBackground id="particles-showcase" />
        <div className="background-demo-card__veil background-demo-card__veil--particles" />
      </ShowcaseCard>

      <ShowcaseCard
        eyebrow="Animated Paths"
        title="Background Beams"
        className="background-demo-card--beams"
      >
        <BackgroundBeamsPreview />
        <div className="background-demo-card__veil background-demo-card__veil--beam" />
      </ShowcaseCard>

      <ShowcaseCard
        eyebrow="Impact Trail"
        title="Beams With Collision"
        className="background-demo-card--collision"
      >
        <CollisionPreview />
        <div className="background-demo-card__veil background-demo-card__veil--collision" />
      </ShowcaseCard>

      <ShowcaseCard
        eyebrow="Perspective Grid"
        title="Boxes"
        className="background-demo-card--boxes"
      >
        <BoxesPreview />
        <div className="background-demo-card__veil background-demo-card__veil--boxes" />
      </ShowcaseCard>
    </div>
  );
}
