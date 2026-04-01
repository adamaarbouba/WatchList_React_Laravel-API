# 🎬 WatchList - Movie Discovery & Management

A modern, responsive React frontend for discovering and managing your personal movie watchlist, integrated with a Laravel REST API backend.

## ✨ Features

- **Movie Discovery** - Browse and search through a comprehensive movie catalog
- **Watchlist Management** - Add or remove movies from your personal watchlist
- **User Authentication** - Secure JWT-based login and registration
- **User Profile** - View account information and manage preferences
- **Movie Details** - Detailed information about each movie including description and category
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- **Real-time Updates** - Instant feedback when managing your watchlist

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI library with hooks
- **TypeScript** - Type-safe JavaScript
- **Vite** - Lightning-fast build tool
- **React Router v6** - Client-side routing
- **Tailwind CSS** - Utility-first styling framework
- **Axios** - HTTP client for API requests

### Backend
- **Laravel** - PHP web framework (runs on `localhost:8000`)
- **MySQL** - Database
- **JWT Authentication** - Secure token-based auth

## 📁 Project Structure

```
src/
├── components/
│   └── common/
│       ├── Header/          # Navigation and account dropdown
│       └── Footer/          # Footer with links and social media
├── pages/
│   ├── Auth/
│   │   ├── Login/           # Login page and form
│   │   └── Register/        # Registration page and form
│   ├── Home/                # Featured movies and hero section
│   ├── Catalog/             # Browse and search all movies
│   ├── MovieDetail/         # Individual movie details
│   ├── Watchlist/           # Your saved movies
│   └── Profile/             # User account information
├── services/
│   └── api.ts               # API client with all endpoints
├── types/                   # TypeScript type definitions
├── hooks/                   # Custom React hooks
├── utils/                   # Utility functions
└── assets/                  # Images and static files
```

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm
- Laravel backend running on `localhost:8000`

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd WatchList_React_Laravel-API
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5174/`

### Environment Configuration

The app connects to the Laravel API at `http://localhost:8000`. Ensure your Laravel backend is running and configured properly.

**API Base URL:** `http://localhost:8000/api`

## 📝 Available Commands

```bash
# Development
npm run dev          # Start Vite dev server with HMR

# Production
npm run build        # Build for production (TypeScript + Vite)
npm run preview      # Preview the production build locally

# Code Quality
npm run lint         # Run ESLint on the codebase
```

## 🔌 API Integration

The app communicates with the Laravel backend through the `src/services/api.ts` service, which provides:

### Authentication Endpoints
- `POST /auth/register` - Create new account
- `POST /auth/login` - User login
- `POST /auth/logout` - User logout
- `GET /auth/profile` - Get current user profile

### Movie Endpoints
- `GET /movies` - List all movies
- `GET /movies/{id}` - Get movie details

### Watchlist Endpoints
- `GET /watchlist` - Get user's watchlist
- `POST /watchlist` - Add movie to watchlist
- `DELETE /watchlist/{id}` - Remove movie from watchlist

**Authentication:** JWT token stored in `localStorage` with key `authToken`

## 🎯 Pages Overview

| Page         | Path         | Description                                 |
| ------------ | ------------ | ------------------------------------------- |
| Home         | `/`          | Hero section with featured movies           |
| Catalog      | `/catalog`   | Browse all movies with search functionality |
| Movie Detail | `/movie/:id` | Detailed view with add to watchlist option  |
| Watchlist    | `/watchlist` | Your saved movies                           |
| Login        | `/login`     | Sign in to your account                     |
| Register     | `/register`  | Create a new account                        |
| Profile      | `/profile`   | View account info and logout                |

## 🔒 Authentication Flow

1. User registers or logs in
2. Backend returns JWT token
3. Token stored in `localStorage`
4. Token included in API request headers for protected routes
5. Logout removes token from storage and redirects to login

## 🎨 Styling

The project uses **Tailwind CSS** for styling with a consistent design system:
- Primary color: Blue (`blue-500` to `blue-700`)
- Secondary color: Purple (`purple-600`)
- Accent colors: Green (success), Red (danger)

All components are responsive and mobile-friendly with proper breakpoints.

## 🚦 Data Error Handling

The app handles various API response formats robustly:
- Direct array responses: `response.data`
- Wrapped responses: `response.data.data`
- Graceful error messages for failed requests
- Loading states during API calls

## 📦 Build Output

```
dist/
├── index.html       # Main HTML file
├── assets/
│   ├── index-*.css  # Compiled Tailwind CSS (~4.37 KB gzipped)
│   └── index-*.js   # Compiled JavaScript (~91.85 KB gzipped)
```

Optimized for fast loading and minimal bundle size.

## 🔄 Development Workflow

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make your changes
3. Test locally with `npm run dev`
4. Build to verify: `npm run build`
5. Commit and push
6. Create a pull request

## 📚 Future Enhancements

- [ ] Movie ratings and reviews
- [ ] Personalized recommendations
- [ ] Watch history tracking
- [ ] Social sharing features
- [ ] Advanced filtering and sorting
- [ ] Dark mode theme
- [ ] Mobile app version
- [ ] Movie trailer previews

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.
