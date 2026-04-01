import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { movies } from "../../services/api";

export default function MovieGrid() {
  const [allMovies, setAllMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const response = await movies.getAll();
      // Handle both array and object responses from Laravel
      const moviesData = Array.isArray(response.data)
        ? response.data
        : response.data.data || [];
      setAllMovies(moviesData);
    } catch (err: any) {
      setError("Failed to load movies");
      console.error("Error loading movies:", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredMovies = allMovies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-xl">Loading movies...</p>
      </div>
    );
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Search movies..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-3 mb-8 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {filteredMovies.length === 0 ? (
        <p className="text-center text-gray-500">No movies found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMovies.map((movie) => (
            <Link key={movie.id} to={`/movie/${movie.id}`}>
              <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6 cursor-pointer h-full">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-40 rounded mb-4 flex items-center justify-center">
                  <span className="text-white text-4xl">🎬</span>
                </div>
                <h3 className="text-xl font-bold mb-2 line-clamp-2">
                  {movie.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-3">
                  {movie.description}
                </p>
                <p className="text-blue-500 text-sm mt-3 font-semibold">
                  View Details →
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
