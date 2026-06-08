const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-slate-950 text-center overflow-hidden px-6">

      {/* Background Glow */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-600/20 rounded-full blur-3xl"></div>

      <div className="absolute bottom-10 right-10 w-72 h-72 bg-violet-600/20 rounded-full blur-3xl"></div>

      <div className="max-w-4xl z-10">

        <span className="inline-block px-4 py-2 rounded-full border border-slate-700 text-slate-400 text-sm mb-6">
          🚀 NOW LIVE • VERSION 2.0
        </span>

        <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
          Build Something
          <span className="block bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
            Extraordinary
          </span>
        </h1>

        <p className="text-slate-400 text-lg md:text-xl mt-6 max-w-2xl mx-auto">
          A modern platform that empowers creators, developers and innovators
          to build beautiful real-time chat experiences.
        </p>

        <div className="flex justify-center gap-4 mt-10 flex-wrap">
          <a
            href="/signup"
            className="px-8 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 text-white"
          >
            Get Started
          </a>

          <a
            href="#about"
            className="px-8 py-3 rounded-xl border border-slate-700 text-slate-300"
          >
            Learn More
          </a>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-12 mt-16 border-t border-slate-800 pt-8">
          {[
            ["12K+", "Users"],
            ["99.9%", "Uptime"],
            ["4.9★", "Rating"],
          ].map(([value, label]) => (
            <div key={label}>
              <h3 className="text-3xl font-bold text-indigo-400">
                {value}
              </h3>
              <p className="text-slate-500 text-sm">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;