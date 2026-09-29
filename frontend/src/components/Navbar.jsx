import { Link, NavLink } from "react-router-dom";

function Navbar() {
  const navClass = ({ isActive }) =>
    `text-sm font-medium transition duration-300 ${
      isActive
        ? "text-[#D4AF37]"
        : "text-gray-300 hover:text-[#D4AF37]"
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-black/90 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Brand */}
        <Link to="/" className="group">
          <h1 className="text-2xl font-bold tracking-wide text-white">
            Resume<span className="text-[#D4AF37]">Pro</span>
          </h1>

          <p className="text-[10px] uppercase tracking-[0.25em] text-gray-400 mt-1">
            Resume Management
          </p>
        </Link>

        {/* Navigation */}
        <div className="hidden md:flex items-center gap-8">

          <NavLink to="/" className={navClass}>
            Home
          </NavLink>

          <NavLink to="/upload" className={navClass}>
            Upload Resume
          </NavLink>

          <NavLink to="/resumes" className={navClass}>
            My Resumes
          </NavLink>

        </div>

        {/* CTA */}
        <Link
          to="/upload"
          className="
            relative
            overflow-hidden
            bg-[#D4AF37]
            text-black
            font-semibold
            px-5
            py-2.5
            rounded-lg
            border
            border-[#E8C766]
            shadow-[0_0_20px_rgba(212,175,55,0.18)]
            hover:shadow-[0_0_30px_rgba(212,175,55,0.35)]
            hover:bg-[#E8C766]
            transition-all
            duration-300
          "
        >
          Upload Resume
        </Link>

      </div>
    </nav>
  );
}

export default Navbar;
