import { useCallback, useState } from 'react';
import { AXES, AXIS_INFO, type Vector } from '../data/axes';
import { CHARACTERS, CHARACTER_LIST, type Character, type Relation } from '../data/characters';
import { encodeVector, type Match } from '../data/scoring';
import Avatar from './Avatar';
import Toast from './Toast';

interface Props {
  matches: Match[];
  vector: Vector;
  name: string;
  onRetry: () => void;
}

const ink = (color: string) => `color-mix(in srgb, ${color} 55%, #3b302b)`;

export default function ResultScreen({ matches, vector, name, onRetry }: Props) {
  const [top, second] = matches;
  const c = CHARACTERS[top.id];
  const runnerUp = CHARACTERS[second.id];
  const [toast, setToast] = useState<string | null>(null);
  const clearToast = useCallback(() => setToast(null), []);

  function handleCopyLink() {
    const params = new URLSearchParams({ s: encodeVector(vector), ...(name && { name }) });
    const url = `${window.location.origin}${window.location.pathname}?${params}`;
    navigator.clipboard
      .writeText(url)
      .then(() => setToast('🔗 링크를 복사했어요!'))
      .catch(() => setToast('복사에 실패했어요. 다시 시도해 주세요.'));
  }

  async function handleDownloadCard() {
    await downloadCard(c, top.sync, name);
    setToast('🖼 카드 이미지를 저장했어요!');
  }

  return (
    <div className="min-h-screen bg-dots py-10 px-4 sm:px-5">
      <div className="max-w-lg mx-auto space-y-5">
        {/* ── 메인 카드 ── */}
        <div
          className="rounded-[2rem] bg-white shadow-sm overflow-hidden"
          style={{ border: `3px solid ${c.color}` }}
        >
          <div className="px-6 pt-8 pb-6 text-center space-y-3" style={{ backgroundColor: c.colorLight }}>
            {c.hidden && (
              <div className="inline-block animate-pop px-3 py-1 rounded-full bg-[#4a3f3a] text-[#ffe9a8] text-xs font-bold tracking-wide">
                ✨ 히든 캐릭터 발견! ✨
              </div>
            )}
            <p className="text-sm font-bold" style={{ color: ink(c.color) }}>
              {name ? `${name}님과 닮은 먼작귀는` : '나와 닮은 먼작귀는'}
            </p>
            <div className="flex justify-center animate-pop">
              <Avatar character={c} size={120} className="shadow-md" />
            </div>
            <div>
              <h2 className="font-cute text-4xl sm:text-5xl text-[#4a3f3a]">{c.name}</h2>
              <p className="text-xs text-[#9a8d85] mt-1">{c.sub}</p>
            </div>
            <p className="font-cute text-lg sm:text-xl leading-snug break-keep" style={{ color: ink(c.color) }}>
              {c.title}
            </p>
            <SyncBar value={top.sync} color={c.color} />
          </div>

          <div className="p-6 space-y-6">
            {c.quote && (
              <div className="relative mx-auto w-fit max-w-full">
                <div
                  className="font-cute text-lg px-5 py-2.5 rounded-2xl text-center break-keep"
                  style={{ backgroundColor: c.colorLight, color: ink(c.color) }}
                >
                  “{c.quote}”
                </div>
              </div>
            )}

            <p className="text-[#5d514b] text-[15px] leading-7 break-keep">{c.description}</p>

            <Section title="🍙 최애" color={c.color}>
              <p className="text-[#5d514b] text-sm">{c.favorite}</p>
            </Section>

            <Section title="💭 이런 순간, 바로 당신" color={c.color}>
              <ul className="space-y-1.5">
                {c.moments.map((m) => (
                  <li key={m} className="flex gap-2 text-sm text-[#5d514b] break-keep">
                    <span style={{ color: c.color }}>✦</span>
                    {m}
                  </li>
                ))}
              </ul>
            </Section>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl p-4 space-y-2" style={{ backgroundColor: c.colorLight }}>
                <p className="text-xs font-bold" style={{ color: ink(c.color) }}>강점</p>
                {c.strengths.map((s) => (
                  <p key={s} className="text-xs text-[#5d514b] leading-relaxed break-keep">· {s}</p>
                ))}
              </div>
              <div className="rounded-2xl p-4 space-y-2 bg-[#f7f2ec]">
                <p className="text-xs font-bold text-[#9a8d85]">약점</p>
                {c.weaknesses.map((w) => (
                  <p key={w} className="text-xs text-[#7a6d66] leading-relaxed break-keep">· {w}</p>
                ))}
              </div>
            </div>

            {(c.best || c.rival) && (
              <div className="space-y-2">
                {c.best && <RelationRow label="💞 찰떡 친구" relation={c.best} />}
                {c.rival && (
                  <RelationRow label={c.rival.id === 'ramen' ? '🙇 존경하는 사부님' : '⚡ 케미 주의'} relation={c.rival} />
                )}
              </div>
            )}
          </div>
        </div>

        {/* ── 나의 성향 ── */}
        <div className="rounded-[2rem] bg-white border-2 border-[#f1e4d6] p-6 space-y-4">
          <p className="font-cute text-lg text-[#4a3f3a] text-center">나의 먼작귀 성향</p>
          <div className="space-y-4">
            {AXES.map((axis) => (
              <AxisBar key={axis} axis={axis} value={vector[axis]} color={c.color} />
            ))}
          </div>
        </div>

        {/* ── 2순위 ── */}
        <div className="rounded-[2rem] bg-white border-2 border-[#f1e4d6] p-5 flex items-center gap-4">
          <Avatar character={runnerUp} size={56} locked={false} />
          <div className="min-w-0">
            <p className="text-xs text-[#9a8d85]">내 안의 또 다른 모습</p>
            <p className="font-cute text-xl text-[#4a3f3a]">
              {runnerUp.name}
              <span className="ml-2 text-base" style={{ color: ink(runnerUp.color) }}>
                {second.sync}%
              </span>
            </p>
            <p className="text-xs text-[#7a6d66] truncate">{runnerUp.title}</p>
          </div>
        </div>

        {/* ── 액션 ── */}
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleCopyLink}
              className="font-cute py-4 rounded-3xl text-lg bg-white border-2 border-[#f1e4d6] text-[#4a3f3a] active:translate-y-0.5 transition-all"
            >
              🔗 링크 복사
            </button>
            <button
              onClick={handleDownloadCard}
              className="font-cute py-4 rounded-3xl text-lg text-white active:translate-y-0.5 transition-all"
              style={{ backgroundColor: c.color, boxShadow: `0 4px 0 ${ink(c.color)}` }}
            >
              🖼 카드 저장
            </button>
          </div>
          <button
            onClick={onRetry}
            className="w-full py-3 text-[#9a8d85] text-sm hover:text-[#4a3f3a] transition-colors"
          >
            다시 테스트하기
          </button>
        </div>

        {/* ── 도감 ── */}
        <Encyclopedia currentId={c.id} />

        <p className="text-center text-[#b5aaa0] text-xs leading-relaxed pb-4">
          팬이 만든 비공식 테스트예요. 먼작귀(ちいかわ)의 모든 권리는 원작자 나가노(ナガノ)에게 있습니다.
        </p>
      </div>

      {toast && <Toast message={toast} onDone={clearToast} />}
    </div>
  );
}

// ─────────────────────────────────────────────────────────

function SyncBar({ value, color }: { value: number; color: string }) {
  return (
    <div className="max-w-[240px] mx-auto space-y-1 pt-1">
      <div className="flex justify-between text-xs font-bold text-[#7a6d66]">
        <span>싱크로율</span>
        <span>{value}%</span>
      </div>
      <div className="h-2.5 rounded-full bg-white overflow-hidden">
        <div className="h-full rounded-full transition-all duration-700" style={{ width: `${value}%`, backgroundColor: color }} />
      </div>
    </div>
  );
}

function Section({ title, color, children }: { title: string; color: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-bold" style={{ color: ink(color) }}>{title}</p>
      {children}
    </div>
  );
}

function RelationRow({ label, relation }: { label: string; relation: Relation }) {
  const other = CHARACTERS[relation.id];
  return (
    <div className="flex items-center gap-3 rounded-2xl p-3 bg-[#fbf7f2]">
      <Avatar character={other} size={44} />
      <div className="min-w-0">
        <p className="text-xs text-[#9a8d85]">
          {label} · <span className="font-bold text-[#4a3f3a]">{other.name}</span>
        </p>
        <p className="text-xs text-[#5d514b] leading-relaxed break-keep">{relation.reason}</p>
      </div>
    </div>
  );
}

function AxisBar({ axis, value, color }: { axis: (typeof AXES)[number]; value: number; color: string }) {
  const info = AXIS_INFO[axis];
  const pct = Math.round(Math.abs(value) * 100);
  const plusSide = value >= 0;
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs">
        <span className={plusSide ? 'font-bold text-[#4a3f3a]' : 'text-[#b5aaa0]'}>{info.plus}</span>
        <span className="text-[#9a8d85]">{info.label}</span>
        <span className={!plusSide ? 'font-bold text-[#4a3f3a]' : 'text-[#b5aaa0]'}>{info.minus}</span>
      </div>
      <div className="relative h-2.5 rounded-full bg-[#f4ede5]">
        <div className="absolute top-0 bottom-0 left-1/2 w-px bg-[#d6cec5]" />
        <div
          className="absolute top-0 bottom-0 rounded-full transition-all duration-700"
          style={{
            backgroundColor: color,
            width: `${pct / 2}%`,
            ...(plusSide ? { right: '50%' } : { left: '50%' }),
          }}
        />
      </div>
    </div>
  );
}

function Encyclopedia({ currentId }: { currentId: string }) {
  const regulars = CHARACTER_LIST.filter((x) => !x.hidden);
  const hiddens = CHARACTER_LIST.filter((x) => x.hidden);
  return (
    <div className="rounded-[2rem] bg-white border-2 border-[#f1e4d6] p-5 space-y-4">
      <p className="font-cute text-lg text-[#4a3f3a] text-center">먼작귀 도감</p>
      <div className="grid grid-cols-4 gap-3">
        {regulars.map((x) => (
          <DexCell key={x.id} character={x} active={x.id === currentId} />
        ))}
      </div>
      <p className="text-xs text-center text-[#9a8d85] pt-1">히든 캐릭터</p>
      <div className="grid grid-cols-5 gap-2">
        {hiddens.map((x) => (
          <DexCell key={x.id} character={x} active={x.id === currentId} locked={x.id !== currentId} small />
        ))}
      </div>
    </div>
  );
}

function DexCell({ character, active, locked = false, small = false }: { character: Character; active: boolean; locked?: boolean; small?: boolean }) {
  return (
    <div className={`flex flex-col items-center gap-1 ${active || locked ? '' : 'opacity-55'}`}>
      <Avatar character={character} size={small ? 44 : 52} locked={locked} className={active ? 'ring-4 ring-offset-2 ring-[#ffe9a8]' : ''} />
      <span className={`text-[11px] text-center leading-tight ${active ? 'font-bold text-[#4a3f3a]' : 'text-[#9a8d85]'}`}>
        {locked ? '???' : character.name}
      </span>
    </div>
  );
}

// ── 카드 이미지 저장 ───────────────────────────────────────

function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let line = '';
  for (const w of words) {
    const test = line ? `${line} ${w}` : w;
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line);
      line = w;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function loadImage(src: string): Promise<HTMLImageElement | null> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

async function downloadCard(c: Character, sync: number, name: string) {
  await document.fonts?.ready;
  const W = 1080;
  const H = 1350;
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d')!;
  const cute = "'Jua', 'Gowun Dodum', sans-serif";
  const body = "'Gowun Dodum', sans-serif";

  // 배경 + 물방울
  ctx.fillStyle = '#fff8ee';
  ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = '#f7d9e3';
  for (let y = 20; y < H; y += 44) for (let x = 20; x < W; x += 44) {
    ctx.beginPath();
    ctx.arc(x, y, 2.4, 0, Math.PI * 2);
    ctx.fill();
  }

  // 카드
  const pad = 70;
  ctx.fillStyle = '#ffffff';
  ctx.strokeStyle = c.color;
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.roundRect(pad, pad, W - pad * 2, H - pad * 2, 60);
  ctx.fill();
  ctx.stroke();

  ctx.textAlign = 'center';
  ctx.fillStyle = '#c98aa3';
  ctx.font = `40px ${cute}`;
  ctx.fillText('나는 어떤 먼작귀?', W / 2, 180);

  if (c.hidden) {
    ctx.fillStyle = '#4a3f3a';
    ctx.beginPath();
    ctx.roundRect(W / 2 - 170, 210, 340, 60, 30);
    ctx.fill();
    ctx.fillStyle = '#ffe9a8';
    ctx.font = `32px ${cute}`;
    ctx.fillText('✨ 히든 캐릭터 ✨', W / 2, 252);
  }

  ctx.fillStyle = '#7a6d66';
  ctx.font = `44px ${body}`;
  ctx.fillText(name ? `${name}님과 닮은 먼작귀는` : '나와 닮은 먼작귀는', W / 2, 340);

  // 아바타
  const cy = 540;
  ctx.fillStyle = c.colorLight;
  ctx.strokeStyle = c.color;
  ctx.lineWidth = 12;
  ctx.beginPath();
  ctx.arc(W / 2, cy, 150, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  const img = c.image ? await loadImage(c.image) : null;
  if (img) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(W / 2, cy, 144, 0, Math.PI * 2);
    ctx.clip();
    ctx.drawImage(img, W / 2 - 144, cy - 144, 288, 288);
    ctx.restore();
  } else {
    ctx.font = '150px sans-serif';
    ctx.textBaseline = 'middle';
    ctx.fillText(c.emoji, W / 2, cy + 8);
    ctx.textBaseline = 'alphabetic';
  }

  ctx.fillStyle = '#4a3f3a';
  ctx.font = `120px ${cute}`;
  ctx.fillText(c.name, W / 2, 850);

  ctx.fillStyle = '#5d514b';
  ctx.font = `48px ${cute}`;
  wrapText(ctx, c.title, W - pad * 2 - 120).forEach((l, i) => ctx.fillText(l, W / 2, 940 + i * 64));

  if (c.quote) {
    ctx.fillStyle = '#9a8d85';
    ctx.font = `40px ${body}`;
    ctx.fillText(`“${c.quote}”`, W / 2, 1110);
  }

  ctx.fillStyle = c.color;
  ctx.font = `44px ${cute}`;
  ctx.fillText(`싱크로율 ${sync}%`, W / 2, 1190);

  const link = document.createElement('a');
  link.download = `먼작귀-${c.name}${name ? `-${name}` : ''}.png`;
  link.href = canvas.toDataURL('image/png');
  link.click();
}
