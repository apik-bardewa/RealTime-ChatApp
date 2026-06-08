const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/90 backdrop-blur-lg border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">

        {/* Logo */}
        <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
          ChatApp
        </h1>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8 text-sm">
          <a href="/" className="text-slate-300 hover:text-white">
            Home
          </a>

          <a href="#about" className="text-slate-300 hover:text-white">
            About
          </a>

          <a
            href="/signup"
            className="text-slate-300 hover:text-white"
          >
            Sign Up
          </a>

          <a
            href="/signin"
            className="px-5 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-violet-500 text-white hover:opacity-90"
          >
            Sign In
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;