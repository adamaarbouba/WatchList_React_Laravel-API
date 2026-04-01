import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../../../services/api";

export default function Account() {
  const navigate = useNavigate();
  const [isLoggedIn] = useState(!!localStorage.getItem("authToken"));
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await auth.logout();
    } catch (err) {
      console.error("Logout error:", err);
    }
    localStorage.removeItem("authToken");
    navigate("/login");
    setDropdownOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Account
      </button>
      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50">
          {isLoggedIn ? (
            <>
              <Link
                to="/profile"
                onClick={() => setDropdownOpen(false)}
                className="block px-4 py-2 hover:bg-gray-100 rounded-t-lg"
              >
                👤 Profile
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-b-lg text-red-500 hover:text-red-700"
              >
                🚪 Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setDropdownOpen(false)}
                className="block px-4 py-2 hover:bg-gray-100 rounded-t-lg"
              >
                🔓 Login
              </Link>
              <Link
                to="/register"
                onClick={() => setDropdownOpen(false)}
                className="block px-4 py-2 hover:bg-gray-100 rounded-b-lg"
              >
                ✍️ Register
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
}
