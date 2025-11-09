
import React from 'react';

const Hero: React.FC = () => {
  return (
    <header className="text-center">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-500">
        Генератор сценариев
      </h1>
      <p className="mt-4 text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto">
        Превратите свою идею в готовый сценарий для короткометражки. Опишите задумку, и наш ИИ напишет историю за вас.
      </p>
    </header>
  );
};

export default Hero;
