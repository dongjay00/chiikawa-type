import { AXES, type Axis, type Vector } from './axes.ts';
import { CHARACTER_LIST, type CharacterId } from './characters.ts';
import { QUESTIONS } from './questions.ts';

/** 1·2 = 앞 선택지(확실히·대체로), 3·4 = 뒤 선택지(대체로·확실히) */
export type AnswerScore = 1 | 2 | 3 | 4;
export type Answers = Record<number, AnswerScore>;

const SCORE_MAP: Record<AnswerScore, number> = { 1: 2, 2: 1, 3: -1, 4: -2 };

/**
 * 히든 캐릭터별 거리 가중치. 1보다 작을수록 잘 나옴.
 * 일반적인 응답 기준으로 각각 약 0.5~1% 확률이 되도록 맞춘 값
 * (주변 레귤러 캐릭터와의 거리가 제각각이라 캐릭터마다 다름)
 */
const HIDDEN_WEIGHT: Partial<Record<CharacterId, number>> = {
  pochette: 0.65,
  ramen: 0.8,
  siren: 0.72,
  ode: 0.67,
  shimajiro: 0.77,
};
const MAX_DISTANCE = Math.sqrt(AXES.length * 4);

export function calcVector(answers: Answers): Vector {
  const result = {} as Vector;
  for (const axis of AXES) {
    const qs = QUESTIONS.filter((q) => q.axis === axis);
    const sum = qs.reduce((acc, q) => acc + SCORE_MAP[answers[q.id] ?? 2], 0);
    result[axis] = sum / (qs.length * 2);
  }
  return result;
}

function distance(a: Vector, b: Vector): number {
  return Math.sqrt(AXES.reduce((acc, axis) => acc + (a[axis] - b[axis]) ** 2, 0));
}

export interface Match {
  id: CharacterId;
  /** 0 ~ 100 */
  sync: number;
}

/** 가까운 순으로 정렬된 매칭 결과 */
export function rankCharacters(user: Vector): Match[] {
  return CHARACTER_LIST.map((c) => {
    const d = distance(user, c.vector);
    return { id: c.id, d, rank: d * (HIDDEN_WEIGHT[c.id] ?? 1) };
  })
    .sort((a, b) => a.rank - b.rank)
    .map(({ id, d }) => ({ id, sync: Math.round(Math.max(0, 1 - d / MAX_DISTANCE) * 100) }));
}

// ── URL 공유용 인코딩 ─────────────────────────────────────

export function encodeVector(vec: Vector): string {
  return AXES.map((a) => Math.round(vec[a] * 100)).join('_');
}

export function decodeVector(raw: string | null): Vector | null {
  if (!raw) return null;
  const nums = raw.split('_').map(Number);
  if (nums.length !== AXES.length || nums.some((n) => !Number.isFinite(n))) return null;
  return Object.fromEntries(
    AXES.map((a, i) => [a, Math.max(-1, Math.min(1, nums[i] / 100))])
  ) as Record<Axis, number>;
}
