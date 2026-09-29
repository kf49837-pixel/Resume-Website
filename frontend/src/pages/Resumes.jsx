import { useEffect, useState } from "react";

const API_BASE_URL = "/api";

function Resumes() {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  // ==========================================
  // GET ALL RESUMES
  // ==========================================

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API_BASE_URL}/resumes`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch resumes");
      }

      setResumes(data.resumes || []);
    } catch (error) {
      console.error("Fetch resumes error:", error);
      setError("Unable to load resumes.");
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // EDIT RESUME
  // ==========================================

  const editResume = (id) => {
    window.location.href = `/upload?edit=${id}`;
  };

  // ==========================================
  // DELETE RESUME
  // ==========================================

  const deleteResume = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this resume?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/resumes/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete resume");
      }

      setResumes((prevResumes) =>
        prevResumes.filter((resume) => resume._id !== id)
      );

      alert("Resume deleted successfully!");
    } catch (error) {
      console.error("Delete resume error:", error);
      alert(error.message || "Failed to delete resume");
    }
  };

  // ==========================================
  // FORMAT FILE SIZE
  // ==========================================

  const formatFileSize = (bytes) => {
    if (!bytes) return "0 KB";

    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }

    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  // ==========================================
  // GET FILE TYPE
  // ==========================================

  const getFileType = (fileName) => {
    if (!fileName) return "FILE";

    return fileName.split(".").pop().toUpperCase();
  };

  // ==========================================
  // FORMAT DATE
  // ==========================================

  const formatDate = (date) => {
    if (!date) return "Unknown";

    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // ==========================================
  // FILE URL
  // ==========================================

  const getFileUrl = (filePath) => {
    if (!filePath) return "#";

    const cleanPath = filePath.replace(/\\/g, "/");

    return `/${cleanPath}`;
  };

  // ==========================================
  // SEARCH
  // ==========================================

  const filteredResumes = resumes.filter((resume) =>
    `${resume.name || ""} ${resume.email || ""} ${resume.fileName || ""}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <section className="min-h-screen bg-black text-white px-6 py-20">
      <div className="max-w-7xl mx-auto">

        {/* ================= HEADER ================= */}

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">

          <div>
            <p className="text-[#D4AF37] uppercase tracking-[0.25em] text-sm font-semibold">
              Resume Library
            </p>

            <h1 className="text-4xl md:text-5xl font-bold mt-3">
              Uploaded Resumes
            </h1>

            <p className="text-gray-400 mt-3">
              All resumes uploaded by users are stored here.
            </p>
          </div>

          {/* ================= SEARCH ================= */}

          <div className="w-full md:w-80">
            <input
              type="text"
              placeholder="Search name, email or file..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="
                w-full
                bg-white/[0.04]
                border border-white/10
                rounded-xl
                px-4 py-3
                text-white
                placeholder:text-gray-600
                outline-none
                focus:border-[#D4AF37]
                transition
              "
            />
          </div>
        </div>

        {/* ================= STATS ================= */}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">

          {/* Total Resumes */}

          <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-6">
            <p className="text-gray-500 text-sm">
              Total Resumes
            </p>

            <p className="text-3xl font-bold mt-2 text-[#D4AF37]">
              {resumes.length}
            </p>
          </div>

          {/* Search Results */}

          <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-6">
            <p className="text-gray-500 text-sm">
              Search Results
            </p>

            <p className="text-3xl font-bold mt-2">
              {filteredResumes.length}
            </p>
          </div>

          {/* Platform */}

          <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-6">
            <p className="text-gray-500 text-sm">
              Platform
            </p>

            <p className="text-3xl font-bold mt-2">
              ResumePro
            </p>
          </div>
        </div>

        {/* ================= LOADING ================= */}

        {loading && (
          <div className="text-center py-20">
            <p className="text-[#D4AF37]">
              Loading resumes...
            </p>
          </div>
        )}

        {/* ================= ERROR ================= */}

        {!loading && error && (
          <div className="text-center py-20">
            <p className="text-red-400">
              {error}
            </p>

            <button
              onClick={fetchResumes}
              className="
                mt-5
                border border-[#D4AF37]/30
                text-[#D4AF37]
                px-5 py-2.5
                rounded-xl
                hover:bg-[#D4AF37]/10
                transition
              "
            >
              Try Again
            </button>
          </div>
        )}

        {/* ================= EMPTY ================= */}

        {!loading && !error && resumes.length === 0 && (
          <div className="text-center py-20 border border-white/10 rounded-3xl bg-white/[0.03]">

            <div className="text-5xl mb-5">
              📄
            </div>

            <h2 className="text-2xl font-semibold">
              No Resumes Yet
            </h2>

            <p className="text-gray-500 mt-2">
              Uploaded resumes will appear here.
            </p>
          </div>
        )}

        {/* ================= NO SEARCH RESULT ================= */}

        {!loading &&
          !error &&
          resumes.length > 0 &&
          filteredResumes.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500">
                No matching resumes found.
              </p>
            </div>
          )}

        {/* ================= RESUME CARDS ================= */}

        {!loading &&
          !error &&
          filteredResumes.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

              {filteredResumes.map((resume) => {
                const fileUrl = getFileUrl(resume.filePath);

                return (
                  <div
                    key={resume._id}
                    className="
                      group
                      bg-white/[0.04]
                      backdrop-blur-xl
                      border border-white/10
                      rounded-2xl
                      p-6
                      hover:border-[#D4AF37]/40
                      hover:bg-white/[0.06]
                      transition-all
                      duration-300
                    "
                  >

                    {/* ================= USER INFO ================= */}

                    <div className="flex items-start gap-4">

                      <div
                        className="
                          w-14 h-14
                          shrink-0
                          rounded-xl
                          bg-[#D4AF37]/10
                          border border-[#D4AF37]/20
                          flex items-center justify-center
                          text-2xl
                        "
                      >
                        📄
                      </div>

                      <div className="min-w-0">

                        <h3 className="text-lg font-semibold truncate">
                          {resume.name}
                        </h3>

                        <p className="text-gray-500 text-sm truncate mt-1">
                          {resume.email}
                        </p>

                      </div>
                    </div>

                    {/* ================= DIVIDER ================= */}

                    <div className="border-t border-white/10 my-5" />

                    {/* ================= FILE DETAILS ================= */}

                    <div className="space-y-3">

                      <div className="flex justify-between gap-4">

                        <span className="text-gray-500 text-sm">
                          File
                        </span>

                        <span className="text-gray-300 text-sm truncate">
                          {resume.fileName}
                        </span>

                      </div>

                      <div className="flex justify-between">

                        <span className="text-gray-500 text-sm">
                          Type
                        </span>

                        <span className="text-[#D4AF37] text-sm font-medium">
                          {getFileType(resume.fileName)}
                        </span>

                      </div>

                      <div className="flex justify-between">

                        <span className="text-gray-500 text-sm">
                          Size
                        </span>

                        <span className="text-gray-300 text-sm">
                          {formatFileSize(resume.fileSize)}
                        </span>

                      </div>

                      <div className="flex justify-between">

                        <span className="text-gray-500 text-sm">
                          Uploaded
                        </span>

                        <span className="text-gray-300 text-sm">
                          {formatDate(resume.createdAt)}
                        </span>

                      </div>

                    </div>

                    {/* ================= VIEW + DOWNLOAD ================= */}

                    <div className="grid grid-cols-2 gap-3 mt-6">

                      <a
                        href={fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                          text-center
                          bg-[#D4AF37]
                          text-black
                          font-semibold
                          py-2.5
                          rounded-xl
                          hover:bg-[#e5c04b]
                          transition
                        "
                      >
                        View PDF
                      </a>

                      <a
                        href={fileUrl}
                        download={resume.fileName}
                        className="
                          text-center
                          border border-white/10
                          text-white
                          font-semibold
                          py-2.5
                          rounded-xl
                          hover:border-[#D4AF37]
                          hover:text-[#D4AF37]
                          transition
                        "
                      >
                        Download
                      </a>

                    </div>

                    {/* ================= EDIT ================= */}

                    <button
                      onClick={() => editResume(resume._id)}
                      className="
                        w-full
                        mt-3
                        border border-[#D4AF37]/30
                        text-[#D4AF37]
                        font-semibold
                        py-2.5
                        rounded-xl
                        hover:bg-[#D4AF37]/10
                        hover:border-[#D4AF37]
                        transition
                      "
                    >
                      Edit Resume
                    </button>

                    {/* ================= DELETE ================= */}

                    <button
                      onClick={() => deleteResume(resume._id)}
                      className="
                        w-full
                        mt-3
                        border border-red-500/30
                        text-red-400
                        font-semibold
                        py-2.5
                        rounded-xl
                        hover:bg-red-500/10
                        hover:border-red-500
                        transition
                      "
                    >
                      Delete Resume
                    </button>

                  </div>
                );
              })}

            </div>
          )}

      </div>
    </section>
  );
}

export default Resumes;

