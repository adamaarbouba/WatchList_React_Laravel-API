import Logo from "./Logo";
import NavBar from "./NavBar";
import Account from "./Account";

export default function Header() {
  return (
    <header className="bg-white shadow-md sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Logo />
        <NavBar />
        <Account />
      </div>
    </header>
  );
}
