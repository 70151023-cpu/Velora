🌐 Velora
📝 Project Overview
Velora is a high-performance, data-driven web application designed to manage digital service offerings. It transitions from a static site to a fully interactive CRUD (Create, Read, Update, Delete) platform using modular ES6+ JavaScript, maintaining a centralized "in-memory" database and a persistent UI theme.

🚀 Key Features
Full CRUD Management: Add, view, edit, and delete services in real-time without page reloads.

Advanced Data Processing: 5+ reactive filters including search-by-name, category filtering, price sorting, and status tracking.

Persistent Dark Mode: A globally synced light/dark theme toggle using localStorage and window.storage events.

Responsive UI: Built with Tailwind CSS and Flowbite for a professional, mobile-first experience.

Interactive Components: Accordions, modals, and asynchronous contact forms integrated with Formspree.

🛠️ Technologies Used
Frontend: Semantic HTML5, CSS3 (Tailwind CSS, Flowbite)

Scripting: Vanilla JavaScript (ES6+ Modules)

Data Handling: Array of Objects, Object CRUD Methods

Persistence: LocalStorage API

Deployment: GitHub Pages

📂 Project Structure
Plaintext
project/
├── index.html                # Home Page & CRUD Dashboard
├── script.js                 # Main UI Logic & DOM Manipulation
├── assets/                   # Images and static assets
└── src/
    ├── database/
    │   └── services.js       # Centralized Data & CRUD Logic
    ├── constants/
    │   └── themeConstants.js # Global Theme Sync Logic
    └── pages/
        ├── about/            # About Page
        ├── contact/          # Contact Page (Formspree)
        ├── signin/           # Authentication UI
        └── signup/           # Registration UI
