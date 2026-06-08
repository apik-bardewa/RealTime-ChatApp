const features = [
  {
    icon: "⚡",
    title: "Blazing Fast",
    desc: "Built with React and Vite for lightning-fast performance."
  },
  {
    icon: "🎨",
    title: "Beautiful UI",
    desc: "Modern interface crafted with Tailwind CSS."
  },
  {
    icon: "🔒",
    title: "Secure Authentication",
    desc: "Reliable and secure user authentication system."
  },
  {
    icon: "📦",
    title: "Modular Architecture",
    desc: "Reusable components for scalable development."
  },
  {
    icon: "🌍",
    title: "Global Access",
    desc: "Connect and chat from anywhere in the world."
  },
  {
    icon: "🤝",
    title: "Open Source",
    desc: "Fully customizable and community-driven."
  }
];

const About = () => {
  return (
    <section
      id="about"
      className="bg-slate-900 py-24 px-6"
    >
      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-14">
          <p className="text-indigo-400 uppercase tracking-widest">
            About Us
          </p>

          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3">
            Why Choose ChatApp?
          </h2>

          <p className="text-slate-400 max-w-2xl mx-auto mt-5">
            ChatApp lets users communicate seamlessly with text,
            images, audio, videos and file sharing in one modern platform.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((item) => (
            <div
              key={item.title}
              className="bg-slate-950 border border-slate-800 p-6 rounded-2xl hover:border-indigo-500 transition"
            >
              <div className="text-4xl mb-4">
                {item.icon}
              </div>

              <h3 className="text-white text-xl font-semibold mb-3">
                {item.title}
              </h3>

              <p className="text-slate-400">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;