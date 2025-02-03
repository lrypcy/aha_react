import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0f4ff] to-[#fdf2fe] dark:from-[#0a0a0a] dark:to-[#1a1a1a] p-8 sm:p-12 md:p-16">
      <main className="max-w-6xl mx-auto space-y-16">
        {/* Hero Section */}
        <div className="flex flex-col items-center gap-8 text-center">
          <div className="p-5 bg-white dark:bg-black rounded-full shadow-2xl">
            <Image
              className="dark:invert w-32 h-32 sm:w-40 sm:h-40"
              src="/next.svg"
              alt="Next.js logo"
              width={160}
              height={160}
              priority
            />
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
            aha react
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl">
            Build stunning applications with the power of Next.js 14. Enjoy server components, static & dynamic rendering, and simplified data fetching.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {[
            ['⚡️', 'Instant Server Start', 'Near-instantaneous hot reloading'],
            ['🎨', 'Visual Editing', 'Real-time preview with CMS integration'],
            ['🔒', 'Built-in Security', 'Automatic code splitting and optimization']
          ].map(([icon, title, desc]) => (
            <div key={title} className="p-8 bg-white/50 dark:bg-black/50 backdrop-blur-lg rounded-2xl shadow-lg hover:shadow-xl transition-all">
              <span className="text-4xl mb-4">{icon}</span>
              <h3 className="text-xl font-bold mb-2">{title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{desc}</p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <a
            className="group relative flex items-center justify-center bg-black dark:bg-white text-white dark:text-black px-8 py-4 rounded-full font-semibold overflow-hidden transition-all hover:scale-105"
            href="/docs"
          >
            <span className="relative z-10">Get Started →</span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
          <a
            className="flex items-center justify-center px-8 py-4 border-2 border-black/10 dark:border-white/10 rounded-full font-semibold hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            href="/examples"
          >
            View Examples
          </a>
        </div>

        {/* Footer Links */}
        <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500 dark:text-gray-400">
          {['Documentation', 'Blog', 'GitHub', 'Enterprise'].map((item) => (
            <a
              key={item}
              href={`/${item.toLowerCase()}`}
              className="hover:text-black dark:hover:text-white transition-colors"
            >
              {item}
            </a>
          ))}
        </div>
      </main>
    </div>
  );
}
