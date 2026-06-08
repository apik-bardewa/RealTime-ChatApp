const Footer = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 py-8 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">

        <h2 className="text-xl font-bold text-white">
          ChatApp
        </h2>

        <p className="text-slate-500 text-sm">
          © {new Date().getFullYear()} ChatApp. All Rights Reserved.
        </p>

        <div className="flex gap-6">
          <a href="#" className="text-slate-400 hover:text-white">
            Privacy
          </a>

          <a href="#" className="text-slate-400 hover:text-white">
            Terms
          </a>

          <a href="#" className="text-slate-400 hover:text-white">
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;