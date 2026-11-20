import { useState } from 'react';

interface Props {
  onNext: (name: string) => void;
}

export default function NameScreen({ onNext }: Props) {
  const [name, setName] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (name.trim()) onNext(name.trim());
  }

  return (
    <div className="min-h-screen bg-dots flex flex-col items-center justify-center px-5">
      <div className="max-w-sm w-full space-y-8">
        <div className="text-center space-y-2">
          <p className="text-5xl animate-wobble inline-block">🍙</p>
          <h2 className="font-cute text-3xl text-[#4a3f3a]">이름을 알려주세요</h2>
          <p className="text-[#9a8d85] text-sm leading-relaxed">
            결과 카드와 공유 링크에 이름이 들어가요
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="이름 입력"
            maxLength={10}
            autoFocus
            className="w-full bg-white border-2 border-[#f1e4d6] rounded-3xl px-6 py-4 text-[#4a3f3a] text-center text-lg placeholder-[#c9bdb4] focus:outline-none focus:border-[#f49ac1] transition-colors"
          />
          <button
            type="submit"
            disabled={!name.trim()}
            className="font-cute w-full py-4 rounded-3xl text-xl text-white bg-[#f49ac1] shadow-[0_4px_0_#d97aa3] transition-all disabled:opacity-40 disabled:cursor-not-allowed active:translate-y-1 active:shadow-none"
          >
            시작하기
          </button>
        </form>

        <button
          onClick={() => onNext('')}
          className="w-full py-3 text-[#b5aaa0] text-sm hover:text-[#7a6d66] transition-colors"
        >
          이름 없이 시작하기
        </button>
      </div>
    </div>
  );
}
