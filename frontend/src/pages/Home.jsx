import Hero from "../components/Hero";

function Home() {
  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
      <section className="bg-black text-white px-6 py-24 border-t border-white/10">
        <div className="max-w-7xl mx-auto">

          {/* Section Heading */}
          <div className="text-center mb-14">
            <p className="text-[#D4AF37] uppercase tracking-[0.25em] text-sm font-semibold">
              Why ResumePro
            </p>

            <h2 className="text-4xl md:text-5xl font-bold mt-3">
              Everything You Need
            </h2>

            <p className="text-gray-400 mt-4 max-w-2xl mx-auto leading-relaxed">
              A simple and professional way to upload, organize and manage
              your resumes.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Card 1 */}
            <div
              className="
                group
                bg-white/[0.04]
                border border-white/10
                rounded-2xl
                p-7
                hover:border-[#D4AF37]/40
                hover:bg-white/[0.06]
                transition-all
                duration-300
              "
            >
              <div
                className="
                  w-14 h-14
                  rounded-xl
                  bg-[#D4AF37]/10
                  border border-[#D4AF37]/20
                  flex items-center justify-center
                  text-2xl
                  group-hover:scale-110
                  transition-transform
                  duration-300
                "
              >
                📄
              </div>

              <h3 className="text-xl font-semibold mt-6">
                Easy Upload
              </h3>

              <p className="text-gray-400 mt-3 leading-relaxed">
                Upload your resume quickly with a clean and simple interface.
              </p>
            </div>

            {/* Card 2 */}
            <div
              className="
                group
                bg-white/[0.04]
                border border-white/10
                rounded-2xl
                p-7
                hover:border-[#D4AF37]/40
                hover:bg-white/[0.06]
                transition-all
                duration-300
              "
            >
              <div
                className="
                  w-14 h-14
                  rounded-xl
                  bg-[#D4AF37]/10
                  border border-[#D4AF37]/20
                  flex items-center justify-center
                  text-2xl
                  group-hover:scale-110
                  transition-transform
                  duration-300
                "
              >
                🔐
              </div>

              <h3 className="text-xl font-semibold mt-6">
                Secure Storage
              </h3>

              <p className="text-gray-400 mt-3 leading-relaxed">
                Keep your resume information organized and safely managed.
              </p>
            </div>

            {/* Card 3 */}
            <div
              className="
                group
                bg-white/[0.04]
                border border-white/10
                rounded-2xl
                p-7
                hover:border-[#D4AF37]/40
                hover:bg-white/[0.06]
                transition-all
                duration-300
              "
            >
              <div
                className="
                  w-14 h-14
                  rounded-xl
                  bg-[#D4AF37]/10
                  border border-[#D4AF37]/20
                  flex items-center justify-center
                  text-2xl
                  group-hover:scale-110
                  transition-transform
                  duration-300
                "
              >
                ⚡
              </div>

              <h3 className="text-xl font-semibold mt-6">
                Quick Access
              </h3>

              <p className="text-gray-400 mt-3 leading-relaxed">
                Access your uploaded resumes whenever you need them.
              </p>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
