import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold">
              Resume<span className="text-[#D4AF37]">Pro</span>
            </h2>

            <p className="text-gray-500 text-sm mt-3 max-w-sm leading-relaxed">
              A modern platform to upload, organize and manage your
              professional resumes in one place.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#D4AF37]">
              Quick Links
            </h3>

            <div className="mt-4 space-y-3">

              <Link
                to="/"
                className="block text-gray-400 hover:text-[#D4AF37] transition"
              >
                Home
              </Link>

              <Link
                to="/upload"
                className="block text-gray-400 hover:text-[#D4AF37] transition"
              >
                Upload Resume
              </Link>

              <Link
                to="/resumes"
                className="block text-gray-400 hover:text-[#D4AF37] transition"
              >
                My Resumes
              </Link>

            </div>
          </div>

          {/* Platform */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#D4AF37]">
              Platform
            </h3>

            <p className="text-gray-500 text-sm mt-4 leading-relaxed">
              Simple, organized and professional resume management
              for modern job seekers.
            </p>
          </div>

        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col md:flex-row justify-between gap-3">

          <p className="text-gray-600 text-sm">
            © 2026 ResumePro. All rights reserved.
          </p>

          <p className="text-gray-600 text-sm">
            Built with React & Tailwind CSS
          </p>

        </div>

      </div>
    </footer>
  );
}

export default Footer;
