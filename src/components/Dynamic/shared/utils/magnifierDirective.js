// v-magnifier.js — стабильная лупа без zoom, без фликов
export const magnifierDirective = {
  created(el) { el.__magnifier__ = null; },

  mounted(el, binding) {
    const opts = Object.assign({
      size: 160,
      border: '2px solid rgba(0,0,0,.35)',
      shadow: '0 6px 18px rgba(0,0,0,.25)',
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
    const lens   = document.createElement('div');
    const circle = document.createElement('div');
    const handle = document.createElement('div');

    Object.assign(lens.style, {
      position: useFixed ? 'fixed' : 'absolute',
      width: `${opts.size}px`,
      height: `${opts.size}px`,
      pointerEvents: 'none',
      zIndex: String(opts.zIndex),
      transform: 'translate(-9999px,-9999px)',
      willChange: 'transform'
    });
    Object.assign(circle.style, {
      position: 'absolute',
      inset: 0,
      borderRadius: '50%',
      border: opts.border,
      boxShadow: opts.shadow,
      background: 'radial-gradient(closest-side, rgba(255,255,255,.10), rgba(255,255,255,0))'
    });
    const updateHandle = () => {
      const w = Math.round(opts.size * 0.55);
      handle.innerHTML = `
        <svg width="${w}" height="${Math.round(w*0.35)}" viewBox="0 0 200 70" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <rect x="0" y="20" rx="18" ry="18" width="160" height="30" fill="rgba(0,0,0,0.35)"/>
          <rect x="12" y="26" rx="12" ry="12" width="136" height="18" fill="rgba(255,255,255,0.25)"/>
        </svg>`;
      Object.assign(handle.style, {
        position: 'absolute',
        right: '-28%',
        bottom: '-20%',
        transform: 'rotate(35deg)',
        pointerEvents: 'none',
        filter: 'drop-shadow(0 3px 6px rgba(0,0,0,.25))'
      });
    };
    updateHandle();

    lens.appendChild(circle);
    lens.appendChild(handle);
    document.body.appendChild(lens);

    // --- состояние
    let enabled = false;
    let active  = false;
    let frame   = null;
    let rect    = null;
    let lastMoveEvent = null;
    let outsideSince = 0; // анти-фликер

    const setCursorHidden = (hide) => { if (!opts.showCursor) el.style.cursor = hide ? 'none' : ''; };
    const show = () => { if (!enabled || active) return; active = true; setCursorHidden(true); };
    const hide = () => {
      if (!active) return;
      active = false;
      setCursorHidden(false);
      lens.style.transform = 'translate(-9999px,-9999px)';
    };

    // пересчёт границ (лёгкий)
    const updateRect = () => { rect = el.getBoundingClientRect(); };

    const insideHost = (cx, cy) => {
      // актуальные границы на каждый кадр — без лагов при респонсиве
      if (!rect) updateRect();
      return cx >= rect.left && cx <= rect.right && cy >= rect.top && cy <= rect.bottom;
    };

    const move = (e) => {
      if (!enabled) { hide(); return; }
      updateRect();

      const cx = e.clientX, cy = e.clientY;
      const vw = window.innerWidth, vh = window.innerHeight;

      // вылет из окна
      if (cx <= 0 || cy <= 0 || cx >= vw || cy >= vh) { hide(); outsideSince = 0; return; }

      // геометрия + анти-фликер (30мс ~= 2 кадра на 60Hz)
      const nowInside = insideHost(cx, cy);
      const t = performance.now();
      if (!nowInside) {
        if (outsideSince === 0) outsideSince = t;
        if (t - outsideSince >= 30) { hide(); }
        return;
      }
      outsideSince = 0;

      if (!active) show();

      const vx = useFixed ? cx : e.pageX;
      const vy = useFixed ? cy : e.pageY;
      const x  = vx - opts.size/2;
      const y  = vy - opts.size/2;
      lens.style.transform = `translate(${x}px, ${y}px)`;
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
      // pointerout обработчик был анонимным — добавим отдельный для удаления, если нужно.
      // здесь можно не убирать — он безвреден при disabled.
      document.removeEventListener('pointerleave', onLeaveEverywhere, true);
      window.removeEventListener('blur', onBlurOrHidden);
      document.removeEventListener('visibilitychange', onBlurOrHidden);
      window.removeEventListener('resize', updateRect);
      window.removeEventListener('scroll', updateRect);
    };

    // локальные hover-сигналы для быстрого старта/сброса курсора
    el.addEventListener('pointerenter', () => { if (enabled) show(); }, { passive: true });
    el.addEventListener('pointerleave', () => { hide(); }, { passive: true });

    // --- контроллер
    const controller = {
      enable()  { if (enabled) return; enabled = true; updateRect(); attachGlobal(); },
      disable() { if (!enabled) return; enabled = false; detachGlobal(); hide(); },
      setSize(px) {
        const nv = Math.max(80, Number(px) || 160);
        if (nv === opts.size) return;
        opts.size = nv;
        lens.style.width = lens.style.height = `${nv}px`;
        updateHandle();
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
