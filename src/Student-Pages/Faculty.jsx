import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppContext } from "../AppContext/AppContext";
import { assets } from "../assets/assets";
import { FiLoader } from "react-icons/fi";

const slugify = (str) =>
  str
    ?.toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-&]/g, "");

const Faculty = () => {
  const { teacher, navigate } = useAppContext();
  const { dept } = useParams();

  const [hoverPos, setHoverPos] = useState({ x: 0, y: 0 });
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);

    const baseFiltered = dept
      ? teacher.filter((t) => slugify(t.department) === dept.toLowerCase())
      : teacher;

    const results = searchQuery
      ? baseFiltered.filter((t) =>
          (t.username || t.name)
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
      : baseFiltered;

    setFilteredResults(results);

    return () => clearTimeout(timer);
  }, [searchQuery, teacher, dept]);

  const handleMouseMove = (e, index) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setHoveredIndex(index);
    setHoverPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseLeave = () => setHoveredIndex(null);

  return (
    <div className="pb-20 pt-25 md:pt-40 w-full bg-gradient-to-r from-blue-500/10 via-teal-500/10 to-green-500/10 mx-auto px-4 sm:px-6 lg:px-8 animate-fadeIn">
      {/* Header Section */}
      <header className="flex md:px-25 flex-col md:flex-row justify-between w-auto gap-6 mb-12 animate-slideDown">
        {/* Top section (Back + Department Title) */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div className="flex items-center gap-3 md:gap-6">
            <div className="flex text-[1vw] items-center gap-2 cursor-pointer hover:-translate-x-1 transition-transform duration-300">
              <button
                onClick={() => navigate(-1)}
                className="font-medium flex items-center justify-center gap-2 p-2 rounded-xl hover:bg-gray-100 transition-all duration-300"
                aria-label="Go to all faculty"
              >
                <img
                  src={assets.black_arrow_icon}
                  alt="Arrow icon"
                  className="w-5 opacity-80 rotate-180 hover:animate-pulse"
                />
                <span className="text-gray-700 text-[4vw] sm:text-base">Back</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <h1 className="font-bold text-2xl md:text-3xl bg-[#06d6a0] bg-clip-text text-transparent capitalize">
                {dept ? dept.replace(/-/g, " ") : "All Departments"}
              </h1>
            </div>
          </div>
        </div>

        {/* Bottom section (Search + Faculty Button) */}
        <div className="flex flex-row sm:flex-row items-center justify-center gap-7 md:gap-5 w-full md:w-auto animate-slideDown delay-100">
          <div className="flex items-center border border-gray-200 rounded-xl px-4 py-2 bg-white shadow-sm hover:shadow-md transition-all duration-200 w-full md:w-80 hover:scale-[1.02]">
            <input
              type="search"
              placeholder="Search faculty..."
              onChange={(e) => setSearchQuery(e.target.value)}
              className="py-1 w-full bg-transparent outline-none placeholder-gray-400 text-gray-700"
              aria-label="Search faculty by name"
            />
            <img
              src={assets.search_icon}
              alt="Search icon"
              className="w-4 h-4 ml-2 opacity-70"
            />
          </div>

          {dept && (
            <button
              onClick={() => navigate("/faculty")}
              className="font-medium pr-5 flex items-center w-1/4 justify-center gap-2 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-all duration-300 whitespace-nowrap hover:scale-[1.05] active:scale-95 sm:w-auto"
              aria-label="Go to all faculty"
            >
              View All Faculty
              <img
                src={assets.black_arrow_icon}
                alt="Arrow icon"
                className="w-4 opacity-80"
              />
            </button>
          )}
        </div>
      </header>

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="flex flex-col items-center">
            <FiLoader className="animate-spin text-3xl text-blue-600 mb-2" />
            <p className="text-gray-600">Loading faculty members...</p>
          </div>
        </div>
      ) : filteredResults.length > 0 ? (
        <div className="grid md:px-25 grid-cols-1 transform -pt-2 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredResults.map((item, index) => (
            <article
              key={item.id || item.username}
              onMouseMove={(e) => handleMouseMove(e, index)}
              onMouseLeave={handleMouseLeave}
              className="relative flex flex-col cursor-pointer bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden isolate hover:-translate-y-1 animate-fadeInUp"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {hoveredIndex === index && (
                <div
                  className="pointer-events-none absolute w-64 h-64 rounded-full blur-xl opacity-40 transition-all duration-50"
                  style={{
                    top: hoverPos.y - 128,
                    left: hoverPos.x - 128,
                    background: "radial-gradient(circle, #818cf8 0%, #c084fc 50%, #f472b6 100%)",
                    zIndex: 0,
                  }}
                />
              )}

              <div className="flex items-start gap-6 z-10">
                <div className="flex-shrink-0">
                  <div className="relative hover:rotate-1 hover:scale-105 transition-transform duration-300">
                    <img
                      src={item.image}
                      alt={`${item.username}'s portrait`}
                      className="rounded-2xl h-24 w-24 object-cover border-4 border-white shadow-lg"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1 shadow-md hover:rotate-12 transition-transform duration-300">
                      <div className="bg-indigo-500 rounded-full p-1.5">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex-1 space-y-2">
                  <div>
                    <h2 className="text-lg font-bold text-gray-800">
                      {item.username}
                    </h2>
                    <div className="flex flex-wrap gap-2 mt-1">
                      <span className="text-xs bg-indigo-50 text-indigo-600 px-2.5 py-1 rounded-full font-medium">
                        {item.designation}
                      </span>
                      <span className="text-xs bg-purple-50 text-purple-600 px-2.5 py-1 rounded-full font-medium">
                        {item.subject}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {!dept && item.department && (
                      <span className="text-xs bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full">
                        {item.department.replace(/-/g, " ")}
                      </span>
                    )}
                    <span className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">
                      {item.experience} yrs exp
                    </span>
                    <span className="text-xs bg-pink-50 text-pink-600 px-2.5 py-1 rounded-full">
                      {item.gender || "N/A"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 z-10 flex items-center justify-center hover:scale-[1.03] transition-transform duration-300">
                <button
                  aria-label={`Book appointment with ${item.username}`}
                  onClick={() => navigate(`/faculty/${item.department}/${item.email}`)}
                  className="w-60 bg-[#06d6a0] text-white font-medium py-2.5 px-5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Book Appointment
                </button>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="flex flex-col justify-center pt-20 items-center min-h-[50vh] bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-inner max-w-2xl mx-auto border border-gray-100 animate-fadeIn">
          <div className="w-16 h-16 text-gray-300 mb-6 animate-bounceSlow">
            <svg
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-700 mb-2 text-center">
            No Faculty Members Found
          </h3>
          <p className="text-gray-500 text-center max-w-md">
            {searchQuery ? (
              <>No results found for <span className="font-medium text-indigo-600">"{searchQuery}"</span>. Try a different search term.</>
            ) : (
              <>There are currently no faculty members listed for this department.</>
            )}
          </p>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="mt-6 px-6 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 font-medium transition-colors duration-300 hover:scale-[1.05] active:scale-95"
            >
              Clear Search
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Faculty;