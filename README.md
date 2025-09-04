# Financial Dashboard

A modern, responsive financial dashboard built with Next.js 14, Tailwind CSS, and Chart.js. This dashboard provides a comprehensive view of financial metrics including AUM, SIP, client statistics, and more.

## 🚀 Features

- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop
- **Dark/Light Mode**: Toggle between themes for comfortable viewing
- **Interactive Charts**: Visualize data with beautiful, interactive charts
- **Real-time Data**: Fetches and displays financial metrics in real-time
- **Skeleton Loading**: Smooth loading animations for better user experience during data fetching
- **Filterable Views**: Filter data by different time ranges

## 📱 Screenshots

### Light Mode
<p align="center">
  <img src="https://raw.githubusercontent.com/051188-rk/ppy-assignment/main/public/light.png" alt="light mode image" />
</p>

### Dark Mode
<p align="center">
  <img src="https://raw.githubusercontent.com/051188-rk/ppy-assignment/main/public/dark.png" alt="dark mode image" />
</p>

### Mobile Interface (Android via Capacitor)
<p align="center">
  <img src="https://raw.githubusercontent.com/051188-rk/ppy-assignment/main/public/ss1.png" alt="mobile screenshot 1" width="23%"/>
  <img src="https://raw.githubusercontent.com/051188-rk/ppy-assignment/main/public/ss2.png" alt="mobile screenshot 2" width="23%"/>
  <img src="https://raw.githubusercontent.com/051188-rk/ppy-assignment/main/public/ss3.png" alt="mobile screenshot 3" width="23%"/>
  <img src="https://raw.githubusercontent.com/051188-rk/ppy-assignment/main/public/ss4.png" alt="mobile screenshot 4" width="23%"/>
  
</p>

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Charts**: Chart.js with react-chartjs-2
- **Icons**: Custom SVG icons with theme support
- **State Management**: React Hooks
- **Linting**: ESLint
- **Code Formatting**: Prettier

## 📁 Directory Structure

```
ppy-assignment/
├── public/                      # Static assets served as-is
│   ├── icons/                   # SVG icons for the navbar
│   ├── light.png                # Light mode screenshot (README)
│   ├── dark.png                 # Dark mode screenshot (README)
│   ├── ss1.png                 # Mobile UI screenshots (README)
│   ├── ss2.png
│   ├── ss3.png
│   └── ss4.png
├── src/
│   └── app/                     # Next.js App Router
│       ├── components/          # Reusable UI components
│       ├── page.js              # Main page
│       └── globals.css          # Global styles
├── android/                     # Capacitor Android project
├── capacitor.config.ts          # Capacitor configuration
├── next.config.js               # Next.js config (output: 'export')
├── out/                         # Static export build output (generated)
├── package.json
├── package-lock.json
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0.0 or later
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/051188-rk/ppy-assignment.git
   cd ppy-assignment
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Android (Capacitor) Setup and Commands

This project supports building and running the app as a native Android application using Capacitor. The project already includes `android/` and `capacitor.config.ts`.

### One-time setup (if not already done)

```bash
# Install Capacitor packages
npm install @capacitor/core @capacitor/android
npm install -D @capacitor/cli

# If the Android project is not present yet
npx cap add android
```

### Build for Android (static export)

```bash
# 1) Build a static export (uses output: 'export' in next.config.js)
npm run build

# 2) Copy the web assets to the native project
npx cap copy android

# 3) (Optional) Sync dependencies and plugins
npx cap sync android

# 4) Open Android Studio
npx cap open android
```

From Android Studio, build and run on an emulator or a connected device.

### Common commands

```bash
# After making web changes
npm run build && npx cap copy android

# If you add/remove Capacitor plugins or config
npx cap sync android

# Clean and rebuild (Android Studio)
# Build > Clean Project, then Build > Rebuild Project
```

### Migration notes

- `capacitor.config.ts` sets `webDir` to `out`, which matches Next.js static export. Always run `npm run build` before `npx cap copy android` so the latest files are in `out/`.
- The Next.js config (`next.config.js`) uses `output: 'export'` and `images.unoptimized: true` which makes the app compatible with Capacitor's local file serving.
- Avoid server-only features (e.g., API routes relying on Node runtime) in the mobile build. Use static data or fetch from HTTPS APIs.
- If you change `capacitor.config.ts` or add/remove plugins, run `npx cap sync android`.

## 🎨 Components

### 1. Navbar
- Responsive navigation with dropdown menus
- Theme toggle for dark/light mode
- Icons for all menu items
- Search functionality

### 2. AUM/SIP Cards
- Displays current AUM and SIP values
- Shows Month-over-Month (MoM) percentage change
- View Report button for detailed analysis

### 3. Time Range Filter
- Filter data by different time ranges (3D, 7D, 10D, 30D)
- Dynamic data updates based on selection

### 4. Stat Cards
- Purchases
- Redemptions
- Rejected Transactions
- SIP Rejections
- New SIP

### 5. Interactive Charts
- **Clients Bubble Chart**: Visualize client distribution
- **SIP Business Chart**: Bar + Line chart for SIP analysis
- **Monthly MIS Chart**: Multi-line chart for monthly metrics

## 🎯 Features Implemented

- **Responsive Layout**: Adapts to all screen sizes
- **Dark Mode**: Complete theme support with smooth transitions
- **Dynamic Data**: Real-time data fetching and updates
- **Interactive UI**: Hover effects, tooltips, and animations
- **Accessibility**: Semantic HTML and ARIA attributes

## 📝 Notes

- All charts are fully responsive and adapt to container size
- Icons and images are optimized for performance
- The app follows modern React patterns and best practices

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
