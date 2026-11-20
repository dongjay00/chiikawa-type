import type { Vector } from './axes.ts';

export type CharacterId =
  | 'chiikawa'
  | 'hachiware'
  | 'usagi'
  | 'momonga'
  | 'kurimanju'
  | 'rakko'
  | 'shisa'
  | 'kani'
  // 히든
  | 'pochette'
  | 'ramen'
  | 'siren'
  | 'ode'
  | 'shimajiro';

export interface Relation {
  id: CharacterId;
  reason: string;
}

export interface Character {
  id: CharacterId;
  name: string;
  /** 부가 표기 (일본어 이름, 별칭 등) */
  sub: string;
  hidden: boolean;
  emoji: string;
  /**
   * 직접 준비한 이미지 경로 (예: '/characters/chiikawa.png').
   * public/characters/ 에 넣고 경로를 적으면 이모지 대신 표시됩니다.
   */
  image?: string;
  color: string;
  colorLight: string;
  title: string;
  description: string;
  quote?: string;
  favorite: string;
  moments: [string, string, string];
  strengths: [string, string, string];
  weaknesses: [string, string];
  best?: Relation;
  rival?: Relation;
  vector: Vector;
}

const v = (BRAVE: number, CARE: number, EXPRESS: number, GRIT: number, SOCIAL: number): Vector => ({
  BRAVE,
  CARE,
  EXPRESS,
  GRIT,
  SOCIAL,
});

export const CHARACTERS: Record<CharacterId, Character> = {
  chiikawa: {
    id: 'chiikawa',
    name: '치이카와',
    sub: 'ちいかわ',
    hidden: false,
    emoji: '🧀',
    image: '/characters/chiikawa.webp',
    color: '#f49ac1',
    colorLight: '#fff0f6',
    title: '겁 많은 울보, 그런데 결정적일 땐 제일 용감한',
    description:
      '작은 일에도 깜짝 놀라고 눈물이 먼저 나오지만, 소중한 친구가 위험할 땐 이를 악물고 앞으로 나서는 사람이에요. 위험을 누구보다 먼저 알아채는 섬세한 감각이 있고, 한 번 정한 목표는 몇 번 넘어져도 다시 도전해요. 말로 잘 표현하진 못해도 친구의 기쁨을 자기 일처럼 챙기는 따뜻한 마음을 지녔어요.',
    quote: '…싫어!',
    favorite: '치즈 (피자호빵이라면 울면서라도 쫓아감)',
    moments: [
      '시험에 떨어진 날에도 합격한 친구의 축하 선물은 꼭 챙긴다',
      '무서워서 "우우…" 하면서도 결국 친구를 따라간다',
      '혼자 있을 땐 신나게 노래하고 탭댄스를 춘다',
    ],
    strengths: ['위기를 가장 먼저 알아채는 섬세함', '넘어져도 다시 도전하는 끈기', '친구를 위해 내는 진짜 용기'],
    weaknesses: ['긴장하면 실력 발휘가 잘 안 됨', '하고 싶은 말을 꾹 참다가 쌓아둠'],
    best: { id: 'hachiware', reason: '내가 망설일 때 "어떻게든 되어라!" 하고 손잡아 주는 단짝이에요.' },
    rival: { id: 'momonga', reason: '내 간식을 말없이 먹어버리는 그 녀석… 참다 참다 결국 폭발하게 돼요.' },
    vector: v(-0.8, 0.6, 0.9, 0.5, 0.2),
  },

  hachiware: {
    id: 'hachiware',
    name: '하치와레',
    sub: 'ハチワレ · 가르마',
    hidden: false,
    emoji: '🎸',
    image: '/characters/hachiware.webp',
    color: '#6fb1e6',
    colorLight: '#eef6fd',
    title: '어떻게든 되어라! 긍정 에너지 분위기 메이커',
    description:
      '누구와도 금방 친해지고, 막막한 상황에서도 "어떻게든 되겠지!" 하며 웃을 수 있는 사람이에요. 말주변이 좋아서 친구의 마음을 대신 말해주기도 하고, 낙심한 친구 곁에서 "몇 번이든 응원할게"라고 말해주는 든든한 존재예요. 엉뚱해 보이는 시도가 의외로 문제를 해결하는 행운의 아이콘이기도 해요.',
    quote: '어떻게든 되어라~!',
    favorite: '라면 (엎어진 초밥도 오차즈케로 만들어 맛있게!)',
    moments: [
      '집중하면 자기도 모르게 혀가 쏙 나온다',
      '혼자일 땐 소박하게 먹어도, 친구가 오면 코스 요리를 차린다',
      '기타 치며 노래하는 시간이 제일 좋다',
    ],
    strengths: ['누구와도 친해지는 사교성', '위기도 웃어넘기는 낙천성', '친구를 북돋우는 따뜻한 말솜씨'],
    weaknesses: ['위험을 늦게 알아채는 편', '돈이 생기면 취미에 바로 써버림'],
    best: { id: 'chiikawa', reason: '말 못 할 마음까지 알아주는 단짝. 함께라면 무서운 토벌도 할 수 있어요.' },
    rival: { id: 'momonga', reason: '무슨 짓을 해도 반응 없는 나… 그게 오히려 상대를 더 약 올리기도 해요.' },
    vector: v(0.6, 0.6, 0.5, -0.4, 0.9),
  },

  usagi: {
    id: 'usagi',
    name: '우사기',
    sub: 'うさぎ · 토끼',
    hidden: false,
    emoji: '🐰',
    image: '/characters/usagi.webp',
    color: '#f2c94c',
    colorLight: '#fff8e1',
    title: '예측불가 자유로운 영혼, 알고 보면 최강 실력자',
    description:
      '남들이 망설일 때 "야하!" 하고 제일 먼저 뛰어드는 사람이에요. 겁이 없고 판단이 빨라서 위기 상황에서 누구보다 든든하고, 놀랍게도 실력까지 갖춘 숨은 고수예요. 행동은 엉뚱하고 마이웨이지만, 맛있는 걸 발견하면 바로 친구들에게 알려주는 다정함이 숨어 있어요.',
    quote: '하아? …야하!',
    favorite: '가리는 것 없이 전부 (브로콜리엔 마요네즈 듬뿍)',
    moments: [
      '걸어갈 때도 공중제비를 돈다',
      '중고 장터에서 정체불명의 물건을 사 온다',
      '얄미운 상대에겐 한 치도 밀리지 않고 되받아친다',
    ],
    strengths: ['망설임 없는 행동력과 빠른 판단', '겉보다 훨씬 뛰어난 실력', '누구에게도 휘둘리지 않는 단단함'],
    weaknesses: ['엉뚱한 행동으로 주변을 당황시킴', '수상한 물건을 들여와 일을 키우기도 함'],
    best: { id: 'chiikawa', reason: '장난은 제일 많이 치지만, 힘들 땐 말없이 곁을 지켜주는 사이예요.' },
    rival: { id: 'momonga', reason: '막무가내도 나에겐 안 통해! 만나기만 하면 티격태격하는 라이벌.' },
    vector: v(1.0, -0.4, -0.5, 0.3, 0.4),
  },

  momonga: {
    id: 'momonga',
    name: '모몽가',
    sub: 'モモンガ · 하늘다람쥐',
    hidden: false,
    emoji: '🍑',
    image: '/characters/momonga.webp',
    color: '#c39be0',
    colorLight: '#f6effb',
    title: '귀여움은 무기! 원하는 건 꼭 말하는 솔직파',
    description:
      '갖고 싶은 건 갖고 싶다고, 칭찬받고 싶을 땐 칭찬해 달라고 당당하게 말하는 사람이에요. 자기 마음에 솔직하고 눈치 보지 않는 대담함이 있어서 어디서든 존재감이 확실해요. 제멋대로처럼 보여도, 정말 위기의 순간엔 친구의 손을 붙잡아 끌어올려 주는 반전 매력이 있어요.',
    quote: '더 칭찬해!',
    favorite: '남이 먹고 있는, 맛있어 보이는 거 전부',
    moments: [
      '효과음을 입으로 내면서 다닌다',
      '친구의 귀여운 행동을 바로 따라 해 본다',
      '배가 고프면 기분이 확 나빠진다',
    ],
    strengths: ['원하는 걸 정확히 말하는 솔직함', '어디서든 주목받는 존재감', '겁 없는 대담함'],
    weaknesses: ['남의 기분을 살피는 건 조금 서툼', '귀찮은 일은 일단 피하고 봄'],
    best: { id: 'kani', reason: '아무리 제멋대로 굴어도 받아주고, 바른길로 이끌어주는 소중한 친구예요.' },
    rival: { id: 'usagi', reason: '내 귀여움이 전혀 안 통하는 유일한 상대. 만나면 꼭 당한다…' },
    vector: v(0.5, -1.0, 0.9, -0.9, 0.5),
  },

  kurimanju: {
    id: 'kurimanju',
    name: '쿠리만쥬',
    sub: '栗まんじゅう · 밤만쥬',
    hidden: false,
    emoji: '🍺',
    image: '/characters/kurimanju.webp',
    color: '#c6915f',
    colorLight: '#f8efe6',
    title: '말보다 "캬~" 한마디, 과묵한 어른 미식가',
    description:
      '말수는 적지만 행동으로 마음을 보여주는 사람이에요. 혼자만의 시간을 소중히 여기고, 맛있는 음식과 한잔의 여유에서 확실한 행복을 찾을 줄 알아요. 무심해 보여도 배고픈 후배에게 먼저 음식을 나눠주고, 지쳐 보이는 친구에겐 조용히 커피를 건네는 어른의 배려를 지녔어요.',
    quote: '캬~!',
    favorite: '시원한 맥주와 안주 (생굴, 암염 뿌린 구운 표고버섯)',
    moments: [
      '먹을 땐 항상 마음에 드는 그루터기 위에 앉는다',
      '고기 써는 영상이나 청소 영상을 눈을 반짝이며 본다',
      '모두가 질겁하는 냉탕에도 아무렇지 않게 들어간다',
    ],
    strengths: ['소소한 행복을 즐길 줄 아는 여유', '말없이 챙기는 어른스러운 배려', '누구와도 무난하게 지내는 둥글둥글함'],
    weaknesses: ['속마음을 잘 드러내지 않음', '즐거움이 과하면 다음 날 숙취로 고생'],
    best: { id: 'shisa', reason: '맛있는 걸 나누고 아플 땐 서로 챙겨주는 최고의 식도락 메이트예요.' },
    rival: { id: 'usagi', reason: '장난이 지나치면 연어포로 한 대… 그래도 미워할 수 없는 사이.' },
    vector: v(-0.3, 0.4, -0.9, -0.7, -0.9),
  },

  rakko: {
    id: 'rakko',
    name: '랏코',
    sub: 'ラッコ · 해달',
    hidden: false,
    emoji: '🍓',
    image: '/characters/rakko.webp',
    color: '#6b8fb8',
    colorLight: '#edf2f8',
    title: '토벌 랭킹 1위, 엄근진 겉모습 속 딸기 파르페',
    description:
      '목표를 향해 묵묵히 수련하는, 실력과 책임감을 모두 갖춘 사람이에요. 최고의 자리에 있어도 뽐내지 않고, 후배를 이끌어주며 공을 나눠주는 진짜 리더예요. 진지한 표정 뒤에는 달콤한 디저트 앞에서 스르르 풀어지는 귀여운 반전이 숨어 있답니다.',
    quote: '강해져라. 오직 수련뿐이다.',
    favorite: '딸기 파르페 (디저트는 별개의 배!)',
    moments: [
      '남들이 볼 때는 일부러 미간에 힘을 준다',
      '음식이 나올 때 비장하게 "온다!"라고 말한다',
      '쓴 커피엔 시럽과 설탕을 꼭 넣는다',
    ],
    strengths: ['목표를 향한 꾸준한 노력', '후배를 키워주는 리더십', '강할수록 겸손한 태도'],
    weaknesses: ['진지해서 다가가기 어려워 보임', '노래·컴퓨터 앞에선 의외로 허당'],
    best: { id: 'hachiware', reason: '망토까지 따라 두르는 귀여운 제자. 함께 수련하며 같이 강해지는 사이예요.' },
    rival: { id: 'momonga', reason: '열심히 가르쳐 줘도 악의로 받아치는 상대… 그래도 모질게 대하진 못해요.' },
    vector: v(0.6, 0.6, -0.5, 0.8, -0.1),
  },

  shisa: {
    id: 'shisa',
    name: '시사',
    sub: 'シーサー',
    hidden: false,
    emoji: '🍜',
    image: '/characters/shisa.webp',
    color: '#f08a5d',
    colorLight: '#fff1ea',
    title: '집념의 노력파, 나누는 게 행복한 성실 요정',
    description:
      '하고 싶은 일이 생기면 거절당해도 포기하지 않고, 결국 자격을 갖춰 꿈을 이뤄내는 사람이에요. 처음 만난 사람에게도 간식을 나눠주고, 도움을 받으면 꼭 보답하는 예의 바른 마음씨를 가졌어요. 다만 너무 열심히 하다 지칠 때가 있으니, "힘들 땐 쉬어도 된다"는 걸 꼭 기억해요.',
    quote: '사부님! 부탁합니다!',
    favorite: '라멘 로우의 라멘, 그리고 사타안다기',
    moments: [
      '기쁜 일이 있으면 "스이~ 스이~" 하며 춤을 춘다',
      '혼잣말도 존댓말로 한다',
      '간식을 먹으면서 공부하다 그대로 잠든다',
    ],
    strengths: ['포기를 모르는 집념', '아낌없이 나누는 따뜻함', '누구에게나 예의 바른 태도'],
    weaknesses: ['무리하다 번아웃이 오기 쉬움', '작은 잘못에도 죄책감을 크게 느낌'],
    best: { id: 'kurimanju', reason: '맛있는 걸 함께 나누고, 힘들 땐 쉬어도 된다고 말해주는 든든한 친구예요.' },
    rival: { id: 'ramen', reason: '라이벌이 아니라 존경하는 사부님! 언젠가 함께 건배하는 게 꿈이에요.' },
    vector: v(-0.3, 0.7, 0.3, 0.7, 0.5),
  },

  kani: {
    id: 'kani',
    name: '카니',
    sub: '古本屋 · 헌책방',
    hidden: false,
    emoji: '🦀',
    image: '/characters/kani.webp',
    color: '#ef7a78',
    colorLight: '#fdeeee',
    title: '작은 일에도 감동하는 다정한 대인배',
    description:
      '조용히 책 읽는 걸 좋아하지만, 마음을 연 친구에게는 아낌없이 정을 주는 사람이에요. 친구가 실수해도 화내기보단 다독이고, 필요할 땐 바른길로 이끌어주는 든든한 보호자 역할을 해요. 사소한 선물 하나에도 눈물이 날 만큼 감동할 줄 아는 순수한 마음을 가졌어요.',
    favorite: '책, 그리고 직접 만든 버섯 카레 볶음밥',
    moments: [
      '친구에게 받은 게 머리띠를 한 번도 벗지 않는다',
      '책이 팔리면 볼에 빗금이 생기며 기뻐한다',
      '친구가 사고를 치면 땀 흘리며 말리러 달려간다',
    ],
    strengths: ['어떤 친구도 품어주는 넓은 마음', '작은 것에서 기쁨을 찾는 순수함', '의외로 힘이 센 반전 매력'],
    weaknesses: ['당황하면 얼굴이 금방 빨개짐', '친구에게 맞춰주다 손해 보기도 함'],
    best: { id: 'momonga', reason: '제멋대로인 친구지만 나에겐 처음 생긴 소중한 친구예요.' },
    vector: v(-0.2, 1.0, 0.6, 0.0, -0.6),
  },

  // ───────────────────────── 히든 ─────────────────────────

  pochette: {
    id: 'pochette',
    name: '포셰트 갑옷 씨',
    sub: 'ポシェットの鎧さん',
    hidden: true,
    emoji: '👜',
    image: '/characters/pochette.webp',
    color: '#a3a9b6',
    colorLight: '#f2f3f6',
    title: '손끝으로 귀여움을 만드는 다정한 장인',
    description:
      '귀여운 것을 사랑하고, 직접 만든 물건으로 주변을 행복하게 만드는 사람이에요. 마음에 차지 않으면 내놓지 않는 완벽주의 장인 기질이 있지만, 곤란한 친구를 보면 그냥 지나치지 못하는 따뜻함이 먼저예요. 겁이 많아 벌벌 떨면서도 지켜야 할 땐 결국 나서는 사람이에요.',
    quote: '어머, 미안해~',
    favorite: '귀여운 것, 그리고 손으로 만드는 모든 것',
    moments: [
      '친구들에게 받은 선물을 소중히 간직한다',
      '귀여운 걸 보면 뭔가 만들어주고 싶어진다',
      '만든 물건의 작은 결함도 끝까지 고친다',
    ],
    strengths: ['뛰어난 손재주와 미적 감각', '곤란한 이를 지나치지 못하는 상냥함', '품질에 타협하지 않는 장인 정신'],
    weaknesses: ['겁이 많아 쉽게 벌벌 떪', '완벽하지 않으면 내놓기를 망설임'],
    best: { id: 'chiikawa', reason: '포셰트를 사러 온 날부터 이어진 인연. 서로를 아끼는 따뜻한 사이예요.' },
    vector: v(-1, 1, 1, 1, 0.6),
  },

  ramen: {
    id: 'ramen',
    name: '라멘 갑옷 씨',
    sub: 'ラーメンの鎧さん',
    hidden: true,
    emoji: '🍥',
    image: '/characters/ramen.webp',
    color: '#d2ac55',
    colorLight: '#faf4e3',
    title: '무뚝뚝한 원칙주의 사장님, 속은 누구보다 뜨거운',
    description:
      '자기만의 원칙이 확실하고, 대충 하는 걸 용납하지 않는 사람이에요. 겉으로는 엄격해 보여도 서툰 손님은 묵묵히 기다려주고, 노력하는 제자의 성장을 진심으로 기뻐해요. 한 우물을 깊게 파서 자기만의 가게를 지켜내는 장인이에요.',
    favorite: '자기 가게의 라멘, 그리고 제자의 합격 소식',
    moments: [
      '줄도 안 서는 진상 손님은 단호하게 내보낸다',
      '소심한 손님의 주문은 끝까지 기다려준다',
      '제자의 합격 소식에 바로 축하 맥주를 사러 간다',
    ],
    strengths: ['흔들림 없는 원칙과 장인 정신', '노력하는 사람을 알아보는 눈', '말보다 행동으로 보여주는 진심'],
    weaknesses: ['처음엔 무섭다는 오해를 자주 받음', '원칙을 어기는 상대에겐 가차 없음'],
    best: { id: 'shisa', reason: '거절해도 포기하지 않고 찾아온 제자. 이제는 서로를 믿는 사부님과 제자예요.' },
    rival: { id: 'momonga', reason: '식권도 안 뽑고 "맛난 거 내놔!"… 가게에서 내보낸 손님이에요.' },
    vector: v(0.5, 0.5, -1, 1, 1),
  },

  siren: {
    id: 'siren',
    name: '세이렌',
    sub: 'セイレーン',
    hidden: true,
    emoji: '🧜',
    image: '/characters/siren.webp',
    color: '#4fb3a9',
    colorLight: '#e8f6f4',
    title: '무대를 지배하는 섬의 디바, 한번 정하면 끝까지',
    description:
      '노래 하나로 주변을 움직이는 압도적인 존재감의 소유자예요. 마음을 연 상대는 다정하게 돌봐주지만, 소중한 것을 건드리면 누구보다 무섭게 변해요. 감정이 깊고 강렬해서, 한번 마음먹은 일은 끝까지 밀고 나가는 사람이에요.',
    favorite: '노래, 그리고 입맛에 꼭 맞는 섬 요리',
    moments: [
      '늘 인어들과 함께 노래하며 지낸다',
      '화가 나면 얼굴에 그늘이 지고 눈이 붉어진다',
      '오해였다는 걸 알면 바로 사과하고 돌봐준다',
    ],
    strengths: ['무대를 장악하는 카리스마', '끝까지 밀어붙이는 추진력', '마음을 연 상대에겐 다정한 돌봄'],
    weaknesses: ['화가 나면 감정이 확 폭발함', '의외로 아픈 건 질색 (코가 간질간질하면 재채기!)'],
    rival: { id: 'usagi', reason: '노래로 맞붙은 상대. 무대 위 최고의 라이벌이에요.' },
    vector: v(1, -1, 1, 1, 1),
  },

  ode: {
    id: 'ode',
    name: '오데',
    sub: 'オデ',
    hidden: true,
    emoji: '🍄',
    image: '/characters/ode.webp',
    color: '#e3bd3a',
    colorLight: '#fdf8e1',
    title: '힘은 세고 마음은 순한, 해맑은 외눈 거인',
    description:
      '생각보다 몸이 먼저, 계산보다 마음이 먼저 움직이는 사람이에요. 힘은 누구보다 세지만 마음은 순수해서, 좋아하는 걸 친구와 나누고 함께 노는 시간을 제일 좋아해요. 놀이 하나에도 전력을 다하는 해맑은 열정이 매력이에요.',
    favorite: '커다란 버섯',
    moments: [
      '자기 자신을 "오데"라고 부른다',
      '맛있는 걸 찾으면 친구에게도 권한다',
      '놀이를 시작하면 진심 모드가 된다',
    ],
    strengths: ['누구보다 센 힘과 해맑은 에너지', '나누기를 좋아하는 순수함', '놀이에도 전력을 다하는 열정'],
    weaknesses: ['깊게 생각하기보다 일단 움직임', '규칙 설명은 대충, 이기는 건 진심'],
    vector: v(1, 0.8, 1, -1, 1),
  },

  shimajiro: {
    id: 'shimajiro',
    name: '섬 아저씨',
    sub: '시마지로',
    hidden: true,
    emoji: '🐚',
    image: '/characters/shimajiro.webp',
    color: '#5f9e6e',
    colorLight: '#ebf5ee',
    title: '보답을 바라지 않는, 외딴 숲속 식당의 수호자',
    description:
      '번잡한 곳에서 조금 떨어져, 자기만의 공간을 묵묵히 지키는 사람이에요. 찾아온 손님에겐 정성껏 요리를 대접하고, 위험이 닥치면 보답을 바라지 않고 지켜줘요. 힘을 앞세우진 않지만, 정말 필요한 순간엔 누구보다 강해지는 조용한 강자예요.',
    favorite: '바다에서 직접 구한 재료로 만든 요리',
    moments: [
      '섬 바깥 숲속에서 조용히 식당을 지킨다',
      '바다에 들어가 직접 식재료를 구해 온다',
      '손님이 위험하면 앞장서서 막아선다',
    ],
    strengths: ['대가 없이 베푸는 깊은 배려', '필요할 때만 드러나는 진짜 강함', '혼자서도 자기 자리를 지키는 단단함'],
    weaknesses: ['사람들 기억에서 잊히기 쉬움', '자기 이야기를 잘 하지 않음'],
    rival: { id: 'siren', reason: '섬을 지키기 위해 바닷속에서 맞섰던 상대예요.' },
    vector: v(0.6, 1, -1, 0.8, -1),
  },
};

export const CHARACTER_LIST = Object.values(CHARACTERS);
