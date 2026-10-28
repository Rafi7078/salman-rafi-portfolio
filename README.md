
# Salman Jahan Rafi — Portfolio

### AI & Machine Learning · Data Analytics · Quality Engineering

A modern, interactive personal portfolio showcasing my experience, technical expertise, and selected projects across artificial intelligence, data analytics, software quality assurance, and development.

Built with **Next.js, React, TypeScript, GSAP, and Tailwind CSS**, the website combines cinematic motion, expressive typography, and thoughtful interactions with a responsive and accessible interface.

**[🌐 Explore the Live Portfolio](https://salman-rafi-website.vercel.app/)**

---

## About Me

I'm **Salman Jahan Rafi**, an Information and Communication Engineering graduate from the **Bangladesh University of Professionals (BUP)**.

My work focuses on applying technology to real-world challenges through data-driven problem-solving, intelligent systems, and reliable software engineering.

With professional experience spanning data analytics, quality assurance, and software development, I enjoy connecting analytical thinking with practical implementation.

My interests include:

- **Artificial Intelligence & Machine Learning** — intelligent applications, retrieval-augmented generation, and applied machine learning.
- **Data Analytics & Business Intelligence** — transforming complex datasets into meaningful insights and visualizations.
- **Quality Engineering** — improving software reliability through manual testing, API testing, and test automation.
- **Software Development** — building practical applications using modern programming languages, frameworks, and development tools.

---

## Portfolio Highlights

### Cinematic Interactive Introduction

The experience begins with an original, interactive introduction featuring an illustrated hand, animated strings, and a magnetic **"HIRE ME"** button.

Visitors can enter the portfolio through:

- Clicking the interactive button.
- Pulling the button or strings.
- Using the magnetic hover interaction on supported desktop devices.
- Selecting **Skip Intro** for immediate navigation.

The transition includes synchronized GSAP animations, rope recoil, animated typography, and a cinematic reveal.

### Interactive Portfolio Experience

The main website features:

- A custom-designed hero section with animated typography and portrait photography.
- Scroll-triggered reveals and subtle parallax effects.
- Professional experience and educational background.
- An interactive **Skill Atlas** organized into four technical disciplines.
- Eight selected projects with direct GitHub repository links.
- Professional certifications with certificate previews.
- An interactive contact section with magnetic motion and animated strings.
- A custom flashlight interaction.
- Responsive layouts for desktop, tablet, and mobile devices.

The overall design follows a minimalist visual system using a dark background, warm ivory typography, and yellow accents.

---

## Technology Stack

### Frontend

| Technology | Purpose |
|---|---|
| Next.js 16 | React framework and App Router |
| React | Component-based user interfaces |
| TypeScript | Type-safe application development |
| Tailwind CSS | Styling foundation |
| CSS | Custom design system and responsive layouts |
| Motion | Declarative interface transitions |

### Animation & Interaction

| Technology | Purpose |
|---|---|
| GSAP | Cinematic animation sequences |
| ScrollTrigger | Scroll-based animations and parallax |
| @gsap/react | React integration and animation lifecycle management |
| Pointer Events | Interactive drag and magnetic effects |
| RequestAnimationFrame | Efficient pointer-driven updates |

### Deployment & Tooling

- Git and GitHub
- Vercel
- ESLint
- TypeScript
- Next.js Metadata API

---

## Featured Projects

### 01. PeopleMind AI

**AI / Full-Stack / Retrieval-Augmented Generation**

An AI-powered HR intelligence assistant supporting document-based question answering, evidence-grounded responses, CV screening, attendance management, and HR analytics.

**Technologies:** FastAPI, React, TypeScript, SQLite, ChromaDB, Ollama, Gemini Embeddings

[View Repository](https://github.com/Rafi7078/peoplemind-ai)

### 02. Brain Tumor Detection

**Applied AI / Deep Learning**

An AI-driven medical imaging project focused on brain tumor detection and localization using deep learning and image preprocessing.

**Technologies:** Deep Learning, Medical Imaging, Image Preprocessing

[View Repository](https://github.com/Rafi7078/Human_Brain_Tumor_Detect)

### 03. VerifyREST

**REST API Test Automation**

An API automation framework covering authentication, CRUD operations, response validation, data integrity, update and deletion behavior, and response-time checks.

**Technologies:** Postman, JavaScript, Newman, npm, GitHub Actions

[View Repository](https://github.com/Rafi7078/verifyrest-automation-framework)

### 04. E-Commerce Test Framework

**End-to-End UI Automation**

A Playwright-based test automation framework using the Page Object Model to validate important e-commerce workflows, including login, search, cart, checkout, and order placement.

**Technologies:** Playwright, TypeScript, Page Object Model

[View Repository](https://github.com/Rafi7078/ecommerce-playwright-automation)

### 05. End-to-End Web Testing

**Cypress Test Automation**

Automated web application tests covering positive, negative, and edge-case authentication scenarios.

**Technologies:** Cypress, JavaScript, End-to-End Testing

[View Repository](https://github.com/Rafi7078/End-to-End-Testing-with-Cypress)

### 06. Amazon Sales Dashboard

**Data Analytics / Business Intelligence**

An interactive Power BI dashboard for exploring sales KPIs, product performance, customer reviews, and monthly trends.

**Technologies:** Power BI, Data Visualization, KPI Analysis

[View Repository](https://github.com/Rafi7078/amazon-sales-analysis-powerbi-dashboard)

### 07. Customer Churn Analysis

**Data Analytics / Python**

An exploratory data analysis project examining customer churn, retention behavior, and business risk factors to support data-informed recommendations.

**Technologies:** Python, Pandas, Matplotlib, Seaborn

[View Repository](https://github.com/Rafi7078/telecom-customer-churn-analysis)

### 08. Online Course Engagement

**Data Analytics / Machine Learning**

An analytical study of learner engagement, participation, and course completion using Python-based data analysis and machine-learning tools.

**Technologies:** Python, Pandas, NumPy, Scikit-learn, Visualization

[View Repository](https://github.com/Rafi7078/Online-Course-Engagement-Analysis)

---

## Portfolio Sections

| Section | Description |
|---|---|
| Intro | Cinematic interactive opening |
| Home | Personal introduction and hero presentation |
| About | Background, interests, and approach |
| Experience | Professional experience and responsibilities |
| Education | Academic qualifications |
| Skills | Interactive technical Skill Atlas |
| Work | Selected development, AI, analytics, and QA projects |
| Certificates | Professional certifications and learning |
| Contact | Interactive contact experience and social links |

---

## Getting Started

To run the portfolio locally, follow these steps.

### 1. Clone the Repository

```bash
git clone https://github.com/Rafi7078/salman-rafi-portfolio.git
```

### 2. Navigate to the Project

```bash
cd salman-rafi-portfolio
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start the Development Server

```bash
npm run dev
```

Open **http://localhost:3000** in your browser.

The development server supports hot reloading, so changes are reflected as you edit the application.

---

## Production Build

Before deploying changes, run the available checks:

```bash
npm run lint
npx tsc --noEmit
npm run build
```

To run the production build locally:

```bash
npm run start
```

These checks help validate code quality, TypeScript correctness, and production compilation.

Browser-based testing is also recommended for interactive animations and responsive behavior.

---

## Environment Configuration

The portfolio supports an optional production URL environment variable:

```env
NEXT_PUBLIC_SITE_URL=https://your-production-domain.com
```

Set this variable to the actual public URL used for deployment.

It is used to configure production-specific SEO information, including canonical URLs, sitemap entries, and search engine indexing behavior.

For Vercel deployment, configure it under:

**Project Settings → Environment Variables**

After changing the variable, create a new production deployment.

---

## SEO & Accessibility

The website includes several features intended to improve discoverability and usability:

- Page titles and descriptive metadata.
- Open Graph and Twitter/X sharing previews.
- Sitemap and robots configuration.
- Structured data describing the portfolio owner.
- Semantic HTML and descriptive image alternatives.
- Keyboard-accessible interactive controls.
- Reduced-motion support for users who prefer fewer animations.
- Visible focus styling and keyboard support for the contact dialog.

Search engine indexing is configured for the production environment when a valid production URL is provided.

---

## Project Structure

```text
salman-rafi-portfolio/
│
├── app/
│   ├── layout.tsx
│   ├── template.tsx
│   ├── page.tsx
│   │
│   ├── globals.css
│   ├── cinematic-intro.css
│   ├── phase-7a-responsive.css
│   │
│   ├── site-config.ts
│   ├── robots.ts
│   ├── sitemap.ts
│   ├── opengraph-image.tsx
│   └── twitter-image.tsx
│
├── public/
│   ├── images/
│   └── certificates/
│
├── package.json
├── next.config.ts
├── tsconfig.json
└── README.md
```

The main portfolio experience is implemented in `app/page.tsx`, while `app/template.tsx` manages the interactive cinematic introduction.

Custom styles and responsive rules are organized separately to keep the visual system maintainable.

---

## Deployment

The portfolio is deployed on **Vercel**, with its source code maintained on GitHub.

**Live Website:**  
https://salman-rafi-website.vercel.app/

**Source Repository:**  
https://github.com/Rafi7078/salman-rafi-portfolio

Future updates can be deployed through the connected GitHub repository.

---

## Contact

I'm open to conversations about artificial intelligence, data analytics, software quality engineering, and opportunities to build meaningful solutions.

**Email:** [sajidbin7777@gmail.com](mailto:sajidbin7777@gmail.com)

**LinkedIn:** [linkedin.com/in/salmanrafi002](https://www.linkedin.com/in/salmanrafi002/)

**GitHub:** [github.com/Rafi7078](https://github.com/Rafi7078)

**Portfolio:** [salman-rafi-website.vercel.app](https://salman-rafi-website.vercel.app/)

---

<p align="center">
  <strong>Built with curiosity. Driven by purpose.</strong>
</p>

<p align="center">
  © 2026 Salman Jahan Rafi
</p>
