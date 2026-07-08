# 🧩 Puzzle Game – Frontend (React)

This is the **frontend part** of the Puzzle Game project, built with **React** and styled using **Tailwind CSS**.

The project is currently **under active development** and represents a real-world setup where a React frontend is prepared to be integrated with a backend service.

---

## 🚀 Tech Stack

- **React**
- **JavaScript (ES6+)**
- **Tailwind CSS**
- **Create React App**
- **HTML5 / CSS3**

---

## 📁 Project Structure
```
puzzle/
├── README.md                     # Project documentation
├── build/                        # Production-ready build output (generated via `npm run build`)
│   ├── index.html                # Main HTML file for production
│   ├── asset-manifest.json       # Mapping of bundled assets
│   ├── manifest.json             # PWA configuration
│   ├── robots.txt                # Search engine crawling rules
│   └── static/
│       ├── css/                  # Compiled and minified CSS files
│       └── js/                   # Compiled and minified JavaScript files
│
├── public/                       # Public static assets
│   ├── index.html                # HTML template
│   ├── manifest.json             # Web app manifest
│   ├── robots.txt                # SEO configuration
│   └── puzzle.svg                # Application icon / asset
│
├── src/                          # Application source code
│   ├── index.js                  # Application entry point — renders <App /> into DOM
│   │
│   ├── app/                      # App-level shell (root component, global setup)
│   │   ├── App.jsx               # Root React component — composes the app layout
│   │   └── App.css               # Global application styles
│   │
│   ├── pages/                    # Route-level page components
│   │   └── Home.jsx              # Main page — renders the puzzle feature
│   │
│   ├── features/                 # Domain-driven feature modules
│   │   └── puzzle/                # Everything related to the puzzle game, self-contained
│   │       ├── index.js           # Barrel export — public entry point of the feature
│   │       │
│   │       ├── components/        # Presentational (UI-only) components
│   │       │   ├── PuzzleGrid.jsx     # Composes the puzzle UI, consumes usePuzzleGame
│   │       │   ├── Tile.jsx           # Single draggable puzzle tile
│   │       │   ├── ImageUploader.jsx  # Upload button + empty-state prompt
│   │       │   └── PuzzleControls.jsx # Show Image / Shuffle Again buttons
│   │       │
│   │       ├── hooks/             # Feature-specific state & business logic
│   │       │   └── usePuzzleGame.js   # Tiles, timer, drag handling, win detection
│   │       │
│   │       ├── constants/         # Static feature-scoped data
│   │       │   └── positions.js       # Grid background-position values for tiles
│   │       │
│   │       └── utils/             # Pure helper functions
│   │           └── shuffle.js         # Fisher-Yates-style array shuffle
│   │
│   └── styles/                   # Global, non-component-specific styles
│       └── reset.css             # CSS reset for consistent cross-browser styling
│
├── package.json                  # Project metadata and dependencies
├── package-lock.json             # Locked dependency versions
└── tailwind.config.js            # Tailwind CSS configuration
```

## Tech Stack

### Frontend

- React  
- React DOM  
- React Router DOM  
- DnD Kit (Drag and Drop)  
- TailwindCSS  

### Testing

- Testing Library (React, DOM, User Event)  
- Jest DOM  

### Performance

- Web Vitals  

