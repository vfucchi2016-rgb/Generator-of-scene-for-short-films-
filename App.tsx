
import React, { useState, useCallback } from 'react';
import { ScriptFormData } from './types';
import { generateScript } from './services/geminiService';
import ScriptForm from './components/ScriptForm';
import ScriptDisplay from './components/ScriptDisplay';
import Loader from './components/Loader';
import Hero from './components/Hero';

const App: React.FC = () => {
  const [formData, setFormData] = useState<ScriptFormData>({
    prompt: '',
    genre: 'Драма',
    characters: '',
    setting: '',
    language: 'Русский',
  });
  const [script, setScript] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateScript = useCallback(async () => {
    if (!formData.prompt.trim() || !formData.characters.trim()) {
      setError('Пожалуйста, заполните поля "Идея" и "Персонажи".');
      return;
    }
    setIsLoading(true);
    setError(null);
    setScript('');

    try {
      const generatedScript = await generateScript(formData);
      setScript(generatedScript);
    } catch (err) {
      console.error(err);
      setError('Не удалось сгенерировать сценарий. Пожалуйста, проверьте API ключ и попробуйте снова.');
    } finally {
      setIsLoading(false);
    }
  }, [formData]);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 flex flex-col items-center p-4 sm:p-6 md:p-8">
      <main className="w-full max-w-4xl mx-auto">
        <Hero />
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-2xl shadow-cyan-500/10 p-6 md:p-8 mt-8 border border-slate-700">
          <ScriptForm
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleGenerateScript}
            isLoading={isLoading}
          />
        </div>
        
        {error && (
            <div className="mt-8 bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg text-center" role="alert">
              <p>{error}</p>
            </div>
          )}

        <div className="mt-8">
          {isLoading && <Loader />}
          {script && !isLoading && <ScriptDisplay script={script} />}
        </div>
      </main>
      <footer className="w-full max-w-4xl mx-auto text-center text-slate-500 py-6 mt-8">
        <p>&copy; {new Date().getFullYear()} AI Script Generator. Powered by Gemini.</p>
      </footer>
    </div>
  );
};

export default App;
