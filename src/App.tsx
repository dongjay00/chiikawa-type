import { useMemo, useState } from 'react';
import IntroScreen from './components/IntroScreen';
import NameScreen from './components/NameScreen';
import QuizScreen from './components/QuizScreen';
import ResultScreen from './components/ResultScreen';
import type { Vector } from './data/axes';
import { calcVector, decodeVector, rankCharacters, type Answers } from './data/scoring';

type Phase = 'intro' | 'name' | 'quiz' | 'result';

function parseParams(): { vector: Vector; name: string } | null {
  const params = new URLSearchParams(window.location.search);
  const vector = decodeVector(params.get('s'));
  if (!vector) return null;
  return { vector, name: params.get('name') ?? '' };
}

export default function App() {
  const [initial] = useState(parseParams);
  const [phase, setPhase] = useState<Phase>(initial ? 'result' : 'intro');
  const [name, setName] = useState(initial?.name ?? '');
  const [vector, setVector] = useState<Vector | null>(initial?.vector ?? null);
  const matches = useMemo(() => (vector ? rankCharacters(vector) : null), [vector]);

  function handleComplete(answers: Answers) {
    setVector(calcVector(answers));
    setPhase('result');
    window.scrollTo(0, 0);
  }

  function handleRetry() {
    setVector(null);
    setName('');
    setPhase('intro');
    window.history.replaceState({}, '', window.location.pathname);
    window.scrollTo(0, 0);
  }

  if (phase === 'name') return <NameScreen onNext={(n) => { setName(n); setPhase('quiz'); }} />;
  if (phase === 'quiz') return <QuizScreen onComplete={handleComplete} />;
  if (phase === 'result' && vector && matches) {
    return <ResultScreen matches={matches} vector={vector} name={name} onRetry={handleRetry} />;
  }
  return <IntroScreen onStart={() => setPhase('name')} />;
}
