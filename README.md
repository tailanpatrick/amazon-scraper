# 🕸️ Amazon Product Scraper with Bun + TypeScript + Vite

This project is a full-stack web scraper that fetches product listings from the first page of Amazon search results using a keyword. It uses **Bun**, **TypeScript**, **Express**, **Axios**, **JSDOM**, and **Vite** (Vanilla JS) for the frontend.

---

## 📦 Technologies Used

-   [Bun](https://bun.sh/)
-   TypeScript
-   Express (Bun-compatible)
-   Axios
-   JSDOM
-   Vite (for frontend)
-   Vanilla JavaScript

---

## 📁 Project Structure

project-root/
│
├── backend/
│ ├── index.ts # API server using Bun + Express
│ └── scraper.ts # Logic to scrape Amazon data
│
├── frontend/
│ ├── index.html
│ ├── main.js # JS to call backend API
│ └── style.css
│
├── src/types/puppeteer.d.ts (if using puppeteer fallback)
├── tsconfig.json
├── vite.config.js
├── bunfig.toml
└── README.md

yaml
Copiar
Editar

---

## 🚀 How to Run the Application

### 1. Clone the Repository

```bash
git clone https://github.com/your-user/amazon-scraper-bun.git
cd amazon-scraper-bun
2. Install Backend Dependencies
bash
Copiar
Editar
cd backend
bun install
3. Install Frontend Dependencies
bash
Copiar
Editar
cd ../frontend
bun create vite
bun install
Or if you already have index.html, main.js, and style.css, no need to recreate via Vite.

4. Run Backend Server
bash
Copiar
Editar
cd backend
bun run index.ts
It will start the API on http://localhost:3000

5. Serve the Frontend
bash
Copiar
Editar
cd ../frontend
bun run dev
It will serve the frontend on http://localhost:5173

🔍 How It Works
Backend
A GET endpoint /api/scrape?keyword=YOUR_KEYWORD

Uses Axios to fetch the Amazon search page

Uses JSDOM to parse the page

Extracts:

Product Title

Star Rating

Number of Reviews

Product Image URL

Frontend
Input field for the search keyword

Button to trigger the scraping

Makes AJAX request to backend

Displays product info in a grid/list format

🛠 Example Usage
Search for "headphones" using the frontend input.

The backend will return data like:

json
Copiar
Editar
[
  {
    "title": "Headphones XYZ",
    "rating": "4.5 out of 5",
    "reviews": "2,345",
    "image": "https://example.com/image.jpg"
  },
  ...
]
❗ Notes
Amazon may block frequent requests. Consider using proxies or Puppeteer for production use.

This project is for educational purposes only.

⚠️ Error Handling
The backend returns 500 with JSON { error: "Message" } if scraping fails.

The frontend handles and displays error messages cleanly.


```
