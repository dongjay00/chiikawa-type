import { useState } from 'react';
import { AXIS_INFO } from '../data/axes';
import { QUESTIONS } from '../data/questions';
import type { AnswerScore, Answers } from '../data/scoring';

interface Props {
  onComplete: (answers: Answers) => void;
}

const DOT_LABELS = ['확실히', '대체로', '대체로', '확실히'];
const SCORES: AnswerScore[] = [1, 2, 3, 4];
const DOT_SIZES = [30, 22, 22, 30];
const DOT_HIT = 52;

export default function QuizScreen({ onComplete }: Props) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [selected, setSelected] = useState<AnswerScore | null>(null);
  const [animating, setAnimating] = useState(false);

  const question = QUESTIONS[current];
  const total = QUESTIONS.length;
  const progress = (current / total) * 100;

  function handleSelect(score: AnswerScore) {
    if (animating) return;
    setSelected(score);
    setAnimating(true);
    setTimeout(() => {
      const next = { ...answers, [question.id]: score };
      setAnswers(next);
      if (current + 1 >= total) {
        onComplete(next);
      } else {
        setCurrent((c) => c + 1);
        setSelected(null);
        setAnimating(false);
      }
    }, 380);
  }

  function handleBack() {
    if (current === 0 || animating) return;
    setCurrent((c) => c - 1);
    setSelected(null);
  }

  const leftOn = selected !== null && selected <= 2;
  const rightOn = selected !== null && selected >= 3;

  return (
    <div className="min-h-screen bg-dots flex flex-col items-center justify-center px-5 py-12">
      <div className="w-full max-w-lg space-y-8">
        {/* 진행 바 */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs text-[#9a8d85] font-semibold">
            <span className="px-2.5 py-1 rounded-full bg-white border border-[#f1e4d6]">
              {AXIS_INFO[question.axis].label}
            </span>
            <span>
              {current + 1} / {total}
            </span>
          </div>
          <div className="h-3 bg-white border border-[#f1e4d6] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#f49ac1] rounded-full transition-all duration-500"
              style={{ width: `${Math.max(progress, 3)}%` }}
            />
          </div>
        </div>

        {/* 질문 카드 */}
        <div key={question.id} className="animate-fade-up bg-white rounded-3xl border-2 border-[#f1e4d6] shadow-sm p-6 sm:p-8 space-y-8">
          <p className="font-cute text-[#4a3f3a] text-xl sm:text-2xl leading-relaxed text-center break-keep">
            {question.q}
          </p>

          <div className="space-y-4">
            {/* 양 끝 선택지 */}
            <div className="flex justify-between gap-3">
              <span
                className={`text-sm font-bold leading-snug w-[46%] text-left break-keep transition-colors ${
                  leftOn ? 'text-[#e2649b]' : 'text-[#7a6d66]'
                }`}
              >
                {question.first}
              </span>
              <span
                className={`text-sm font-bold leading-snug w-[46%] text-right break-keep transition-colors ${
                  rightOn ? 'text-[#4f93cf]' : 'text-[#7a6d66]'
                }`}
              >
                {question.second}
              </span>
            </div>

            {/* 도트 */}
            <div className="relative" style={{ height: DOT_HIT }}>
              <div
                className="absolute left-4 right-4 h-1 rounded-full bg-[#f1e4d6] pointer-events-none"
                style={{ top: DOT_HIT / 2 - 2 }}
              />
              <div className="absolute inset-0 flex justify-between items-center">
                {SCORES.map((score, i) => {
                  const isSelected = selected === score;
                  const color = score <= 2 ? '#f49ac1' : '#7ab8e8';
                  const size = DOT_SIZES[i];
                  return (
                    <button
                      key={score}
                      onClick={() => handleSelect(score)}
                      disabled={animating}
                      className="relative z-10 flex items-center justify-center"
                      style={{ width: DOT_HIT, height: DOT_HIT }}
                      aria-label={`${score <= 2 ? question.first : question.second} — ${DOT_LABELS[i]}`}
                    >
                      <div
                        className={`rounded-full border-[3px] transition-all duration-200 ${
                          isSelected ? 'scale-125' : 'hover:scale-110 active:scale-95'
                        }`}
                        style={{
                          width: size,
                          height: size,
                          borderColor: color,
                          backgroundColor: isSelected ? color : 'white',
                          boxShadow: isSelected ? `0 0 0 6px ${color}33` : undefined,
                        }}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-between">
              {DOT_LABELS.map((label, i) => (
                <span
                  key={i}
                  className={`text-xs text-center transition-colors ${
                    selected === SCORES[i] ? 'text-[#4a3f3a] font-bold' : 'text-[#b5aaa0]'
                  }`}
                  style={{ width: DOT_HIT }}
                >
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>

        {current > 0 && (
          <button
            onClick={handleBack}
            className="w-full py-3 text-[#b5aaa0] text-sm hover:text-[#7a6d66] transition-colors"
          >
            ← 이전 문항으로
          </button>
        )}
      </div>
    </div>
  );
}
