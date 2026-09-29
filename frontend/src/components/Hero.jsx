import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="relative overflow-hidden bg-black text-white">

      {/* Gold Glow */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#D4AF37]/10 blur-[120px] rounded-full" />

      <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32">

        <div className="max-w-4xl">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 border border-[#D4AF37]/30 bg-[#D4AF37]/5 rounded-full px-4 py-2 mb-7">
            <span className="w-2 h-2 rounded-full bg-[#D4AF37] shadow-[0_0_10px_#D4AF37]" />

            <span className="text-[#D4AF37] text-sm font-medium tracking-wide">
              Smart Resume Management
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight">
            Your Resume.
            <br />

            <span className="text-[#D4AF37]">
              Your Future.
            </span>
          </h1>

          {/* Description */}
          <p className="mt-7 max-w-2xl text-gray-400 text-lg md:text-xl leading-relaxed">
            Upload, organize and manage your professional resumes
            through one elegant and secure platform.
          </p>

          {/* Buttons */}
          <div className="mt-9 flex flex-col sm:flex-row gap-4">

            {/* Upload Button */}
            <Link
              to="/upload"
              className="
                inline-flex
                items-center
                justify-center
                bg-[#D4AF37]
                text-black
                px-7
                py-3.5
                rounded-lg
                font-semibold
                hover:bg-[#E8C766]
                shadow-[0_0_25px_rgba(212,175,55,0.2)]
                hover:shadow-[0_0_35px_rgba(212,175,55,0.35)]
                transition-all
                duration-300
              "
            >
              Upload Resume
            </Link>

            {/* Explore Button */}
            <Link
              to="/resumes"
              className="
                inline-flex
                items-center
                justify-center
                border
                border-white/20
                bg-white/5
                backdrop-blur-md
                text-white
                px-7
                py-3.5
                rounded-lg
                font-semibold
                hover:border-[#D4AF37]/50
                hover:text-[#D4AF37]
                transition-all
                duration-300
              "
            >
              Explore Resumes
            </Link>

          </div>

          {/* Trust Points */}
          <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 text-sm text-gray-500">

            <span>✓ Easy Upload</span>
            <span>✓ Secure Storage</span>
            <span>✓ Quick Access</span>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;