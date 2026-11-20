import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { CHARACTER_LIST } from './src/data/characters.ts';
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from './src/config.ts';

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function ogTags(o: { title: string; description: string; image: string; url: string }): string {
  return [
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${esc(SITE_NAME)}" />`,
    `<meta property="og:title" content="${esc(o.title)}" />`,
    `<meta property="og:description" content="${esc(o.description)}" />`,
    `<meta property="og:image" content="${o.image}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:url" content="${o.url}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
  ].join('\n    ');
}

/**
 * 링크 썸네일용 플러그인
 * - index.html 에 기본 og 태그 삽입
 * - 빌드 시 캐릭터별 /r/<id>.html 생성: 크롤러에겐 캐릭터 썸네일을 보여주고,
 *   사람은 쿼리(?s=…&name=…)를 유지한 채 메인 앱으로 바로 이동
 */
function ogPages(): Plugin {
  return {
    name: 'og-pages',
    transformIndexHtml(html) {
      return html.replace(
        '<!-- og -->',
        ogTags({
          title: SITE_NAME,
          description: SITE_DESCRIPTION,
          image: `${SITE_URL}/og/default.png`,
          url: `${SITE_URL}/`,
        })
      );
    },
    generateBundle() {
      for (const c of CHARACTER_LIST) {
        const title = `나와 닮은 먼작귀는 「${c.name}」!`;
        const html = `<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${esc(title)} — ${esc(SITE_NAME)}</title>
    <meta name="description" content="${esc(c.title)}" />
    ${ogTags({
      title,
      description: `${c.title} · 나는 어떤 먼작귀일까? 테스트 해보기`,
      image: `${SITE_URL}/og/${c.id}.png`,
      url: `${SITE_URL}/r/${c.id}`,
    })}
    <script>location.replace('/' + location.search);</script>
  </head>
  <body>
    <a href="/">${esc(SITE_NAME)} 테스트 하러 가기</a>
  </body>
</html>
`;
        this.emitFile({ type: 'asset', fileName: `r/${c.id}.html`, source: html });
      }
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), ogPages()],
});
