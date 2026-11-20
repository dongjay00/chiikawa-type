import { CHARACTER_LIST } from '../data/characters';
import Avatar from './Avatar';

interface Props {
  onStart: () => void;
}

export default function IntroScreen({ onStart }: Props) {
  const regulars = CHARACTER_LIST.filter((c) => !c.hidden);

  return (
    <div className="min-h-screen bg-dots flex flex-col items-center justify-center px-5 py-12 text-center">
      <div className="max-w-md w-full space-y-8">
        <div className="space-y-3">
          <p className="text-[#c98aa3] text-sm font-semibold tracking-widest">먼작귀 유형 테스트</p>
          <h1 className="font-cute text-5xl text-[#4a3f3a] leading-tight">
            나는 어떤
            <br />
            먼작귀?
          </h1>
          <p className="text-[#7a6d66] text-base leading-relaxed">
            토벌, 제초, 라멘 한 그릇…
            <br />
            먼작귀 세계 속 나는 누구와 닮았을까?
          </p>
        </div>

        <div className="flex justify-center -space-x-3">
          {regulars.map((c, i) => (
            <div key={c.id} className="animate-pop" style={{ animationDelay: `${i * 70}ms` }}>
              <Avatar character={c} size={46} className="shadow-sm" />
            </div>
          ))}
        </div>

        <div className="bg-white/80 border-2 border-[#f1e4d6] rounded-3xl p-5 space-y-4 text-left shadow-sm">
          <InfoRow emoji="🗡️" title="25문항, 약 5분" desc="먼작귀 세계의 상황 속에서 나라면 어떻게 할지 골라주세요" />
          <InfoRow emoji="🍙" title="8명의 먼작귀 + 히든 캐릭터 5명" desc="극단적인 성향이라면… 숨겨진 캐릭터가 나올지도?" />
          <InfoRow emoji="🔗" title="결과 공유" desc="친구들과 서로의 먼작귀를 비교해 보세요" />
        </div>

        <button
          onClick={onStart}
          className="font-cute w-full py-4 bg-[#f49ac1] text-white rounded-3xl text-xl shadow-[0_4px_0_#d97aa3] hover:brightness-105 active:translate-y-1 active:shadow-none transition-all"
        >
          테스트 시작하기
        </button>

        <p className="text-[#b5aaa0] text-xs leading-relaxed">
          팬이 만든 비공식 테스트예요.
          <br />
          먼작귀(ちいかわ)의 모든 권리는 원작자 나가노(ナガノ)에게 있습니다.
        </p>
      </div>
    </div>
  );
}

function InfoRow({ emoji, title, desc }: { emoji: string; title: string; desc: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="text-2xl leading-none mt-0.5">{emoji}</span>
      <div>
        <p className="text-[#4a3f3a] text-sm font-bold">{title}</p>
        <p className="text-[#9a8d85] text-xs mt-0.5">{desc}</p>
      </div>
    </div>
  );
}
