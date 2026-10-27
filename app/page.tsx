
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const GITHUB_PROFILE = "https://github.com/Rafi7078";

const disciplines = [
  {
    number: "01",
    title: "Artificial Intelligence",
    detail: "AI / ML · Intelligent systems",
    mark: "AI",
  },
  {
    number: "02",
    title: "Data Analytics",
    detail: "Analysis · Insights · Visualization",
    mark: "DATA",
  },
  {
    number: "03",
    title: "Quality Engineering",
    detail: "QA · Software testing · Automation",
    mark: "QA",
  },
];

const projects = [
  {
    number: "01",
    category: "AI / FULL-STACK / RAG",
    title: "PeopleMind AI",
    detail:
      "An AI-powered HR intelligence assistant with document-based Q&A, evidence-grounded responses, CV screening, attendance management, and HR analytics.",
    stack:
      "FastAPI · React · TypeScript · SQLite · ChromaDB · Ollama · Gemini Embeddings",
    accent: "project-yellow",
    symbol: "AI",
    href: "https://github.com/Rafi7078/peoplemind-ai",
  },
  {
    number: "02",
    category: "APPLIED AI / DEEP LEARNING",
    title: "Brain Tumor Detection",
    detail:
      "An AI-driven medical imaging project for brain-tumor detection and localization using deep-learning models and image-preprocessing techniques.",
    stack: "Deep Learning · Medical Imaging · Image Preprocessing",
    accent: "project-ivory",
    symbol: "ML",
    href: "https://github.com/Rafi7078/Human_Brain_Tumor_Detect",
  },
  {
    number: "03",
    category: "DATA ANALYTICS / BUSINESS INTELLIGENCE",
    title: "Amazon Sales Dashboard",
    detail:
      "An interactive Power BI dashboard for monitoring sales KPIs, product performance, customer reviews, and monthly sales trends.",
    stack: "Power BI · Data Visualization · KPI Analysis",
    accent: "project-blue",
    symbol: "BI",
    href: "https://github.com/Rafi7078/amazon-sales-analysis-powerbi-dashboard",
  },
  {
    number: "04",
    category: "DATA ANALYTICS / PYTHON",
    title: "Customer Churn Analysis",
    detail:
      "Exploratory data analysis of customer churn patterns, retention behavior, and business risk factors, with recommendations to support customer retention.",
    stack: "Python · Pandas · Matplotlib · Seaborn",
    accent: "project-yellow",
    symbol: "DATA",
    href: "https://github.com/Rafi7078/telecom-customer-churn-analysis",
  },
  {
    number: "05",
    category: "DATA ANALYTICS / MACHINE LEARNING",
    title: "Online Course Engagement",
    detail:
      "An analytics project studying learner engagement, participation duration, and course completion using data analysis and machine-learning tools.",
    stack: "Python · Pandas · NumPy · Scikit-learn · Visualization",
    accent: "project-ivory",
    symbol: "EDA",
    href: "https://github.com/Rafi7078/Online-Course-Engagement-Analysis",
  },
  {
    number: "06",
    category: "QA / REST API AUTOMATION",
    title: "VerifyREST",
    detail:
      "A REST API automation framework covering authentication, CRUD workflows, response validation, data integrity, update and deletion behavior, and response-time checks.",
    stack: "Postman · JavaScript · Newman · npm · GitHub Actions",
    accent: "project-blue",
    symbol: "API",
    href: "https://github.com/Rafi7078/verifyrest-automation-framework",
  },
  {
    number: "07",
    category: "QA / END-TO-END AUTOMATION",
    title: "E-Commerce Test Framework",
    detail:
      "A Playwright UI automation framework using Page Object Model to test login, product search, cart, checkout, payment, and order placement.",
    stack: "Playwright · TypeScript · Page Object Model",
    accent: "project-yellow",
    symbol: "QA",
    href: "https://github.com/Rafi7078/ecommerce-playwright-automation",
  },
  {
    number: "08",
    category: "QA / CYPRESS AUTOMATION",
    title: "End-to-End Web Testing",
    detail:
      "Automated web application tests for login behavior, including positive, negative, and edge-case scenarios to validate authentication and application behavior.",
    stack: "Cypress · JavaScript · End-to-End Testing",
    accent: "project-ivory",
    symbol: "{ }",
    href: "https://github.com/Rafi7078/End-to-End-Testing-with-Cypress",
  },
];

const certificates = [
  {
    number: "01",
    title: "SQL Foundations",
    issuer: "Microsoft · Coursera",
    date: "14 JUL 2026",
    file: "/certificates/sql-foundations.png",
    githubUrl:
      "https://github.com/Rafi7078/Microsoft_SQL_Foundations_Certificate",
  },
  {
    number: "02",
    title: "Art of Problem Definition",
    issuer: "Passport to Earning Bangladesh",
    date: "16 JUL 2026",
    file: "/certificates/art-of-problem-definition.pdf",
    githubUrl:
      "https://github.com/Rafi7078/Art_of_Problem_Definition_Certification",
  },
  {
    number: "03",
    title: "Career Essentials in Generative AI",
    issuer: "Microsoft · LinkedIn Learning",
    date: "27 JUL 2026",
    file: "/certificates/career-essentials-generative-ai.pdf",
    githubUrl: GITHUB_PROFILE,
  },
  {
    number: "04",
    title: "Data Analytics Job Simulation",
    issuer: "Deloitte · Forage",
    date: "16 JUL 2026",
    file: "/certificates/deloitte-data-analytics-job-simulation.pdf",
    githubUrl:
      "https://github.com/Rafi7078/Deloitte-Data-Analytics-Simulation-Program",
  },
  {
    number: "05",
    title: "Getting Started with Playwright with TypeScript",
    issuer: "Simplilearn SkillUp",
    date: "18 OCT 2026",
    file: "/certificates/playwright-typescript.pdf",
    githubUrl:
      "https://github.com/Rafi7078/playwright-typescript-certification",
  },
  {
    number: "06",
    title: "Excel Essentials for Workplace Productivity",
    issuer: "Passport to Earning Bangladesh",
    date: "15 JUL 2026",
    file: "/certificates/excel-essentials-workplace-productivity.pdf",
    githubUrl:
      "https://github.com/Rafi7078/Excel-Productivity-Certificates",
  },
];

const contactLinks = [
  {
    label: "EMAIL",
    value: "sajidbin7777@gmail.com",
    href: "mailto:sajidbin7777@gmail.com",
  },
  {
    label: "LINKEDIN",
    value: "linkedin.com/in/salmanrafi002",
    href: "https://www.linkedin.com/in/salmanrafi002/",
  },
  {
    label: "GITHUB",
    value: "github.com/Rafi7078",
    href: GITHUB_PROFILE,
  },
];

function HandIllustration() {
  return (
    <svg
      className="hand-illustration"
      viewBox="0 0 300 240"
      fill="none"
      aria-hidden="true"
    >
      <g
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M91 204 C79 187 65 166 51 151 C44 143 35 145 34 153 C33 159 45 175 52 185 L24 157 C17 151 9 158 14 166 L43 198 L23 180 C16 175 9 182 15 190 L42 214 C59 231 91 232 119 225 L177 211 C193 207 198 194 188 187 C181 182 166 189 151 191 L121 198" />
        <path d="M91 204 L78 153 C75 142 85 137 91 147 L110 180 L97 116 C95 105 106 101 112 113 L132 166 L125 95 C124 84 137 82 142 95 L157 158 L164 115 C166 104 179 106 179 119 L180 177 C181 195 174 207 160 216" />
        <path d="M58 186 C76 195 89 208 99 220" />
        <path d="M106 169 L114 193" />
        <path d="M133 160 L139 183" />
      </g>

      <g stroke="currentColor" strokeWidth="1" opacity=".35">
        <path d="M202 64 L265 27" />
        <path d="M215 80 L281 57" />
        <path d="M205 96 L278 92" />
      </g>
    </svg>
  );
}

export default function Home() {
  const rootRef = useRef<HTMLDivElement>(null);
  const torchRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const [torchOn, setTorchOn] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  const openContact = useCallback(() => {
    previousFocusRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    setContactOpen(true);
  }, []);

  const closeContact = useCallback(() => {
    setContactOpen(false);
  }, []);

  // CINEMATIC MOTION UPGRADE
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // First-screen cinematic entrance.
        const intro = gsap.timeline({
          defaults: { ease: "power3.out" },
          delay: 0.1,
        });

        intro
          .from(".topbar", {
            y: -24,
            autoAlpha: 0,
            duration: 0.7,
          })
          .from(
            ".hero-kicker",
            {
              y: 18,
              autoAlpha: 0,
              duration: 0.65,
            },
            "-=0.25",
          )
          .from(
            ".hero-line-inner",
            {
              yPercent: 110,
              rotate: 2,
              transformOrigin: "left bottom",
              duration: 1.15,
              stagger: 0.13,
              ease: "power4.out",
            },
            "-=0.35",
          )
          .from(
            ".hero-description",
            {
              y: 24,
              autoAlpha: 0,
              duration: 0.8,
            },
            "-=0.65",
          )
          .from(
            ".hero-meta span",
            {
              y: 14,
              autoAlpha: 0,
              duration: 0.55,
              stagger: 0.1,
            },
            "-=0.42",
          )
          .from(
            ".portrait-frame",
            {
              y: 45,
              scale: 0.94,
              autoAlpha: 0,
              duration: 1.3,
            },
            "-=1.35",
          )
          .from(
            ".hero-side-note, .hero-index, .scroll-cue",
            {
              y: 12,
              autoAlpha: 0,
              duration: 0.7,
              stagger: 0.12,
            },
            "-=0.5",
          );

        // Regular section reveals.
        const reveals = gsap.utils.toArray<HTMLElement>(
          ".reveal:not(.project-row)",
          rootRef.current ?? undefined,
        );

        reveals.forEach((element) => {
          const distance = element.classList.contains("section-label")
            ? 20
            : 42;

          gsap.fromTo(
            element,
            {
              y: distance,
              autoAlpha: 0,
            },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.95,
              ease: "power3.out",
              immediateRender: false,
              scrollTrigger: {
                trigger: element,
                start: "top 88%",
                once: true,
              },
            },
          );
        });

        // Each project reveals its artwork and then its story.
        gsap.utils
          .toArray<HTMLElement>(
            ".project-row",
            rootRef.current ?? undefined,
          )
          .forEach((row) => {
            const art = row.querySelector<HTMLElement>(".project-art");

            const copy = row.querySelectorAll<HTMLElement>(
              ".project-category, .project-copy h3, .project-copy > p, .project-link",
            );

            const story = gsap.timeline({
              scrollTrigger: {
                trigger: row,
                start: "top 86%",
                once: true,
              },
            });

            story.from(row, {
              y: 55,
              autoAlpha: 0,
              duration: 0.9,
              ease: "power3.out",
            });

            if (art) {
              story.fromTo(
                art,
                {
                  clipPath: "inset(0 100% 0 0)",
                },
                {
                  clipPath: "inset(0 0% 0 0)",
                  duration: 1,
                  ease: "power3.inOut",
                  clearProps: "clipPath",
                },
                "-=0.65",
              );
            }

            story.from(
              copy,
              {
                y: 16,
                autoAlpha: 0,
                duration: 0.58,
                stagger: 0.075,
                ease: "power2.out",
              },
              "-=0.75",
            );
          });

        // Animate strings using actual SVG lengths.
        const strings = gsap.utils.toArray<SVGPathElement>(
          ".string-path",
          rootRef.current ?? undefined,
        );

        strings.forEach((path) => {
          const length = path.getTotalLength();

          gsap.set(path, {
            strokeDasharray: length,
            strokeDashoffset: length,
          });
        });

        gsap.to(strings, {
          strokeDashoffset: 0,
          duration: 1.8,
          stagger: 0.17,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".contact-section",
            start: "top 78%",
            once: true,
          },
        });
      });

      // Desktop-only scroll parallax.
      mm.add(
        "(min-width: 851px) and (prefers-reduced-motion: no-preference)",
        () => {
          gsap.to(".hero-visual", {
            y: -36,
            ease: "none",
            scrollTrigger: {
              trigger: ".hero",
              start: "top top",
              end: "bottom top",
              scrub: 1.1,
            },
          });
        },
      );

      return () => mm.revert();
    },
    { scope: rootRef },
  );

  // FLASHLIGHT POINTER TRACKING
  useEffect(() => {
    let frame = 0;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;

    const handlePointer = (event: PointerEvent) => {
      x = event.clientX;
      y = event.clientY;

      if (frame) return;

      frame = window.requestAnimationFrame(() => {
        const overlay = torchRef.current;

        if (overlay) {
          overlay.style.setProperty("--torch-x", `${x}px`);
          overlay.style.setProperty("--torch-y", `${y}px`);
        }

        frame = 0;
      });
    };

    window.addEventListener("pointermove", handlePointer, {
      passive: true,
    });

    window.addEventListener("pointerdown", handlePointer, {
      passive: true,
    });

    return () => {
      window.removeEventListener("pointermove", handlePointer);
      window.removeEventListener("pointerdown", handlePointer);

      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, []);

  // CONTACT MODAL ACCESSIBILITY
  useEffect(() => {
    if (!contactOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusFrame = window.requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setContactOpen(false);
        return;
      }

      if (event.key !== "Tab") return;

      const dialog = dialogRef.current;

      if (!dialog) return;

      const focusable = dialog.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );

      if (focusable.length === 0) {
        event.preventDefault();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (!dialog.contains(active)) {
        event.preventDefault();
        first.focus();
      } else if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", handleKey);

    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKey);
      previousFocusRef.current?.focus();
    };
  }, [contactOpen]);

  return (
    <div ref={rootRef} className="site-shell">
      {/* NAVIGATION */}
      <header className="topbar">
        <a
          className="wordmark"
          href="#home"
          aria-label="Salman Rafi home"
        >
          SR<span>®</span>
        </a>

        <nav
          className="desktop-nav"
          aria-label="Main navigation"
        >
          <a href="#about">ABOUT</a>
          <a href="#work">WORK</a>
          <a href="#certificates">CERTIFICATES</a>
        </nav>

        <button
          type="button"
          className={`torch-toggle ${torchOn ? "is-active" : ""}`}
          onClick={() => setTorchOn((value) => !value)}
          aria-pressed={torchOn}
          aria-label={
            torchOn
              ? "Turn flashlight reveal off"
              : "Turn flashlight reveal on"
          }
        >
          <span className="torch-dot" />
          {torchOn ? "LIGHT ON" : "LIGHT OFF"}
        </button>
      </header>

      <main>
        {/* HERO */}
        <section className="hero section-pad" id="home">
          <div className="hero-copy">
            <p className="eyebrow hero-kicker">
              <span className="status-dot" />
              INDEPENDENT TECHNOLOGY PORTFOLIO
            </p>

            <h1 className="hero-title">
              <span className="hero-line">
                <span className="hero-line-inner">
                  SALMAN
                </span>
              </span>

              <span className="hero-line hero-outline-line">
                <span className="hero-line-inner">
                  JAHAN
                </span>
              </span>

              <span className="hero-line">
                <span className="hero-line-inner accent-text">
                  RAFI.
                </span>
              </span>
            </h1>

            <p className="hero-description">
              Exploring intelligence, data, and quality.
              <br />
              Building digital experiences with purpose.
            </p>

            <div className="hero-meta">
              <span>AI / ML</span>
              <span>DATA ANALYTICS</span>
              <span>QA AUTOMATION</span>
            </div>
          </div>

          <div className="hero-visual">
            <div className="portrait-frame">
              <div className="portrait-topline">
                <span>FIG. 001</span>
                <span>THE BUILDER</span>
              </div>

              <div
                className="portrait-art"
                aria-label="Personal monogram"
              >
                <div className="portrait-grid" />
                <div className="portrait-monogram">
                  SR
                </div>

                <span className="portrait-caption">
                  SALMAN JAHAN RAFI
                </span>
              </div>

              <div className="portrait-bottomline">
                <span>HUMAN CURIOSITY</span>
                <span>×</span>
                <span>TECHNOLOGY</span>
              </div>
            </div>

            <span className="hero-side-note">
              DHAKA · BANGLADESH
            </span>

            <span className="hero-index">
              PORTFOLIO / 2026
            </span>
          </div>

          <a href="#about" className="scroll-cue">
            <span className="scroll-cue-line" />
            SCROLL TO EXPLORE
          </a>
        </section>

        {/* ABOUT */}
        <section
          className="intro-section section-pad"
          id="about"
        >
          <div className="section-label reveal">
            <span>01 / THE PERSON</span>
            <span>ABOUT & APPROACH</span>
          </div>

          <div className="intro-grid">
            <h2 className="intro-heading reveal">
              Curious by
              <br />
              nature.
              <br />
              <span className="muted-text">
                Technical
              </span>
              <br />
              by practice.
            </h2>

            <div className="intro-copy reveal">
              <span
                className="big-asterisk"
                aria-hidden="true"
              >
                ✳
              </span>

              <p>
                I am an Information and Communication
                Engineering graduate working across applied AI,
                data analytics, and software quality assurance.
              </p>

              <p className="small-copy">
                My experience spans AI data annotation,
                software testing, and web development. I enjoy
                turning technical problems into practical
                solutions and building reliable, data-informed
                experiences.
              </p>

              <a className="text-link" href="#work">
                EXPLORE SELECTED WORK <span>↘</span>
              </a>
            </div>
          </div>

          <div className="discipline-list">
            {disciplines.map((item) => (
              <article
                className="discipline-row reveal"
                key={item.number}
              >
                <span className="row-number">
                  {item.number}
                </span>

                <h3>{item.title}</h3>

                <span className="discipline-detail">
                  {item.detail}
                </span>

                <span className="discipline-mark">
                  {item.mark}
                </span>
              </article>
            ))}
          </div>
        </section>

        {/* SELECTED WORK */}
        <section
          className="work-section section-pad"
          id="work"
        >
          <div className="section-label reveal">
            <span>02 / SELECTED WORK</span>
            <span>PROJECT STORIES</span>
          </div>

          <div className="work-heading-row reveal">
            <h2 className="section-heading">
              Work in
              <br />
              <span className="accent-text">
                progress.
              </span>
            </h2>

            <p className="work-heading-note">
              A selection of AI, analytics, and QA work.
              <br />
              Explore the repositories for implementation
              details.
            </p>
          </div>

          <div className="project-list">
            {projects.map((project) => (
              <article
                className={`project-row ${project.accent} reveal`}
                key={project.number}
              >
                <div className="project-art">
                  <span className="project-art-number">
                    {project.number}
                  </span>

                  <span className="project-symbol">
                    {project.symbol}
                  </span>

                  <span className="project-art-caption">
                    SELECTED STUDY
                  </span>
                </div>

                <div className="project-copy">
                  <span className="project-category">
                    {project.category}
                  </span>

                  <h3>{project.title}</h3>

                  <p>{project.detail}</p>

                  <p className="project-stack">
                    {project.stack}
                  </p>

                  <a
                    className="project-status project-link"
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View ${project.title} repository on GitHub`}
                  >
                    VIEW PROJECT <span>↗</span>
                  </a>
                </div>

                <a
                  className="project-arrow"
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${project.title} repository`}
                >
                  ↗
                </a>
              </article>
            ))}
          </div>
        </section>

        {/* CERTIFICATES */}
        <section
          className="certificate-section section-pad"
          id="certificates"
        >
          <div className="section-label reveal">
            <span>03 / CONTINUOUS LEARNING</span>
            <span>PROFESSIONAL CREDENTIALS</span>
          </div>

          <div className="certificate-heading-row reveal">
            <h2 className="section-heading">
              Proof of
              <br />
              <span className="muted-text">
                curiosity.
              </span>
            </h2>

            <div className="certificate-heading-actions">
              <p className="work-heading-note">
                Learning through practice.
                <br />
                Building knowledge across AI, data, and quality.
              </p>

              <a
                className="certificate-action certificate-action-primary"
                href={GITHUB_PROFILE}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Explore Salman Rafi's GitHub profile"
              >
                EXPLORE GITHUB
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>

          <div className="certificate-list">
            {certificates.map((certificate) => (
              <article
                className="certificate-row reveal"
                key={certificate.number}
              >
                <span className="certificate-number">
                  {certificate.number}
                </span>

                <div className="certificate-main">
                  <h3>{certificate.title}</h3>

                  <p className="certificate-issuer">
                    {certificate.issuer}
                  </p>
                </div>

                <div className="certificate-meta">
                  <time>{certificate.date}</time>
                </div>

                <div className="certificate-actions">
                  <a
                    className="certificate-action certificate-action-primary"
                    href={certificate.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View ${certificate.title} certificate`}
                  >
                    VIEW CERTIFICATE
                    <span aria-hidden="true">↗</span>
                  </a>

                  <a
                    className="certificate-action"
                    href={certificate.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={
                      certificate.githubUrl === GITHUB_PROFILE
                        ? "Open Salman Rafi's GitHub profile"
                        : `Open ${certificate.title} repository on GitHub`
                    }
                  >
                    {certificate.githubUrl === GITHUB_PROFILE
                      ? "GITHUB PROFILE"
                      : "GITHUB REPOSITORY"}
                    <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </article>
            ))}
          </div>

          <p className="certificate-note">
            Original certificates open separately. Related
            repositories are linked where available.
          </p>
        </section>

        {/* CONTACT */}
        <section className="contact-section" id="contact">
          <div className="contact-inner section-pad">
            <div className="section-label reveal">
              <span>04 / THE NEXT CHAPTER</span>
              <span>OPEN TO CONVERSATION</span>
            </div>

            <div className="contact-title-wrap reveal">
              <p className="contact-kicker">
                HAVE SOMETHING IN MIND?
              </p>

              <h2>
                LET&apos;S
                <br />
                MAKE
                <br />
                <span>IT MATTER.</span>
              </h2>
            </div>

            <div className="hand-stage reveal">
              <svg
                className="string-art"
                viewBox="0 0 900 290"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  className="string-path"
                  d="M90 240 C180 160 270 270 385 190 S560 90 740 145"
                />

                <path
                  className="string-path"
                  d="M110 250 C215 200 285 280 400 205 S570 120 745 158"
                />

                <path
                  className="string-path"
                  d="M125 260 C225 225 300 280 415 220 S585 145 750 170"
                />
              </svg>

              <div className="hand-wrap">
                <HandIllustration />
              </div>

              <button
                type="button"
                className="collaborate-button"
                onClick={openContact}
                aria-haspopup="dialog"
                aria-expanded={contactOpen}
              >
                <span>LET&apos;S COLLABORATE</span>

                <span
                  className="button-arrow"
                  aria-hidden="true"
                >
                  ↗
                </span>
              </button>
            </div>

            <div className="contact-bottom">
              <span>AI / DATA / QUALITY</span>
              <a href="#home">BACK TO TOP ↑</a>
              <span>DESIGNED TO KEEP EXPLORING.</span>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="site-footer">
        <span>SR® — SALMAN JAHAN RAFI</span>
        <span>INDEPENDENT PORTFOLIO · 2026</span>
      </footer>

      {/* FLASHLIGHT */}
      <div
        ref={torchRef}
        className={`torch-overlay ${
          torchOn ? "torch-visible" : ""
        }`}
        aria-hidden="true"
      />

      {/* CONTACT DIALOG */}
      <AnimatePresence>
        {contactOpen && (
          <motion.div
            className="contact-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeContact}
          >
            <motion.div
              ref={dialogRef}
              className="contact-dialog"
              role="dialog"
              aria-modal="true"
              aria-labelledby="contact-dialog-title"
              initial={{
                y: 30,
                scale: 0.97,
                opacity: 0,
              }}
              animate={{
                y: 0,
                scale: 1,
                opacity: 1,
              }}
              exit={{
                y: 20,
                scale: 0.98,
                opacity: 0,
              }}
              transition={{
                type: "spring",
                damping: 25,
                stiffness: 240,
              }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="dialog-topline">
                <span>START A CONVERSATION</span>

                <button
                  ref={closeButtonRef}
                  type="button"
                  className="dialog-close"
                  onClick={closeContact}
                  aria-label="Close contact dialog"
                >
                  ×
                </button>
              </div>

              <h2 id="contact-dialog-title">
                GOOD WORK
                <br />
                STARTS WITH
                <br />
                <span>A CONVERSATION.</span>
              </h2>

              <p>
                Interested in AI, data analytics, or quality
                engineering? Have a project or problem in mind?
                Let&apos;s connect.
              </p>

              <div className="contact-link-list">
                {contactLinks.map((item) => (
                  <a
                    className="dialog-return"
                    href={item.href}
                    key={item.label}
                    target={
                      item.label === "EMAIL"
                        ? undefined
                        : "_blank"
                    }
                    rel={
                      item.label === "EMAIL"
                        ? undefined
                        : "noopener noreferrer"
                    }
                  >
                    <span>
                      {item.label}
                      <br />
                      {item.value}
                    </span>

                    <span aria-hidden="true">↗</span>
                  </a>
                ))}
              </div>

              <button
                type="button"
                className="dialog-return"
                onClick={closeContact}
              >
                BACK TO THE PORTFOLIO
                <span aria-hidden="true">↗</span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
