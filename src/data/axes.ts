export const AXES = ['BRAVE', 'CARE', 'EXPRESS', 'GRIT', 'SOCIAL'] as const;
export type Axis = (typeof AXES)[number];

/** 각 축의 점수는 -1 ~ 1. 양수 = plus 성향, 음수 = minus 성향 */
export type Vector = Record<Axis, number>;

export interface AxisInfo {
  label: string;
  plus: string;
  minus: string;
}

export const AXIS_INFO: Record<Axis, AxisInfo> = {
  BRAVE: { label: '용기', plus: '일단 돌진', minus: '신중·조심' },
  CARE: { label: '마음', plus: '챙김·배려', minus: '마이웨이' },
  EXPRESS: { label: '표현', plus: '감정 풍부', minus: '과묵·담담' },
  GRIT: { label: '노력', plus: '수련·노력', minus: '흐름대로' },
  SOCIAL: { label: '에너지', plus: '다 같이', minus: '혼자서' },
};
