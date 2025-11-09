
import React from 'react';

interface ScriptDisplayProps {
  script: string;
}

const ScriptDisplay: React.FC<ScriptDisplayProps> = ({ script }) => {
  const lines = script.split('\n');

  const formatLine = (line: string, index: number) => {
    const trimmedLine = line.trim();
    const prevLine = index > 0 ? lines[index - 1].trim() : '';
    
    // Scene Headings
    if (trimmedLine.startsWith('ИНТ.') || trimmedLine.startsWith('НАТ.') || trimmedLine.startsWith('EXT.') || trimmedLine.startsWith('INT.')) {
      return <p key={index} className="font-bold uppercase bg-slate-800 p-2 my-4 rounded">{trimmedLine}</p>;
    }

    // Character Name
    if (
      trimmedLine.length > 0 &&
      !trimmedLine.includes('(') &&
      !trimmedLine.includes(')') &&
      trimmedLine === trimmedLine.toUpperCase() &&
      isNaN(parseInt(trimmedLine))
    ) {
      return <p key={index} className="uppercase font-semibold text-center mt-4 mb-1">{trimmedLine}</p>;
    }
    
    // Parenthetical
    if (trimmedLine.startsWith('(') && trimmedLine.endsWith(')')) {
      return <p key={index} className="text-slate-400 italic text-center mb-1">{trimmedLine}</p>;
    }

    // Dialogue (assuming it follows a character name)
    const prevLineIsChar = prevLine.length > 0 && !prevLine.includes('(') && !prevLine.includes(')') && prevLine === prevLine.toUpperCase() && isNaN(parseInt(prevLine));
    if(prevLineIsChar) {
        return <p key={index} className="px-8 md:px-24 mb-4">{trimmedLine}</p>;
    }

    // Action
    return <p key={index} className="text-slate-300 mb-4">{line}</p>;
  };

  return (
    <div className="bg-slate-900/50 border border-slate-700 rounded-2xl p-6 md:p-8 mt-8 shadow-inner">
      <h2 className="text-2xl font-bold text-cyan-400 mb-6 border-b border-slate-700 pb-3">Ваш сценарий</h2>
      <div className="font-mono text-base leading-relaxed whitespace-pre-wrap">
        {lines.map(formatLine)}
      </div>
    </div>
  );
};

export default ScriptDisplay;
