import type { Character } from '../data/characters';

interface Props {
  character: Character;
  size?: number;
  locked?: boolean;
  className?: string;
}

/** 캐릭터 이미지가 있으면 이미지, 없으면 이모지를 동그란 배지 안에 표시 */
export default function Avatar({ character, size = 64, locked = false, className = '' }: Props) {
  return (
    <div
      className={`rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden ${className}`}
      style={{
        width: size,
        height: size,
        backgroundColor: locked ? '#ece6df' : character.colorLight,
        border: `${Math.max(2, size / 28)}px solid ${locked ? '#d6cec5' : character.color}`,
      }}
    >
      {locked ? (
        <span className="font-cute text-[#b5aaa0]" style={{ fontSize: size * 0.42 }}>?</span>
      ) : character.image ? (
        <img src={character.image} alt={character.name} className="w-full h-full object-cover" />
      ) : (
        <span style={{ fontSize: size * 0.5, lineHeight: 1 }} aria-hidden>
          {character.emoji}
        </span>
      )}
    </div>
  );
}
