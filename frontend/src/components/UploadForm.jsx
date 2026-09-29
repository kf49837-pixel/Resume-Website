import { useEffect, useState } from "react";

const API_BASE_URL = "/api";

function UploadForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [resume, setResume] = useState(null);
  const [existingFile, setExistingFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);

  // Check if Edit mode is active
  const editId = new URLSearchParams(window.location.search).get("edit");
  const isEditMode = Boolean(editId);

  // File size formatter
  const formatFileSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;

    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }

    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  // Load existing resume when Edit mode is active
  useEffect(() => {
    if (!editId) return;

    const fetchResume = async () => {
      try {
        setPageLoading(true);

        const response = await fetch(
          `${API_BASE_URL}/resumes/${editId}`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load resume");
        }

        setName(data.resume.name);
        setEmail(data.resume.email);
        setExistingFile(data.resume);

      } catch (error) {
        console.error("Fetch Resume Error:", error);
        alert(error.message || "Failed to load resume");

      } finally {
        setPageLoading(false);
      }
    };

    fetchResume();
  }, [editId]);

  // File select
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) return;

    setResume(selectedFile);
  };

  // Remove selected new file
  const removeFile = () => {
    setResume(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email) {
      alert("Please fill in name and email.");
      return;
    }

    // New upload requires a file
    if (!isEditMode && !resume) {
      alert("Please select your resume file.");
      return;
    }

    const formData = new FormData();

    formData.append("name", name);
    formData.append("email", email);

    // Add file only if selected
    if (resume) {
      formData.append("image", resume);
    }

    try {
      setLoading(true);

      const url = isEditMode
        ? `${API_BASE_URL}/resumes/${editId}`
        : `${API_BASE_URL}/upload`;

      const response = await fetch(url, {
        method: isEditMode ? "PUT" : "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Request failed");
      }

      console.log("Response:", data);

      if (isEditMode) {
        alert("Resume updated successfully!");

        // Go back to resumes page
        window.location.href = "/resumes";
      } else {
        alert("Resume uploaded successfully!");

        setName("");
        setEmail("");
        setResume(null);
      }

    } catch (error) {
      console.error("Resume Error:", error);
      alert(error.message || "Something went wrong.");

    } finally {
      setLoading(false);
    }
  };

  // Loading existing resume
  if (pageLoading) {
    return (
      <section className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-[#D4AF37] text-lg">
          Loading resume...
        </p>
      </section>
    );
  }

  return (
    <section className="relative bg-black text-white py-24 px-6 overflow-hidden">

      {/* Gold Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#D4AF37]/10 blur-[130px] rounded-full" />

      <div className="relative max-w-3xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-10">

          <p className="text-[#D4AF37] uppercase tracking-[0.25em] text-sm font-semibold">
            {isEditMode ? "Edit Resume" : "Get Started"}
          </p>

          <h2 className="text-4xl md:text-5xl font-bold mt-3">
            {isEditMode ? "Update Your Resume" : "Upload Your Resume"}
          </h2>

          <p className="text-gray-400 mt-4 max-w-xl mx-auto">
            {isEditMode
              ? "Update your professional details or replace your resume file."
              : "Add your professional details and upload your resume securely."}
          </p>

        </div>

        {/* Form Card */}
        <div
          className="
            bg-white/[0.04]
            backdrop-blur-xl
            border border-white/10
            rounded-3xl
            p-6 md:p-10
            shadow-[0_0_50px_rgba(0,0,0,0.5)]
          "
        >

          <form onSubmit={handleSubmit} className="space-y-7">

            {/* Name */}
            <div>

              <label className="block text-sm font-medium text-gray-300 mb-2">
                Full Name
              </label>

              <input
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="
                  w-full
                  bg-black/50
                  border border-white/10
                  text-white
                  placeholder:text-gray-600
                  rounded-xl
                  px-4 py-3.5
                  outline-none
                  focus:border-[#D4AF37]
                  focus:ring-1
                  focus:ring-[#D4AF37]
                  transition
                "
              />

            </div>

            {/* Email */}
            <div>

              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="
                  w-full
                  bg-black/50
                  border border-white/10
                  text-white
                  placeholder:text-gray-600
                  rounded-xl
                  px-4 py-3.5
                  outline-none
                  focus:border-[#D4AF37]
                  focus:ring-1
                  focus:ring-[#D4AF37]
                  transition
                "
              />

            </div>

            {/* Resume */}
            <div>

              <label className="block text-sm font-medium text-gray-300 mb-2">
                Resume File
              </label>

              {/* EDIT MODE - Existing file */}
              {isEditMode && existingFile && !resume && (

                <div
                  className="
                    bg-black/50
                    border border-[#D4AF37]/30
                    rounded-2xl
                    p-5
                  "
                >

                  <p className="text-gray-400 text-sm mb-2">
                    Current Resume
                  </p>

                  <p className="text-white font-semibold truncate">
                    {existingFile.fileName}
                  </p>

                  <div className="flex flex-wrap gap-3 mt-2">

                    <span className="text-[#D4AF37] text-sm">
                      {existingFile.fileName
                        .split(".")
                        .pop()
                        .toUpperCase()}
                    </span>

                    <span className="text-gray-500 text-sm">
                      {formatFileSize(existingFile.fileSize)}
                    </span>

                  </div>

                  <label
                    className="
                      block
                      text-center
                      mt-5
                      border
                      border-white/10
                      bg-white/[0.04]
                      text-gray-300
                      py-2.5
                      rounded-lg
                      cursor-pointer
                      hover:border-[#D4AF37]/50
                      hover:text-[#D4AF37]
                      transition
                    "
                  >
                    Replace Resume File

                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="hidden"
                    />

                  </label>

                </div>
              )}

              {/* NEW UPLOAD MODE */}
              {!isEditMode && !resume && (

                <label
                  className="
                    group
                    block
                    border border-dashed
                    border-[#D4AF37]/30
                    bg-black/40
                    rounded-2xl
                    p-10
                    text-center
                    cursor-pointer
                    hover:border-[#D4AF37]
                    hover:bg-[#D4AF37]/5
                    transition-all
                    duration-300
                  "
                >

                  <div
                    className="
                      mx-auto
                      w-16 h-16
                      rounded-2xl
                      flex items-center justify-center
                      bg-[#D4AF37]/10
                      border border-[#D4AF37]/20
                      text-3xl
                    "
                  >
                    📄
                  </div>

                  <p className="mt-5 text-white font-medium">
                    Click to select your resume
                  </p>

                  <p className="text-gray-500 text-sm mt-2">
                    PDF, DOC or DOCX
                  </p>

                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="hidden"
                  />

                </label>
              )}

              {/* Selected New File */}
              {resume && (

                <div
                  className="
                    bg-black/50
                    border border-[#D4AF37]/30
                    rounded-2xl
                    p-5
                  "
                >

                  <div className="flex items-center gap-4">

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

                    <div className="min-w-0 flex-1">

                      <p className="text-white font-semibold truncate">
                        {resume.name}
                      </p>

                      <div className="flex flex-wrap gap-3 mt-1">

                        <span className="text-[#D4AF37] text-sm">
                          {resume.name.split(".").pop().toUpperCase()}
                        </span>

                        <span className="text-gray-500 text-sm">
                          {formatFileSize(resume.size)}
                        </span>

                      </div>

                    </div>

                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 mt-5">

                    <label
                      className="
                        flex-1
                        text-center
                        border
                        border-white/10
                        bg-white/[0.04]
                        text-gray-300
                        py-2.5
                        rounded-lg
                        cursor-pointer
                        hover:border-[#D4AF37]/50
                        hover:text-[#D4AF37]
                        transition
                      "
                    >
                      Change File

                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        className="hidden"
                      />

                    </label>

                    <button
                      type="button"
                      onClick={removeFile}
                      className="
                        flex-1
                        border
                        border-red-500/20
                        bg-red-500/5
                        text-red-400
                        py-2.5
                        rounded-lg
                        hover:bg-red-500/10
                        transition
                      "
                    >
                      Remove File
                    </button>

                  </div>

                </div>
              )}

            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="
                w-full
                bg-[#D4AF37]
                text-black
                font-bold
                py-4
                rounded-xl
                hover:bg-[#E8C766]
                shadow-[0_0_25px_rgba(212,175,55,0.15)]
                hover:shadow-[0_0_35px_rgba(212,175,55,0.35)]
                transition-all
                duration-300
                disabled:opacity-50
                disabled:cursor-not-allowed
              "
            >
              {loading
                ? isEditMode
                  ? "Updating..."
                  : "Uploading..."
                : isEditMode
                ? "Update Resume"
                : "Upload Resume"}
            </button>

          </form>

        </div>

      </div>

    </section>
  );
}

export default UploadForm;
