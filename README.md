# 나는 어떤 먼작귀? 🍙

먼작귀(ちいかわ) 세계 속 상황극 25문항으로, 나와 닮은 먼작귀 캐릭터를 찾아주는 팬메이드 성격 유형 테스트.
(`glee-projects/glee-type` 구조를 기반으로 제작)

## 실행

```bash
npm install
npm run dev
```

## 구조

| 파일 | 내용 |
|---|---|
| `src/data/axes.ts` | 성향 축 5개 (용기 · 마음 · 표현 · 노력 · 에너지) |
| `src/data/questions.ts` | 축별 5문항씩, 총 25문항 |
| `src/data/characters.ts` | 레귤러 8명 + 히든 5명 데이터와 성향 벡터 |
| `src/data/scoring.ts` | 응답 → 성향 벡터 → 가장 가까운 캐릭터 매칭 |

- 결과는 사용자 벡터와 캐릭터 벡터의 **유클리드 거리**가 가장 가까운 캐릭터.
- 히든 캐릭터는 벡터가 극단값(±1)에 있고 거리 가중치(`HIDDEN_PENALTY`)가 붙어서, 성향이 아주 뚜렷할 때만 등장.
- 공유 링크는 `?s=<축별 점수>&name=` 형식이라, 캐릭터 벡터를 조정해도 링크가 깨지지 않음.

## 공유 & 링크 썸네일

- 배포 주소: https://chiikawa-type-jay.vercel.app (`src/config.ts` 의 `SITE_URL`)
- 결과 공유 링크는 `/r/<캐릭터id>?s=…&name=…` 형식.
  빌드 시 `vite.config.ts` 의 `ogPages` 플러그인이 캐릭터별 `dist/r/<id>.html` 을 만들고,
  이 페이지는 캐릭터 썸네일 og 태그를 가진 채 사람은 메인 앱으로 바로 넘겨줌.
- 썸네일 이미지(1200×630)는 `public/og/` 에 미리 생성해 둔 PNG.
  캐릭터 데이터/이미지를 바꿨다면 `npm run og` 로 다시 생성 (macOS Chrome 필요).
- `vercel.json` 의 `cleanUrls` 로 `/r/chiikawa` → `r/chiikawa.html` 매핑.

## 캐릭터 이미지 넣기

현재 `public/characters/` 에 캐릭터 이미지가 들어 있음. 이미지가 없는 캐릭터는 이모지로 표시됨. 바꾸려면 `public/characters/` 에 넣고
`characters.ts` 에서 해당 캐릭터에 `image: '/characters/chiikawa.png'` 처럼 지정.

> 공식 일러스트는 저작권이 있으니 공개 배포 시 주의.

---

팬이 만든 비공식 테스트입니다. 먼작귀(ちいかわ)의 모든 권리는 원작자 나가노(ナガノ)에게 있습니다.
