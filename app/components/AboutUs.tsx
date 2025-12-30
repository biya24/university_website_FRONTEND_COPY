export default function AboutUsSection() {
    return (
      <section className="w-full py-10 bg-[#f8f8f8] relative overflow-hidden">
  
        {/* RIGHT SIDE GRADIENT */}
        <div className="absolute right-0 top-0 w-[60%] h-full bg-gradient-to-br from-white via-[#e7f0ff] to-[#f0e6ff] opacity-60" />
  
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          
          {/* TITLE BLOCK */}
          <p className="text-gray-500 text-lg mb-4">About Us</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight max-w-xl">
            Empowering Future
            <br /> Leaders Through World-
            <br /> Class Education
          </h2>
  
          {/* STATS CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
  
            {/* CARD 1 — DARK */}
            <div className="bg-black text-white p-4 rounded-2xl shadow-lg">
              <h3 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
                10K+
              </h3>
  
              <div className="w-full h-[2px] mt-4 bg-gradient-to-r from-blue-400 to-purple-400" />
  
              <p className="mt-4 text-sm font-semibold tracking-wide">
                ALUMNI
              </p>
            </div>
  
            {/* CARD 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-md">
              <h3 className="text-4xl md:text-5xl font-bold text-[#6b174e]">
                10+
              </h3>
  
              <div className="w-full h-[2px] mt-4 bg-gradient-to-r from-blue-400 to-purple-400" />
  
              <p className="mt-4 text-sm font-semibold tracking-wide text-gray-600">
                PROGRAMMES
              </p>
            </div>
  
            {/* CARD 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-md">
              <h3 className="text-4xl md:text-5xl font-bold text-[#6b174e]">
                50%
              </h3>
  
              <div className="w-full h-[2px] mt-4 bg-gradient-to-r from-blue-400 to-purple-400" />
  
              <p className="mt-4 text-sm font-semibold tracking-wide text-gray-600">
                PLACEMENT RATE
              </p>
            </div>
  
            {/* CARD 4 */}
            <div className="bg-white p-8 rounded-2xl shadow-md">
              <h3 className="text-4xl md:text-5xl font-bold text-[#6b174e]">
                5+
              </h3>
  
              <div className="w-full h-[2px] mt-4 bg-gradient-to-r from-blue-400 to-purple-400" />
  
              <p className="mt-4 text-sm font-semibold tracking-wide text-gray-600">
                CAMPUSES
              </p>
            </div>
  
          </div>
        </div>
      </section>
    );
  }
  