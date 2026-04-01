import { Link } from "react-router-dom";
import MovieList from "./MovieList";

export default function Home() {
  const isLoggedIn = !!localStorage.getItem("authToken");

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Welcome to WATCHLIST</h1>
          <p className="text-xl mb-8">
            Discover and organize your favorite movies
          </p>
          {!isLoggedIn ? (
            <div className="flex gap-4 justify-center">
              <Link
                to="/register"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
              >
                Get Started
              </Link>
              <Link
                to="/login"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors"
              >
                Login
              </Link>
            </div>
          ) : (
            <div className="flex gap-4 justify-center">
              <Link
                to="/catalog"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
              >
                Browse Movies
              </Link>
              <Link
                to="/watchlist"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors"
              >
                My Watchlist
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Featured Movies */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-2">Featured Movies</h2>
        <p className="text-gray-600 mb-8">Check out some popular titles</p>
        <MovieList />
      </div>
    </div>
  );
}
