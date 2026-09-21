# 📊 Data Journalism Keynote Presentation (Reveal.js)

A keynote presentation deck built with [Reveal.js](https://revealjs.com/), [Chart.js](https://www.chartjs.org/), and custom glassmorphic styling. Ready to be viewed locally or published globally with **GitHub Pages**.

---

## 🚀 Live Demo on GitHub Pages

Once pushed to GitHub, your presentation is accessible at:
👉 **`https://onelag.github.io/datajournalism/`**

---

## ⌨️ Keynote Presentation Controls

| Key | Action |
|---|---|
| **`Space` / `→` / `↓`** | Next slide or next bullet point (fragment) |
| **`←` / `↑`** | Previous slide or bullet point |
| **`S`** | **Speaker Notes View** (Opens a separate window with timer, current slide, next slide, and your talking points) |
| **`F`** | Toggle Fullscreen mode |
| **`O` / `ESC`** | Slide Overview mode (zoom out to see all slides as a grid) |
| **`Alt + Click`** | Zoom into any specific element or chart |
| **`?`** | Open help overlay showing all keyboard shortcuts |

---

## 🖥️ How to Test Locally on Your Mac

You can test your presentation locally before or after pushing:

### Option 1: Using Python (Built-in on Mac)
Open your Terminal, navigate to this folder, and run:
```bash
python3 -m http.server 8000
```
Then open `http://localhost:8000` in your browser.

### Option 2: Using Node.js / npx
```bash
npx serve .
```

---

## 🌐 Publishing to GitHub Pages (Step-by-Step)

The repository already includes an automated **GitHub Actions** deployment workflow (`.github/workflows/deploy.yml`).

### To publish:
1. Initialize git and commit files:
   ```bash
   git init
   git add .
   git commit -m "Initial keynote presentation commit"
   ```
2. Create repository and push to GitHub using the GitHub CLI:
   ```bash
   gh repo create datajournalism --public --source=. --remote=origin --push
   ```
3. Enable GitHub Pages in your repository settings:
   - Go to your repository on GitHub: `https://github.com/onelag/datajournalism`
   - Click **Settings** > **Pages** (in the left sidebar)
   - Under **Build and deployment > Source**, select **GitHub Actions**
4. That's it! GitHub will automatically deploy your presentation.

---

## 🎨 How to Customize Slides

- **Add or edit slides**: Open `index.html` and edit or copy any `<section>` block.
- **Add Speaker Notes**: Inside any `<section>`, add `<aside class="notes">Your notes here</aside>`.
- **Change styling**: Modify `css/custom-theme.css` for colors, typography, or spacing.
- **Change chart data**: Modify `js/presentation.js` to change the values or labels in the Chart.js visualization.
