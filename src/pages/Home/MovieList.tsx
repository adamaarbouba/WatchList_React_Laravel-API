import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { movies } from "../../services/api";

export default function MovieList() {
  const [allMovies, setAllMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await movies.getAll();
        // Handle both array and object responses from Laravel
        const moviesData = Array.isArray(response.data)
          ? response.data
          : response.data.data || [];
        setAllMovies(moviesData.slice(0, 6)); // Show first 6 on home
      } catch (err: any) {
        setError("Failed to load movies");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) return <p className="text-center py-12">Loading movies...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div>
      {allMovies.length === 0 ? (
        <p className="text-center text-gray-500">No movies found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allMovies.map((movie) => (
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
