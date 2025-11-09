
import React from 'react';
import { ScriptFormData } from '../types';

interface ScriptFormProps {
  formData: ScriptFormData;
  setFormData: React.Dispatch<React.SetStateAction<ScriptFormData>>;
  onSubmit: () => void;
  isLoading: boolean;
}

const ScriptForm: React.FC<ScriptFormProps> = ({ formData, setFormData, onSubmit, isLoading }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const genres = ['Драма', 'Комедия', 'Научная фантастика', 'Хоррор', 'Триллер', 'Фэнтези', 'Детектив'];
  const languages = ['Русский', 'Italiano', 'English', 'Español', 'Français', 'Deutsch'];

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="prompt" className="block text-sm font-medium text-cyan-400 mb-2">
            Идея / Логлайн
          </label>
          <textarea
            id="prompt"
            name="prompt"
            rows={4}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-slate-200 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition duration-200 placeholder-slate-500"
            placeholder="Например: Одинокий астронавт находит таинственный артефакт на Марсе..."
            value={formData.prompt}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="characters" className="block text-sm font-medium text-cyan-400 mb-2">
            Персонажи
          </label>
          <textarea
            id="characters"
            name="characters"
            rows={4}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-slate-200 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition duration-200 placeholder-slate-500"
            placeholder="Например: АЛЕКС (30), уставший от жизни циник. ЕВА (ИИ), оптимистичный голос корабля."
            value={formData.characters}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="genre" className="block text-sm font-medium text-cyan-400 mb-2">
            Жанр
          </label>
          <select
            id="genre"
            name="genre"
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-slate-200 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition duration-200"
            value={formData.genre}
            onChange={handleChange}
          >
            {genres.map(g => <option key={g} value={g}>{g}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="language" className="block text-sm font-medium text-cyan-400 mb-2">
            Язык
          </label>
          <select
            id="language"
            name="language"
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-slate-200 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition duration-200"
            value={formData.language}
            onChange={handleChange}
          >
            {languages.map(lang => <option key={lang} value={lang}>{lang}</option>)}
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="setting" className="block text-sm font-medium text-cyan-400 mb-2">
          Место действия
        </label>
        <input
          type="text"
          id="setting"
          name="setting"
          className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-slate-200 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition duration-200 placeholder-slate-500"
          placeholder="Например: Кабина космического корабля, далекое будущее."
          value={formData.setting}
          onChange={handleChange}
        />
      </div>
      <div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center items-center bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:scale-100"
        >
          {isLoading ? 'Генерация...' : 'Создать сценарий'}
        </button>
      </div>
    </form>
  );
};

export default ScriptForm;
