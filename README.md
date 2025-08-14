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
financial-dashboard/
├── public/                  # Static files
│   ├── icons/               # SVG icons for the navbar
│   ├── light-mode-screenshot.png
│   └── dark-mode-screenshot.png
├── src/
│   ├── app/                 # App router
│   │   ├── components/      # Reusable components
│   │   │   ├── Card.jsx     # Card component
│   │   │   ├── Navbar.jsx   # Navigation bar
│   │   │   ├── StatCard.jsx # Stats display card
│   │   │   └── charts/      # Chart components
│   │   ├── page.js          # Main page
│   │   └── globals.css      # Global styles
│   └── lib/                 # Utility functions
├── .gitignore
├── next.config.js
├── package.json
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
   cd financial-dashboard
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
