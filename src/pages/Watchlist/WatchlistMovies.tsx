import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { watchlist } from "../../services/api";

export default function WatchlistMovies() {
  const [watchlistItems, setWatchlistItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchWatchlist();
  }, []);

  const fetchWatchlist = async () => {
    try {
      setLoading(true);
      const response = await watchlist.get();
      // Handle both array and object responses
      const watchlistData = Array.isArray(response.data)
        ? response.data
        : response.data.data || [];
      setWatchlistItems(watchlistData);
    } catch (err: any) {
      setError("Failed to load watchlist");
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (movieId: number) => {
    try {
      await watchlist.removeMovie(movieId);
      setWatchlistItems(watchlistItems.filter((item) => item.id !== movieId));
    } catch (err: any) {
      alert("Failed to remove from watchlist");
    }
  };

  if (loading)
    return (
      <div className="text-center py-12">
        <p className="text-xl">Loading your watchlist...</p>
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-2">My Watchlist</h1>
      <p className="text-gray-600 mb-8">{watchlistItems.length} movies saved</p>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {watchlistItems.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500 mb-4">Your watchlist is empty</p>
          <Link
            to="/catalog"
            className="text-blue-500 hover:text-blue-700 font-semibold"
          >
            Browse movies →
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {watchlistItems.map((movie) => (
            <div key={movie.id} className="bg-white rounded-lg shadow-lg p-6">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-40 rounded mb-4 flex items-center justify-center">
                <span className="text-white text-4xl">🎬</span>
              </div>
              <h3 className="text-xl font-bold mb-2 line-clamp-2">
                {movie.title}
              </h3>
              <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                {movie.description}
              </p>
              <div className="flex gap-2">
                <Link
                  to={`/movie/${movie.id}`}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded text-center font-semibold transition-colors"
                >
                  View Details
                </Link>
                <button
                  onClick={() => handleRemove(movie.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded font-semibold transition-colors"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
