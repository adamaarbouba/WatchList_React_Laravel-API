import MovieGrid from "./MovieGrid";

export default function Catalog() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-2">Movie Catalog</h1>
      <p className="text-gray-600 mb-8">
        Explore our complete collection of movies
      </p>
      <MovieGrid />
    </div>
  );
}
