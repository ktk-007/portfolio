/* ===== CONFIG — fill these in; leave "" to keep the control inactive ===== */
const CFG = {
  github: "https://github.com/ktk-007",
  linkedin: "https://www.linkedin.com/in/ktkdee",
  email: "ktktharun.2007@gmail.com",
  resume: "assets/Tharun_Kumar_CVpdf.pdf"
}; // resume e.g. "/resume.pdf"
/* ======================================================================== */

const $ = s => document.querySelector(s), hero = $('#top');
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const canHover = matchMedia('(hover:hover) and (pointer:fine)').matches;

/* links */
function wire(el, url, pre = '') {
  if (url) {
    el.href = pre + url;
    if (/^https?:/.test(url)) {
      el.target = '_blank';
      el.rel = 'noopener';
    }
  } else {
    el.setAttribute('aria-disabled', 'true');
    el.title = 'Add this link in CFG';
    el.addEventListener('click', e => e.preventDefault());
  }
}

const gmailUrl = CFG.email ? `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(CFG.email)}` : '';
const hireMailUrl = CFG.email ? `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(CFG.email)}&su=${encodeURIComponent('Opportunity / Hiring — Tharun Kumar')}` : '';

wire($('#gh'), CFG.github);
wire($('#li'), CFG.linkedin);
wire($('#em'), gmailUrl);
wire($('#resume'), CFG.resume);
wire($('#hireBtn'), hireMailUrl);

document.querySelectorAll('[data-soon]').forEach(a => {
  a.title = 'Coming soon';
  a.addEventListener('click', e => e.preventDefault());
});

document.querySelectorAll('[data-home]').forEach(a => a.addEventListener('click', e => {
  e.preventDefault();
  scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  closeMenu();
}));

/* mobile menu */
const btn = $('#menuBtn'), panel = $('#mpanel');
function closeMenu() {
  panel.hidden = true;
  btn.setAttribute('aria-expanded', 'false');
  btn.setAttribute('aria-label', 'Open menu');
}

btn.addEventListener('click', () => {
  const o = panel.hidden;
  panel.hidden = !o;
  btn.setAttribute('aria-expanded', o);
  btn.setAttribute('aria-label', o ? 'Close menu' : 'Open menu');
  if (o) panel.querySelector('a').focus();
});

panel.addEventListener('click', e => {
  if (e.target.closest('a')) closeMenu();
});

addEventListener('keydown', e => {
  if (e.key === 'Escape' && !panel.hidden) {
    closeMenu();
    btn.focus();
  }
});

matchMedia('(min-width:768px)').addEventListener('change', e => {
  if (e.matches) closeMenu();
});

/* ===== particles: port of Antigravity's "main particles" sim (ring around the cursor, noise-driven liquid motion) ===== */
const pc = $('#particles'), px = pc.getContext('2d');
let PW = 0, PH = 0, KK = 1, SZ = 3, parts = [], T = 0, last = 0, I = 0;
const mouse = { x: -9999, y: -9999 }, ring = { u: 0, v: 0 };

/* 3D simplex noise */
const PM = new Uint8Array(512), GR = [1, 1, 0, -1, 1, 0, 1, -1, 0, -1, -1, 0, 1, 0, 1, -1, 0, 1, 1, 0, -1, -1, 0, -1, 0, 1, 1, 0, -1, 1, 0, 1, -1, 0, -1, -1];
(() => {
  const p = [...Array(256).keys()];
  for (let i = 255; i > 0; i--) {
    const j = Math.random() * (i + 1) | 0;
    [p[i], p[j]] = [p[j], p[i]];
  }
  for (let i = 0; i < 512; i++) PM[i] = p[i & 255];
})();

function sn(x, y, z) {
  const s = (x + y + z) / 3, i = Math.floor(x + s), j = Math.floor(y + s), k = Math.floor(z + s);
  const t = (i + j + k) / 6, x0 = x - i + t, y0 = y - j + t, z0 = z - k + t;
  let a, b, c, d, e, f;
  if (x0 >= y0) {
    if (y0 >= z0) { a = 1; b = 0; c = 0; d = 1; e = 1; f = 0; }
    else if (x0 >= z0) { a = 1; b = 0; c = 0; d = 1; e = 0; f = 1; }
    else { a = 0; b = 0; c = 1; d = 1; e = 0; f = 1; }
  } else {
    if (y0 < z0) { a = 0; b = 0; c = 1; d = 0; e = 1; f = 1; }
    else if (x0 < z0) { a = 0; b = 1; c = 0; d = 0; e = 1; f = 1; }
    else { a = 0; b = 1; c = 0; d = 1; e = 1; f = 0; }
  }
  const ii = i & 255, jj = j & 255, kk = k & 255;
  let n = 0;
  const g = (X, Y, Z, A, B, C) => {
    let q = 0.6 - X * X - Y * Y - Z * Z;
    if (q > 0) {
      const h = PM[ii + A + PM[jj + B + PM[kk + C]]] % 12 * 3;
      q *= q;
      n += q * q * (GR[h] * X + GR[h + 1] * Y + GR[h + 2] * Z);
    }
  };
  g(x0, y0, z0, 0, 0, 0);
  g(x0 - a + 1 / 6, y0 - b + 1 / 6, z0 - c + 1 / 6, a, b, c);
  g(x0 - d + 1 / 3, y0 - e + 1 / 3, z0 - f + 1 / 3, d, e, f);
  g(x0 - 0.5, y0 - 0.5, z0 - 0.5, 1, 1, 1);
  return 32 * n;
}

const ss = (a, b, x) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

/* Poisson-disk distribution (as in the original) */
function poisson(w, h, r) {
  const cs = r / Math.SQRT2, gw = Math.ceil(w / cs), gh = Math.ceil(h / cs);
  const g = new Int32Array(gw * gh).fill(-1), pts = [], act = [];
  const add = (x, y) => {
    pts.push([x, y]);
    g[(y / cs | 0) * gw + (x / cs | 0)] = pts.length - 1;
    act.push(pts.length - 1);
  };
  add(Math.random() * w, Math.random() * h);
  while (act.length) {
    const ai = Math.random() * act.length | 0, [ax, ay] = pts[act[ai]];
    let ok = false;
    for (let k = 0; k < 20 && !ok; k++) {
      const an = Math.random() * 6.2832, d = r * (1 + Math.random()), x = ax + Math.cos(an) * d, y = ay + Math.sin(an) * d;
      if (x < 0 || y < 0 || x >= w || y >= h) continue;
      const gx = x / cs | 0, gy = y / cs | 0;
      let bad = false;
      for (let j = Math.max(0, gy - 2); j <= Math.min(gh - 1, gy + 2) && !bad; j++) {
        for (let i = Math.max(0, gx - 2); i <= Math.min(gw - 1, gx + 2); i++) {
          const q = g[j * gw + i];
          if (q >= 0) {
            const dx = pts[q][0] - x, dy = pts[q][1] - y;
            if (dx * dx + dy * dy < r * r) {
              bad = true;
              break;
            }
          }
        }
      }
      if (!bad) {
        add(x, y);
        ok = true;
      }
    }
    if (!ok) act.splice(ai, 1);
  }
  return pts;
}

const C1 = [44, 100, 237], C2 = [248, 66, 66], C3 = [162, 28, 175]; /* blue → red → violet */
function initP() {
  const r = hero.getBoundingClientRect(), d = Math.min(devicePixelRatio || 1, 2);
  PW = r.width;
  PH = r.height;
  pc.width = PW * d;
  pc.height = PH * d;
  px.setTransform(d, 0, 0, d, 0, 0);
  px.lineCap = 'round';
  KK = 1.55 * Math.min(PH, PW * 1.1);
  SZ = Math.min(3.2, Math.max(2.2, PW * 0.0017));
  const m = 90, pts = poisson(PW + 2 * m, PH + 2 * m, Math.max(22, 0.021 * KK));
  parts = pts.map(([x, y]) => ({
    u: (x - m - PW / 2) / KK,
    v: (PH / 2 - (y - m)) / KK,
    s: 0,
    vel: 0,
    qx: 0,
    qy: 0
  }));
}

function drawP(dt) {
  px.clearRect(0, 0, PW, PH);
  const f = Math.min(3, dt * 60), on = mouse.x > -9000;
  if (!reduce) T += dt;
  I += ((on ? 1 : 0) - I) * (reduce ? 1 : 1 - Math.exp(-dt * 4));
  const tu = on ? (mouse.x - PW / 2) / KK : 0;
  const tv = on ? (PH / 2 - mouse.y) / KK : 0;
  const wu = reduce ? 0 : (Math.sin(T * 0.66 + 1.3) + Math.sin(T * 1.1)) * 0.012;
  const wv = reduce ? 0 : (Math.sin(T * 0.75 + 2.1) + Math.sin(T * 0.9)) * 0.01;
  const k = reduce ? 1 : 1 - Math.pow(0.97, f);
  ring.u += (tu + wu - ring.u) * k;
  ring.v += (tv + wv - ring.v) * k;
  if (I < 0.004) return;
  const R = 0.175 + Math.sin(T) * 0.03 + Math.cos(3 * T) * 0.02, W = 0.15, W2 = 0.05, D = 0.15, cut = R + W + 0.03;
  const ka = reduce ? 1 : 1 - Math.pow(0.8, f), dq = Math.pow(0.2, f), dv = Math.pow(0.5, f);
  const cx = PW / 2, cy = PH / 2, rsx = cx + ring.u * KK, rsy = cy - ring.v * KK;

  for (const p of parts) {
    const cu = p.u, cv = p.v, dist = Math.hypot(cu - ring.u, cv - ring.v);
    let tot = 0;
    if (dist < cut) {
      const n0 = sn(cu * 0.2 + 18.4924, cv * 0.2 + 72.9744, T * 0.25);
      const dist1 = Math.hypot(cu + n0 * 0.005 - ring.u, cv + n0 * 0.005 - ring.v);
      let t = Math.max(0, ss(R - 2 * W, R, dist) - ss(R, R + W, dist1));
      let t2 = Math.max(0, ss(R - 2 * W2, R, dist) - ss(R, R + W2, dist1));
      let t3 = ss(R + W2, R, dist);
      t *= t;
      t2 = t2 * t2 * t2;
      t += t2 * 3 + t3 * 0.4 + sn(cu * 30 + 11.4924, cv * 30 + 12.9744, T * 0.25) * t3 * 0.5;
      tot = t * I;
      p.t2 = t2;
    }
    if (tot <= 0 && p.s < 0.01) {
      p.s = 0;
      p.vel = 0;
      continue;
    }
    p.s += (tot - p.s) * ka;
    p.vel = p.vel * dv + p.s * 0.5 * (1 - dv);
    if (p.s < 0.1) continue;

    const n1 = sn(cu * 4 + 88.494, cv * 4 + 32.4397, T * 0.175);
    const n2 = sn(cu * 4 + 50.904, cv * 4 + 120.947, T * 0.175);
    const n3 = sn(cu * 20 + 18.4924, cv * 20 + 72.9744, T * 0.25);
    const n4 = sn(cu * 20 + 50.904, cv * 20 + 120.947, T * 0.25);
    const cd = Math.min(1, dist);
    const dx = n1 * 0.03 + n3 * 0.005 + Math.sin(cu * 20 + T * 2) * 0.02 * cd;
    const dy = n2 * 0.03 + n4 * 0.005 + Math.cos(cv * 20 + T * 1.5) * 0.02 * cd;
    const pk = D * Math.pow(p.t2 || 0, 0.75);
    p.qx = p.qx * dq + 0.25 * (cu + dx - ring.u) * pk;
    p.qy = p.qy * dq + 0.25 * (cv + dy - ring.v) * pk;
    const fu = cu + dx + p.qx, fv = cv + dy + p.qy;
    const sx = cx + fu * KK, sy = cy - fv * KK;
    const ang = Math.atan2(sy - rsy, sx - rsx) + sn(fu * 10 + 18.4924, fv * 10 + 72.9744, T * 0.85) * 0.5;
    const nc = (sn(fu * 2 + 74.664, fv * 2 + 91.556, T * 0.5) + 1) / 2;
    const pr = ss(0, 0.75, nc * nc), h = 0.8;
    let a = C1, b = C2, m = pr / h;
    if (pr >= h) {
      a = C2;
      b = C3;
      m = (pr - h) / (1 - h);
    }
    const vl = Math.min(1, p.vel);
    const r = (a[0] + (b[0] - a[0]) * m) * vl | 0;
    const g = (a[1] + (b[1] - a[1]) * m) * vl | 0;
    const bl = (a[2] + (b[2] - a[2]) * m) * vl | 0;
    const size = p.s * SZ, th = Math.max(0.5, size * 0.4);
    const len = Math.max(0, size - th) / 2;
    const ux = Math.cos(ang) * len, uy = Math.sin(ang) * len;

    px.globalAlpha = ss(0.1, 0.2, p.s);
    px.strokeStyle = `rgb(${r},${g},${bl})`;
    px.lineWidth = th;
    px.beginPath();
    px.moveTo(sx - ux, sy - uy);
    px.lineTo(sx + ux, sy + uy);
    px.stroke();
  }
  px.globalAlpha = 1;
}

function loopP(ts) {
  const dt = Math.min(0.05, (ts - last) / 1000 || 0.016);
  last = ts;
  if (!document.hidden && !heroCovered) drawP(dt);
  requestAnimationFrame(loopP);
}

function setM(e) {
  const r = hero.getBoundingClientRect();
  mouse.x = e.clientX - r.left;
  mouse.y = e.clientY - r.top;
}

addEventListener('pointermove', setM, { passive: true });
addEventListener('pointerdown', setM, { passive: true });
const offM = () => { mouse.x = mouse.y = -9999; };
document.addEventListener('pointerleave', offM);
addEventListener('pointerup', e => { if (e.pointerType !== 'mouse') offM(); });
addEventListener('pointercancel', offM);
addEventListener('blur', offM);

/* ===== ASCII lens ===== */
const img = $('#pimg'), lens = $('#lens'), lx = lens.getContext('2d'), wrap = $('#portrait');
const RAMP = " .,:;-~=+*xX#%@", CW = 3, CH = 5;
let layer = null, LW = 0, LH = 0, dpr = 1, R = 90;

function buildAscii() {
  if (!img.naturalWidth) return;
  const r = img.getBoundingClientRect();
  LW = Math.round(r.width);
  LH = Math.round(r.height);
  if (!LW || !LH) return;
  dpr = Math.min(devicePixelRatio || 1, 2);
  lens.width = LW * dpr;
  lens.height = LH * dpr;
  R = Math.max(70, Math.min(100, LW * 0.105));
  const cols = Math.floor(LW / CW), rows = Math.floor(LH / CH), S = 2, n = cols * rows;
  const sc = document.createElement('canvas');
  sc.width = cols * S;
  sc.height = rows * S;
  const sx = sc.getContext('2d', { willReadFrequently: true });
  sx.imageSmoothingQuality = 'high';
  sx.drawImage(img, 0, 0, sc.width, sc.height);
  const d = sx.getImageData(0, 0, sc.width, sc.height).data, W2 = sc.width;
  let lum = new Float32Array(n), al = new Float32Array(n);
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      let sl = 0, sa = 0;
      for (let j = 0; j < S; j++) {
        for (let i = 0; i < S; i++) {
          const k = ((y * S + j) * W2 + x * S + i) * 4, a = d[k + 3] / 255;
          sl += (0.299 * d[k] + 0.587 * d[k + 1] + 0.114 * d[k + 2]) * a;
          sa += a;
        }
      }
      lum[y * cols + x] = sa ? sl / sa / 255 : 0;
      al[y * cols + x] = sa / (S * S);
    }
  }

  /* equalise over the subject only, blended with the original tones */
  const h = new Float32Array(256);
  let tot = 0;
  for (let i = 0; i < n * 0.6 | 0; i++) {
    if (al[i] > 0.5) {
      h[lum[i] * 255 | 0]++;
      tot++;
    }
  }
  for (let i = 1; i < 256; i++) h[i] += h[i - 1];
  const v = new Float32Array(n);
  for (let i = 0; i < n; i++) v[i] = 0.7 * (h[lum[i] * 255 | 0] / (tot || 1)) + 0.3 * lum[i];

  /* local contrast: features stand out from their surroundings instead of the whole face going pale */
  {
    const R = 7, W = cols + 1, Iq = new Float64Array(W * (rows + 1));
    for (let y = 0; y < rows; y++) {
      let rs = 0;
      for (let x = 0; x < cols; x++) {
        rs += v[y * cols + x];
        Iq[(y + 1) * W + x + 1] = Iq[y * W + x + 1] + rs;
      }
    }
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const x0 = Math.max(0, x - R), x1 = Math.min(cols, x + R + 1), y0 = Math.max(0, y - R), y1 = Math.min(rows, y + R + 1),
          a = (Iq[y1 * W + x1] - Iq[y0 * W + x1] - Iq[y1 * W + x0] + Iq[y0 * W + x0]) / ((x1 - x0) * (y1 - y0)),
          o = v[y * cols + x];
        v[y * cols + x] = Math.min(1, Math.max(0, 0.55 * a + 1.9 * (o - a) + 0.06));
      }
    }
  }

  /* unsharp mask on the cell grid */
  const out = new Float32Array(n);
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      let s = 0, c = 0;
      for (let j = -1; j <= 1; j++) {
        for (let i = -1; i <= 1; i++) {
          const xx = x + i, yy = y + j;
          if (xx >= 0 && yy >= 0 && xx < cols && yy < rows) {
            s += v[yy * cols + xx];
            c++;
          }
        }
      }
      const o = v[y * cols + x];
      out[y * cols + x] = Math.min(1, Math.max(0, o + 1 * (o - s / c)));
    }
  }

  layer = document.createElement('canvas');
  layer.width = LW * dpr;
  layer.height = LH * dpr;
  const lc = layer.getContext('2d');
  lc.drawImage(img, 0, 0, layer.width, layer.height);
  lc.globalCompositeOperation = 'source-in';
  lc.fillStyle = '#fff';
  lc.fillRect(0, 0, layer.width, layer.height);

  G = {
    cols,
    rows,
    al,
    ink: out.map(v => 1 - Math.pow(v, 1.1)),
    spd: Float32Array.from({ length: cols }, () => 7 + Math.random() * 16),
    ph: Float32Array.from({ length: cols }, () => Math.random() * (rows + 40)),
    len: Float32Array.from({ length: cols }, () => 10 + Math.random() * 22)
  };
}

let G = null;
/* waterfall: every column has its own falling streams; the face stays readable underneath */
function drawRain(t) {
  const { cols, rows, al, ink, spd, ph, len } = G, n = RAMP.length, R2 = rad * rad,
    c0 = Math.max(0, Math.floor((cx - rad) / CW)), c1 = Math.min(cols - 1, Math.ceil((cx + rad) / CW)),
    r0 = Math.max(0, Math.floor((cy - rad) / CH)), r1 = Math.min(rows - 1, Math.ceil((cy + rad) / CH));
  lx.setTransform(dpr, 0, 0, dpr, 0, 0);
  lx.font = '5px "JetBrains Mono",ui-monospace,Menlo,monospace';
  lx.textBaseline = 'top';
  let cur = '';
  for (let c = c0; c <= c1; c++) {
    const L = len[c], per = rows + L, h1 = (t * spd[c] + ph[c]) % per, h2 = (h1 + per / 2) % per;
    for (let r = r0; r <= r1; r++) {
      const i = r * cols + c;
      if (al[i] < 0.5) continue;
      const mx = (c + 0.5) * CW - cx, my = (r + 0.5) * CH - cy;
      if (mx * mx + my * my > R2) continue;
      let b = 0, d = h1 - r;
      if (d >= 0 && d < L) b = Math.pow(1 - d / L, 1.6);
      d = h2 - r;
      if (d >= 0 && d < L) b = Math.max(b, Math.pow(1 - d / L, 1.6));
      if (reduce) b = 0;
      const idx = Math.min(n - 1, Math.max(0, Math.floor((ink[i] * (0.85 + 0.2 * b) + b * 0.14) * n)));
      if (!idx) continue;
      const col = b > 0.85 ? '#2c64ed' : '#0a0a0a';
      if (col !== cur) {
        lx.fillStyle = col;
        cur = col;
      }
      lx.fillText(RAMP[idx], c * CW, r * CH);
    }
  }
}

let tx = 0, ty = 0, cx = 0, cy = 0, rad = 0, rt = 0, active = false, raf = 0;
function frame() {
  raf = 0;
  const k = reduce ? 1 : 0.28;
  cx += (tx - cx) * k;
  cy += (ty - cy) * k;
  rad += (rt - rad) * (reduce ? 1 : 0.22);
  lx.clearRect(0, 0, lens.width, lens.height);
  if (rad > 0.5 && layer && G) {
    lx.save();
    lx.beginPath();
    lx.arc(cx * dpr, cy * dpr, rad * dpr, 0, Math.PI * 2);
    lx.clip();
    lx.drawImage(layer, 0, 0);
    drawRain(performance.now() / 1000);
    lx.setTransform(1, 0, 0, 1, 0, 0);
    lx.globalCompositeOperation = 'destination-in';
    lx.drawImage(layer, 0, 0);
    lx.restore();
  }
  if (active || rad > 0.5 || Math.abs(tx - cx) > 0.3 || Math.abs(ty - cy) > 0.3) {
    raf = requestAnimationFrame(frame);
  }
}

const kick = () => { if (!raf) raf = requestAnimationFrame(frame); };
function pos(e) {
  const r = img.getBoundingClientRect();
  tx = e.clientX - r.left;
  ty = e.clientY - r.top;
}

if (canHover) {
  wrap.addEventListener('pointerenter', e => {
    if (!layer) return;
    pos(e);
    cx = tx;
    cy = ty;
    active = true;
    rt = R;
    kick();
  });
  wrap.addEventListener('pointermove', e => {
    if (!layer) return;
    pos(e);
    if (!active) {
      active = true;
      rt = R;
    }
    kick();
  });
  wrap.addEventListener('pointerleave', () => {
    active = false;
    rt = 0;
    kick();
  });
}

/* boot + resize */
function boot() {
  initP();
  buildAscii();
}

const imgReady = img.complete && img.naturalWidth ? Promise.resolve() : new Promise(r => {
  img.onload = r;
  img.onerror = r;
});
const fontReady = document.fonts ? document.fonts.load('5px "JetBrains Mono"').catch(() => {}) : Promise.resolve();
initP();
requestAnimationFrame(loopP);
Promise.all([imgReady, fontReady]).then(() => {
  try {
    buildAscii();
  } catch (e) {
    layer = null;
  }
});

let rz;
addEventListener('resize', () => {
  clearTimeout(rz);
  rz = setTimeout(() => {
    initP();
    try {
      buildAscii();
    } catch (e) {
      layer = null;
    }
    if (reduce) drawP(0);
  }, 150);
});

/* ===== scroll: a dome rises from the bottom and opens into the About section ===== */
const track = $('#track'), dome = $('#dome'), about = $('#about');
let heroCovered = false;

function updateScroll() {
  const vw = innerWidth, vh = hero.offsetHeight;
  const range = Math.max(1, track.offsetHeight - vh);
  const p = reduce ? 0 : Math.min(1, Math.max(0, (scrollY - track.offsetTop) / range));
  const e = p * p * (3 - 2 * p);
  const rMax = Math.hypot(vw / 2, vh) * 1.02;
  const r = rMax * e;
  const clip = `circle(${r}px at 50% 100%)`;
  dome.style.clipPath = clip;
  dome.style.webkitClipPath = clip;

  const aboutTop = about.getBoundingClientRect().top;
  heroCovered = reduce ? aboutTop <= 0 : p >= 1;

  hero.classList.toggle('covered', heroCovered);
  document.documentElement.classList.toggle('dark-page', heroCovered);
}

let scrollTick = false;
addEventListener('scroll', () => {
  if (scrollTick) return;
  scrollTick = true;
  requestAnimationFrame(() => {
    scrollTick = false;
    updateScroll();
  });
}, { passive: true });
addEventListener('resize', updateScroll);
if (document.fonts) document.fonts.ready.then(updateScroll);

document.querySelectorAll('[data-about]').forEach(a => a.addEventListener('click', e => {
  e.preventDefault();
  closeMenu();
  scrollTo({ top: about.getBoundingClientRect().top + scrollY, behavior: reduce ? 'auto' : 'smooth' });
}));

updateScroll();
