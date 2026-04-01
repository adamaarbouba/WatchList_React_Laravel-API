import { useState, useEffect } from "react";
import { movies } from "../services/api";

export default function Home() {
  const [allMovies, setAllMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await movies.getAll();
        setAllMovies(response.data);
      } catch (err: any) {
        setError("Failed to load movies");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) return <p>Loading movies...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h1>All Movies</h1>
      <div>
        {allMovies.length === 0 ? (
          <p>No movies found</p>
        ) : (
          allMovies.map((movie) => (
            <div key={movie.id}>
              <h3>{movie.title}</h3>
              <p>{movie.description}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
