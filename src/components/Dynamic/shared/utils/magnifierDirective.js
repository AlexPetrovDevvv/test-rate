export const magnifierDirective = {
  created(el) { el.__magnifier__ = null; },

  mounted(el, binding) {
    const opts = Object.assign({
      size: 160,                      // теперь это «общий» размер лупы (ручки)
      zIndex: 2147483000,
      showCursor: false
    }, binding?.value || {});

    // fixed ломается у трансформ-предков → fallback на absolute
    const hasTransformedAncestor = (node) => {
      let p = node.parentElement;
      while (p && p !== document.body) {
        const cs = getComputedStyle(p);
        if (cs.transform !== 'none' || cs.filter !== 'none' ||
            cs.perspective !== 'none' || cs.willChange.includes('transform')) return true;
        p = p.parentElement;
      }
      return false;
    };
    const useFixed = !hasTransformedAncestor(el);

    // --- DOM
    const lens   = document.createElement('div');   // контейнер-трекер (без круга)
    const handle = document.createElement('div');   // одна только ручка (svg)

    Object.assign(lens.style, {
      position: useFixed ? 'fixed' : 'absolute',
      width: `${opts.size}px`,
      height: `${opts.size}px`,
      pointerEvents: 'none',
      zIndex: String(opts.zIndex),
      transform: 'translate(-9999px,-9999px)',
      willChange: 'transform',
      backfaceVisibility: 'hidden'
    });

    // актуальный визуальный размер ручки (для центрирования)
    let visualSize = opts.size;

    const updateHandle = () => {
      // ручку делаем пропорциональной заданному размеру
      const w = Math.max(100, Math.round(opts.size)); // можно менять формулу по вкусу
      visualSize = w;
      handle.innerHTML = `
        <svg width="${w}" height="${w}" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style="display:block">
<path d="M59.8399 62.6902L92.1899 98.7602C92.2526 98.8297 92.335 98.8784 92.4261 98.8999C92.5173 98.9213 92.6128 98.9144 92.6999 98.8802C93.974 98.5513 95.1528 97.9274 96.1413 97.0589C97.1297 96.1903 97.9 95.1014 98.3899 93.8802C98.5159 93.5588 98.5159 93.2016 98.3899 92.8802L64.0999 58.7402C64.026 58.6671 63.93 58.6207 63.8268 58.608C63.7237 58.5953 63.6193 58.6172 63.5299 58.6702C62.0197 59.4968 60.7355 60.6815 59.7899 62.1202C59.7389 62.2089 59.7164 62.3111 59.7253 62.413C59.7342 62.515 59.7742 62.6117 59.8399 62.6902Z" fill="#1E1D1E"/>
<path d="M59.6299 62.4595C59.9645 61.5067 60.5265 60.6499 61.2671 59.9634C62.0077 59.2768 62.9045 58.7812 63.8799 58.5195L70.4399 65.0995C70.0889 66.1491 69.4516 67.0797 68.6 67.7865C67.7483 68.4932 66.7162 68.948 65.6199 69.0995L59.6299 62.4595Z" fill="#E51C3C"/>
<path d="M61 61.5001C61 61.5001 62 60.5001 62.58 59.8301L69.65 66.6601C69.1379 67.5467 68.3569 68.2472 67.42 68.6601L61 61.5001Z" fill="#FF5573"/>
<path d="M67.3999 68.6301L94.6099 98.1301C95.9258 97.4601 97.0147 96.4165 97.7399 95.1301L69.6399 66.6602C69.0985 67.5189 68.3207 68.2029 67.3999 68.6301Z" fill="#2D2D2D"/>
<path d="M62.1101 64.5097C63.6725 63.9381 64.9829 62.8331 65.8101 61.3896C65.5382 62.1987 65.0494 62.9175 64.3969 63.4677C63.7445 64.0179 62.9534 64.3783 62.1101 64.5097Z" fill="#EF7B9D"/>
<path d="M63 65.6005C64.5614 65.0314 65.8693 63.9255 66.69 62.4805C66.4199 63.2887 65.9329 64.0072 65.2821 64.5574C64.6314 65.1077 63.8419 65.4685 63 65.6005Z" fill="#EF7B9D"/>
<path d="M64.05 66.66C65.6114 66.091 66.9194 64.9851 67.74 63.54C67.4729 64.35 66.9868 65.0702 66.3355 65.6209C65.6842 66.1716 64.8932 66.5313 64.05 66.66Z" fill="#EF7B9D"/>
<path d="M37.64 68.9596C56.0918 68.9596 71.05 54.0015 71.05 35.5496C71.05 17.0978 56.0918 2.13965 37.64 2.13965C19.1881 2.13965 4.22998 17.0978 4.22998 35.5496C4.22998 54.0015 19.1881 68.9596 37.64 68.9596Z" stroke="#1E1D1E" stroke-width="3" stroke-miterlimit="10"/>
<path d="M37.64 68.9596C56.0918 68.9596 71.05 54.0015 71.05 35.5496C71.05 17.0978 56.0918 2.13965 37.64 2.13965C19.1881 2.13965 4.22998 17.0978 4.22998 35.5496C4.22998 54.0015 19.1881 68.9596 37.64 68.9596Z" stroke="#353535" stroke-miterlimit="10"/>
<path d="M13.24 10.6001C24.25 -0.289868 41.78 -2.99987 55.2 5.00013C59.5395 7.61474 63.2859 11.1058 66.2 15.2501C52.8 -1.45987 29.39 -3.21987 13.24 10.6001Z" fill="#6A6A6A"/>
</svg>`;
      Object.assign(handle.style, {
        position: 'absolute',
        left: '0',
        top: '0',
        width: `${w}px`,
        height: `${w}px`,
        pointerEvents: 'none',
        filter: 'drop-shadow(0 3px 6px rgba(0,0,0,.25))'
      });
      lens.style.width = lens.style.height = `${w}px`;
    };
    updateHandle();

    lens.appendChild(handle);
    document.body.appendChild(lens);

    // --- состояние
    let enabled = false;
    let active  = false;
    let frame   = null;
    let rect    = null;
    let lastMoveEvent = null;
    let outsideSince = 0;

    const setCursorHidden = (hide) => { if (!opts.showCursor) el.style.cursor = hide ? 'none' : ''; };
    const show = () => { if (!enabled || active) return; active = true; setCursorHidden(true); };
    const hide = () => {
      if (!active) return;
      active = false;
      setCursorHidden(false);
      lens.style.transform = 'translate(-9999px,-9999px)';
    };

    const updateRect = () => { rect = el.getBoundingClientRect(); };
    const insideHost = (cx, cy) => {
      if (!rect) updateRect();
      return cx >= rect.left && cx <= rect.right && cy >= rect.top && cy <= rect.bottom;
    };

    const move = (e) => {
      if (!enabled) { hide(); return; }
      updateRect();

      const cx = e.clientX, cy = e.clientY;
      const vw = window.innerWidth, vh = window.innerHeight;

      if (cx <= 0 || cy <= 0 || cx >= vw || cy >= vh) { hide(); outsideSince = 0; return; }

      const nowInside = insideHost(cx, cy);
      const t = performance.now();
      if (!nowInside) {
        if (outsideSince === 0) outsideSince = t;
        if (t - outsideSince >= 30) { hide(); }
        return;
      }
      outsideSince = 0;

      if (!active) show();

      // единая система координат: clientX/clientY + скролл для absolute
      const scrollX = window.pageXOffset || document.documentElement.scrollLeft || 0;
      const scrollY = window.pageYOffset || document.documentElement.scrollTop  || 0;
      const baseX = cx + (useFixed ? 0 : scrollX);
      const baseY = cy + (useFixed ? 0 : scrollY);

      const x = Math.round(baseX - visualSize / 2);
      const y = Math.round(baseY - visualSize / 2);
      lens.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };

    const onDocPointerMove = (e) => {
      lastMoveEvent = e;
      if (!enabled) return;
      if (frame) return;
      frame = requestAnimationFrame(() => { frame = null; move(lastMoveEvent); });
    };

    const onLeaveEverywhere = () => hide();
    const onBlurOrHidden = () => hide();

    const attachGlobal = () => {
      document.addEventListener('pointermove', onDocPointerMove, { passive: true, capture: true });
      document.addEventListener('pointerout', (e) => { if (e.relatedTarget == null) hide(); }, true);
      document.addEventListener('pointerleave', onLeaveEverywhere, true);
      window.addEventListener('blur', onBlurOrHidden);
      document.addEventListener('visibilitychange', onBlurOrHidden);
      window.addEventListener('resize', updateRect, { passive: true });
      window.addEventListener('scroll', updateRect, { passive: true });
    };
    const detachGlobal = () => {
      document.removeEventListener('pointermove', onDocPointerMove, true);
      document.removeEventListener('pointerleave', onLeaveEverywhere, true);
      window.removeEventListener('blur', onBlurOrHidden);
      document.removeEventListener('visibilitychange', onBlurOrHidden);
      window.removeEventListener('resize', updateRect);
      window.removeEventListener('scroll', updateRect);
    };

    el.addEventListener('pointerenter', () => { if (enabled) show(); }, { passive: true });
    el.addEventListener('pointerleave', () => { hide(); }, { passive: true });

    // --- контроллер
    const controller = {
      enable()  { if (enabled) return; enabled = true; updateRect(); attachGlobal(); },
      disable() { if (!enabled) return; enabled = false; detachGlobal(); hide(); },
      setSize(px) {
        const nv = Math.max(40, Number(px) || 160);
        if (nv === opts.size) return;
        opts.size = nv;
        updateHandle(); // пересчитает visualSize и размеры
      },
      refresh() { updateRect(); },
      destroy() {
        controller.disable();
        cancelAnimationFrame(frame);
        lens.remove();
        el.__magnifier__ = null;
      }
    };

    el.__magnifier__ = controller;
    el.dispatchEvent(new CustomEvent('magnifier-ready', { detail: controller }));
  },

  updated(el, binding) {
    const ctrl = el.__magnifier__;
    if (!ctrl) return;
    const v = binding?.value || {};
    if (typeof v.size === 'number') ctrl.setSize(v.size);
  },

  beforeUnmount(el) { el.__magnifier__?.destroy?.(); }
};