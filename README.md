# Zayn & Nora — South Indian Temple Wedding Invitation 🌸🪔

An elegant, interactive, and animated wedding invitation website celebrating the union of **Zayn & Nora**.

Built with modern web technologies featuring rich animations, an organic temple courtyard animated hero background, interactive wax seal envelope opening, scratch-to-reveal card, and seamless RSVP handling.

---

## ✨ Features

- **Animated Courtyard Hero Experience**: A soft watercolor-style South Indian temple courtyard animation with parting banana leaves, swaying jasmine and lotus garlands, brass urns, and drifting flower petals integrated seamlessly into the hero canvas.
- **Interactive Wax Seal Envelope**: Guests open the personalized wedding card with a realistic wax seal break and unfolding letter animation.
- **Atmospheric Sound & Ambient Toggle**: Ambient temple courtyard audio with unobtrusive play/pause controls.
- **Falling Petal Particles**: Soft canvas-based drifting pink lotus and white jasmine petals across the viewport.
- **Live Wedding Countdown**: Real-time days, hours, minutes, and seconds countdown to the auspicious ceremony.
- **Interactive RSVP System**: Guest attendance confirmation, meal preferences, and personalized warm wishes.
- **Scratch-to-Reveal Blessings**: Gamified scratch card offering personalized heartfelt blessings for the couple.
- **Event Timeline & Venue Details**: Complete schedule of Haldi, Mehendi, Sangeet, Muhurtham, and Reception with interactive venue maps and calendar save.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS, Lucide Icons, Canvas API
- **Backend / API**: Node.js, Express, tRPC for end-to-end type safety
- **Database / ORM**: Drizzle ORM, SQLite / PostgreSQL ready
- **Tooling & Build**: Vite, Vitest, tsx, Prettier

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/sanath-labs/zayn-nora.git
cd zayn-nora

# Install dependencies
npm install --legacy-peer-deps
```

### Running Locally

```bash
# Start development server on port 5000
npm run dev

# Or specify a custom port
PORT=5000 npm run dev
```

Open [http://localhost:5000](http://localhost:5000) in your browser to view the invitation.

### Production Build

```bash
npm run build
npm start
```

---

## 📁 Project Structure

```
zayn-nora/
├── client/
│   ├── public/             # Static assets (temple animation video, monogram, icons)
│   ├── src/
│   │   ├── components/     # EnvelopeIntro, FallingFlowers, RSVPForm, ScratchReveal, Countdown
│   │   ├── pages/          # Home (Courtyard Hero, Timeline, Venue, Blessings)
│   │   ├── index.css       # Custom animations, gold gradients, vignette overlays
│   │   └── main.tsx        # React root
│   └── index.html
├── server/
│   ├── _core/              # Express server, Vite middleware, tRPC router
│   ├── db.ts               # Database connection
│   └── storage.ts          # Storage interfaces
├── shared/                 # Shared types, constants, schemas
└── drizzle/                # Database migrations and schema definitions
```

---

## 💍 With Love

Crafted with care for **Zayn & Nora's** special day.
