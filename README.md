# Liftline Gym & Fitness Web Application

A modern, high-performance, standalone website built with full Webflow IX2 interaction parity and professional fullstack folder architecture.

---

## 📁 Clean Project Architecture

```text
Kings Gyms/
├── index.html                  # Semantic HTML5 structure, SEO metadata, modal markup
├── css/
│   └── style.css               # Design tokens, typography, layout, animations & media queries
├── js/
│   └── script.js               # Sticky scroll engine, mobile navigation, modal pop-up, Google Maps
├── assets/
│   ├── images/                 # Optimized WebP images (hero, trainers, classes, why cards, testimonials)
│   ├── logos/                  # SVG brand logos (Liftline logo and partner badges)
│   └── icons/                  # Favicons (32px and 256px)
└── README.md                   # Project documentation and local development instructions
```

---

## ⚡ Key Features & Interactions

1. **Sticky Multi-Phase Trainers Animation (`Meet` → `Our` → `Trainers`)**:
   - Dynamic 380vh scroll track with synchronized zoom, blur, and scale transitions.
   - Non-overlapping 4-quadrant layout on both desktop and mobile viewports.
2. **Compact Centered Trainer Specialization Pop-up**:
   - Displays coach certifications, experience badge, specialization tags, and bio.
   - Dismissible via top-right close button, Escape key, or clicking the outer dark glassmorphic backdrop.
3. **Expandable Class Cards (1:3 Flex Ratio)**:
   - Interactive hover and tap accordion with smooth CSS flex expansion and image desaturation.
4. **Infinite Continuous Marquee**:
   - 24-second seamless CSS keyframe loop with hover-pause support.
5. **Interactive Location Switcher**:
   - City accordion (Jakarta, Bandung, Surabaya, Bali) linked with real-time responsive Google Maps.
6. **Smart Directional Header**:
   - Auto-hides on downward scroll and reveals with frosted glass background on upward scroll.
7. **Full Responsiveness**:
   - Zero horizontal overflow across Desktop (1440px+), Laptop (1024px), Tablet (768px - 880px), and Mobile (320px - 440px).

---

## 🚀 Running Locally

You can run the site using any static HTTP server:

```powershell
# Using Python
python -m http.server 4173

# Using Node.js (npx)
npx serve .
```

Open **`http://localhost:4173`** in your browser.
