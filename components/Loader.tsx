
import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center bg-slate-800/50 rounded-lg">
      <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-4 text-lg text-slate-300">ИИ пишет вашу историю... Это может занять несколько секунд.</p>
    </div>
  );
};

export default Loader;
