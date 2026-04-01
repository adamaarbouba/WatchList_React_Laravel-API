import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className="flex gap-6">
      <Link
        to="/"
        className="text-gray-700 hover:text-blue-600 font-semibold transition-colors"
      >
        Home
      </Link>
      <Link
        to="/catalog"
        className="text-gray-700 hover:text-blue-600 font-semibold transition-colors"
      >
        Catalog
      </Link>
      <Link
        to="/watchlist"
        className="text-gray-700 hover:text-blue-600 font-semibold transition-colors"
      >
        Watchlist
      </Link>
    </nav>
  );
}
