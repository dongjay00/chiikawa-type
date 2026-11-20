/**
 * 링크 썸네일(og:image) 이미지 생성 스크립트 — 1200×630 PNG를 public/og/ 에 만든다.
 * 캐릭터 데이터나 이미지를 바꿨을 때만 다시 실행하면 됨.
 *
 *   npm run og
 *
 * macOS의 Google Chrome(headless)으로 HTML을 스크린샷 찍는 방식이라,
 * 다른 환경에서는 CHROME 환경변수로 크롬 실행 파일 경로를 지정.
 */
import { execFileSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { CHARACTER_LIST, type Character } from '../src/data/characters.ts';
import { SITE_NAME } from '../src/config.ts';

const ROOT = resolve(import.meta.dirname, '..');
const PUBLIC = join(ROOT, 'public');
const OUT = join(PUBLIC, 'og');
const CHROME = process.env.CHROME ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const img = (c: Character) => `file://${join(PUBLIC, c.image ?? '')}`;

const BASE_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Gowun+Dodum&family=Jua&display=swap');
  * { box-sizing: border-box; margin: 0; }
  html, body { width: 1200px; height: 630px; overflow: hidden; }
  body {
    font-family: 'Gowun Dodum', sans-serif; color: #4a3f3a;
    background-color: #fff8ee;
    background-image: radial-gradient(#f7d9e3 2.4px, transparent 2.4px);
    background-size: 36px 36px;
  }
  .cute { font-family: 'Jua', sans-serif; }
  .avatar { border-radius: 50%; overflow: hidden; display: flex; align-items: center; justify-content: center; }
  .avatar img { width: 100%; height: 100%; object-fit: cover; }
`;

function characterHtml(c: Character): string {
  return `<!doctype html><html><head><meta charset="utf-8"><style>${BASE_CSS}
    .card { position: absolute; inset: 36px; background: #fff; border: 8px solid ${c.color}; border-radius: 48px;
            display: flex; align-items: center; gap: 56px; padding: 0 72px; }
    .avatar { width: 380px; height: 380px; flex-shrink: 0; background: ${c.colorLight}; border: 10px solid ${c.color}; }
    .brand { font-size: 30px; color: #c98aa3; }
    .lead { font-size: 34px; color: #7a6d66; margin-top: 18px; }
    .name { font-size: 112px; line-height: 1.1; margin-top: 6px; }
    .title { font-size: 38px; line-height: 1.35; margin-top: 18px; color: color-mix(in srgb, ${c.color} 55%, #3b302b); word-break: keep-all; }
    .badge { display: inline-block; margin-top: 14px; padding: 6px 18px; border-radius: 999px; background: #4a3f3a; color: #ffe9a8; font-size: 26px; }
  </style></head><body>
    <div class="card">
      <div class="avatar"><img src="${img(c)}"></div>
      <div>
        <div class="brand cute">${esc(SITE_NAME)}</div>
        ${c.hidden ? '<div class="badge cute">✨ 히든 캐릭터 ✨</div>' : ''}
        <div class="lead">나와 닮은 먼작귀는</div>
        <div class="name cute">${esc(c.name)}</div>
        <div class="title cute">${esc(c.title)}</div>
      </div>
    </div>
  </body></html>`;
}

function defaultHtml(): string {
  const regulars = CHARACTER_LIST.filter((c) => !c.hidden);
  const avatars = regulars
    .map((c) => `<div class="avatar" style="background:${c.colorLight};border:6px solid ${c.color}"><img src="${img(c)}"></div>`)
    .join('');
  return `<!doctype html><html><head><meta charset="utf-8"><style>${BASE_CSS}
    body { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 30px; text-align: center; }
    .sub { font-size: 32px; color: #c98aa3; }
    h1 { font-size: 104px; }
    .row { display: flex; }
    .row .avatar { width: 128px; height: 128px; margin: 0 -8px; background: #fff; }
    .desc { font-size: 34px; color: #7a6d66; }
  </style></head><body>
    <div class="sub cute">먼작귀 유형 테스트</div>
    <h1 class="cute">${esc(SITE_NAME)}</h1>
    <div class="row">${avatars}</div>
    <div class="desc">25문항으로 알아보는, 나와 닮은 먼작귀</div>
  </body></html>`;
}

function shoot(html: string, out: string, tmp: string) {
  const file = join(tmp, 'page.html');
  writeFileSync(file, html);
  execFileSync(CHROME, [
    '--headless=new',
    '--disable-gpu',
    '--hide-scrollbars',
    '--allow-file-access-from-files',
    '--force-device-scale-factor=1',
    '--window-size=1200,630',
    '--virtual-time-budget=5000',
    `--screenshot=${out}`,
    `file://${file}`,
  ], { stdio: 'ignore' });
  console.log('✓', out.replace(ROOT + '/', ''));
}

mkdirSync(OUT, { recursive: true });
const tmp = mkdtempSync(join(tmpdir(), 'og-'));
try {
  shoot(defaultHtml(), join(OUT, 'default.png'), tmp);
  for (const c of CHARACTER_LIST) shoot(characterHtml(c), join(OUT, `${c.id}.png`), tmp);
} finally {
  rmSync(tmp, { recursive: true, force: true });
}
