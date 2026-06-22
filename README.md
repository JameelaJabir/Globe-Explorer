# 🌍 Globe Explorer

A full-featured countries explorer built with React and Vite. Browse, search, filter, and sort 250+ countries with detailed information, interactive data charts, dark mode, and a personal favorites system.

---

## Features

- **Browse Countries** — Card grid showing flag, name, population, region, and capital for every country
- **Search** — Real-time search by country name with recent searches history
- **Filter by Region** — Narrow results to Africa, Americas, Asia, Europe, or Oceania
- **Sort Controls** — Sort by name, population, or area (ascending / descending)
- **Country Detail** — Deep-dive page with official name, languages, currencies, timezone, TLD, area, and clickable border countries
- **Data Visualization** — Interactive bar and pie charts: top 10 most populous countries, population by region, countries per region
- **Dark Mode** — System-aware toggle, persisted across sessions
- **User Auth** — Register and login with localStorage-backed session management
- **Favorites** — Logged-in users can save and manage favourite countries from any page
- **Browse History** — Automatically tracks recently viewed countries
- **Protected Routes** — Profile page is only accessible when authenticated
- **Test Suite** — Unit and integration tests with Jest, React Testing Library, and MSW

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + Vite 5 |
| Routing | React Router DOM v6 |
| Styling | Tailwind CSS v3 |
| Charts | Recharts v2 |
| Icons | Lucide React |
| Testing | Jest 29 + Testing Library + MSW v2 |
| API | REST Countries API v5 |

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+
- A free REST Countries API key from [restcountries.com](https://restcountries.com)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/JameelaJabir/Globe-Explorer.git
cd Globe-Explorer

# 2. Install dependencies
npm install

# 3. Set up your environment
cp .env.example .env.local
```

### Environment Setup

Create a `.env.local` file in the project root:

```env
VITE_COUNTRIES_API_KEY=your_api_key_here
```

Get your free API key at [restcountries.com](https://restcountries.com) → **Get an API key**.

### Run

```bash
# Development server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Running Tests

```bash
# Run all tests
npm test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage
```

---

## Project Structure

```
src/
├── components/
│   ├── CountryCard.jsx       # Country card with flag, stats, favorite button
│   ├── DataVisualization.jsx # Recharts bar + pie charts
│   ├── FavoriteButton.jsx    # Toggle country as favorite
│   ├── FilterDropdown.jsx    # Region filter select
│   ├── Loader.jsx            # Loading spinner
│   ├── Navbar.jsx            # Top nav with dark mode toggle + auth links
│   ├── ProtectedRoute.jsx    # Auth guard for private routes
│   ├── RecentSearches.jsx    # Search history dropdown
│   └── SortControls.jsx      # Sort by name / population / area
├── context/
│   ├── AuthContext.jsx       # Auth state (login, register, logout, favorites)
│   └── HistoryContext.jsx    # Browse history tracking
├── pages/
│   ├── Home.jsx              # Main listing page
│   ├── CountryDetail.jsx     # Single country detail + borders
│   ├── Login.jsx
│   ├── Register.jsx
│   └── Profile.jsx           # Favorites dashboard (protected)
├── services/
│   └── api.js                # REST Countries v5 client with v3.1 transformer
└── tests/                    # Jest + RTL + MSW test suite
```

---

## API

This project uses the [REST Countries API v5](https://restcountries.com). All requests are proxied through Vite's dev server to avoid CORS issues and authenticated with a Bearer token.

```
Authorization: Bearer <VITE_COUNTRIES_API_KEY>
```

---

## License

MIT
