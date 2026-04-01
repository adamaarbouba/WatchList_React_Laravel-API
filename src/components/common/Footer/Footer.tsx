import Links from "./Links";
import Social from "./Social";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4">WATCHLIST</h3>
            <p className="text-gray-400">
              Your personal movie watchlist manager
            </p>
          </div>
          <Links />
          <Social />
        </div>
        <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
          <p>&copy; 2026 WATCHLIST. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
