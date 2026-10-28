
"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import type {
  PointerEvent as ReactPointerEvent,
  ReactNode,
} from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import "./cinematic-intro.css";
import "./phase-7a-responsive.css";

gsap.registerPlugin(useGSAP);

/* ================================================
   CONFIGURATION
================================================ */

const HOVER_RELEASE_DISTANCE = 95;
const ROPE_DRAG_RELEASE_DISTANCE = 60;

const burstWords = [
  {
    text: "BUILD",
    className: "sr-intro__word--build",
  },
  {
    text: "SHIP",
    className: "sr-intro__word--ship",
  },
  {
    text: "TOGETHER",
    className: "sr-intro__word--together",
  },
  {
    text: "HELLO",
    className: "sr-intro__word--hello",
  },
  {
    text: "LET’S",
    className: "sr-intro__word--lets",
  },
  {
    text: "TALK",
    className: "sr-intro__word--talk",
  },
];

const ropePaths = [
  "M392 158 C525 133 625 246 824 206",
  "M392 204 C524 178 662 235 824 215",
  "M382 247 C520 215 676 218 824 223",
  "M344 278 C504 265 682 228 824 233",
];

type IntroPhase =
  | "entering"
  | "ready"
  | "releasing"
  | "finished";

type DragDetails = {
  pointerId: number;
  startX: number;
  startY: number;
  initialX: number;
  source: "button" | "rope";
};

type HoverDetails = {
  pointerId: number;
  startX: number;
  startY: number;
};

type CinematicIntroProps = {
  onReveal: () => void;
  onComplete: () => void;
};

/* ================================================
   INTRO COMPONENT
================================================ */

function CinematicIntro({
  onReveal,
  onComplete,
}: CinematicIntroProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const handRef = useRef<SVGSVGElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);

  const entranceTimelineRef =
    useRef<gsap.core.Timeline | null>(null);

  const releaseTimelineRef =
    useRef<gsap.core.Timeline | null>(null);

  const phaseRef = useRef<IntroPhase>("entering");

  const hasRevealedRef = useRef(false);
  const hasFinishedRef = useRef(false);

  const dragRef = useRef<DragDetails | null>(null);
  const hoverRef = useRef<HoverDetails | null>(null);

  const motionRef = useRef({
    x: 0,
    y: 0,
  });

  const [isReady, setIsReady] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  /* ================================================
     SHARED HELPERS
  ================================================ */

  const getRopes = useCallback(() => {
    if (!rootRef.current) {
      return [] as SVGPathElement[];
    }

    return gsap.utils.toArray<SVGPathElement>(
      ".sr-intro__string",
      rootRef.current
    );
  }, []);

  const isReducedMotion = useCallback(() => {
    return window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
  }, []);

  const canUseHover = useCallback(() => {
    return window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;
  }, []);

  const revealPortfolio = useCallback(() => {
    if (hasRevealedRef.current) return;

    hasRevealedRef.current = true;
    onReveal();
  }, [onReveal]);

  const finishIntro = useCallback(() => {
    if (hasFinishedRef.current) return;

    hasFinishedRef.current = true;
    phaseRef.current = "finished";

    revealPortfolio();
    onComplete();
  }, [onComplete, revealPortfolio]);

  /* ================================================
     DYNAMIC ROPE SHAPES
  ================================================ */

  const drawRopes = useCallback(
    (dx: number, dy: number) => {
      const root = rootRef.current;
      const stage = stageRef.current;

      if (!root || !stage) return;

      const stageRect = stage.getBoundingClientRect();

      const scaleX =
        1200 / Math.max(stageRect.width, 1);

      const scaleY =
        470 / Math.max(stageRect.height, 1);

      const x = dx * scaleX;
      const y = dy * 0.32 * scaleY;

      const shapes = [
        `M392 158 C${525 + x * 0.15} 133 ${
          625 + x * 0.42
        } ${246 + y * 0.3} ${824 + x} ${
          206 + y
        }`,

        `M392 204 C${524 + x * 0.15} 178 ${
          662 + x * 0.45
        } ${235 + y * 0.3} ${824 + x} ${
          215 + y
        }`,

        `M382 247 C${520 + x * 0.15} 215 ${
          676 + x * 0.48
        } ${218 + y * 0.3} ${824 + x} ${
          223 + y
        }`,

        `M344 278 C${504 + x * 0.15} 265 ${
          682 + x * 0.5
        } ${228 + y * 0.3} ${824 + x} ${
          233 + y
        }`,
      ];

      const visible =
        root.querySelectorAll<SVGPathElement>(
          ".sr-intro__string"
        );

      const hitAreas =
        root.querySelectorAll<SVGPathElement>(
          ".sr-intro__rope-hit"
        );

      shapes.forEach((shape, index) => {
        visible[index]?.setAttribute("d", shape);
        hitAreas[index]?.setAttribute("d", shape);
      });
    },
    []
  );

  /* ================================================
     MAGNETIC MOTION
  ================================================ */

  const paintPull = useCallback(() => {
    const pill = pillRef.current;
    const hand = handRef.current;

    const { x, y } = motionRef.current;

    if (pill) {
      gsap.set(pill, {
        x,
        y: y * 0.3,
        scale: 1 + Math.max(x, 0) / 1700,
        rotation: y * 0.025,
      });
    }

    if (hand) {
      gsap.set(hand, {
        x: x * 0.09,
        y: y * 0.12,
        rotation: y * 0.025,
      });
    }

    drawRopes(x, y);
  }, [drawRopes]);

  const movePull = useCallback(
    (
      x: number,
      y: number,
      duration: number = 0.24
    ) => {
      gsap.to(motionRef.current, {
        x,
        y,
        duration,
        ease: "power3.out",
        overwrite: true,
        onUpdate: paintPull,
      });
    },
    [paintPull]
  );

  const highlightRopes = useCallback(
    (active: boolean) => {
      gsap.to(getRopes(), {
        stroke: active ? "#b69b35" : "#292824",
        strokeWidth: active ? 1.9 : 1.15,
        duration: 0.24,
        stagger: 0.025,
        overwrite: true,
      });
    },
    [getRopes]
  );

  const resetPull = useCallback(() => {
    if (phaseRef.current !== "ready") return;

    hoverRef.current = null;

    setIsHovering(false);
    setIsDragging(false);

    movePull(0, 0, 0.45);
    highlightRopes(false);
  }, [highlightRopes, movePull]);

  /* ================================================
     RELEASE + WORD BURST

     Runs only after user interaction.
  ================================================ */

  const triggerRelease = useCallback(() => {
    if (phaseRef.current !== "ready") {
      return;
    }

    phaseRef.current = "releasing";

    setIsReady(false);
    setIsHovering(false);
    setIsDragging(false);

    hoverRef.current = null;
    dragRef.current = null;

    gsap.killTweensOf(motionRef.current);

    const root = rootRef.current;
    const stage = stageRef.current;
    const pill = pillRef.current;
    const hand = handRef.current;
    const flash = flashRef.current;

    if (!root || !stage || !pill || !hand || !flash) {
      finishIntro();
      return;
    }

    gsap.set(pill, {
      pointerEvents: "none",
    });

    if (isReducedMotion()) {
      finishIntro();
      return;
    }

    const ropes = getRopes();

    const words =
      gsap.utils.toArray<HTMLElement>(
        ".sr-intro__word",
        root
      );

    const currentPullX = motionRef.current.x;
    const currentPullY = motionRef.current.y;

    const timeline = gsap.timeline({
      defaults: {
        ease: "power3.out",
      },
      onComplete: finishIntro,
    });

    releaseTimelineRef.current = timeline;

    /* SMALL PRE-PULL FOR DIRECT CLICKS */

    if (currentPullX < 25) {
      timeline
        .to(pill, {
          x: -24,
          y: 0,
          scale: 0.96,
          rotation: -1.5,
          duration: 0.2,
        })
        .to(
          hand,
          {
            x: -13,
            rotation: -2,
            duration: 0.2,
          },
          "<"
        );
    }

    /* SPRING BACK */

    timeline
      .to(pill, {
        x: 18,
        y: 0,
        scale: 1.09,
        rotation: 0,
        duration: 0.58,
        ease: "elastic.out(1, 0.53)",
      })
      .to(
        hand,
        {
          x: 12,
          y: 0,
          rotation: 2,
          duration: 0.58,
          ease: "elastic.out(1, 0.53)",
        },
        "<"
      )
      .to(
        ropes,
        {
          stroke: "#292824",
          strokeWidth: 1.15,
          duration: 0.34,
        },
        "<"
      );

    /* ROPE RECOIL */

    const recoil = {
      x: currentPullX,
      y: currentPullY,
    };

    timeline.to(
      recoil,
      {
        x: 0,
        y: 0,
        duration: 0.55,
        ease: "power3.out",

        onUpdate: () => {
          drawRopes(recoil.x, recoil.y);
        },

        onComplete: () => {
          motionRef.current.x = 0;
          motionRef.current.y = 0;
          drawRopes(0, 0);
        },
      },
      "<"
    );

    /* WORDS BURST OUT FROM THE BUTTON */

    words.forEach((word, index) => {
      const getOrigin = () => {
        const pillRect =
          pill.getBoundingClientRect();

        const wordRect =
          word.getBoundingClientRect();

        return {
          x:
            pillRect.left +
            pillRect.width / 2 -
            (wordRect.left + wordRect.width / 2),

          y:
            pillRect.top +
            pillRect.height / 2 -
            (wordRect.top + wordRect.height / 2),
        };
      };

      timeline.fromTo(
        word,
        {
          x: () => getOrigin().x,
          y: () => getOrigin().y,
          scale: 0.25,
          autoAlpha: 0,
          rotation: 0,
        },
        {
          x: 0,
          y: 0,
          scale: 1,
          autoAlpha: 1,
          rotation: index % 2 === 0 ? -7 : 6,
          duration: 0.61,
          ease: "back.out(1.65)",
          immediateRender: false,
        },
        index === 0 ? "-=0.25" : "<+=0.065"
      );
    });

    /* CINEMATIC TRANSITION */

    timeline
      .to(
        flash,
        {
          autoAlpha: 0.84,
          duration: 0.17,
          ease: "power2.in",
        },
        "+=0.38"
      )
      .to(
        stage,
        {
          scale: 1.22,
          autoAlpha: 0,
          duration: 0.43,
          ease: "power3.in",
        },
        "<"
      )

      /* Reveal the fresh portfolio mount */

      .call(revealPortfolio)

      /* Move intro out of the viewport */

      .to(
        root,
        {
          yPercent: -105,
          duration: 0.75,
          ease: "power4.inOut",
        },
        "+=0.05"
      );
  }, [
    drawRopes,
    finishIntro,
    getRopes,
    isReducedMotion,
    revealPortfolio,
  ]);

  /* ================================================
     MAGNETIC HOVER START
  ================================================ */

  const handleHoverEnter = useCallback(
    (event: ReactPointerEvent<HTMLButtonElement>) => {
      if (
        phaseRef.current !== "ready" ||
        !canUseHover() ||
        dragRef.current
      ) {
        return;
      }

      if (hoverRef.current) return;

      hoverRef.current = {
        pointerId: event.pointerId,
        startX: event.clientX,
        startY: event.clientY,
      };

      setIsHovering(true);

      movePull(12, 0, 0.32);
      highlightRopes(true);
    },
    [canUseHover, highlightRopes, movePull]
  );

  /* ================================================
     POINTER DOWN — BUTTON OR ROPE
  ================================================ */

  const handlePointerDown = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (phaseRef.current !== "ready") return;

      if (
        event.pointerType === "mouse" &&
        event.button !== 0
      ) {
        return;
      }

      const target = event.target;

      if (!(target instanceof Element)) return;

      const isButton = Boolean(
        target.closest(".sr-intro__pill")
      );

      const isRope = Boolean(
        target.closest(".sr-intro__rope-hit")
      );

      if (!isButton && !isRope) return;

      gsap.killTweensOf(motionRef.current);

      const initialX = motionRef.current.x;

      dragRef.current = {
        pointerId: event.pointerId,
        startX: event.clientX,
        startY: event.clientY,
        initialX,
        source: isButton ? "button" : "rope",
      };

      hoverRef.current = null;

      setIsHovering(false);
      setIsDragging(true);

      highlightRopes(true);

      event.currentTarget.setPointerCapture(
        event.pointerId
      );
    },
    [highlightRopes]
  );

  /* ================================================
     POINTER MOVE
  ================================================ */

  const handlePointerMove = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (phaseRef.current !== "ready") return;

      const drag = dragRef.current;

      /* CASE A — CLICK + DRAG */

      if (
        drag &&
        drag.pointerId === event.pointerId
      ) {
        const dx = gsap.utils.clamp(
          0,
          150,
          drag.initialX +
            event.clientX -
            drag.startX
        );

        const dy = gsap.utils.clamp(
          -38,
          38,
          event.clientY - drag.startY
        );

        gsap.killTweensOf(motionRef.current);

        motionRef.current.x = dx;
        motionRef.current.y = dy;

        paintPull();
        return;
      }

      /* CASE B — MAGNETIC HOVER */

      const hover = hoverRef.current;

      if (
        !hover ||
        hover.pointerId !== event.pointerId ||
        !canUseHover()
      ) {
        return;
      }

      const movementX =
        event.clientX - hover.startX;

      const movementY =
        event.clientY - hover.startY;

      if (
        movementX < -35 ||
        Math.abs(movementY) > 120
      ) {
        resetPull();
        return;
      }

      const dx = gsap.utils.clamp(
        0,
        145,
        movementX
      );

      const dy = gsap.utils.clamp(
        -28,
        28,
        movementY
      );

      movePull(
        12 + dx,
        dy,
        0.18
      );

      if (movementX >= HOVER_RELEASE_DISTANCE) {
        triggerRelease();
      }
    },
    [
      canUseHover,
      movePull,
      paintPull,
      resetPull,
      triggerRelease,
    ]
  );

  /* ================================================
     POINTER UP
  ================================================ */

  const handlePointerUp = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      const drag = dragRef.current;

      if (
        !drag ||
        drag.pointerId !== event.pointerId
      ) {
        return;
      }

      dragRef.current = null;
      setIsDragging(false);

      if (
        event.currentTarget.hasPointerCapture(
          event.pointerId
        )
      ) {
        event.currentTarget.releasePointerCapture(
          event.pointerId
        );
      }

      const draggedDistance =
        event.clientX - drag.startX;

      if (
        drag.source === "button" ||
        draggedDistance >=
          ROPE_DRAG_RELEASE_DISTANCE
      ) {
        triggerRelease();
        return;
      }

      resetPull();
    },
    [resetPull, triggerRelease]
  );

  /* ================================================
     POINTER CANCEL / LEAVE
  ================================================ */

  const handlePointerCancel = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (
        dragRef.current?.pointerId !==
        event.pointerId
      ) {
        return;
      }

      dragRef.current = null;
      resetPull();
    },
    [resetPull]
  );

  const handlePointerLeave = useCallback(() => {
    if (
      phaseRef.current !== "ready" ||
      dragRef.current
    ) {
      return;
    }

    if (hoverRef.current) {
      resetPull();
    }
  }, [resetPull]);

  /* ================================================
     SKIP INTRO
  ================================================ */

  const skipIntro = useCallback(() => {
    if (
      phaseRef.current === "releasing" ||
      phaseRef.current === "finished"
    ) {
      return;
    }

    phaseRef.current = "releasing";

    entranceTimelineRef.current?.kill();
    releaseTimelineRef.current?.kill();

    gsap.killTweensOf(motionRef.current);

    hoverRef.current = null;
    dragRef.current = null;

    setIsReady(false);
    setIsHovering(false);
    setIsDragging(false);

    revealPortfolio();

    if (
      !rootRef.current ||
      isReducedMotion()
    ) {
      finishIntro();
      return;
    }

    gsap.to(rootRef.current, {
      yPercent: -105,
      duration: 0.48,
      ease: "power3.inOut",
      overwrite: true,
      onComplete: finishIntro,
    });
  }, [
    finishIntro,
    isReducedMotion,
    revealPortfolio,
  ]);

  /* ================================================
     PREVENT PAGE SCROLL WHILE INTRO IS OPEN
  ================================================ */

  useEffect(() => {
    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow =
        previousOverflow;
    };
  }, []);

  /* ================================================
     AUTOMATIC ENTRANCE ONLY

     Once complete, wait for user interaction.
  ================================================ */

  useGSAP(
    () => {
      const root = rootRef.current;
      const pill = pillRef.current;
      const hand = handRef.current;

      if (!root || !pill || !hand) return;

      const top =
        root.querySelector<HTMLElement>(
          ".sr-intro__top"
        );

      const eyebrow =
        root.querySelector<HTMLElement>(
          ".sr-intro__eyebrow"
        );

      const headline =
        root.querySelector<HTMLElement>(
          ".sr-intro__headline"
        );

      const ropes = getRopes();

      const words =
        gsap.utils.toArray<HTMLElement>(
          ".sr-intro__word",
          root
        );

      phaseRef.current = "entering";

      /* FIRST-PAINT PROTECTION */

      gsap.set(top, {
        autoAlpha: 0,
        y: -20,
      });

      gsap.set(eyebrow, {
        autoAlpha: 0,
        y: 14,
      });

      gsap.set(headline, {
        autoAlpha: 0,
        y: 34,
      });

      gsap.set(hand, {
        autoAlpha: 0,
        x: -100,
        y: 0,
        rotation: 0,
      });

      gsap.set(pill, {
        autoAlpha: 0,
        x: 85,
        y: 0,
        scale: 0.88,
        pointerEvents: "none",
      });

      gsap.set(words, {
        autoAlpha: 0,
        scale: 0.25,
      });

      gsap.set(flashRef.current, {
        autoAlpha: 0,
      });

      ropes.forEach((rope) => {
        const length = rope.getTotalLength();

        gsap.set(rope, {
          strokeDasharray: length,
          strokeDashoffset: length,
          strokeWidth: 1.15,
        });
      });

      /* REDUCED MOTION */

      if (isReducedMotion()) {
        gsap.set(
          [top, eyebrow, headline, hand, pill],
          {
            autoAlpha: 1,
            x: 0,
            y: 0,
            rotation: 0,
            scale: 1,
          }
        );

        gsap.set(ropes, {
          strokeDashoffset: 0,
        });

        gsap.set(pill, {
          pointerEvents: "auto",
        });

        phaseRef.current = "ready";
        setIsReady(true);

        return;
      }

      /* ENTRANCE TIMELINE */

      const entrance = gsap.timeline({
        paused: true,

        defaults: {
          ease: "power3.out",
        },

        onComplete: () => {
          phaseRef.current = "ready";
          setIsReady(true);

          gsap.set(pill, {
            pointerEvents: "auto",
          });
        },
      });

      entranceTimelineRef.current = entrance;

      entrance
        .to(top, {
          autoAlpha: 1,
          y: 0,
          duration: 0.42,
        })
        .to(
          headline,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.68,
          },
          "-=0.16"
        )
        .to(
          eyebrow,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.4,
          },
          "-=0.43"
        )
        .to(
          hand,
          {
            autoAlpha: 1,
            x: 0,
            duration: 0.74,
          },
          "-=0.42"
        )
        .to(
          pill,
          {
            autoAlpha: 1,
            x: 0,
            scale: 1,
            duration: 0.64,
          },
          "-=0.53"
        )
        .to(
          ropes,
          {
            strokeDashoffset: 0,
            duration: 0.9,
            stagger: 0.075,
            ease: "power2.inOut",
          },
          "-=0.32"
        );

      entrance.play(0);

      /* NO AUTO-RELEASE */

      return () => {
        entranceTimelineRef.current = null;
      };
    },
    {
      scope: rootRef,
    }
  );

  /* ================================================
     INTRO JSX
  ================================================ */

  return (
    <div
      ref={rootRef}
      className="sr-intro"
      aria-label="Interactive portfolio introduction"
    >
      <div className="sr-intro__page">
        {/* TOP BAR */}

        <div className="sr-intro__top">
          <span className="sr-intro__brand">
            SR<span>®</span>
          </span>

          <span className="sr-intro__top-center">
            PORTFOLIO / INTERACTIVE OPENING
          </span>

          <button
            type="button"
            className="sr-intro__skip"
            onClick={skipIntro}
          >
            SKIP INTRO
            <span aria-hidden="true">↗</span>
          </button>
        </div>

        {/* MAIN CONTENT */}

        <div className="sr-intro__content">
          <div className="sr-intro__heading-wrap">
            <p className="sr-intro__eyebrow">
              A LITTLE INTERACTION FIRST
            </p>

            <h1 className="sr-intro__headline">
              PULL ME INTO
              <br />
              <em>your team.</em>
            </h1>
          </div>

          {/* INTERACTIVE STAGE */}

          <div
            ref={stageRef}
            className={[
              "sr-intro__stage",
              isReady
                ? "sr-intro__stage--ready"
                : "",
              isHovering
                ? "sr-intro__stage--hovering"
                : "",
              isDragging
                ? "sr-intro__stage--dragging"
                : "",
            ]
              .filter(Boolean)
              .join(" ")}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerCancel}
            onPointerLeave={handlePointerLeave}
          >
            {/* ROPES */}

            <svg
              className="sr-intro__tethers"
              viewBox="0 0 1200 470"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              {ropePaths.map((path, index) => (
                <path
                  key={`rope-${index}`}
                  className="sr-intro__string"
                  d={path}
                />
              ))}

              {ropePaths.map((path, index) => (
                <path
                  key={`rope-hit-${index}`}
                  className="sr-intro__rope-hit"
                  d={path}
                />
              ))}
            </svg>

            {/* HAND */}

            <div className="sr-intro__hand-container">
              <svg
                ref={handRef}
                className="sr-intro__hand"
                viewBox="0 0 480 320"
                fill="none"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 125 111 110 154 284 0 302Z"
                  fill="#191917"
                />

                <path
                  d="m111 112 37-9 39 168-34 13Z"
                  fill="#eeece5"
                  stroke="#191917"
                  strokeWidth="2.4"
                />

                <path
                  d="M9 141 115 128M15 271 147 267"
                  stroke="#f5d547"
                  strokeWidth="1.8"
                  opacity=".85"
                />

                <path
                  d="M174 135c28-17 49-40 75-52 11-5 20-4 31-2l96 21c13 3 16 16 9 23-5 5-12 5-18 4l-81-12 85 32c13 5 14 18 4 24-5 3-11 3-16 1l-85-24 73 42c11 7 10 19-2 23-6 2-12 0-16 1l-82-40 46 42c9 8 7 21-4 24-6 1-11-1-16-5l-82-70c-8-6-15-8-21-5-10 5-7 17-2 29l20 34c7 13-7 22-17 14-16-12-39-41-48-57-13-23-9-48 31-73Z"
                  fill="#eeece5"
                  stroke="#191917"
                  strokeWidth="2.4"
                  strokeLinejoin="round"
                />

                <path
                  d="m279 114 73 20M273 149l77 35M253 170l58 49M207 154c8-6 17-6 25-3"
                  stroke="#191917"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />

                <path
                  d="M185 130c17 9 25 25 25 41M150 154l30 100"
                  stroke="#191917"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />

                <circle
                  cx="383"
                  cy="114"
                  r="3"
                  fill="#f5d547"
                />

                <circle
                  cx="372"
                  cy="157"
                  r="3"
                  fill="#f5d547"
                />

                <circle
                  cx="349"
                  cy="199"
                  r="3"
                  fill="#f5d547"
                />

                <circle
                  cx="300"
                  cy="229"
                  r="3"
                  fill="#f5d547"
                />
              </svg>
            </div>

            {/* MAGNETIC HIRE ME */}

            <div
              ref={pillRef}
              className="sr-intro__pill-wrap"
            >
              <button
                type="button"
                className="sr-intro__pill"
                onPointerEnter={handleHoverEnter}
                onClick={triggerRelease}
                aria-label="Hire me. Click or move cursor right to enter portfolio."
                disabled={!isReady}
              >
                <span className="sr-intro__pill-title">
                  HIRE ME
                </span>

                <span className="sr-intro__pill-subtitle">
                  LET&apos;S BUILD SOMETHING MEANINGFUL
                </span>

                <span
                  className="sr-intro__pill-shine"
                  aria-hidden="true"
                />
              </button>

              <span
                className="sr-intro__pill-hint"
                aria-live="polite"
              >
                {!isReady
                  ? "CONNECTING THE STRINGS..."
                  : isDragging
                    ? "KEEP PULLING →"
                    : isHovering
                      ? "MOVE RIGHT TO RELEASE →"
                      : "HOVER, PULL OR CLICK ↗"}
              </span>
            </div>

            {/* WORD BURST */}

            <div
              className="sr-intro__words"
              aria-hidden="true"
            >
              {burstWords.map((word) => (
                <span
                  key={word.text}
                  className={`sr-intro__word ${word.className}`}
                >
                  {word.text}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* FOOTER */}

        <div className="sr-intro__bottom">
          <span>
            EXPERIMENT 001 / HUMAN CONNECTION
          </span>

          <span>
            YOUR MOVE. LET&apos;S BUILD.
          </span>

          <span>
            © 2026 SALMAN JAHAN RAFI
          </span>
        </div>
      </div>

      {/* TRANSITION FLASH */}

      <div
        ref={flashRef}
        className="sr-intro__release-flash"
        aria-hidden="true"
      />
    </div>
  );
}

/* ================================================
   NEXT.JS TEMPLATE — INSTANT NAVIGATION FIX

   Always render the page segment for Next.js.

   Hide it during the intro.

   On reveal, use a new key so the actual
   portfolio and its GSAP animations remount.
================================================ */

export default function Template({
  children,
}: {
  children: ReactNode;
}) {
  const [portfolioVisible, setPortfolioVisible] =
    useState(false);

  const [introVisible, setIntroVisible] =
    useState(true);

  const revealPortfolio = useCallback(() => {
    setPortfolioVisible(true);
  }, []);

  const completeIntro = useCallback(() => {
    setPortfolioVisible(true);
    setIntroVisible(false);
  }, []);

  return (
    <>
      {/* 
        FIX:
        The route's children must exist in the
        initial React render.

        Initially hidden, but not conditionally
        omitted from the component tree.
      */}

      <div
        key={
          portfolioVisible
            ? "portfolio-active"
            : "portfolio-preload"
        }
        className="sr-intro__portfolio"
        style={
          portfolioVisible
            ? undefined
            : { display: "none" }
        }
        aria-hidden={introVisible}
        inert={introVisible}
      >
        {children}
      </div>

      {/* Intro stays visible until interaction */}

      {introVisible && (
        <CinematicIntro
          onReveal={revealPortfolio}
          onComplete={completeIntro}
        />
      )}
    </>
  );
}
