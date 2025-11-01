import { BarLoader } from "react-spinners";
import { Suspense } from "react";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black px-5 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-6xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300 cursor-default">
          <span className="inline-block animate-[gradient_3s_ease_infinite] bg-[length:200%_auto] bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(6,182,212,0.3)]">
            Industry Insights
          </span>
        </h1>
      </div>
      <Suspense
        fallback={
          <div className="mt-8 space-y-4">
            <BarLoader 
              className="rounded-full" 
              width="100%" 
              height={4}
              color="#06b6d4" 
            />
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce"></div>
            </div>
          </div>
        }
      >
        <div className="backdrop-blur-sm bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-[0_0_50px_rgba(6,182,212,0.2)]">
          {children}
        </div>
      </Suspense>
    </div>
  );
}