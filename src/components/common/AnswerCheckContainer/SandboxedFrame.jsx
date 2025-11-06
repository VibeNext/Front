// src/components/SandboxedFrame.js
import { useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';

export default function SandboxedFrame({
  children,
  className,
  style,
  headCSS = '',
}) {
  const iframeRef = useRef(null);
  const rootRef = useRef(null); // React root 보관
  const styleElRef = useRef(null); // headCSS 업데이트용 <style> 보관

  // 1) iframe 초기화: 딱 한 번만
  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    // 외부 이미지가 필요 없고 로컬만 쓴다면 https:는 지워도 됨
    const CSP =
      "default-src 'none'; img-src 'self' blob: data: https:; style-src 'unsafe-inline'; base-uri 'none';";

    const html = `<!doctype html>
<html>
  <head>
    <meta http-equiv="Content-Security-Policy" content="${CSP}">
    <style id="__injected_css">html,body,#root{height:100%;margin:0;padding:0;}</style>
  </head>
  <body><div id="root"></div></body>
</html>`;

    const doc = iframe.contentDocument;
    doc.open();
    doc.write(html);
    doc.close();

    // style 핸들, mount, root 생성 보관
    styleElRef.current = doc.getElementById('__injected_css');
    const mount = doc.getElementById('root');
    rootRef.current = createRoot(mount);

    // 정리 (언마운트 시 한 번)
    return () => {
      const root = rootRef.current;
      rootRef.current = null;
      styleElRef.current = null;
      // 렌더 사이클과 충돌 피하려고 지연 언마운트
      setTimeout(() => {
        try {
          root && root.unmount();
        } catch {
          //일단 비워놓기
        }
      }, 0);
    };
  }, []);

  // 2) headCSS 바뀔 때만 스타일 문구 갱신
  useEffect(() => {
    if (styleElRef.current) {
      styleElRef.current.textContent = `html,body,#root{height:100%;margin:0;padding:0;}\n${headCSS || ''}`;
    }
  }, [headCSS]);

  // 3) children 변경 시엔 root.render만 (unmount 금지)
  useEffect(() => {
    if (rootRef.current) {
      rootRef.current.render(children);
    }
  }, [children]);

  return (
    <iframe
      ref={iframeRef}
      sandbox='allow-same-origin allow-scripts'
      className={className}
      style={{ width: '100%', height: '100%', border: 0, ...style }}
      title='sandbox'
    />
  );
}
