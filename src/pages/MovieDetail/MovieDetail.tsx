import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { movies, watchlist } from "../../services/api";

export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [addingToWatchlist, setAddingToWatchlist] = useState(false);
  const [isInWatchlist, setIsInWatchlist] = useState(false);

  useEffect(() => {
    fetchMovie();
    checkWatchlist();
  }, [id]);

  const fetchMovie = async () => {
    try {
      setLoading(true);
      const response = await movies.getOne(Number(id));
      // Handle both direct object and wrapped response
      const movieData = response.data.id ? response.data : response.data.data;
      setMovie(movieData);
    } catch (err: any) {
      setError("Failed to load movie");
    } finally {
      setLoading(false);
    }
  };

  const checkWatchlist = async () => {
    try {
      const response = await watchlist.get();
      // Handle both array and object responses
      const watchlistData = Array.isArray(response.data)
        ? response.data
        : response.data.data || [];
      const inWatchlist = watchlistData.some(
        (item: any) => item.id === Number(id),
      );
      setIsInWatchlist(inWatchlist);
    } catch (err) {
      console.error("Error checking watchlist");
    }
  };

  const handleAddToWatchlist = async () => {
    try {
      setAddingToWatchlist(true);
      await watchlist.addMovie({ movie_id: Number(id) });
      setIsInWatchlist(true);
    } catch (err: any) {
      alert("Failed to add to watchlist");
    } finally {
      setAddingToWatchlist(false);
    }
  };

  const handleRemoveFromWatchlist = async () => {
    try {
      setAddingToWatchlist(true);
      await watchlist.removeMovie(Number(id));
      setIsInWatchlist(false);
    } catch (err: any) {
      alert("Failed to remove from watchlist");
    } finally {
      setAddingToWatchlist(false);
    }
  };

  if (loading)
    return (
      <div className="text-center py-12">
        <p className="text-xl">Loading...</p>
      </div>
    );
  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (!movie) return <p className="text-center">Movie not found</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex gap-8 mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 w-64 h-96 rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-white text-6xl">🎬</span>
          </div>
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
            <p className="text-gray-600 mb-6 text-lg">{movie.description}</p>
            {movie.category && (
              <p className="mb-4">
                <span className="font-semibold">Category:</span>{" "}
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  {movie.category.name}
                </span>
              </p>
            )}
            <div className="flex gap-4">
              {isInWatchlist ? (
                <button
                  onClick={handleRemoveFromWatchlist}
                  disabled={addingToWatchlist}
                  className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                >
                  {addingToWatchlist ? "Removing..." : "Remove from Watchlist"}
                </button>
              ) : (
                <button
                  onClick={handleAddToWatchlist}
                  disabled={addingToWatchlist}
                  className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                >
                  {addingToWatchlist ? "Adding..." : "+ Add to Watchlist"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
