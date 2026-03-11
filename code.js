// ============================================================
// MAKI CRM � Plugin Figma  |  SESI�N 1: Fundaci�n + Dashboard
// ============================================================
// C�mo usar: Plugins ? Development ? Run last plugin (o cargar
// este code.js desde el manifest.json del directorio actual).
// Cada sesi�n AGREGA m�s frames. No borra los anteriores.
// ============================================================

// (no UI needed — plugin runs automatically)

// -- Iniciar autom�ticamente ---------------------------------


// -----------------------------------------------------------
//  TOKENS DE DISE�O (Maki brand)
// -----------------------------------------------------------
const T = {
  primary:      { r:0.094, g:0.506, b:0.522 },  // #188185
  primaryDark:  { r:0.051, g:0.373, b:0.384 },  // #0d5f62
  primaryLight: { r:0.114, g:0.639, b:0.659 },  // #1da3a8
  accent:       { r:0.176, g:0.831, b:0.749 },  // #2dd4bf
  bg:           { r:0.941, g:0.957, b:0.961 },  // #f0f4f5
  surface:      { r:1,     g:1,     b:1     },
  border:       { r:0.886, g:0.910, b:0.941 },  // #e2e8f0
  border2:      { r:0.945, g:0.961, b:0.976 },  // #f1f5f9
  text:         { r:0.118, g:0.161, b:0.235 },  // #1e293b
  textMuted:    { r:0.392, g:0.455, b:0.545 },  // #64748b
  success:      { r:0.086, g:0.639, b:0.290 },  // #16a34a
  warning:      { r:0.851, g:0.467, b:0.024 },  // #d97706
  danger:       { r:0.898, g:0.243, b:0.243 },  // #e53e3e
  info:         { r:0.008, g:0.518, b:0.780 },  // #0284c7
  purple:       { r:0.486, g:0.231, b:0.929 },  // #7c3aed
  white:        { r:1, g:1, b:1 },
  navy:         { r:0.031, g:0.082, b:0.153 },  // #0f1527 (sidebar old)
  sidebarBg:    { r:0.094, g:0.506, b:0.522 },  // usa primary
};

const BADGE = {
  blue:   { bg:{r:0.859,g:0.918,b:0.996}, fg:{r:0.114,g:0.306,b:0.851} },
  green:  { bg:{r:0.859,g:0.988,b:0.902}, fg:{r:0.082,g:0.502,b:0.239} },
  red:    { bg:{r:0.996,g:0.886,b:0.886}, fg:{r:0.725,g:0.110,b:0.110} },
  yellow: { bg:{r:0.996,g:0.976,b:0.761}, fg:{r:0.522,g:0.302,b:0.055} },
  orange: { bg:{r:1.000,g:0.929,b:0.835}, fg:{r:0.604,g:0.204,b:0.071} },
  purple: { bg:{r:0.953,g:0.910,b:1.000}, fg:{r:0.427,g:0.157,b:0.851} },
  gray:   { bg:{r:0.945,g:0.961,b:0.976}, fg:{r:0.278,g:0.349,b:0.451} },
  teal:   { bg:{r:0.800,g:0.941,b:0.945}, fg:{r:0.051,g:0.373,b:0.384} },
};

// -----------------------------------------------------------
//  HELPERS DE FIGMA
// -----------------------------------------------------------
async function loadFonts() {
  await Promise.all([
    figma.loadFontAsync({ family: 'Inter', style: 'Regular' }),
    figma.loadFontAsync({ family: 'Inter', style: 'Medium' }),
    figma.loadFontAsync({ family: 'Inter', style: 'Semi Bold' }),
    figma.loadFontAsync({ family: 'Inter', style: 'Bold' }),
  ]);
}

function solidPaint(c, a) {
  if (c && typeof c.a === 'number') { a = c.a; c = { r: c.r, g: c.g, b: c.b }; }
  return [{ type: 'SOLID', color: c, opacity: (a !== undefined ? a : 1) }];
}

function frame(name, w, h, opts = {}) {
  const f = figma.createFrame();
  f.name = name;
  f.resize(w, h);
  f.fills = solidPaint(opts.fill || T.surface);
  f.cornerRadius = opts.radius || 0;
  if (opts.stroke) { f.strokes = solidPaint(opts.stroke); f.strokeWeight = opts.strokeW || 1; }
  if (opts.clip !== false) f.clipsContent = true;
  f.layoutMode = opts.layout || 'NONE';
  if (opts.layout) {
    f.paddingLeft   = opts.pl || opts.px || opts.pad || 0;
    f.paddingRight  = opts.pr || opts.px || opts.pad || 0;
    f.paddingTop    = opts.pt || opts.py || opts.pad || 0;
    f.paddingBottom = opts.pb || opts.py || opts.pad || 0;
    f.itemSpacing   = opts.gap || 0;
    f.primaryAxisAlignItems   = opts.main || 'MIN';
    f.counterAxisAlignItems   = opts.cross || 'MIN';
    f.primaryAxisSizingMode   = opts.hug ? 'AUTO' : 'FIXED';
    f.counterAxisSizingMode   = opts.hugCross ? 'AUTO' : 'FIXED';
  }
  return f;
}

function txt(str, opts = {}) {
  const t = figma.createText();
  t.characters = String(str);
  t.fontName = { family: 'Inter', style: opts.weight || 'Regular' };
  t.fontSize = opts.size || 13;
  t.fills = solidPaint(opts.color || T.text);
  if (opts.align) t.textAlignHorizontal = opts.align;
  if (opts.wrap) { t.textAutoResize = 'HEIGHT'; t.layoutSizingHorizontal = 'FILL'; }
  else t.textAutoResize = 'WIDTH_AND_HEIGHT';
  if (opts.lineH) t.lineHeight = { value: opts.lineH, unit: 'PIXELS' };
  if (opts.letterSpacing) t.letterSpacing = { value: opts.letterSpacing, unit: 'PERCENT' };
  if (opts.truncate) { t.textAutoResize = 'NONE'; }
  return t;
}

function rect(w, h, fill, opts = {}) {
  const r = figma.createRectangle();
  r.resize(w, h);
  r.fills = solidPaint(fill, opts.alpha || 1);
  if (opts.radius) r.cornerRadius = opts.radius;
  if (opts.stroke) { r.strokes = solidPaint(opts.stroke); r.strokeWeight = opts.strokeW || 1; }
  return r;
}

function badge(label, color = 'blue') {
  const { bg, fg } = BADGE[color] || BADGE.gray;
  const f = frame('Badge', 10, 20, { fill: bg, radius: 999, layout: 'HORIZONTAL', px: 8, py: 3, hug: true, hugCross: true, cross: 'CENTER' });
  const t = txt(label, { size: 10, color: fg, weight: 'Semi Bold' });
  f.appendChild(t);
  f.primaryAxisSizingMode = 'AUTO';
  f.counterAxisSizingMode = 'AUTO';
  return f;
}

function avatar(initials, bg = null, size = 32) {
  const f = frame('Avatar', size, size, { fill: bg || T.primary, radius: size / 2 });
  const t = txt(initials, { size: size * 0.28, color: T.white, weight: 'Bold' });
  t.x = (size - t.width) / 2;
  t.y = (size - t.height) / 2;
  f.appendChild(t);
  return f;
}

function divider(w, vertical = false) {
  const r = rect(vertical ? 1 : w, vertical ? 20 : 1, T.border);
  r.name = 'Divider';
  return r;
}

function button(label, variant = 'primary', w = 0) {
  const fills = {
    primary:   { bg: T.primary,   fg: T.white,   stroke: null },
    secondary: { bg: T.surface,   fg: T.text,    stroke: T.border },
    ghost:     { bg: { r:0,g:0,b:0 }, fgC: T.textMuted, stroke: null, alpha: 0 },
    danger:    { bg: T.danger,    fg: T.white,   stroke: null },
    outline:   { bg: T.surface,   fg: T.primary, stroke: T.primary },
  };
  const v = fills[variant] || fills.primary;
  const f = frame('Button / ' + variant, w || 120, 34, {
    fill: v.bg, alpha: v.alpha,
    radius: 6,
    stroke: v.stroke,
    strokeW: 1,
    layout: 'HORIZONTAL', px: 14, py: 0,
    hug: !w, hugCross: true,
    main: 'CENTER', cross: 'CENTER', gap: 6,
  });
  if (v.alpha === 0) f.fills = [];
  else f.fills = solidPaint(v.bg);
  if (v.stroke) f.strokes = solidPaint(v.stroke);
  const t = txt(label, { size: 12, color: v.fg || v.fgC, weight: 'Medium' });
  f.appendChild(t);
  f.primaryAxisSizingMode = 'AUTO';
  f.counterAxisSizingMode = 'AUTO';
  return f;
}

// -----------------------------------------------------------
//  SIDEBAR (usado en todos los frames)
// -----------------------------------------------------------
const NAV = [
  { group: 'Principal',      items: [{ label: 'Dashboard',     icon: '||', badge: null,  active: false }] },
  { group: 'Ventas & CRM',   items: [
    { label: 'Contactos',    icon: '||', badge: null,  active: false },
    { label: 'Cuentas',      icon: '||', badge: null,  active: false },
    { label: 'Leads',        icon: '||', badge: '12',  active: false },
    { label: 'Oportunidades',icon: '||', badge: null,  active: false },
    { label: 'Actividades',  icon: '?', badge: '5',   active: false },
    { label: 'Calendario',   icon: '||', badge: null,  active: false },
  ]},
  { group: 'Comercial',      items: [
    { label: 'Productos',    icon: '||', badge: null,  active: false },
    { label: 'Cotizaciones', icon: '||', badge: '3',   active: false },
    { label: 'Facturas',     icon: '||', badge: null,  active: false },
  ]},
  { group: 'Marketing',      items: [{ label: 'Campa�as',      icon: '||', badge: null,  active: false }] },
  { group: 'Soporte',        items: [
    { label: 'Tickets',      icon: '||', badge: '8',   active: false },
    { label: 'Documentos',   icon: '||', badge: null,  active: false },
  ]},
  { group: 'An�lisis',       items: [{ label: 'Reportes',      icon: '||', badge: null,  active: false }] },
  { group: 'Administraci�n', items: [
    { label: 'Equipo',       icon: '||', badge: null,  active: false },
    { label: 'Configuraci�n',icon: '||', badge: null,  active: false },
  ]},
];

function buildSidebar(activeLabel = 'Dashboard') {
  const sb = frame('Sidebar', 260, 900, { fill: T.primary });
  sb.clipsContent = true;

  // Logo area
  const logoArea = frame('Logo', 260, 68, { fill: T.primary });
  logoArea.y = 0;

  // Logo box (white square with M)
  const logoBox = frame('LogoBox', 36, 36, { fill: T.white, radius: 8 });
  const logoLetter = txt('M', { size: 20, color: T.primary, weight: 'Bold' });
  logoLetter.x = (36 - logoLetter.width) / 2;
  logoLetter.y = (36 - logoLetter.height) / 2;
  logoBox.appendChild(logoLetter);
  logoBox.x = 20; logoBox.y = 16;
  logoArea.appendChild(logoBox);

  const logoTxt = txt('Maki', { size: 17, color: T.white, weight: 'Bold' });
  logoTxt.x = 64; logoTxt.y = 18;
  const logoSub = txt('Enterprise Suite', { size: 9, color: { r:1,g:1,b:1 }, weight: 'Semi Bold' });
  logoSub.fills = solidPaint(T.white, 0.55);
  logoSub.letterSpacing = { value: 8, unit: 'PERCENT' };
  logoSub.x = 64; logoSub.y = 38;
  logoArea.appendChild(logoTxt);
  logoArea.appendChild(logoSub);

  // Bottom divider line
  const logoDivider = rect(260, 1, T.white, { alpha: 0.08 });
  logoDivider.y = 67;
  logoArea.appendChild(logoDivider);

  sb.appendChild(logoArea);

  // NAV items
  let yPos = 76;
  for (const group of NAV) {
    // Group title
    const gTitle = txt(group.group.toUpperCase(), { size: 9, color: T.white, weight: 'Semi Bold' });
    gTitle.fills = solidPaint(T.white, 0.40);
    gTitle.letterSpacing = { value: 10, unit: 'PERCENT' };
    gTitle.x = 20; gTitle.y = yPos;
    sb.appendChild(gTitle);
    yPos += 22;

    for (const item of group.items) {
      const isActive = item.label === activeLabel;
      const itemH = 36;
      const itemBg = frame('NavItem ' + item.label, 260, itemH, { fill: T.primary });
      if (isActive) {
        itemBg.fills = solidPaint(T.white, 0.18);
        // left accent bar
        const accentBar = rect(3, itemH, T.white);
        accentBar.x = 0; accentBar.y = 0;
        itemBg.appendChild(accentBar);
      }
      itemBg.x = 0; itemBg.y = yPos;

      // Icon
      const iconTxt = txt(item.icon, { size: 13 });
      iconTxt.fills = solidPaint(T.white, isActive ? 1 : 0.72);
      iconTxt.x = isActive ? 23 : 20; iconTxt.y = (itemH - iconTxt.height) / 2;
      itemBg.appendChild(iconTxt);

      // Label
      const labelTxt = txt(item.label, { size: 12, color: T.white, weight: isActive ? 'Semi Bold' : 'Medium' });
      labelTxt.fills = solidPaint(T.white, isActive ? 1 : 0.72);
      labelTxt.x = isActive ? 43 : 40; labelTxt.y = (itemH - labelTxt.height) / 2;
      itemBg.appendChild(labelTxt);

      // Badge
      if (item.badge) {
        const badgeBg = frame('NavBadge', 24, 16, { fill: T.white, radius: 999 });
        badgeBg.fills = solidPaint(T.white, 0.25);
        const badgeTxt = txt(item.badge, { size: 9, color: T.white, weight: 'Bold' });
        badgeTxt.x = (24 - badgeTxt.width) / 2;
        badgeTxt.y = (16 - badgeTxt.height) / 2;
        badgeBg.appendChild(badgeTxt);
        badgeBg.x = 224; badgeBg.y = (itemH - 16) / 2;
        itemBg.appendChild(badgeBg);
      }

      sb.appendChild(itemBg);
      yPos += itemH;
    }
  }

  // User area at bottom
  const userArea = frame('UserArea', 260, 60, { fill: T.primary });
  userArea.fills = solidPaint(T.primaryDark, 0.3);
  userArea.y = 840;

  const topLine = rect(260, 1, T.white, { alpha: 0.12 });
  topLine.x = 0; topLine.y = 0;
  userArea.appendChild(topLine);

  const userAv = avatar('JM', T.white, 30);
  userAv.fills = solidPaint(T.white, 0.25);
  // initials in white
  const avInit = txt('JM', { size: 9, color: T.primary, weight: 'Bold' });
  avInit.x = (30 - avInit.width) / 2; avInit.y = (30 - avInit.height) / 2;
  userAv.appendChild(avInit);
  userAv.x = 16; userAv.y = 15;
  userArea.appendChild(userAv);

  const userName = txt('Juan Mart�nez', { size: 11, color: T.white, weight: 'Semi Bold' });
  userName.x = 52; userName.y = 16;
  const userRole = txt('Administrador', { size: 10, color: T.white, weight: 'Regular' });
  userRole.fills = solidPaint(T.white, 0.5);
  userRole.x = 52; userRole.y = 30;
  userArea.appendChild(userName);
  userArea.appendChild(userRole);

  const logoutTxt = txt('||', { size: 14 });
  logoutTxt.x = 228; logoutTxt.y = 22;
  userArea.appendChild(logoutTxt);

  sb.appendChild(userArea);
  return sb;
}

// -----------------------------------------------------------
//  HEADER
// -----------------------------------------------------------
function buildHeader(pageTitle = 'Panel de Control') {
  const h = frame('Header', 1180, 64, { fill: T.surface });
  h.strokes = solidPaint(T.border);
  h.strokeAlign = 'OUTSIDE';
  h.strokeTopWeight = 3;
  h.strokeBottomWeight  = 1;
  h.strokeLeftWeight  = 0;
  h.strokeRightWeight = 0;

  // Overwrite with teal top border using a rect
  const topBorder = rect(1180, 3, T.primary);
  topBorder.x = 0; topBorder.y = 0;
  h.appendChild(topBorder);

  // Breadcrumb
  const bcMaki = txt('Maki', { size: 12, color: T.primaryLight, weight: 'Medium' });
  bcMaki.x = 20; bcMaki.y = 26;
  const bcSep = txt('�', { size: 12, color: T.border });
  bcSep.x = bcMaki.x + bcMaki.width + 6; bcSep.y = 26;
  const bcPage = txt(pageTitle, { size: 12, color: T.text, weight: 'Semi Bold' });
  bcPage.x = bcSep.x + bcSep.width + 6; bcPage.y = 26;
  h.appendChild(bcMaki);
  h.appendChild(bcSep);
  h.appendChild(bcPage);

  // Search bar
  const searchBox = frame('SearchBox', 260, 34, { fill: { r:0.972,g:0.980,b:0.992 }, radius: 6, stroke: T.border, strokeW: 1 });
  searchBox.x = 700; searchBox.y = 15;
  const searchIcon = txt('||', { size: 11 });
  searchIcon.x = 10; searchIcon.y = 9;
  const searchPh = txt('Buscar en CRM�', { size: 12, color: T.textMuted });
  searchPh.x = 32; searchPh.y = 10;
  searchBox.appendChild(searchIcon);
  searchBox.appendChild(searchPh);
  h.appendChild(searchBox);

  // Notification bell
  const bellBtn = frame('BellBtn', 34, 34, { fill: T.surface, radius: 6 });
  bellBtn.x = 972; bellBtn.y = 15;
  const bellTxt = txt('||', { size: 14 });
  bellTxt.x = 9; bellTxt.y = 9;
  bellBtn.appendChild(bellTxt);
  const bellDot = frame('Dot', 8, 8, { fill: T.danger, radius: 4 });
  bellDot.x = 22; bellDot.y = 4;
  bellBtn.appendChild(bellDot);
  h.appendChild(bellBtn);

  // Help
  const helpBtn = frame('HelpBtn', 34, 34, { fill: T.surface, radius: 6 });
  helpBtn.x = 1010; helpBtn.y = 15;
  const helpTxt = txt('?', { size: 14 });
  helpTxt.x = 9; helpTxt.y = 9;
  helpBtn.appendChild(helpTxt);
  h.appendChild(helpBtn);

  // Avatar
  const av = frame('HeaderAvatar', 32, 32, { fill: T.primary, radius: 16 });
  av.x = 1050; av.y = 16;
  const avTxt = txt('JM', { size: 10, color: T.white, weight: 'Bold' });
  avTxt.x = (32 - avTxt.width) / 2; avTxt.y = (32 - avTxt.height) / 2;
  av.appendChild(avTxt);
  h.appendChild(av);

  return h;
}

// -----------------------------------------------------------
//  KPI CARD
// -----------------------------------------------------------
function kpiCard(label, value, change, changeUp, icon, accentColor, iconBg, w = 180) {
  const f = frame('KPI / ' + label, w, 100, { fill: T.surface, radius: 10, stroke: T.border, strokeW: 1 });

  // Accent top border
  const top = rect(w, 3, accentColor);
  top.x = 0; top.y = 0;
  f.appendChild(top);

  // Icon box
  const iconBox = frame('IconBox', 38, 38, { fill: iconBg, radius: 8 });
  iconBox.x = w - 50; iconBox.y = 14;
  const iconTxt = txt(icon, { size: 16 });
  iconTxt.x = (38 - iconTxt.width) / 2; iconTxt.y = (38 - iconTxt.height) / 2;
  iconBox.appendChild(iconTxt);
  f.appendChild(iconBox);

  // Value
  const valTxt = txt(value, { size: 26, color: T.text, weight: 'Bold' });
  valTxt.x = 16; valTxt.y = 16;
  f.appendChild(valTxt);

  // Label
  const lbTxt = txt(label, { size: 11, color: T.textMuted, weight: 'Medium' });
  lbTxt.x = 16; lbTxt.y = 48;
  f.appendChild(lbTxt);

  // Change
  const changeTxt = txt(change, { size: 10, weight: 'Semi Bold' });
  changeTxt.fills = solidPaint(changeUp ? T.success : T.danger);
  changeTxt.x = 16; changeTxt.y = 66;
  f.appendChild(changeTxt);

  return f;
}

// -----------------------------------------------------------
//  PROGRESS BAR helper
// -----------------------------------------------------------
function progressBar(w, pct, color) {
  const track = frame('Track', w, 6, { fill: T.border2, radius: 3 });
  const fill = frame('Fill', Math.round(w * pct / 100), 6, { fill: color, radius: 3 });
  fill.x = 0; fill.y = 0;
  track.appendChild(fill);
  return track;
}

// -----------------------------------------------------------
//  MODAL base
// -----------------------------------------------------------
function buildModalOverlay(name, w, h, contentBuilder) {
  // Overlay
  const overlay = frame('Modal / ' + name + ' / Overlay', 1440, 900, { fill: T.text, radius: 0 });
  overlay.fills = solidPaint(T.text, 0.45);
  overlay.name = 'Modal / ' + name + ' / Overlay';

  // Dialog
  const dialog = frame('Dialog', w, h, { fill: T.surface, radius: 12 });
  dialog.x = (1440 - w) / 2;
  dialog.y = (900 - h) / 2;
  // Drop shadow effect via strokes
  dialog.effects = [{
    type: 'DROP_SHADOW',
    color: { r:0, g:0, b:0, a:0.18 },
    offset: { x:0, y:8 },
    radius: 30,
    spread: 0,
    visible: true,
    blendMode: 'NORMAL',
  }];

  contentBuilder(dialog);
  overlay.appendChild(dialog);
  return overlay;
}

function modalHeader(dialog, title, w) {
  const hdr = frame('ModalHeader', w, 54, { fill: T.surface, radius: 0 });
  hdr.x = 0; hdr.y = 0;

  const titleTxt = txt(title, { size: 15, color: T.text, weight: 'Semi Bold' });
  titleTxt.x = 20; titleTxt.y = (54 - titleTxt.height) / 2;
  hdr.appendChild(titleTxt);

  const closeBtn = frame('CloseBtn', 28, 28, { fill: T.border, radius: 6 });
  closeBtn.x = w - 48; closeBtn.y = 13;
  const closeTxt = txt('?', { size: 12, color: T.textMuted });
  closeTxt.x = (28 - closeTxt.width) / 2; closeTxt.y = (28 - closeTxt.height) / 2;
  closeBtn.appendChild(closeTxt);
  hdr.appendChild(closeBtn);

  const divLine = rect(w, 1, T.border);
  divLine.x = 0; divLine.y = 53;
  hdr.appendChild(divLine);

  dialog.appendChild(hdr);
}

function modalFooter(dialog, w, h, primaryLabel = 'Guardar', secondaryLabel = 'Cancelar') {
  const ftr = frame('ModalFooter', w, 56, { fill: T.surface });
  ftr.x = 0; ftr.y = h - 56;

  const topLine = rect(w, 1, T.border);
  topLine.x = 0; topLine.y = 0;
  ftr.appendChild(topLine);

  const cancelBtn = button(secondaryLabel, 'secondary');
  cancelBtn.x = w - 220; cancelBtn.y = 12;
  ftr.appendChild(cancelBtn);

  const saveBtn = button(primaryLabel, 'primary');
  saveBtn.x = w - 120; saveBtn.y = 12;
  ftr.appendChild(saveBtn);

  dialog.appendChild(ftr);
}

function formRow(label, placeholder, x, y, w = 200, type = 'text') {
  const g = frame('Field / ' + label, w, 60, { fill: T.surface });
  g.x = x; g.y = y;

  const lbl = txt(label.toUpperCase(), { size: 9, color: T.textMuted, weight: 'Semi Bold' });
  lbl.letterSpacing = { value: 4, unit: 'PERCENT' };
  lbl.x = 0; lbl.y = 0;
  g.appendChild(lbl);

  const inputBox = frame('Input', w, 34, { fill: { r:0.972,g:0.980,b:0.992 }, radius: 6, stroke: T.border, strokeW: 1 });
  inputBox.x = 0; inputBox.y = 18;
  const phTxt = txt(placeholder, { size: 12, color: T.textMuted });
  phTxt.x = 10; phTxt.y = 9;
  inputBox.appendChild(phTxt);
  g.appendChild(inputBox);

  return g;
}

// -----------------------------------------------------------
//  MODAL 1 � Filtro Per�odo (Dashboard)
// -----------------------------------------------------------
function buildModalFiltroPeriodo() {
  return buildModalOverlay('Filtro Per�odo', 400, 420, (dialog) => {
    modalHeader(dialog, '|| Seleccionar Periodo', 400);

    const periods = ['Este mes','Mes pasado','Este trimestre','Trimestre pasado','Este a�o','A�o pasado'];
    let py = 70;
    for (const p of periods) {
      const btn = frame('PeriodBtn', 360, 32, { fill: T.surface, radius: 6, stroke: T.border, strokeW: 1 });
      btn.x = 20; btn.y = py;
      const btnTxt = txt(p, { size: 12, color: T.text, weight: 'Medium' });
      btnTxt.x = 12; btnTxt.y = (32 - btnTxt.height) / 2;
      btn.appendChild(btnTxt);
      dialog.appendChild(btn);
      py += 38;
    }

    // Custom range row
    const lbl1 = txt('INICIO PERSONALIZADO', { size: 9, color: T.textMuted, weight: 'Semi Bold' });
    lbl1.letterSpacing = { value: 4, unit: 'PERCENT' };
    lbl1.x = 20; lbl1.y = py + 4;
    dialog.appendChild(lbl1);

    const inp1 = frame('DateInput1', 170, 32, { fill: { r:0.972,g:0.980,b:0.992 }, radius: 6, stroke: T.border, strokeW: 1 });
    inp1.x = 20; inp1.y = py + 22;
    const inp1Ph = txt('DD/MM/AAAA', { size: 11, color: T.textMuted }); inp1Ph.x = 8; inp1Ph.y = 8; inp1.appendChild(inp1Ph);
    dialog.appendChild(inp1);

    const lbl2 = txt('FIN PERSONALIZADO', { size: 9, color: T.textMuted, weight: 'Semi Bold' });
    lbl2.letterSpacing = { value: 4, unit: 'PERCENT' };
    lbl2.x = 210; lbl2.y = py + 4;
    dialog.appendChild(lbl2);

    const inp2 = frame('DateInput2', 170, 32, { fill: { r:0.972,g:0.980,b:0.992 }, radius: 6, stroke: T.border, strokeW: 1 });
    inp2.x = 210; inp2.y = py + 22;
    const inp2Ph = txt('DD/MM/AAAA', { size: 11, color: T.textMuted }); inp2Ph.x = 8; inp2Ph.y = 8; inp2.appendChild(inp2Ph);
    dialog.appendChild(inp2);

    modalFooter(dialog, 400, 420, 'Aplicar periodo', 'Cancelar');
  });
}

// -----------------------------------------------------------
//  MODAL 2 � Nueva Actividad (Dashboard)
// -----------------------------------------------------------
function buildModalNuevaActividad() {
  return buildModalOverlay('Nueva Actividad', 540, 520, (dialog) => {
    modalHeader(dialog, '? Nueva Actividad', 540);

    // Row 1: Tipo + Prioridad
    const tipoF = formRow('Tipo', 'Llamada', 20, 70, 240);
    dialog.appendChild(tipoF);
    const prioF = formRow('Prioridad', 'Media', 280, 70, 240);
    dialog.appendChild(prioF);

    // T�tulo
    const titleF = formRow('T�tulo', 'Ej: Seguimiento propuesta comercial', 20, 145, 500);
    dialog.appendChild(titleF);

    // Contacto + Empresa
    const contactF = formRow('Contacto', 'Nombre del contacto', 20, 220, 240);
    dialog.appendChild(contactF);
    const empresaF = formRow('Empresa', 'Nombre de la empresa', 280, 220, 240);
    dialog.appendChild(empresaF);

    // Fecha + Responsable
    const fechaF = formRow('Fecha y hora', '11/03/2026 09:00', 20, 295, 240);
    dialog.appendChild(fechaF);
    const respF = formRow('Responsable', 'Carlos V.', 280, 295, 240);
    dialog.appendChild(respF);

    // Notas
    const notaLbl = txt('NOTAS', { size: 9, color: T.textMuted, weight: 'Semi Bold' });
    notaLbl.letterSpacing = { value: 4, unit: 'PERCENT' };
    notaLbl.x = 20; notaLbl.y = 373;
    dialog.appendChild(notaLbl);
    const notaBox = frame('NotasInput', 500, 60, { fill: { r:0.972,g:0.980,b:0.992 }, radius: 6, stroke: T.border, strokeW: 1 });
    notaBox.x = 20; notaBox.y = 390;
    const notaPh = txt('Descripci�n o notas adicionales�', { size: 12, color: T.textMuted });
    notaPh.x = 10; notaPh.y = 10; notaBox.appendChild(notaPh);
    dialog.appendChild(notaBox);

    modalFooter(dialog, 540, 520, 'Crear Actividad', 'Cancelar');
  });
}

// -----------------------------------------------------------
//  DASHBOARD FRAME (1440�900)
// -----------------------------------------------------------
async function buildDashboard() {
  const PAGE_W = 1440;
  const PAGE_H = 900;
  const CONTENT_X = 260; // after sidebar
  const CONTENT_W = PAGE_W - CONTENT_X; // 1180

  const mainFrame = frame('|| Dashboard', PAGE_W, PAGE_H, { fill: T.bg });
  mainFrame.clipsContent = true;

  // -- Sidebar --
  const sb = buildSidebar('Dashboard');
  sb.x = 0; sb.y = 0;
  mainFrame.appendChild(sb);

  // -- Header --
  const hdr = buildHeader('Panel de Control');
  hdr.x = CONTENT_X; hdr.y = 0;
  mainFrame.appendChild(hdr);

  // -- Content area --
  const contentY = 64;
  const padX = 32;

  // -- PAGE HEADER -----------------------------------------
  const pgTitle = txt('Panel de Control', { size: 22, color: T.text, weight: 'Bold' });
  pgTitle.x = CONTENT_X + padX; pgTitle.y = contentY + 24;
  mainFrame.appendChild(pgTitle);

  const pgSub = txt('Resumen general del CRM � Marzo 2026', { size: 12, color: T.textMuted });
  pgSub.x = CONTENT_X + padX; pgSub.y = contentY + 52;
  mainFrame.appendChild(pgSub);

  // Buttons top-right
  const btnEsteMes = button('|| Este mes', 'secondary');
  btnEsteMes.name = 'Btn / Este mes ? Modal Filtro Periodo';
  btnEsteMes.x = CONTENT_X + CONTENT_W - 260; btnEsteMes.y = contentY + 28;
  mainFrame.appendChild(btnEsteMes);

  const btnNewAct = button('+ Nueva Actividad', 'primary');
  btnNewAct.name = 'Btn / Nueva Actividad ? Modal Nueva Actividad';
  btnNewAct.x = CONTENT_X + CONTENT_W - 160; btnNewAct.y = contentY + 28;
  mainFrame.appendChild(btnNewAct);

  // -- KPI GRID (6 cards @ ~182px each, 1116px total) ---
  const kpiY = contentY + 82;
  const kpiData = [
    { label:'Contactos activos', value:'1,248',   change:'? 8.2% vs mes anterior',  up:true,  icon:'||', color:T.primaryLight, ibg:{r:0.859,g:0.941,b:0.996} },
    { label:'Leads este mes',    value:'84',       change:'? 13.5% vs mes anterior', up:true,  icon:'||', color:T.accent,       ibg:{r:0.996,g:0.976,b:0.761} },
    { label:'Pipeline activo',   value:'$248,500', change:'? 4.7% vs mes anterior',  up:true,  icon:'||', color:T.success,      ibg:{r:0.859,g:0.988,b:0.902} },
    { label:'Ventas cerradas',   value:'$82,300',  change:'? 21.4% vs mes anterior', up:true,  icon:'||', color:T.warning,      ibg:{r:1.000,g:0.929,b:0.835} },
    { label:'Tickets abiertos',  value:'23',       change:'? 3 sin respuesta',        up:false, icon:'||', color:T.danger,       ibg:{r:0.996,g:0.886,b:0.886} },
    { label:'Campa�as activas',  value:'5',        change:'? Igual que mes anterior', up:true,  icon:'||', color:T.purple,       ibg:{r:0.953,g:0.910,b:1.000} },
  ];
  const kpiCardW = 178;
  const kpiGap = 12;
  for (let i = 0; i < kpiData.length; i++) {
    const k = kpiData[i];
    const card = kpiCard(k.label, k.value, k.change, k.up, k.icon, k.color, k.ibg, kpiCardW);
    card.x = CONTENT_X + padX + i * (kpiCardW + kpiGap);
    card.y = kpiY;
    mainFrame.appendChild(card);
  }

  // -- ROW 1: Pipeline + Actividades ----------------------
  const row1Y = kpiY + 115;
  const pipelineW = 640;
  const actW = 440;

  // � Pipeline card �
  const pipeCard = frame('Card / Pipeline', pipelineW, 230, { fill: T.surface, radius: 10, stroke: T.border, strokeW: 1 });
  pipeCard.x = CONTENT_X + padX; pipeCard.y = row1Y;

  const pcTitle = txt('Pipeline de Ventas por Etapa', { size: 13, color: T.text, weight: 'Semi Bold' });
  pcTitle.x = 16; pcTitle.y = 14;
  pipeCard.appendChild(pcTitle);

  const pcLink = txt('Ver todo ?', { size: 11, color: T.primaryLight, weight: 'Medium' });
  pcLink.x = pipelineW - 16 - pcLink.width; pcLink.y = 16;
  pipeCard.appendChild(pcLink);

  const pcDiv = rect(pipelineW, 1, T.border);
  pcDiv.x = 0; pcDiv.y = 42;
  pipeCard.appendChild(pcDiv);

  const pipeStages = [
    { label:'Prospecci�n',  value:32, amount:'$28,400',  pct:30, color:T.info },
    { label:'Calificaci�n', value:24, amount:'$45,200',  pct:45, color:T.purple },
    { label:'Propuesta',    value:18, amount:'$63,100',  pct:60, color:T.accent },
    { label:'Negociaci�n',  value:11, amount:'$72,800',  pct:75, color:T.warning },
    { label:'Cierre',       value:6,  amount:'$39,000',  pct:90, color:T.success },
  ];

  let pipeRowY = 56;
  for (const s of pipeStages) {
    const rowLbl = txt(s.label, { size: 11, color: T.text, weight: 'Medium' });
    rowLbl.x = 16; rowLbl.y = pipeRowY;
    pipeCard.appendChild(rowLbl);

    const opTxt = txt(`${s.value} opor.`, { size: 10, color: T.textMuted });
    opTxt.x = 340; opTxt.y = pipeRowY;
    pipeCard.appendChild(opTxt);

    const amtTxt = txt(s.amount, { size: 10, color: T.text, weight: 'Semi Bold' });
    amtTxt.x = pipelineW - 16 - amtTxt.width; amtTxt.y = pipeRowY;
    pipeCard.appendChild(amtTxt);

    const bar = progressBar(pipelineW - 32, s.pct, s.color);
    bar.x = 16; bar.y = pipeRowY + 16;
    pipeCard.appendChild(bar);

    pipeRowY += 34;
  }
  mainFrame.appendChild(pipeCard);

  // � Actividades recientes card �
  const actCard = frame('Card / Actividades Recientes', actW, 230, { fill: T.surface, radius: 10, stroke: T.border, strokeW: 1 });
  actCard.x = CONTENT_X + padX + pipelineW + 16; actCard.y = row1Y;

  const actTitle = txt('Actividades Recientes', { size: 13, color: T.text, weight: 'Semi Bold' });
  actTitle.x = 16; actTitle.y = 14;
  actCard.appendChild(actTitle);

  const actLink = txt('Ver todas ?', { size: 11, color: T.primaryLight, weight: 'Medium' });
  actLink.x = actW - 16 - actLink.width; actLink.y = 16;
  actCard.appendChild(actLink);

  const actDiv = rect(actW, 1, T.border);
  actDiv.x = 0; actDiv.y = 42;
  actCard.appendChild(actDiv);

  const activities = [
    { icon:'||', label:'Llamada con Carlos Ruiz',      time:'Hace 15 min', tag:'Llamada', tc:'blue'   },
    { icon:'||', label:'Email enviado a Tecno S.A.',   time:'Hace 1h',     tag:'Email',   tc:'purple' },
    { icon:'||', label:'Reuni�n: Demo producto',       time:'Hace 3h',     tag:'Reuni�n', tc:'teal'   },
    { icon:'?', label:'Tarea: Follow-up completado',  time:'Hace 5h',     tag:'Tarea',   tc:'yellow' },
    { icon:'||', label:'Nota: Inter�s en plan Pro',    time:'Ayer 18:30',  tag:'Nota',    tc:'gray'   },
  ];
  let actRowY = 50;
  for (const a of activities) {
    const iconEl = txt(a.icon, { size: 13 });
    iconEl.x = 12; iconEl.y = actRowY + 2;
    actCard.appendChild(iconEl);

    const lblEl = txt(a.label, { size: 11, color: T.text, weight: 'Medium' });
    lblEl.x = 34; lblEl.y = actRowY;
    actCard.appendChild(lblEl);

    const timeEl = txt(a.time, { size: 10, color: T.textMuted });
    timeEl.x = 34; timeEl.y = actRowY + 14;
    actCard.appendChild(timeEl);

    const tagBadge = badge(a.tag, a.tc);
    tagBadge.x = actW - 16 - 55; tagBadge.y = actRowY + 2;
    actCard.appendChild(tagBadge);

    const rowDiv = rect(actW, 1, T.border2);
    rowDiv.x = 0; rowDiv.y = actRowY + 32;
    actCard.appendChild(rowDiv);

    actRowY += 34;
  }
  mainFrame.appendChild(actCard);

  // -- ROW 2: Leads por fuente + Top Clientes + Tickets --
  const row2Y = row1Y + 246;
  const col3W = 356;

  // � Leads por fuente �
  const leadsCard = frame('Card / Leads por Fuente', col3W, 220, { fill: T.surface, radius: 10, stroke: T.border, strokeW: 1 });
  leadsCard.x = CONTENT_X + padX; leadsCard.y = row2Y;

  const leadsTitle = txt('Leads por Fuente', { size: 13, color: T.text, weight: 'Semi Bold' });
  leadsTitle.x = 16; leadsTitle.y = 14;
  leadsCard.appendChild(leadsTitle);

  const leadsDiv = rect(col3W, 1, T.border);
  leadsDiv.x = 0; leadsDiv.y = 42;
  leadsCard.appendChild(leadsDiv);

  const leadsData = [
    { label:'Sitio Web',    val:38, color:T.primary },
    { label:'Referidos',    val:27, color:T.accent },
    { label:'LinkedIn',     val:18, color:T.info },
    { label:'Llamada fr�a', val:10, color:T.purple },
    { label:'Email',        val:7,  color:T.success },
  ];
  let ldY = 52;
  for (const ld of leadsData) {
    const ldLbl = txt(ld.label, { size: 11, color: T.text, weight: 'Medium' });
    ldLbl.x = 16; ldLbl.y = ldY;
    leadsCard.appendChild(ldLbl);

    const ldPct = txt(ld.val + '%', { size: 11, color: T.text, weight: 'Semi Bold' });
    ldPct.x = col3W - 16 - ldPct.width; ldPct.y = ldY;
    leadsCard.appendChild(ldPct);

    const ldBar = progressBar(col3W - 32, ld.val * 2.5 > 100 ? 100 : ld.val * 2.5, ld.color);
    ldBar.x = 16; ldBar.y = ldY + 16;
    leadsCard.appendChild(ldBar);

    ldY += 32;
  }
  mainFrame.appendChild(leadsCard);

  // � Top Clientes �
  const topCliCard = frame('Card / Top Clientes', col3W, 220, { fill: T.surface, radius: 10, stroke: T.border, strokeW: 1 });
  topCliCard.x = CONTENT_X + padX + col3W + 16; topCliCard.y = row2Y;

  const topCliTitle = txt('Top Clientes', { size: 13, color: T.text, weight: 'Semi Bold' });
  topCliTitle.x = 16; topCliTitle.y = 14;
  topCliCard.appendChild(topCliTitle);

  const topCliLink = txt('Ver m�s ?', { size: 11, color: T.primaryLight, weight: 'Medium' });
  topCliLink.x = col3W - 16 - topCliLink.width; topCliLink.y = 16;
  topCliCard.appendChild(topCliLink);

  const topCliDiv = rect(col3W, 1, T.border);
  topCliDiv.x = 0; topCliDiv.y = 42;
  topCliCard.appendChild(topCliDiv);

  // Table header
  const thRow = frame('TH Row', col3W, 28, { fill: { r:0.973,g:0.980,b:0.988 } });
  thRow.x = 0; thRow.y = 43;
  const thEmpresa = txt('EMPRESA', { size: 9, color: T.textMuted, weight: 'Semi Bold' });
  thEmpresa.letterSpacing = { value: 5, unit: 'PERCENT' };
  thEmpresa.x = 12; thEmpresa.y = 9;
  thRow.appendChild(thEmpresa);
  const thValor = txt('VALOR', { size: 9, color: T.textMuted, weight: 'Semi Bold' });
  thValor.letterSpacing = { value: 5, unit: 'PERCENT' };
  thValor.x = 180; thValor.y = 9;
  thRow.appendChild(thValor);
  const thEst = txt('ESTADO', { size: 9, color: T.textMuted, weight: 'Semi Bold' });
  thEst.letterSpacing = { value: 5, unit: 'PERCENT' };
  thEst.x = 260; thEst.y = 9;
  thRow.appendChild(thEst);
  topCliCard.appendChild(thRow);

  const topClientes = [
    { name:'Tecno S.A.',    val:'$34,200', estado:'Activo',    bc:'green' },
    { name:'Global Corp',   val:'$28,100', estado:'Activo',    bc:'green' },
    { name:'NetSol Ltda.',  val:'$19,800', estado:'Prospecto', bc:'blue'  },
    { name:'MegaTrade',     val:'$17,500', estado:'Activo',    bc:'green' },
    { name:'DataPoint S.A.',val:'$12,400', estado:'Inactivo',  bc:'gray'  },
  ];
  let tcY = 72;
  for (const cl of topClientes) {
    const clName = txt(cl.name, { size: 11, color: T.text, weight: 'Semi Bold' });
    clName.x = 12; clName.y = tcY;
    topCliCard.appendChild(clName);
    const clVal = txt(cl.val, { size: 11, color: T.text, weight: 'Semi Bold' });
    clVal.x = 180; clVal.y = tcY;
    topCliCard.appendChild(clVal);
    const clBadge = badge(cl.estado, cl.bc);
    clBadge.x = 255; clBadge.y = tcY - 1;
    topCliCard.appendChild(clBadge);
    const rowLine = rect(col3W, 1, T.border2);
    rowLine.x = 0; rowLine.y = tcY + 22;
    topCliCard.appendChild(rowLine);
    tcY += 30;
  }
  mainFrame.appendChild(topCliCard);

  // � Tickets urgentes �
  const tickCard = frame('Card / Tickets Urgentes', col3W, 220, { fill: T.surface, radius: 10, stroke: T.border, strokeW: 1 });
  tickCard.x = CONTENT_X + padX + (col3W + 16) * 2; tickCard.y = row2Y;

  const tickTitle = txt('Tickets Urgentes', { size: 13, color: T.text, weight: 'Semi Bold' });
  tickTitle.x = 16; tickTitle.y = 14;
  tickCard.appendChild(tickTitle);

  const tickLink = txt('Ver todos ?', { size: 11, color: T.primaryLight, weight: 'Medium' });
  tickLink.x = col3W - 16 - tickLink.width; tickLink.y = 16;
  tickCard.appendChild(tickLink);

  const tickDiv = rect(col3W, 1, T.border);
  tickDiv.x = 0; tickDiv.y = 42;
  tickCard.appendChild(tickDiv);

  const tickets = [
    { id:'#1042', t:'Error en m�dulo de facturaci�n',      p:'Cr�tico', pc:'red',    age:'2h'   },
    { id:'#1039', t:'No puede acceder al portal cliente',  p:'Alto',    pc:'orange', age:'5h'   },
    { id:'#1037', t:'Solicitud de integraci�n API',        p:'Medio',   pc:'yellow', age:'1d'   },
    { id:'#1035', t:'Consulta sobre precios enterprise',   p:'Bajo',    pc:'blue',   age:'2d'   },
    { id:'#1033', t:'Actualizaci�n de datos de cuenta',    p:'Bajo',    pc:'gray',   age:'3d'   },
  ];
  let tkY = 50;
  for (const tk of tickets) {
    const tkId = txt(tk.id, { size: 9, color: T.textMuted, weight: 'Bold' });
    tkId.x = 12; tkId.y = tkY + 2;
    tickCard.appendChild(tkId);
    const tkTxt = txt(tk.t, { size: 10, color: T.text, weight: 'Medium' });
    tkTxt.x = 50; tkTxt.y = tkY;
    tickCard.appendChild(tkTxt);
    const tkBadge = badge(tk.p, tk.pc);
    tkBadge.x = 225; tkBadge.y = tkY;
    tickCard.appendChild(tkBadge);
    const tkAge = txt(tk.age, { size: 9, color: T.textMuted });
    tkAge.x = col3W - 12 - tkAge.width; tkAge.y = tkY + 2;
    tickCard.appendChild(tkAge);
    const tkLine = rect(col3W, 1, T.border2);
    tkLine.x = 0; tkLine.y = tkY + 30;
    tickCard.appendChild(tkLine);
    tkY += 34;
  }
  mainFrame.appendChild(tickCard);

  // -- ROW 3: M�tricas de conversi�n + Pr�ximas actividades -
  const row3Y = row2Y + 236;
  const metriW = 480;
  const proxW = 636;

  // � M�tricas de conversi�n �
  const metriCard = frame('Card / M�tricas Conversi�n', metriW, 200, { fill: T.surface, radius: 10, stroke: T.border, strokeW: 1 });
  metriCard.x = CONTENT_X + padX; metriCard.y = row3Y;

  const metriTitle = txt('M�tricas de Conversi�n', { size: 13, color: T.text, weight: 'Semi Bold' });
  metriTitle.x = 16; metriTitle.y = 14;
  metriCard.appendChild(metriTitle);
  const metriDiv = rect(metriW, 1, T.border);
  metriDiv.x = 0; metriDiv.y = 42;
  metriCard.appendChild(metriDiv);

  const metricas = [
    { label:'Tasa Lead ? Opor.', val:'34%',    change:'?2.1%', up:true  },
    { label:'Tasa Cierre',        val:'22%',    change:'?0.8%', up:true  },
    { label:'Ciclo de Venta',     val:'18d',    change:'?3d',   up:true  },
    { label:'Ticket Promedio',    val:'$4,850', change:'?$320', up:true  },
    { label:'Customer LTV',       val:'$14,200',change:'?$800', up:true  },
    { label:'Churn Rate',         val:'2.3%',   change:'?0.4%', up:true  },
  ];
  const mcCellW = 148;
  const mcCellH = 68;
  for (let i = 0; i < metricas.length; i++) {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const m = metricas[i];
    const cell = frame('MetricCell', mcCellW, mcCellH, { fill: { r:0.972,g:0.980,b:0.992 }, radius: 8, stroke: T.border, strokeW: 1 });
    cell.x = 16 + col * (mcCellW + 8); cell.y = 52 + row * (mcCellH + 8);

    const mVal = txt(m.val, { size: 18, color: T.text, weight: 'Bold' });
    mVal.x = 10; mVal.y = 8;
    cell.appendChild(mVal);

    const mLbl = txt(m.label, { size: 9, color: T.textMuted });
    mLbl.x = 10; mLbl.y = 30;
    cell.appendChild(mLbl);

    const mChg = txt(m.change, { size: 9, weight: 'Semi Bold' });
    mChg.fills = solidPaint(m.up ? T.success : T.danger);
    mChg.x = 10; mChg.y = 44;
    cell.appendChild(mChg);

    metriCard.appendChild(cell);
  }
  mainFrame.appendChild(metriCard);

  // � Pr�ximas actividades �
  const proxCard = frame('Card / Pr�ximas Actividades', proxW, 200, { fill: T.surface, radius: 10, stroke: T.border, strokeW: 1 });
  proxCard.x = CONTENT_X + padX + metriW + 16; proxCard.y = row3Y;

  const proxTitle = txt('Pr�ximas Actividades', { size: 13, color: T.text, weight: 'Semi Bold' });
  proxTitle.x = 16; proxTitle.y = 14;
  proxCard.appendChild(proxTitle);

  const proxCalLink = txt('Calendario ?', { size: 11, color: T.primaryLight, weight: 'Medium' });
  proxCalLink.x = proxW - 16 - proxCalLink.width; proxCalLink.y = 16;
  proxCard.appendChild(proxCalLink);

  const proxDiv = rect(proxW, 1, T.border);
  proxDiv.x = 0; proxDiv.y = 42;
  proxCard.appendChild(proxDiv);

  const proxEvents = [
    { time:'09:00', when:'Hoy',    t:'Demo con MegaCorp',          type:'Reuni�n', tc:'teal'   },
    { time:'11:30', when:'Hoy',    t:'Llamada seguimiento Ana',    type:'Llamada', tc:'blue'   },
    { time:'15:00', when:'Hoy',    t:'Enviar propuesta Tecno',     type:'Tarea',   tc:'yellow' },
    { time:'09:00', when:'Ma�ana', t:'Reuni�n kick-off Global',    type:'Reuni�n', tc:'teal'   },
    { time:'14:00', when:'Ma�ana', t:'Revisi�n contrato NetSol',   type:'Tarea',   tc:'yellow' },
  ];
  let evY = 48;
  for (const ev of proxEvents) {
    const evTime = txt(ev.time, { size: 11, color: T.primary, weight: 'Bold' });
    evTime.x = 16; evTime.y = evY;
    proxCard.appendChild(evTime);

    const evWhen = txt(ev.when, { size: 9, color: T.textMuted });
    evWhen.x = 16; evWhen.y = evY + 14;
    proxCard.appendChild(evWhen);

    const timeBar = rect(3, 28, T.primaryLight, { radius: 2 });
    timeBar.x = 60; timeBar.y = evY;
    proxCard.appendChild(timeBar);

    const evTxt = txt(ev.t, { size: 11, color: T.text, weight: 'Medium' });
    evTxt.x = 70; evTxt.y = evY + 6;
    proxCard.appendChild(evTxt);

    const evBadge = badge(ev.type, ev.tc);
    evBadge.x = proxW - 90; evBadge.y = evY + 4;
    proxCard.appendChild(evBadge);

    const evLine = rect(proxW, 1, T.border2);
    evLine.x = 0; evLine.y = evY + 32;
    proxCard.appendChild(evLine);

    evY += 34;
  }
  mainFrame.appendChild(proxCard);

  // -- MODALES ---------------------------------------------
  // Modal: Filtro Periodo
  const modalFiltro = buildModalFiltroPeriodo();
  modalFiltro.x = 1500; modalFiltro.y = 0; // Off-canvas (se activa con conexi�n)
  mainFrame.appendChild(modalFiltro);

  // Modal: Nueva Actividad
  const modalActividad = buildModalNuevaActividad();
  modalActividad.x = 2000; modalActividad.y = 0;
  mainFrame.appendChild(modalActividad);

  return mainFrame;
}

// -----------------------------------------------------------
//  PROTOTYPE CONNECTIONS (Actions / flujo de botones)
// -----------------------------------------------------------
function wirePrototype(dashFrame) {
  // Buscar elementos por nombre y conectar acciones
  const allNodes = dashFrame.findAll();

  let btnEsteMes = null;
  let btnNuevaAct = null;
  let modalFiltroOverlay = null;
  let modalActOverlay = null;

  for (const node of allNodes) {
    if (node.name === 'Btn / Este mes ? Modal Filtro Periodo') btnEsteMes = node;
    if (node.name === 'Btn / Nueva Actividad ? Modal Nueva Actividad') btnNuevaAct = node;
    if (node.name === 'Modal / Filtro Per�odo / Overlay') modalFiltroOverlay = node;
    if (node.name === 'Modal / Nueva Actividad / Overlay') modalActOverlay = node;
  }

  // Figma Prototype connections API
  if (btnEsteMes && modalFiltroOverlay) {
    btnEsteMes.reactions = [{
      actions: [{
        type: 'NODE',
        destinationId: modalFiltroOverlay.id,
        navigation: 'OVERLAY',
        transition: { type: 'DISSOLVE', duration: 0.2, easing: { type: 'EASE_OUT' } },
        preserveScrollPosition: false,
        overlayRelativePosition: { x: 0, y: 0 },
      }],
      trigger: { type: 'ON_CLICK' },
    }];
  }

  if (btnNuevaAct && modalActOverlay) {
    btnNuevaAct.reactions = [{
      actions: [{
        type: 'NODE',
        destinationId: modalActOverlay.id,
        navigation: 'OVERLAY',
        transition: { type: 'DISSOLVE', duration: 0.2, easing: { type: 'EASE_OUT' } },
        preserveScrollPosition: false,
        overlayRelativePosition: { x: 0, y: 0 },
      }],
      trigger: { type: 'ON_CLICK' },
    }];
  }

  // Wire close buttons back (navigate to dashboard frame)
  for (const node of allNodes) {
    if (node.name === 'CloseBtn' || (node.name && node.name.includes('Cancelar'))) {
      try {
        node.reactions = [{
          actions: [{ type: 'BACK', navigation: 'BACK' }],
          trigger: { type: 'ON_CLICK' },
        }];
      } catch (_) { /* skip if not supported */ }
    }
  }
}

// -----------------------------------------------------------
//  SESI�N 2 � CONTACTOS + CUENTAS
// -----------------------------------------------------------

// -----------------------------------------------------------
//  TABLE BUILDER helper
// -----------------------------------------------------------
function tableHeader(parent, cols, y, tableW) {
  const hRow = frame('TH', tableW, 30, { fill: { r:0.973,g:0.980,b:0.988 } });
  hRow.x = 0; hRow.y = y;
  for (const col of cols) {
    const th = txt(col.label.toUpperCase(), { size: 9, color: T.textMuted, weight: 'Semi Bold' });
    th.letterSpacing = { value: 5, unit: 'PERCENT' };
    th.x = col.x + 4; th.y = 10;
    hRow.appendChild(th);
  }
  const thLine = rect(tableW, 1, T.border);
  thLine.x = 0; thLine.y = 29;
  hRow.appendChild(thLine);
  parent.appendChild(hRow);
}

// -----------------------------------------------------------
//  MODAL � Nuevo Contacto
// -----------------------------------------------------------
function buildModalNuevoContacto() {
  return buildModalOverlay('Nuevo Contacto', 560, 580, (dialog) => {
    modalHeader(dialog, '|| Nuevo Contacto', 560);

    // Nombre + Apellido
    dialog.appendChild(formRow('Nombre', 'Ej: Carlos', 20, 70, 250));
    dialog.appendChild(formRow('Apellido', 'Ej: Ruiz', 290, 70, 250));

    // Email + Tel�fono
    dialog.appendChild(formRow('Email', 'correo@empresa.com', 20, 148, 250));
    dialog.appendChild(formRow('Tel�fono', '+57 300 000 0000', 290, 148, 250));

    // Cargo + Empresa
    dialog.appendChild(formRow('Cargo', 'Ej: Gerente Comercial', 20, 226, 250));
    dialog.appendChild(formRow('Empresa', 'Seleccionar cuenta�', 290, 226, 250));

    // Estado + Responsable
    dialog.appendChild(formRow('Estado', 'Activo', 20, 304, 170));
    dialog.appendChild(formRow('Responsable', 'Juan Mart�nez', 200, 304, 170));
    dialog.appendChild(formRow('Fuente', 'Sitio Web', 380, 304, 160));

    // Notas
    const notaLbl = txt('NOTAS', { size: 9, color: T.textMuted, weight: 'Semi Bold' });
    notaLbl.letterSpacing = { value: 4, unit: 'PERCENT' };
    notaLbl.x = 20; notaLbl.y = 383;
    dialog.appendChild(notaLbl);
    const notaBox = frame('NotasInput', 520, 56, { fill: { r:0.972,g:0.980,b:0.992 }, radius: 6, stroke: T.border, strokeW: 1 });
    notaBox.x = 20; notaBox.y = 400;
    const notaPh = txt('Observaciones del contacto�', { size: 12, color: T.textMuted });
    notaPh.x = 10; notaPh.y = 10; notaBox.appendChild(notaPh);
    dialog.appendChild(notaBox);

    modalFooter(dialog, 560, 580, 'Crear Contacto', 'Cancelar');
  });
}

// -----------------------------------------------------------
//  MODAL � Detalle Contacto
// -----------------------------------------------------------
function buildModalDetalleContacto() {
  return buildModalOverlay('Detalle Contacto', 620, 620, (dialog) => {
    modalHeader(dialog, '|| Detalle del Contacto', 620);

    // Avatar + nombre
    const avBig = frame('AvatarBig', 56, 56, { fill: T.primary, radius: 28 });
    avBig.x = 20; avBig.y = 70;
    const avTT = txt('CR', { size: 18, color: T.white, weight: 'Bold' });
    avTT.x = (56 - avTT.width) / 2; avTT.y = (56 - avTT.height) / 2;
    avBig.appendChild(avTT);
    dialog.appendChild(avBig);

    const nameT = txt('Carlos Ruiz', { size: 18, color: T.text, weight: 'Bold' });
    nameT.x = 88; nameT.y = 74;
    dialog.appendChild(nameT);
    const titleT = txt('Gerente Comercial � Tecno S.A.', { size: 12, color: T.textMuted });
    titleT.x = 88; titleT.y = 96;
    dialog.appendChild(titleT);

    const statBadge = badge('Activo', 'green');
    statBadge.x = 88; statBadge.y = 114;
    dialog.appendChild(statBadge);

    const divInfo = rect(580, 1, T.border);
    divInfo.x = 20; divInfo.y = 140;
    dialog.appendChild(divInfo);

    // Info grid
    const infoItems = [
      { lbl:'Email',       val:'c.ruiz@tecno.com',     ico:'||' },
      { lbl:'Tel�fono',    val:'+57 310 555 0101',     ico:'||' },
      { lbl:'Empresa',     val:'Tecno S.A.',            ico:'||' },
      { lbl:'Fuente',      val:'Sitio Web',             ico:'||' },
      { lbl:'Responsable', val:'Juan Mart�nez',         ico:'||' },
      { lbl:'Creado',      val:'15 Enero 2026',         ico:'||' },
    ];
    let infoY = 156;
    for (let i = 0; i < infoItems.length; i++) {
      const item = infoItems[i];
      const col = i % 2;
      const row = Math.floor(i / 2);
      const ix = 20 + col * 300;
      const iy = infoY + row * 52;

      const iIco = txt(item.ico, { size: 12 });
      iIco.x = ix; iIco.y = iy;
      dialog.appendChild(iIco);

      const iLbl = txt(item.lbl.toUpperCase(), { size: 8, color: T.textMuted, weight: 'Semi Bold' });
      iLbl.letterSpacing = { value: 5, unit: 'PERCENT' };
      iLbl.x = ix + 20; iLbl.y = iy;
      dialog.appendChild(iLbl);

      const iVal = txt(item.val, { size: 12, color: T.text, weight: 'Medium' });
      iVal.x = ix + 20; iVal.y = iy + 14;
      dialog.appendChild(iVal);
    }

    const divAct = rect(580, 1, T.border);
    divAct.x = 20; divAct.y = 318;
    dialog.appendChild(divAct);

    // Recent activities section
    const actTitle = txt('Actividades Recientes', { size: 12, color: T.text, weight: 'Semi Bold' });
    actTitle.x = 20; actTitle.y = 328;
    dialog.appendChild(actTitle);

    const recentActs = [
      { icon:'||', t:'Llamada realizada � seguimiento propuesta', time:'Hace 1h',   tag:'Llamada', tc:'blue'   },
      { icon:'||', t:'Email enviado con propuesta comercial',     time:'Ayer',       tag:'Email',   tc:'purple' },
      { icon:'||', t:'Reuni�n demo del producto',                time:'Hace 3d',    tag:'Reuni�n', tc:'teal'   },
    ];
    let actY = 350;
    for (const a of recentActs) {
      const ico = txt(a.icon, { size: 12 });
      ico.x = 20; ico.y = actY + 2;
      dialog.appendChild(ico);
      const at = txt(a.t, { size: 11, color: T.text, weight: 'Medium' });
      at.x = 40; at.y = actY;
      dialog.appendChild(at);
      const atime = txt(a.time, { size: 10, color: T.textMuted });
      atime.x = 40; atime.y = actY + 14;
      dialog.appendChild(atime);
      const abadge = badge(a.tag, a.tc);
      abadge.x = 540; abadge.y = actY + 2;
      dialog.appendChild(abadge);
      actY += 40;
    }

    // Footer with primary actions
    const ftrLine = rect(620, 1, T.border);
    ftrLine.x = 0; ftrLine.y = 564;
    dialog.appendChild(ftrLine);

    const btnEditar = button('|| Editar', 'secondary');
    btnEditar.x = 20; btnEditar.y = 576;
    dialog.appendChild(btnEditar);

    const btnActiv = button('+ Actividad', 'primary');
    btnActiv.x = 130; btnActiv.y = 576;
    dialog.appendChild(btnActiv);

    const btnClose2 = button('Cerrar', 'ghost');
    btnClose2.name = 'CloseBtn';
    btnClose2.x = 500; btnClose2.y = 576;
    dialog.appendChild(btnClose2);
  });
}

// -----------------------------------------------------------
//  PANTALLA � Contactos
// -----------------------------------------------------------
async function buildContactsPage() {
  const PAGE_W = 1440;
  const PAGE_H = 900;
  const CX = 260;
  const CW = PAGE_W - CX;
  const padX = 32;
  const cY = 64;

  const mf = frame('|| Contactos', PAGE_W, PAGE_H, { fill: T.bg });
  mf.clipsContent = true;

  // Sidebar + Header
  const sb = buildSidebar('Contactos');
  sb.x = 0; sb.y = 0;
  mf.appendChild(sb);

  const hdr = buildHeader('Contactos');
  hdr.x = CX; hdr.y = 0;
  mf.appendChild(hdr);

  // Page title
  const pgT = txt('Contactos', { size: 22, color: T.text, weight: 'Bold' });
  pgT.x = CX + padX; pgT.y = cY + 22;
  mf.appendChild(pgT);

  const pgS = txt('1,248 contactos en total', { size: 12, color: T.textMuted });
  pgS.x = CX + padX; pgS.y = cY + 50;
  mf.appendChild(pgS);

  // Buttons
  const btnExp = button('|| Exportar', 'secondary');
  btnExp.name = 'Btn / Exportar Contactos';
  btnExp.x = CX + CW - 250; btnExp.y = cY + 26;
  mf.appendChild(btnExp);

  const btnNew = button('+ Nuevo contacto', 'primary');
  btnNew.name = 'Btn / Nuevo Contacto ? Modal Nuevo Contacto';
  btnNew.x = CX + CW - 155; btnNew.y = cY + 26;
  mf.appendChild(btnNew);

  // KPIs
  const kpis = [
    { label:'Total contactos', value:'1,248', color:T.primaryLight, ibg:{r:0.859,g:0.941,b:0.996}, icon:'||', change:'? 8.2% vs mes ant.', up:true },
    { label:'Activos',          value:'986',   color:T.success,      ibg:{r:0.859,g:0.988,b:0.902}, icon:'?', change:'? 12 esta semana',  up:true },
    { label:'Nuevos este mes',  value:'47',    color:T.accent,       ibg:{r:0.996,g:0.976,b:0.761}, icon:'||', change:'? 5 vs sem. ant.',   up:true },
    { label:'Sin actividad',    value:'83',    color:T.danger,       ibg:{r:0.996,g:0.886,b:0.886}, icon:'?', change:'? requieren seguim.', up:false },
  ];
  const kW = 263;
  const kpiY = cY + 73;
  for (let i = 0; i < kpis.length; i++) {
    const k = kpis[i];
    const c = kpiCard(k.label, k.value, k.change, k.up, k.icon, k.color, k.ibg, kW);
    c.x = CX + padX + i * (kW + 12); c.y = kpiY;
    mf.appendChild(c);
  }

  // Toolbar
  const toolY = kpiY + 112;

  const searchBox2 = frame('SearchBox', 300, 34, { fill: T.surface, radius: 6, stroke: T.border, strokeW: 1 });
  searchBox2.x = CX + padX; searchBox2.y = toolY;
  const sIco2 = txt('||', { size: 11 }); sIco2.x = 10; sIco2.y = 9;
  const sPh2 = txt('Buscar nombre, empresa, email�', { size: 11, color: T.textMuted }); sPh2.x = 30; sPh2.y = 10;
  searchBox2.appendChild(sIco2); searchBox2.appendChild(sPh2);
  mf.appendChild(searchBox2);

  const filtEstado = frame('FiltEstado', 150, 34, { fill: T.surface, radius: 6, stroke: T.border, strokeW: 1 });
  filtEstado.x = CX + padX + 312; filtEstado.y = toolY;
  const fEt = txt('Todos los estados  ?', { size: 11, color: T.textMuted }); fEt.x = 10; fEt.y = 10;
  filtEstado.appendChild(fEt);
  mf.appendChild(filtEstado);

  const filtEmp = frame('FiltEmpresa', 160, 34, { fill: T.surface, radius: 6, stroke: T.border, strokeW: 1 });
  filtEmp.x = CX + padX + 474; filtEmp.y = toolY;
  const fEp = txt('Todas las empresas  ?', { size: 11, color: T.textMuted }); fEp.x = 10; fEp.y = 10;
  filtEmp.appendChild(fEp);
  mf.appendChild(filtEmp);

  const btnFilt = button('|| Filtros', 'secondary');
  btnFilt.x = CX + padX + 646; btnFilt.y = toolY;
  mf.appendChild(btnFilt);

  // Table card
  const tableY = toolY + 46;
  const tableW = CW - padX * 2;
  const tableCard = frame('Card / Tabla Contactos', tableW, 560, { fill: T.surface, radius: 10, stroke: T.border, strokeW: 1 });
  tableCard.x = CX + padX; tableCard.y = tableY;

  // Table card header
  const tcHdr = frame('CardHeader', tableW, 44, { fill: T.surface });
  tcHdr.x = 0; tcHdr.y = 0;
  const tcTitle = txt('Lista de Contactos', { size: 13, color: T.text, weight: 'Semi Bold' });
  tcTitle.x = 16; tcTitle.y = 14;
  tcHdr.appendChild(tcTitle);
  const tcCount = txt('Mostrando 8 de 1,248', { size: 11, color: T.textMuted });
  tcCount.x = tableW - 16 - tcCount.width; tcCount.y = 15;
  tcHdr.appendChild(tcCount);
  const tcLine = rect(tableW, 1, T.border); tcLine.x = 0; tcLine.y = 43;
  tcHdr.appendChild(tcLine);
  tableCard.appendChild(tcHdr);

  // Table headers
  const cols = [
    { label:'Nombre',           x:16  },
    { label:'Empresa',          x:230 },
    { label:'Email',            x:360 },
    { label:'Tel�fono',         x:530 },
    { label:'Estado',           x:670 },
    { label:'�ltima actividad', x:760 },
    { label:'',                 x:870 },
  ];
  tableHeader(tableCard, cols, 44, tableW);

  // Rows
  const contacts = [
    { name:'Carlos Ruiz',     initials:'CR', co:'Tecno S.A.',     email:'c.ruiz@tecno.com',     phone:'+57 310 555 0101', status:'Activo',    bc:'green', last:'Hace 1h'    },
    { name:'Ana L�pez',       initials:'AL', co:'Innova LLC',     email:'a.lopez@innova.com',   phone:'+57 314 555 0202', status:'Activo',    bc:'green', last:'Ayer'        },
    { name:'Pedro Vargas',    initials:'PV', co:'GlobalNet',      email:'p.vargas@global.com',  phone:'+57 320 555 0303', status:'Prospecto', bc:'blue',  last:'Hace 3d'    },
    { name:'Mar�a Fern�ndez', initials:'MF', co:'DataPoint S.A.', email:'m.fern@data.com',      phone:'+57 318 555 0404', status:'Activo',    bc:'green', last:'Hace 2h'    },
    { name:'Luis Torres',     initials:'LT', co:'MegaTrade',      email:'l.torres@mega.com',    phone:'+57 315 555 0505', status:'Inactivo',  bc:'gray',  last:'Hace 1 sem' },
    { name:'Sof�a M�ndez',    initials:'SM', co:'NetSol',         email:'s.mendez@netsol.com',  phone:'+57 317 555 0606', status:'Activo',    bc:'green', last:'Hoy'         },
    { name:'Roberto G�mez',   initials:'RG', co:'TechPlus',       email:'r.gomez@techplus.com', phone:'+57 316 555 0707', status:'Prospecto', bc:'blue',  last:'Hace 2d'    },
    { name:'Laura Jim�nez',   initials:'LJ', co:'Alpha Corp',     email:'l.jimenez@alpha.com',  phone:'+57 312 555 0808', status:'Activo',    bc:'green', last:'Hace 4h'    },
  ];

  let rowY = 75;
  for (const c of contacts) {
    // Row bg
    const rowBg = frame('Row', tableW, 46, { fill: T.surface });
    rowBg.x = 0; rowBg.y = rowY;

    // Avatar + name
    const av = frame('Av', 30, 30, { fill: T.primary, radius: 15 });
    av.x = cols[0].x + 2; av.y = 8;
    const avT = txt(c.initials, { size: 9, color: T.white, weight: 'Bold' });
    avT.x = (30 - avT.width) / 2; avT.y = (30 - avT.height) / 2;
    av.appendChild(avT);
    rowBg.appendChild(av);

    const nT = txt(c.name, { size: 12, color: T.text, weight: 'Semi Bold' });
    nT.name = 'RowLink / ' + c.name;
    nT.x = cols[0].x + 38; nT.y = 16;
    rowBg.appendChild(nT);

    const coT = txt(c.co, { size: 12, color: T.textMuted });
    coT.x = cols[1].x; coT.y = 16;
    rowBg.appendChild(coT);

    const emT = txt(c.email, { size: 11, color: T.textMuted });
    emT.x = cols[2].x; emT.y = 16;
    rowBg.appendChild(emT);

    const phT = txt(c.phone, { size: 11, color: T.textMuted });
    phT.x = cols[3].x; phT.y = 16;
    rowBg.appendChild(phT);

    const stB = badge(c.status, c.bc);
    stB.x = cols[4].x; stB.y = 14;
    rowBg.appendChild(stB);

    const lastT = txt(c.last, { size: 10, color: T.textMuted });
    lastT.x = cols[5].x; lastT.y = 16;
    rowBg.appendChild(lastT);

    const moreT = txt('?', { size: 14, color: T.textMuted });
    moreT.x = cols[6].x; moreT.y = 14;
    rowBg.appendChild(moreT);

    const rowLine = rect(tableW, 1, T.border2);
    rowLine.x = 0; rowLine.y = 45;
    rowBg.appendChild(rowLine);

    tableCard.appendChild(rowBg);
    rowY += 46;
  }

  mf.appendChild(tableCard);

  // -- MODALES --
  const modalNC = buildModalNuevoContacto();
  modalNC.x = 1500; modalNC.y = 900 + 100;
  mf.appendChild(modalNC);

  const modalDC = buildModalDetalleContacto();
  modalDC.x = 2200; modalDC.y = 900 + 100;
  mf.appendChild(modalDC);

  return { frame: mf, modalNC, modalDC, btnNew };
}

// -----------------------------------------------------------
//  MODAL � Nueva Cuenta
// -----------------------------------------------------------
function buildModalNuevaCuenta() {
  return buildModalOverlay('Nueva Cuenta', 560, 540, (dialog) => {
    modalHeader(dialog, '|| Nueva Cuenta', 560);

    dialog.appendChild(formRow('Nombre de la empresa', 'Ej: Tecno S.A.', 20, 70, 520));
    dialog.appendChild(formRow('Industria', 'Tecnolog�a', 20, 148, 250));
    dialog.appendChild(formRow('Sitio web', 'www.empresa.com', 290, 148, 250));
    dialog.appendChild(formRow('NIT / RUC', '900.123.456-7', 20, 226, 170));
    dialog.appendChild(formRow('Tel�fono', '+57 601 000 0000', 200, 226, 170));
    dialog.appendChild(formRow('Pa�s', 'Colombia', 380, 226, 160));
    dialog.appendChild(formRow('Responsable', 'Juan Mart�nez', 20, 304, 250));
    dialog.appendChild(formRow('Estado', 'Activo', 290, 304, 250));

    const notaLbl = txt('DESCRIPCI�N', { size: 9, color: T.textMuted, weight: 'Semi Bold' });
    notaLbl.letterSpacing = { value: 4, unit: 'PERCENT' };
    notaLbl.x = 20; notaLbl.y = 383;
    dialog.appendChild(notaLbl);

    const notaBox = frame('DescInput', 520, 56, { fill: { r:0.972,g:0.980,b:0.992 }, radius: 6, stroke: T.border, strokeW: 1 });
    notaBox.x = 20; notaBox.y = 400;
    const notaPh = txt('Descripci�n de la empresa�', { size: 12, color: T.textMuted });
    notaPh.x = 10; notaPh.y = 10; notaBox.appendChild(notaPh);
    dialog.appendChild(notaBox);

    modalFooter(dialog, 560, 540, 'Crear Cuenta', 'Cancelar');
  });
}

// -----------------------------------------------------------
//  MODAL � Detalle Cuenta
// -----------------------------------------------------------
function buildModalDetalleCuenta() {
  return buildModalOverlay('Detalle Cuenta', 660, 640, (dialog) => {
    modalHeader(dialog, '|| Detalle de la Cuenta', 660);

    // Logo placeholder + name
    const logoBg = frame('LogoBig', 56, 56, { fill: T.primary, radius: 10 });
    logoBg.x = 20; logoBg.y = 70;
    const logoT = txt('TS', { size: 20, color: T.white, weight: 'Bold' });
    logoT.x = (56 - logoT.width) / 2; logoT.y = (56 - logoT.height) / 2;
    logoBg.appendChild(logoT);
    dialog.appendChild(logoBg);

    const nameT = txt('Tecno S.A.', { size: 20, color: T.text, weight: 'Bold' });
    nameT.x = 88; nameT.y = 74;
    dialog.appendChild(nameT);
    const indT = txt('Tecnolog�a � Colombia', { size: 12, color: T.textMuted });
    indT.x = 88; indT.y = 98;
    dialog.appendChild(indT);
    const stB2 = badge('Activo', 'green');
    stB2.x = 88; stB2.y = 116;
    dialog.appendChild(stB2);

    const divD = rect(620, 1, T.border); divD.x = 20; divD.y = 148;
    dialog.appendChild(divD);

    // Stats row
    const stats = [
      { label:'Contactos', val:'12' },
      { label:'Pipeline',  val:'$87,400' },
      { label:'Salud',     val:'85%' },
      { label:'Owner',     val:'Juan M.' },
    ];
    for (let i = 0; i < stats.length; i++) {
      const sx = 20 + i * 155;
      const sCell = frame('StatCell', 148, 60, { fill: { r:0.973,g:0.980,b:0.988 }, radius: 8 });
      sCell.x = sx; sCell.y = 158;
      const sVal = txt(stats[i].val, { size: 18, color: T.text, weight: 'Bold' });
      sVal.x = 8; sVal.y = 8;
      sCell.appendChild(sVal);
      const sLbl = txt(stats[i].label, { size: 9, color: T.textMuted });
      sLbl.x = 8; sLbl.y = 32;
      sCell.appendChild(sLbl);
      dialog.appendChild(sCell);
    }

    const divD2 = rect(620, 1, T.border); divD2.x = 20; divD2.y = 230;
    dialog.appendChild(divD2);

    // Contacts list
    const ctListT = txt('Contactos vinculados', { size: 12, color: T.text, weight: 'Semi Bold' });
    ctListT.x = 20; ctListT.y = 242;
    dialog.appendChild(ctListT);

    const ctContacts = [
      { name:'Carlos Ruiz',    role:'Gerente Comercial', init:'CR' },
      { name:'Ana L�pez',      role:'Directora T�cnica', init:'AL' },
      { name:'Pedro Vargas',   role:'Analista Senior',   init:'PV' },
    ];
    let ctY = 264;
    for (const ct of ctContacts) {
      const ctAv = frame('CtAv', 28, 28, { fill: T.primary, radius: 14 });
      ctAv.x = 20; ctAv.y = ctY;
      const ctAvT = txt(ct.init, { size: 8, color: T.white, weight: 'Bold' });
      ctAvT.x = (28 - ctAvT.width) / 2; ctAvT.y = (28 - ctAvT.height) / 2;
      ctAv.appendChild(ctAvT);
      dialog.appendChild(ctAv);

      const ctN = txt(ct.name, { size: 12, color: T.text, weight: 'Semi Bold' });
      ctN.x = 56; ctN.y = ctY + 1;
      dialog.appendChild(ctN);

      const ctR = txt(ct.role, { size: 10, color: T.textMuted });
      ctR.x = 56; ctR.y = ctY + 15;
      dialog.appendChild(ctR);

      ctY += 38;
    }

    const divD3 = rect(620, 1, T.border); divD3.x = 20; divD3.y = 384;
    dialog.appendChild(divD3);

    // Pipeline Oportunidades
    const opT = txt('Oportunidades activas', { size: 12, color: T.text, weight: 'Semi Bold' });
    opT.x = 20; opT.y = 394;
    dialog.appendChild(opT);

    const opItems = [
      { t:'Licencia ERP anual',    val:'$42,000', stage:'Negociaci�n', bc:'orange' },
      { t:'M�dulo Analytics',      val:'$24,600', stage:'Propuesta',   bc:'yellow' },
      { t:'Soporte premium 2026',  val:'$20,800', stage:'Cierre',      bc:'green'  },
    ];
    let opY = 416;
    for (const op of opItems) {
      const opT2 = txt(op.t, { size: 11, color: T.text, weight: 'Medium' });
      opT2.x = 20; opT2.y = opY;
      dialog.appendChild(opT2);
      const opV = txt(op.val, { size: 11, color: T.text, weight: 'Bold' });
      opV.x = 380; opV.y = opY;
      dialog.appendChild(opV);
      const opB = badge(op.stage, op.bc);
      opB.x = 470; opB.y = opY - 1;
      dialog.appendChild(opB);
      opY += 28;
    }

    const ftrBtnLine = rect(660, 1, T.border); ftrBtnLine.x = 0; ftrBtnLine.y = 584;
    dialog.appendChild(ftrBtnLine);

    const btnVer = button('|| Ver contactos', 'secondary');
    btnVer.x = 20; btnVer.y = 596;
    dialog.appendChild(btnVer);

    const btnEdCuenta = button('|| Editar cuenta', 'primary');
    btnEdCuenta.x = 170; btnEdCuenta.y = 596;
    dialog.appendChild(btnEdCuenta);

    const btnCerrar = button('Cerrar', 'ghost');
    btnCerrar.name = 'CloseBtn';
    btnCerrar.x = 560; btnCerrar.y = 596;
    dialog.appendChild(btnCerrar);
  });
}

// -----------------------------------------------------------
//  PANTALLA � Cuentas
// -----------------------------------------------------------
async function buildAccountsPage() {
  const PAGE_W = 1440;
  const PAGE_H = 900;
  const CX = 260;
  const CW = PAGE_W - CX;
  const padX = 32;
  const cY = 64;

  const mf = frame('|| Cuentas', PAGE_W, PAGE_H, { fill: T.bg });
  mf.clipsContent = true;

  const sb = buildSidebar('Cuentas');
  sb.x = 0; sb.y = 0;
  mf.appendChild(sb);

  const hdr = buildHeader('Cuentas');
  hdr.x = CX; hdr.y = 0;
  mf.appendChild(hdr);

  // Title
  const pgT = txt('Cuentas', { size: 22, color: T.text, weight: 'Bold' });
  pgT.x = CX + padX; pgT.y = cY + 22;
  mf.appendChild(pgT);

  const pgS = txt('248 cuentas registradas', { size: 12, color: T.textMuted });
  pgS.x = CX + padX; pgS.y = cY + 50;
  mf.appendChild(pgS);

  // Buttons
  const btnImp = button('|| Importar', 'secondary');
  btnImp.x = CX + CW - 250; btnImp.y = cY + 26;
  mf.appendChild(btnImp);

  const btnNewC = button('+ Nueva cuenta', 'primary');
  btnNewC.name = 'Btn / Nueva Cuenta ? Modal Nueva Cuenta';
  btnNewC.x = CX + CW - 148; btnNewC.y = cY + 26;
  mf.appendChild(btnNewC);

  // KPIs
  const kpisAcc = [
    { label:'Total cuentas', value:'248',   color:T.primaryLight, ibg:{r:0.859,g:0.941,b:0.996}, icon:'||', change:'? 5.4% vs mes ant.', up:true  },
    { label:'Valor total',   value:'$398K', color:T.success,      ibg:{r:0.859,g:0.988,b:0.902}, icon:'||', change:'? $22K vs mes ant.',  up:true  },
    { label:'Activas',       value:'187',   color:T.accent,       ibg:{r:0.996,g:0.976,b:0.761}, icon:'?', change:'? 3 nuevas',           up:true  },
    { label:'En riesgo',     value:'24',    color:T.danger,       ibg:{r:0.996,g:0.886,b:0.886}, icon:'||', change:'? 2 vs mes ant.',     up:false },
  ];
  const kW = 263;
  const kpiY = cY + 73;
  for (let i = 0; i < kpisAcc.length; i++) {
    const k = kpisAcc[i];
    const c = kpiCard(k.label, k.value, k.change, k.up, k.icon, k.color, k.ibg, kW);
    c.x = CX + padX + i * (kW + 12); c.y = kpiY;
    mf.appendChild(c);
  }

  // Table card (tabs + search + table)
  const tableY = kpiY + 115;
  const tableW = CW - padX * 2;
  const tableCard = frame('Card / Tabla Cuentas', tableW, 430, { fill: T.surface, radius: 10, stroke: T.border, strokeW: 1 });
  tableCard.x = CX + padX; tableCard.y = tableY;

  // Tabs bar
  const tabBg = frame('TabBar', tableW, 44, { fill: T.surface });
  tabBg.x = 0; tabBg.y = 0;
  const tabs = ['Todas','Activas','Prospectos','Inactivas'];
  let tabX = 16;
  for (let i = 0; i < tabs.length; i++) {
    const tabBtn = frame('Tab ' + tabs[i], 90, 28, {
      fill: i === 0 ? T.primary : T.surface,
      radius: 6,
      stroke: i === 0 ? null : T.border, strokeW: 1,
    });
    tabBtn.x = tabX; tabBtn.y = 8;
    const tabTt = txt(tabs[i], { size: 11, color: i === 0 ? T.white : T.textMuted, weight: i === 0 ? 'Semi Bold' : 'Medium' });
    tabTt.x = (90 - tabTt.width) / 2; tabTt.y = (28 - tabTt.height) / 2;
    tabBtn.appendChild(tabTt);
    tabBg.appendChild(tabBtn);
    tabX += 96;
  }
  // Search within tabs bar
  const tSearch = frame('TSearch', 180, 30, { fill: { r:0.972,g:0.980,b:0.992 }, radius: 6, stroke: T.border, strokeW: 1 });
  tSearch.x = tableW - 196; tSearch.y = 7;
  const tsIco = txt('||', { size: 10 }); tsIco.x = 8; tsIco.y = 8;
  const tsPh = txt('Buscar cuenta�', { size: 11, color: T.textMuted }); tsPh.x = 26; tsPh.y = 8;
  tSearch.appendChild(tsIco); tSearch.appendChild(tsPh);
  tabBg.appendChild(tSearch);
  const tabLine = rect(tableW, 1, T.border); tabLine.x = 0; tabLine.y = 43;
  tabBg.appendChild(tabLine);
  tableCard.appendChild(tabBg);

  // Table headers
  const accCols = [
    { label:'Empresa',   x:16  },
    { label:'Industria', x:220 },
    { label:'Contactos', x:360 },
    { label:'Pipeline',  x:430 },
    { label:'Salud',     x:530 },
    { label:'Estado',    x:640 },
    { label:'Owner',     x:730 },
    { label:'',          x:790 },
  ];
  tableHeader(tableCard, accCols, 44, tableW);

  // Account rows
  const accGrads = [T.primary, T.success, T.purple, T.warning, T.info, T.danger, { r:0.031,g:0.557,b:0.698 }, T.accent];
  const accounts = [
    { name:'Tecno S.A.',     initials:'TS', industry:'Tecnolog�a',     contacts:12, pipeline:'$87,400', health:85, status:'Activo',    bc:'green',  owner:'JM', gi:0 },
    { name:'Global Corp',    initials:'GC', industry:'Manufactura',    contacts:8,  pipeline:'$64,200', health:72, status:'Activo',    bc:'green',  owner:'RP', gi:1 },
    { name:'NetSol Ltda.',   initials:'NS', industry:'TI & Servicios', contacts:5,  pipeline:'$38,900', health:60, status:'Prospecto', bc:'blue',   owner:'CG', gi:2 },
    { name:'MegaTrade',      initials:'MT', industry:'Comercio',       contacts:9,  pipeline:'$51,700', health:78, status:'Activo',    bc:'green',  owner:'JM', gi:3 },
    { name:'DataPoint S.A.', initials:'DP', industry:'Datos & BI',     contacts:4,  pipeline:'$22,100', health:35, status:'Inactivo',  bc:'gray',   owner:'RP', gi:4 },
    { name:'Innova LLC',     initials:'IL', industry:'Consultor�a',    contacts:6,  pipeline:'$43,500', health:65, status:'Prospecto', bc:'blue',   owner:'CG', gi:5 },
    { name:'Alpha Corp',     initials:'AC', industry:'Seguros',        contacts:11, pipeline:'$72,300', health:90, status:'Activo',    bc:'green',  owner:'JM', gi:6 },
    { name:'TechPlus',       initials:'TP', industry:'Tecnolog�a',     contacts:3,  pipeline:'$18,000', health:42, status:'En riesgo', bc:'orange', owner:'RP', gi:7 },
  ];

  let rowY2 = 75;
  for (const a of accounts) {
    const rowBg = frame('Row ' + a.name, tableW, 44, { fill: T.surface });
    rowBg.x = 0; rowBg.y = rowY2;

    // Avatar
    const av = frame('Av', 28, 28, { fill: accGrads[a.gi], radius: 14 });
    av.x = accCols[0].x + 2; av.y = 8;
    const avT = txt(a.initials, { size: 9, color: T.white, weight: 'Bold' });
    avT.x = (28 - avT.width) / 2; avT.y = (28 - avT.height) / 2;
    av.appendChild(avT);
    rowBg.appendChild(av);

    const nT = txt(a.name, { size: 12, color: T.text, weight: 'Semi Bold' });
    nT.name = 'RowLink / ' + a.name;
    nT.x = accCols[0].x + 36; nT.y = 15;
    rowBg.appendChild(nT);

    const indT = txt(a.industry, { size: 11, color: T.textMuted });
    indT.x = accCols[1].x; indT.y = 15;
    rowBg.appendChild(indT);

    const cnT = txt(String(a.contacts), { size: 12, color: T.text, weight: 'Semi Bold' });
    cnT.x = accCols[2].x + 8; cnT.y = 15;
    rowBg.appendChild(cnT);

    const pipT = txt(a.pipeline, { size: 12, color: T.text, weight: 'Bold' });
    pipT.x = accCols[3].x; pipT.y = 15;
    rowBg.appendChild(pipT);

    // Health bar
    const hBar = progressBar(80, a.health, a.health >= 70 ? T.success : a.health >= 50 ? T.warning : T.danger);
    hBar.x = accCols[4].x; hBar.y = 19;
    rowBg.appendChild(hBar);
    const hPct = txt(a.health + '%', { size: 10, color: T.textMuted });
    hPct.x = accCols[4].x + 86; hPct.y = 16;
    rowBg.appendChild(hPct);

    const stB = badge(a.status, a.bc);
    stB.x = accCols[5].x; stB.y = 13;
    rowBg.appendChild(stB);

    const owBg = frame('Owner', 26, 26, { fill: T.primary, radius: 13 });
    owBg.x = accCols[6].x; owBg.y = 9;
    const owT = txt(a.owner, { size: 8, color: T.white, weight: 'Bold' });
    owT.x = (26 - owT.width) / 2; owT.y = (26 - owT.height) / 2;
    owBg.appendChild(owT);
    rowBg.appendChild(owBg);

    const moreT = txt('?', { size: 14, color: T.textMuted });
    moreT.x = accCols[7].x; moreT.y = 13;
    rowBg.appendChild(moreT);

    const rowLine = rect(tableW, 1, T.border2);
    rowLine.x = 0; rowLine.y = 43;
    rowBg.appendChild(rowLine);

    tableCard.appendChild(rowBg);
    rowY2 += 44;
  }
  mf.appendChild(tableCard);

  // Industry distribution card
  const indCardY = tableY + 445;
  const indCard = frame('Card / Industrias', tableW, 130, { fill: T.surface, radius: 10, stroke: T.border, strokeW: 1 });
  indCard.x = CX + padX; indCard.y = indCardY;

  const indTitle = txt('Distribuci�n por Industria', { size: 13, color: T.text, weight: 'Semi Bold' });
  indTitle.x = 16; indTitle.y = 14;
  indCard.appendChild(indTitle);

  const indLine = rect(tableW, 1, T.border); indLine.x = 0; indLine.y = 42;
  indCard.appendChild(indLine);

  const inds = [
    { l:'Tecnolog�a',    v:38, c:T.primary },
    { l:'Manufactura',   v:22, c:T.accent },
    { l:'Comercio',      v:18, c:T.success },
    { l:'TI & Servicios',v:12, c:T.purple },
    { l:'Consultor�a',   v:6,  c:T.warning },
    { l:'Seguros',       v:4,  c:T.info },
  ];
  const indColW = Math.floor((tableW - 32 - 10 * 5) / 6);
  for (let i = 0; i < inds.length; i++) {
    const ind = inds[i];
    const ix = 16 + i * (indColW + 10);
    const indLbl = txt(ind.l, { size: 10, color: T.textMuted });
    indLbl.x = ix; indLbl.y = 52;
    indCard.appendChild(indLbl);
    const indPct = txt(ind.v + '%', { size: 12, color: T.text, weight: 'Bold' });
    indPct.x = ix; indPct.y = 66;
    indCard.appendChild(indPct);
    const indBar = progressBar(indColW, ind.v * 2 > 100 ? 100 : ind.v * 2, ind.c);
    indBar.x = ix; indBar.y = 90;
    indCard.appendChild(indBar);
  }
  mf.appendChild(indCard);

  // -- MODALES --
  const modalNC2 = buildModalNuevaCuenta();
  modalNC2.x = 1500; modalNC2.y = 900 + 100;
  mf.appendChild(modalNC2);

  const modalDC2 = buildModalDetalleCuenta();
  modalDC2.x = 2200; modalDC2.y = 900 + 100;
  mf.appendChild(modalDC2);

  return { frame: mf, modalNC2, modalDC2, btnNewC };
}

// -----------------------------------------------------------
//  MODAL � Nuevo Lead
// -----------------------------------------------------------
function buildModalNuevoLead() {
  return buildModalOverlay('Nuevo Lead', 560, 560, (dialog) => {
    modalHeader(dialog, '|| Nuevo Lead', 560);

    dialog.appendChild(formRow('Nombre completo', 'Ej: Carlos Ruiz', 20, 70, 250));
    dialog.appendChild(formRow('Empresa', 'Ej: Tecno S.A.', 290, 70, 250));
    dialog.appendChild(formRow('Email', 'correo@empresa.com', 20, 148, 250));
    dialog.appendChild(formRow('Tel�fono', '+57 310 000 0000', 290, 148, 250));
    dialog.appendChild(formRow('Fuente', 'Sitio Web', 20, 226, 170));
    dialog.appendChild(formRow('Etapa', 'Nuevo', 200, 226, 170));
    dialog.appendChild(formRow('Valor estimado', '$0', 380, 226, 160));
    dialog.appendChild(formRow('Score (0-100)', '50', 20, 304, 170));
    dialog.appendChild(formRow('Asignado a', 'Juan Mart�nez', 200, 304, 340));

    const notaLbl = txt('NOTAS', { size: 9, color: T.textMuted, weight: 'Semi Bold' });
    notaLbl.letterSpacing = { value: 4, unit: 'PERCENT' };
    notaLbl.x = 20; notaLbl.y = 383;
    dialog.appendChild(notaLbl);

    const notaBox = frame('NotasInput', 520, 56, { fill: { r:0.972, g:0.980, b:0.992 }, radius: 6, stroke: T.border, strokeW: 1 });
    notaBox.x = 20; notaBox.y = 400;
    const notaPh = txt('Informaci�n adicional del lead�', { size: 12, color: T.textMuted });
    notaPh.x = 10; notaPh.y = 10;
    notaBox.appendChild(notaPh);
    dialog.appendChild(notaBox);

    modalFooter(dialog, 560, 560, 'Crear Lead', 'Cancelar');
  });
}

// -----------------------------------------------------------
//  MODAL � Detalle Lead
// -----------------------------------------------------------
function buildModalDetalleLead() {
  return buildModalOverlay('Detalle Lead', 620, 600, (dialog) => {
    modalHeader(dialog, '|| Detalle del Lead', 620);

    // Avatar + name
    const avBg = frame('AvLg', 52, 52, { fill: T.primary, radius: 26 });
    avBg.x = 20; avBg.y = 70;
    const avT = txt('CR', { size: 18, color: T.white, weight: 'Bold' });
    avT.x = (52 - avT.width) / 2; avT.y = (52 - avT.height) / 2;
    avBg.appendChild(avT);
    dialog.appendChild(avBg);

    const nameT = txt('Carlos Ruiz', { size: 18, color: T.text, weight: 'Bold' });
    nameT.x = 84; nameT.y = 76;
    dialog.appendChild(nameT);

    const coT = txt('Tecno S.A. � Sitio Web', { size: 12, color: T.textMuted });
    coT.x = 84; coT.y = 98;
    dialog.appendChild(coT);

    const stB = badge('Calificado', 'blue');
    stB.x = 84; stB.y = 116;
    dialog.appendChild(stB);

    const div1 = rect(580, 1, T.border); div1.x = 20; div1.y = 148;
    dialog.appendChild(div1);

    // Stats row
    const ldStats = [
      { label:'Score',      val:'87'      },
      { label:'Valor est.', val:'$24,000' },
      { label:'Asignado',   val:'Juan M.' },
      { label:'Creado',     val:'Hoy'     },
    ];
    for (let i = 0; i < ldStats.length; i++) {
      const sx = 20 + i * 145;
      const sCell = frame('Stat' + i, 138, 58, { fill: { r:0.973, g:0.980, b:0.988 }, radius: 8 });
      sCell.x = sx; sCell.y = 158;
      const sVal = txt(ldStats[i].val, { size: 17, color: T.text, weight: 'Bold' });
      sVal.x = 8; sVal.y = 8;
      sCell.appendChild(sVal);
      const sLbl = txt(ldStats[i].label, { size: 9, color: T.textMuted });
      sLbl.x = 8; sLbl.y = 32;
      sCell.appendChild(sLbl);
      dialog.appendChild(sCell);
    }

    const div2 = rect(580, 1, T.border); div2.x = 20; div2.y = 228;
    dialog.appendChild(div2);

    // Contact info
    const ciT = txt('Informaci�n de contacto', { size: 12, color: T.text, weight: 'Semi Bold' });
    ciT.x = 20; ciT.y = 240;
    dialog.appendChild(ciT);

    const infoFields = [
      { l:'Email:',    v:'c.ruiz@tecno.com'  },
      { l:'Tel�fono:', v:'+57 310 555 0101'  },
      { l:'Fuente:',   v:'Sitio Web'         },
      { l:'Etapa:',    v:'Calificado'        },
    ];
    let infoY = 262;
    for (const f of infoFields) {
      const lT = txt(f.l, { size: 11, color: T.textMuted, weight: 'Semi Bold' });
      lT.x = 20; lT.y = infoY;
      dialog.appendChild(lT);
      const vT = txt(f.v, { size: 11, color: T.text });
      vT.x = 120; vT.y = infoY;
      dialog.appendChild(vT);
      infoY += 22;
    }

    const div3 = rect(580, 1, T.border); div3.x = 20; div3.y = 360;
    dialog.appendChild(div3);

    // Score bar
    const scoreT = txt('Score de calificaci�n: 87/100', { size: 12, color: T.text, weight: 'Semi Bold' });
    scoreT.x = 20; scoreT.y = 374;
    dialog.appendChild(scoreT);

    const scBar = progressBar(580, 87, T.success);
    scBar.x = 20; scBar.y = 398;
    dialog.appendChild(scBar);

    // Notes
    const notT = txt('Notas', { size: 12, color: T.text, weight: 'Semi Bold' });
    notT.x = 20; notT.y = 418;
    dialog.appendChild(notT);

    const notBox = frame('NotasBox', 580, 52, { fill: { r:0.973, g:0.980, b:0.988 }, radius: 6, stroke: T.border, strokeW: 1 });
    notBox.x = 20; notBox.y = 438;
    const notTxt = txt('Cliente interesado en soluci�n ERP. Seguimiento programado para el viernes.', { size: 11, color: T.textMuted });
    notTxt.x = 10; notTxt.y = 10;
    notBox.appendChild(notTxt);
    dialog.appendChild(notBox);

    const ftrL = rect(620, 1, T.border); ftrL.x = 0; ftrL.y = 548;
    dialog.appendChild(ftrL);

    const btnConv = button('|| Convertir a Oportunidad', 'secondary');
    btnConv.x = 20; btnConv.y = 560;
    dialog.appendChild(btnConv);

    const btnEd = button('|| Editar lead', 'primary');
    btnEd.x = 230; btnEd.y = 560;
    dialog.appendChild(btnEd);

    const btnCl = button('Cerrar', 'ghost');
    btnCl.name = 'CloseBtn';
    btnCl.x = 520; btnCl.y = 560;
    dialog.appendChild(btnCl);
  });
}

// -----------------------------------------------------------
//  PANTALLA � Leads
// -----------------------------------------------------------
async function buildLeadsPage() {
  const PAGE_W = 1440;
  const PAGE_H = 900;
  const CX    = 260;
  const CW    = PAGE_W - CX;
  const padX  = 32;
  const cY    = 64;

  const mf = frame('|| Leads', PAGE_W, PAGE_H, { fill: T.bg });
  mf.clipsContent = true;

  const sb = buildSidebar('Leads');
  sb.x = 0; sb.y = 0;
  mf.appendChild(sb);

  const hdr = buildHeader('Leads');
  hdr.x = CX; hdr.y = 0;
  mf.appendChild(hdr);

  // Title + new badge
  const pgT = txt('Leads', { size: 22, color: T.text, weight: 'Bold' });
  pgT.x = CX + padX; pgT.y = cY + 22;
  mf.appendChild(pgT);

  const newBadge = frame('Badge12', 66, 20, { fill: T.danger, radius: 10 });
  newBadge.x = CX + padX + 80; newBadge.y = cY + 27;
  const newBadgeTxt = txt('12 nuevos', { size: 10, color: T.white, weight: 'Bold' });
  newBadgeTxt.x = 6; newBadgeTxt.y = 4;
  newBadge.appendChild(newBadgeTxt);
  mf.appendChild(newBadge);

  const pgS = txt('84 leads este mes � Tasa de conversi�n: 18.4%', { size: 12, color: T.textMuted });
  pgS.x = CX + padX; pgS.y = cY + 50;
  mf.appendChild(pgS);

  // Buttons
  const btnImpL = button('|| Importar', 'secondary');
  btnImpL.x = CX + CW - 268; btnImpL.y = cY + 26;
  mf.appendChild(btnImpL);

  const btnNewLead = button('+ Nuevo lead', 'primary');
  btnNewLead.name = 'Btn / Nuevo Lead ? Modal Nuevo Lead';
  btnNewLead.x = CX + CW - 148; btnNewLead.y = cY + 26;
  mf.appendChild(btnNewLead);

  // KPIs
  const kpisLeads = [
    { label:'Total leads',    value:'84', color:T.primaryLight, ibg:{r:0.859,g:0.941,b:0.996}, icon:'||', change:'? 13.5% vs mes ant.', up:true  },
    { label:'Calificados',    value:'31', color:T.success,      ibg:{r:0.859,g:0.988,b:0.902}, icon:'?', change:'? 5 esta semana',      up:true  },
    { label:'Score promedio', value:'68', color:T.accent,       ibg:{r:0.996,g:0.976,b:0.761}, icon:'?', change:'? 3.2 pts',            up:true  },
    { label:'Descartados',    value:'12', color:T.danger,       ibg:{r:0.996,g:0.886,b:0.886}, icon:'?', change:'? 2 vs mes ant.',      up:false },
  ];
  const kWL  = 268;
  const kpiY = cY + 72;
  for (let i = 0; i < kpisLeads.length; i++) {
    const k = kpisLeads[i];
    const c = kpiCard(k.label, k.value, k.change, k.up, k.icon, k.color, k.ibg, kWL);
    c.x = CX + padX + i * (kWL + 12); c.y = kpiY;
    mf.appendChild(c);
  }

  // Content area: table (left) | source + summary (right)
  const contentY = kpiY + 116;
  const sideW    = 284;
  const tableW   = CW - padX * 2 - sideW - 16;

  // -- TABLE CARD ------------------------------------------
  const tableCard = frame('Card / Tabla Leads', tableW, 500, { fill: T.surface, radius: 10, stroke: T.border, strokeW: 1 });
  tableCard.x = CX + padX; tableCard.y = contentY;

  // Filter tabs bar
  const tabBg = frame('TabBar', tableW, 46, { fill: T.surface });
  tabBg.x = 0; tabBg.y = 0;

  const leadTabs = ['Todos','Nuevos','Calificados','Contactados','Negociaci�n','Descartados'];
  const leadTabW  = [52, 60, 76, 80, 84, 76];
  let tabX = 12;
  for (let i = 0; i < leadTabs.length; i++) {
    const tw = leadTabW[i];
    const tabBtn = frame('Tab ' + leadTabs[i], tw, 28, {
      fill: i === 0 ? T.primary : T.surface,
      radius: 6,
      stroke: i === 0 ? null : T.border, strokeW: 1,
    });
    tabBtn.x = tabX; tabBtn.y = 9;
    const tabTt = txt(leadTabs[i], { size: 11, color: i === 0 ? T.white : T.textMuted, weight: i === 0 ? 'Semi Bold' : 'Medium' });
    tabTt.x = (tw - tabTt.width) / 2; tabTt.y = (28 - tabTt.height) / 2;
    tabBtn.appendChild(tabTt);
    tabBg.appendChild(tabBtn);
    tabX += tw + 6;
  }
  const tSearchL = frame('TSearch', 156, 28, { fill: { r:0.972,g:0.980,b:0.992 }, radius: 6, stroke: T.border, strokeW: 1 });
  tSearchL.x = tableW - 172; tSearchL.y = 9;
  const tsIcoL = txt('||', { size: 10 }); tsIcoL.x = 8; tsIcoL.y = 7;
  const tsPhL  = txt('Buscar�', { size: 11, color: T.textMuted }); tsPhL.x = 26; tsPhL.y = 7;
  tSearchL.appendChild(tsIcoL); tSearchL.appendChild(tsPhL);
  tabBg.appendChild(tSearchL);

  const tabLine = rect(tableW, 1, T.border); tabLine.x = 0; tabLine.y = 45;
  tabBg.appendChild(tabLine);
  tableCard.appendChild(tabBg);

  // Column headers
  const lCols = [
    { label:'Nombre',    x:12  },
    { label:'Empresa',   x:188 },
    { label:'Fuente',    x:286 },
    { label:'Etapa',     x:364 },
    { label:'Score',     x:456 },
    { label:'Valor est.',x:534 },
    { label:'Asig.',     x:618 },
    { label:'Fecha',     x:660 },
    { label:'',          x:718 },
  ];
  tableHeader(tableCard, lCols, 46, tableW);

  // Data rows
  const leadsData = [
    { name:'Carlos Ruiz',      init:'CR',  co:'Tecno S.A.',  src:'Sitio Web', stage:'Calificado',  sc:'blue',   score:87, val:'$24,000', asn:'JM', date:'Hoy'     },
    { name:'Ana L�pez',        init:'AL',  co:'Innova LLC',  src:'LinkedIn',  stage:'Nuevo',       sc:'navy',   score:62, val:'$8,500',  asn:'RP', date:'Ayer'    },
    { name:'Pedro Vargas',     init:'PV',  co:'GlobalNet',   src:'Referido',  stage:'Contactado',  sc:'purple', score:74, val:'$15,200', asn:'CG', date:'Hace 2d' },
    { name:'Mar�a Fern�ndez',  init:'MF',  co:'DataPoint',   src:'Email',     stage:'Negociaci�n', sc:'gold',   score:91, val:'$42,000', asn:'JM', date:'Hoy'     },
    { name:'Luis Torres',      init:'LT',  co:'MegaTrade',   src:'Llamada',   stage:'Descartado',  sc:'gray',   score:23, val:'�',       asn:'RP', date:'Hace 5d' },
    { name:'Sof�a M�ndez',     init:'SM',  co:'NetSol',      src:'Sitio Web', stage:'Calificado',  sc:'blue',   score:78, val:'$19,800', asn:'CG', date:'Hace 1d' },
    { name:'Roberto G�mez',    init:'RG',  co:'TechPlus',    src:'Evento',    stage:'Nuevo',       sc:'navy',   score:55, val:'$6,000',  asn:'JM', date:'Hoy'     },
    { name:'Laura Jim�nez',    init:'LJ',  co:'Alpha Corp',  src:'Referido',  stage:'Propuesta',   sc:'orange', score:83, val:'$31,500', asn:'RP', date:'Ayer'    },
    { name:'Diego Castro',     init:'DC',  co:'FinTech SA',  src:'LinkedIn',  stage:'Calificado',  sc:'blue',   score:69, val:'$12,400', asn:'CG', date:'Hace 3d' },
    { name:'Carmen Reyes',     init:'CR2', co:'Retail Plus', src:'Sitio Web', stage:'Contactado',  sc:'purple', score:71, val:'$9,700',  asn:'JM', date:'Hace 2d' },
  ];

  let rowY = 78;
  for (const l of leadsData) {
    const rowBg = frame('Row ' + l.name, tableW, 42, { fill: T.surface });
    rowBg.x = 0; rowBg.y = rowY;

    const av = frame('Av', 28, 28, { fill: T.primary, radius: 14 });
    av.x = lCols[0].x + 2; av.y = 7;
    const avT = txt(l.init.slice(0,2), { size: 8, color: T.white, weight: 'Bold' });
    avT.x = (28 - avT.width) / 2; avT.y = (28 - avT.height) / 2;
    av.appendChild(avT);
    rowBg.appendChild(av);

    const nT = txt(l.name, { size: 11, color: T.text, weight: 'Semi Bold' });
    nT.name = 'RowLink / ' + l.name;
    nT.x = lCols[0].x + 36; nT.y = 14;
    rowBg.appendChild(nT);

    const coT = txt(l.co, { size: 11, color: T.textMuted });
    coT.x = lCols[1].x; coT.y = 14;
    rowBg.appendChild(coT);

    const srcT = txt(l.src, { size: 11, color: T.textMuted });
    srcT.x = lCols[2].x; srcT.y = 14;
    rowBg.appendChild(srcT);

    const stB = badge(l.stage, l.sc);
    stB.x = lCols[3].x; stB.y = 11;
    rowBg.appendChild(stB);

    const scoreClr = l.score >= 80 ? T.success : l.score >= 60 ? T.warning : T.danger;
    const sBar = progressBar(54, l.score, scoreClr);
    sBar.x = lCols[4].x; sBar.y = 20;
    rowBg.appendChild(sBar);
    const sNum = txt(String(l.score), { size: 10, color: T.text, weight: 'Bold' });
    sNum.x = lCols[4].x + 58; sNum.y = 14;
    rowBg.appendChild(sNum);

    const valT = txt(l.val, { size: 11, color: T.text, weight: 'Bold' });
    valT.x = lCols[5].x; valT.y = 14;
    rowBg.appendChild(valT);

    const asBg = frame('As', 24, 24, { fill: T.primary, radius: 12 });
    asBg.x = lCols[6].x; asBg.y = 9;
    const asT = txt(l.asn, { size: 8, color: T.white, weight: 'Bold' });
    asT.x = (24 - asT.width) / 2; asT.y = (24 - asT.height) / 2;
    asBg.appendChild(asT);
    rowBg.appendChild(asBg);

    const dateT = txt(l.date, { size: 10, color: T.textMuted });
    dateT.x = lCols[7].x; dateT.y = 14;
    rowBg.appendChild(dateT);

    const moreT = txt('?', { size: 14, color: T.textMuted });
    moreT.x = lCols[8].x; moreT.y = 12;
    rowBg.appendChild(moreT);

    const rowLine = rect(tableW, 1, T.border2);
    rowLine.x = 0; rowLine.y = 41;
    rowBg.appendChild(rowLine);

    tableCard.appendChild(rowBg);
    rowY += 42;
  }
  mf.appendChild(tableCard);

  // -- SOURCE CHART CARD -----------------------------------
  const sideCard = frame('Card / Fuentes', sideW, 286, { fill: T.surface, radius: 10, stroke: T.border, strokeW: 1 });
  sideCard.x = CX + padX + tableW + 16; sideCard.y = contentY;

  const sideTitle = txt('Leads por Fuente', { size: 13, color: T.text, weight: 'Semi Bold' });
  sideTitle.x = 16; sideTitle.y = 14;
  sideCard.appendChild(sideTitle);
  const sideDiv = rect(sideW, 1, T.border); sideDiv.x = 0; sideDiv.y = 42;
  sideCard.appendChild(sideDiv);

  const lSources = [
    { l:'Sitio Web',    v:38, c:T.primary },
    { l:'Referidos',    v:27, c:T.accent  },
    { l:'LinkedIn',     v:18, c:T.info    },
    { l:'Llamada fr�a', v:10, c:T.purple  },
    { l:'Email',        v:7,  c:T.success },
  ];
  let srcY = 54;
  for (const s of lSources) {
    const lT = txt(s.l, { size: 12, color: T.textMuted, weight: 'Medium' });
    lT.x = 16; lT.y = srcY;
    sideCard.appendChild(lT);
    const vT = txt(s.v + '%', { size: 11, color: T.text, weight: 'Bold' });
    vT.x = sideW - 40; vT.y = srcY;
    sideCard.appendChild(vT);
    const pb = progressBar(sideW - 32, Math.min(s.v * 2.5, 100), s.c);
    pb.x = 16; pb.y = srcY + 18;
    sideCard.appendChild(pb);
    srcY += 46;
  }
  mf.appendChild(sideCard);

  // -- RESUMEN DEL MES CARD --------------------------------
  const resumeCard = frame('Card / Resumen', sideW, 180, { fill: T.surface, radius: 10, stroke: T.border, strokeW: 1 });
  resumeCard.x = CX + padX + tableW + 16; resumeCard.y = contentY + 302;

  const resTitle = txt('Resumen del mes', { size: 11, color: T.textMuted, weight: 'Bold' });
  resTitle.x = 16; resTitle.y = 14;
  resumeCard.appendChild(resTitle);
  const resDiv = rect(sideW, 1, T.border); resDiv.x = 0; resDiv.y = 38;
  resumeCard.appendChild(resDiv);

  const resumeRows = [
    { l:'Leads nuevos',    v:'84'    },
    { l:'Convertidos',     v:'15'    },
    { l:'En proceso',      v:'57'    },
    { l:'Tasa conversi�n', v:'18.4%' },
  ];
  let resY = 50;
  for (const r of resumeRows) {
    const rL = txt(r.l, { size: 12, color: T.textMuted });
    rL.x = 16; rL.y = resY;
    resumeCard.appendChild(rL);
    const rV = txt(r.v, { size: 12, color: T.text, weight: 'Bold' });
    rV.x = sideW - 56; rV.y = resY;
    resumeCard.appendChild(rV);
    resY += 30;
  }
  mf.appendChild(resumeCard);

  // -- MODALES ---------------------------------------------
  const modalNL = buildModalNuevoLead();
  modalNL.x = 1500; modalNL.y = 900 + 100;
  mf.appendChild(modalNL);

  const modalDL = buildModalDetalleLead();
  modalDL.x = 2200; modalDL.y = 900 + 100;
  mf.appendChild(modalDL);

  return { frame: mf, modalNL, modalDL, btnNewLead };
}

// -----------------------------------------------------------
//  MODAL � Nueva Oportunidad
// -----------------------------------------------------------
function buildModalNuevaOportunidad() {
  return buildModalOverlay('Nueva Oportunidad', 580, 560, (dialog) => {
    modalHeader(dialog, '|| Nueva Oportunidad', 580);

    dialog.appendChild(formRow('Nombre de la oportunidad', 'Ej: Licencia ERP anual', 20, 70, 540));
    dialog.appendChild(formRow('Cuenta / Empresa', 'Ej: Tecno S.A.', 20, 148, 259));
    dialog.appendChild(formRow('Etapa', 'Prospecci�n', 299, 148, 261));
    dialog.appendChild(formRow('Valor estimado', '$0', 20, 226, 170));
    dialog.appendChild(formRow('Probabilidad (%)', '50', 200, 226, 170));
    dialog.appendChild(formRow('Fecha cierre', 'dd/mm/aaaa', 380, 226, 180));
    dialog.appendChild(formRow('Asignado a', 'Juan Mart�nez', 20, 304, 259));
    dialog.appendChild(formRow('Fuente del lead', 'Seleccionar�', 299, 304, 261));

    const notaLbl = txt('DESCRIPCI�N', { size: 9, color: T.textMuted, weight: 'Semi Bold' });
    notaLbl.letterSpacing = { value: 4, unit: 'PERCENT' };
    notaLbl.x = 20; notaLbl.y = 383;
    dialog.appendChild(notaLbl);

    const notaBox = frame('DescInput', 540, 56, { fill: { r:0.972, g:0.980, b:0.992 }, radius: 6, stroke: T.border, strokeW: 1 });
    notaBox.x = 20; notaBox.y = 400;
    const notaPh = txt('Descripci�n de la oportunidad�', { size: 12, color: T.textMuted });
    notaPh.x = 10; notaPh.y = 10;
    notaBox.appendChild(notaPh);
    dialog.appendChild(notaBox);

    modalFooter(dialog, 580, 560, 'Crear Oportunidad', 'Cancelar');
  });
}

// -----------------------------------------------------------
//  MODAL � Detalle Oportunidad (Kanban card click)
// -----------------------------------------------------------
function buildModalDetalleOportunidad() {
  return buildModalOverlay('Detalle Oportunidad', 640, 620, (dialog) => {
    modalHeader(dialog, '|| Detalle de la Oportunidad', 640);

    // Title + company
    const opNameT = txt('Plataforma e-commerce', { size: 18, color: T.text, weight: 'Bold' });
    opNameT.x = 20; opNameT.y = 72;
    dialog.appendChild(opNameT);

    const opCoT = txt('Tecno S.A.', { size: 12, color: T.textMuted });
    opCoT.x = 20; opCoT.y = 96;
    dialog.appendChild(opCoT);

    const stageB = badge('Negociaci�n', 'orange');
    stageB.x = 20; stageB.y = 116;
    dialog.appendChild(stageB);

    const div1 = rect(600, 1, T.border); div1.x = 20; div1.y = 148;
    dialog.appendChild(div1);

    // Stats
    const opStats = [
      { label:'Valor',       val:'$42,000' },
      { label:'Probabilidad',val:'72%'     },
      { label:'Asignado',    val:'Juan M.' },
      { label:'Cierre est.', val:'15 mar'  },
    ];
    for (let i = 0; i < opStats.length; i++) {
      const sx = 20 + i * 150;
      const sc = frame('OpStat' + i, 142, 60, { fill: { r:0.973, g:0.980, b:0.988 }, radius: 8 });
      sc.x = sx; sc.y = 158;
      const sv = txt(opStats[i].val, { size: 16, color: T.text, weight: 'Bold' });
      sv.x = 8; sv.y = 8;
      sc.appendChild(sv);
      const sl = txt(opStats[i].label, { size: 9, color: T.textMuted });
      sl.x = 8; sl.y = 32;
      sc.appendChild(sl);
      dialog.appendChild(sc);
    }

    const div2 = rect(600, 1, T.border); div2.x = 20; div2.y = 230;
    dialog.appendChild(div2);

    // Probability bar
    const probT = txt('Probabilidad de cierre: 72%', { size: 12, color: T.text, weight: 'Semi Bold' });
    probT.x = 20; probT.y = 244;
    dialog.appendChild(probT);
    const probBar = progressBar(600, 72, T.warning);
    probBar.x = 20; probBar.y = 268;
    dialog.appendChild(probBar);

    const div3 = rect(600, 1, T.border); div3.x = 20; div3.y = 290;
    dialog.appendChild(div3);

    // Stage pipeline visual
    const stageT = txt('Etapa en el pipeline', { size: 12, color: T.text, weight: 'Semi Bold' });
    stageT.x = 20; stageT.y = 304;
    dialog.appendChild(stageT);

    const stages = ['Prospecci�n','Calificaci�n','Propuesta','Negociaci�n','Cierre'];
    const stageColors = ['#0284c7','#7c3aed','#c8a558','#d97706','#16a34a'];
    const stageW = 108;
    for (let i = 0; i < stages.length; i++) {
      const isActive = i === 3;
      const sgBox = frame('Stage' + i, stageW, 30, {
        fill: isActive ? { r:1, g:0.929, b:0.824 } : { r:0.973,g:0.980,b:0.988 },
        radius: 4,
        stroke: isActive ? { r:0.851,g:0.467,b:0.024 } : T.border, strokeW: isActive ? 2 : 1,
      });
      sgBox.x = 20 + i * (stageW + 4); sgBox.y = 328;
      const sgT = txt(stages[i], { size: 10, color: isActive ? { r:0.851,g:0.467,b:0.024 } : T.textMuted, weight: isActive ? 'Bold' : 'Medium' });
      sgT.x = (stageW - sgT.width) / 2; sgT.y = 8;
      sgBox.appendChild(sgT);
      dialog.appendChild(sgBox);
    }

    const div4 = rect(600, 1, T.border); div4.x = 20; div4.y = 376;
    dialog.appendChild(div4);

    // Activity log
    const actT = txt('Actividad reciente', { size: 12, color: T.text, weight: 'Semi Bold' });
    actT.x = 20; actT.y = 390;
    dialog.appendChild(actT);

    const activities = [
      { ico:'||', txt:'Llamada de seguimiento � Hace 2 d�as' },
      { ico:'||', txt:'Email con propuesta enviado � Hace 4 d�as' },
      { ico:'||', txt:'Reuni�n demo agendada � 18 mar' },
    ];
    let actY = 412;
    for (const a of activities) {
      const aIco = txt(a.ico, { size: 12 }); aIco.x = 20; aIco.y = actY;
      dialog.appendChild(aIco);
      const aTxt = txt(a.txt, { size: 11, color: T.textMuted });
      aTxt.x = 40; aTxt.y = actY;
      dialog.appendChild(aTxt);
      actY += 24;
    }

    const ftrL = rect(640, 1, T.border); ftrL.x = 0; ftrL.y = 568;
    dialog.appendChild(ftrL);

    const btnEd2 = button('|| Editar', 'primary');
    btnEd2.x = 20; btnEd2.y = 580;
    dialog.appendChild(btnEd2);

    const btnAct = button('? Registrar actividad', 'secondary');
    btnAct.x = 120; btnAct.y = 580;
    dialog.appendChild(btnAct);

    const btnCl2 = button('Cerrar', 'ghost');
    btnCl2.name = 'CloseBtn';
    btnCl2.x = 540; btnCl2.y = 580;
    dialog.appendChild(btnCl2);
  });
}

// -----------------------------------------------------------
//  PANTALLA � Oportunidades (Kanban)
// -----------------------------------------------------------
async function buildOportunidadesPage() {
  const PAGE_W = 1440;
  const PAGE_H = 900;
  const CX    = 260;
  const CW    = PAGE_W - CX;
  const padX  = 28;
  const cY    = 64;

  const mf = frame('|| Oportunidades', PAGE_W, PAGE_H, { fill: T.bg });
  mf.clipsContent = true;

  const sb = buildSidebar('Oportunidades');
  sb.x = 0; sb.y = 0;
  mf.appendChild(sb);

  const hdr = buildHeader('Oportunidades');
  hdr.x = CX; hdr.y = 0;
  mf.appendChild(hdr);

  // Title row
  const pgT2 = txt('Oportunidades', { size: 22, color: T.text, weight: 'Bold' });
  pgT2.x = CX + padX; pgT2.y = cY + 22;
  mf.appendChild(pgT2);

  const pgS2 = txt('91 oportunidades � Pipeline total: $248,500', { size: 12, color: T.textMuted });
  pgS2.x = CX + padX; pgS2.y = cY + 50;
  mf.appendChild(pgS2);

  // Buttons
  const btnList = button('|| Lista', 'secondary');
  btnList.x = CX + CW - 360; btnList.y = cY + 26;
  mf.appendChild(btnList);

  const btnBoard = button('|| Tablero', 'secondary');
  btnBoard.x = CX + CW - 270; btnBoard.y = cY + 26;
  mf.appendChild(btnBoard);

  const btnNewOp = button('+ Nueva oportunidad', 'primary');
  btnNewOp.name = 'Btn / Nueva Oportunidad ? Modal Nueva Oportunidad';
  btnNewOp.x = CX + CW - 172; btnNewOp.y = cY + 26;
  mf.appendChild(btnNewOp);

  // KPIs (5 cards)
  const kpisOp = [
    { label:'Total pipeline',   value:'$248K', color:T.primaryLight, ibg:{r:0.859,g:0.941,b:0.996}, icon:'||', change:'? 4.7% vs mes ant.', up:true  },
    { label:'Cerradas ganadas', value:'$82K',  color:T.success,      ibg:{r:0.859,g:0.988,b:0.902}, icon:'||', change:'? 21.4%',             up:true  },
    { label:'En negociaci�n',   value:'11',    color:T.warning,      ibg:{r:1,g:0.933,b:0.824},     icon:'||', change:'$72,800 total',        up:true  },
    { label:'Tasa de ganancia', value:'38%',   color:T.purple,       ibg:{r:0.953,g:0.910,b:1.0},   icon:'||', change:'? 3%',                up:true  },
    { label:'Ciclo promedio',   value:'24d',   color:T.accent,       ibg:{r:0.996,g:0.976,b:0.761}, icon:'||', change:'? 2d mejor',          up:true  },
  ];
  const kWO  = 216;
  const kpiYO = cY + 70;
  for (let i = 0; i < kpisOp.length; i++) {
    const k = kpisOp[i];
    const c = kpiCard(k.label, k.value, k.change, k.up, k.icon, k.color, k.ibg, kWO);
    c.x = CX + padX + i * (kWO + 10); c.y = kpiYO;
    mf.appendChild(c);
  }

  // Pipeline summary bar
  const summaryY = kpiYO + 110;
  const summaryCard = frame('Card / Resumen Pipeline', CW - padX * 2, 94, { fill: T.surface, radius: 10, stroke: T.border, strokeW: 1 });
  summaryCard.x = CX + padX; summaryCard.y = summaryY;

  const sumTitle = txt('Resumen por Etapa', { size: 13, color: T.text, weight: 'Semi Bold' });
  sumTitle.x = 16; sumTitle.y = 14;
  summaryCard.appendChild(sumTitle);
  const sumTotal = txt('Valor total: $248,500', { size: 11, color: T.textMuted });
  sumTotal.x = (CW - padX * 2) - 160; sumTotal.y = 16;
  summaryCard.appendChild(sumTotal);

  // Colored bar
  const kanbanData = [
    { title:'Prospecci�n', val:28400, color:'#0284c7' },
    { title:'Calificaci�n',val:45200, color:'#7c3aed' },
    { title:'Propuesta',   val:63100, color:'#c8a558' },
    { title:'Negociaci�n', val:72800, color:'#d97706' },
    { title:'Cierre',      val:39000, color:'#16a34a' },
  ];
  const totalVal = kanbanData.reduce((s, k) => s + k.val, 0);
  const barW = (CW - padX * 2) - 32;
  let barX = 16;
  for (const k of kanbanData) {
    const segW = Math.round((k.val / totalVal) * barW);
    const hx = parseInt(k.color.slice(1), 16);
    const segFill = { r: ((hx >> 16) & 0xff) / 255, g: ((hx >> 8) & 0xff) / 255, b: (hx & 0xff) / 255 };
    const seg = frame('Seg ' + k.title, segW, 20, { fill: segFill });
    seg.x = barX; seg.y = 38;
    summaryCard.appendChild(seg);
    barX += segW;
  }

  // Legend
  let legX = 16;
  for (const k of kanbanData) {
    const hx = parseInt(k.color.slice(1), 16);
    const legFill = { r: ((hx >> 16) & 0xff) / 255, g: ((hx >> 8) & 0xff) / 255, b: (hx & 0xff) / 255 };
    const dot = frame('Dot', 8, 8, { fill: legFill, radius: 4 });
    dot.x = legX; dot.y = 68;
    summaryCard.appendChild(dot);
    const legTxt = txt(k.title + ' $' + (k.val / 1000).toFixed(0) + 'K', { size: 10, color: T.textMuted });
    legTxt.x = legX + 12; legTxt.y = 65;
    summaryCard.appendChild(legTxt);
    legX += legTxt.width + 28;
  }
  mf.appendChild(summaryCard);

  // -- KANBAN BOARD ------------------------------------------
  const kanbanY = summaryY + 110;
  const kanbanCard = frame('Card / Kanban', CW - padX * 2, 610, { fill: T.surface, radius: 10, stroke: T.border, strokeW: 1 });
  kanbanCard.x = CX + padX; kanbanCard.y = kanbanY;

  const kbHeader = frame('KbHeader', CW - padX * 2, 46, { fill: T.surface });
  kbHeader.x = 0; kbHeader.y = 0;
  const kbTitle = txt('Vista Kanban', { size: 13, color: T.text, weight: 'Semi Bold' });
  kbTitle.x = 16; kbTitle.y = 14;
  kbHeader.appendChild(kbTitle);
  const kbLine = rect(CW - padX * 2, 1, T.border); kbLine.x = 0; kbLine.y = 45;
  kbHeader.appendChild(kbLine);
  kanbanCard.appendChild(kbHeader);

  // Columns
  const colW = 216;
  const colGap = 12;
  const kanbanCols = [
    {
      title:'Prospecci�n', color:'#0284c7', bg:{ r:0.859,g:0.941,b:0.996 },
      total:'$28,400', cards:[
        { t:'Licencia ERP anual',   co:'Tecno S.A.',  val:'$12,000', prob:20, days:3, owner:'JM' },
        { t:'Consultor�a cloud',    co:'NetSol',       val:'$8,400',  prob:15, days:7, owner:'RP' },
        { t:'Soporte premium 2026', co:'DataPoint',   val:'$8,000',  prob:25, days:1, owner:'CG' },
      ],
    },
    {
      title:'Calificaci�n', color:'#7c3aed', bg:{ r:0.953,g:0.910,b:1.0 },
      total:'$45,200', cards:[
        { t:'Suite Analytics',      co:'Global Corp',  val:'$18,700', prob:40, days:4, owner:'JM' },
        { t:'Migraci�n a la nube',  co:'MegaTrade',    val:'$26,500', prob:45, days:2, owner:'CG' },
      ],
    },
    {
      title:'Propuesta', color:'#c8a558', bg:{ r:0.996,g:0.976,b:0.761 },
      total:'$63,100', cards:[
        { t:'M�dulo de reportes',   co:'Global Corp',  val:'$24,600', prob:55, days:5, owner:'JM' },
        { t:'Integraci�n CRM-ERP',  co:'MegaTrade',    val:'$38,500', prob:60, days:2, owner:'RP' },
      ],
    },
    {
      title:'Negociaci�n', color:'#d97706', bg:{ r:1,g:0.929,b:0.824 },
      total:'$72,800', cards:[
        { t:'Plataforma e-commerce', co:'Tecno S.A.',  val:'$42,000', prob:72, days:4, owner:'JM' },
        { t:'Redise�o portal',       co:'Innova LLC',  val:'$30,800', prob:78, days:6, owner:'CG' },
      ],
    },
    {
      title:'Cierre', color:'#16a34a', bg:{ r:0.859,g:0.988,b:0.902 },
      total:'$39,000', cards:[
        { t:'Licencia corporativa',  co:'Global Corp',  val:'$39,000', prob:90, days:1, owner:'JM' },
      ],
    },
  ];

  for (let ci = 0; ci < kanbanCols.length; ci++) {
    const col = kanbanCols[ci];
    const colX = 12 + ci * (colW + colGap);

    // Column container
    const colFrame = frame('Col ' + col.title, colW, 540, { fill: { r:0.973,g:0.980,b:0.988 }, radius: 8 });
    colFrame.x = colX; colFrame.y = 54;

    // Column header
    const colHdr = frame('ColHdr', colW, 38, { fill: col.bg, radius: 8 });
    colHdr.x = 0; colHdr.y = 0;
    const hx2 = parseInt(col.color.slice(1), 16);
    const colFill = { r: ((hx2 >> 16) & 0xff) / 255, g: ((hx2 >> 8) & 0xff) / 255, b: (hx2 & 0xff) / 255 };
    const dotC = frame('DotC', 8, 8, { fill: colFill, radius: 4 });
    dotC.x = 10; dotC.y = 15;
    colHdr.appendChild(dotC);
    const colTitleT = txt(col.title, { size: 11, color: colFill, weight: 'Bold' });
    colTitleT.x = 24; colTitleT.y = 12;
    colHdr.appendChild(colTitleT);
    const colTotalT = txt(col.total, { size: 10, color: T.textMuted, weight: 'Semi Bold' });
    colTotalT.x = colW - 60; colTotalT.y = 13;
    colHdr.appendChild(colTotalT);
    colFrame.appendChild(colHdr);

    // Cards
    let cardY = 46;
    for (const c of col.cards) {
      const cardFrame = frame('Card', colW - 12, 96, { fill: T.surface, radius: 8, stroke: T.border2, strokeW: 1 });
      cardFrame.x = 6; cardFrame.y = cardY;

      const cardTitle = txt(c.t, { size: 11, color: T.text, weight: 'Semi Bold' });
      cardTitle.name = 'RowLink / ' + c.t;
      cardTitle.x = 10; cardTitle.y = 8;
      cardFrame.appendChild(cardTitle);

      const cardCo = txt(c.co, { size: 10, color: T.textMuted });
      cardCo.x = 10; cardCo.y = 24;
      cardFrame.appendChild(cardCo);

      // Progress bar (probability)
      const pBar = progressBar((colW - 32), c.prob, T.accent);
      pBar.x = 10; pBar.y = 42;
      cardFrame.appendChild(pBar);

      const cardVal = txt(c.val, { size: 11, color: T.text, weight: 'Bold' });
      cardVal.x = 10; cardVal.y = 54;
      cardFrame.appendChild(cardVal);

      const calIco = txt('||', { size: 9 }); calIco.x = 10; calIco.y = 74;
      cardFrame.appendChild(calIco);
      const daysT = txt(c.days + 'd', { size: 10, color: T.textMuted }); daysT.x = 24; daysT.y = 74;
      cardFrame.appendChild(daysT);

      const owAv = frame('OwAv', 20, 20, { fill: T.primary, radius: 10 });
      owAv.x = (colW - 32); owAv.y = 68;
      const owT = txt(c.owner, { size: 7, color: T.white, weight: 'Bold' });
      owT.x = (20 - owT.width) / 2; owT.y = (20 - owT.height) / 2;
      owAv.appendChild(owT);
      cardFrame.appendChild(owAv);

      colFrame.appendChild(cardFrame);
      cardY += 104;
    }

    // Add card button
    const addBtn = frame('AddBtn', colW - 12, 28, { fill: { r:0.941,g:0.949,b:0.961 }, radius: 6 });
    addBtn.x = 6; addBtn.y = cardY + 6;
    const addT = txt('+ Agregar oportunidad', { size: 10, color: T.textMuted });
    addT.x = (colW - 12 - addT.width) / 2; addT.y = 8;
    addBtn.appendChild(addT);
    colFrame.appendChild(addBtn);

    kanbanCard.appendChild(colFrame);
  }

  mf.appendChild(kanbanCard);

  // -- MODALES ---------------------------------------------
  const modalNO = buildModalNuevaOportunidad();
  modalNO.x = 1500; modalNO.y = 900 + 100;
  mf.appendChild(modalNO);

  const modalDO = buildModalDetalleOportunidad();
  modalDO.x = 2200; modalDO.y = 900 + 100;
  mf.appendChild(modalDO);

  return { frame: mf, modalNO, modalDO, btnNewOp };
}

// -----------------------------------------------------------
//  PROTOTYPE � Contactos + Cuentas
// -----------------------------------------------------------
function wireContactsPrototype(contactsFrame, btnNew, modalNC) {
  if (btnNew && modalNC) {
    btnNew.reactions = [{
      actions: [{
        type: 'NODE',
        destinationId: modalNC.id,
        navigation: 'OVERLAY',
        transition: { type: 'DISSOLVE', duration: 0.2, easing: { type: 'EASE_OUT' } },
        preserveScrollPosition: false,
        overlayRelativePosition: { x: 0, y: 0 },
      }],
      trigger: { type: 'ON_CLICK' },
    }];
  }
  // Close buttons
  contactsFrame.findAll(n => n.name === 'CloseBtn').forEach(n => {
    try { n.reactions = [{ actions: [{ type: 'BACK', navigation: 'BACK' }], trigger: { type: 'ON_CLICK' } }]; } catch (_) {}
  });
}

function wireAccountsPrototype(accountsFrame, btnNewC, modalNC2) {
  if (btnNewC && modalNC2) {
    btnNewC.reactions = [{
      actions: [{
        type: 'NODE',
        destinationId: modalNC2.id,
        navigation: 'OVERLAY',
        transition: { type: 'DISSOLVE', duration: 0.2, easing: { type: 'EASE_OUT' } },
        preserveScrollPosition: false,
        overlayRelativePosition: { x: 0, y: 0 },
      }],
      trigger: { type: 'ON_CLICK' },
    }];
  }
  accountsFrame.findAll(n => n.name === 'CloseBtn').forEach(n => {
    try { n.reactions = [{ actions: [{ type: 'BACK', navigation: 'BACK' }], trigger: { type: 'ON_CLICK' } }]; } catch (_) {}
  });
}

// -----------------------------------------------------------
//  MODAL � Detalle Actividad
// -----------------------------------------------------------
function buildModalDetalleActividad() {
  return buildModalOverlay('Detalle Actividad', 560, 540, (dialog) => {
    modalHeader(dialog, '|| Detalle de Actividad', 560);

    // Icon + title
    const icoBox = frame('IcoBox', 40, 40, { fill: { r:0.859,g:0.914,b:0.996 }, radius: 10 });
    icoBox.x = 20; icoBox.y = 72;
    const icoT = txt('||', { size: 18 }); icoT.x = 9; icoT.y = 8;
    icoBox.appendChild(icoT);
    dialog.appendChild(icoBox);

    const titleT = txt('Llamada de seguimiento', { size: 16, color: T.text, weight: 'Bold' });
    titleT.x = 72; titleT.y = 76;
    dialog.appendChild(titleT);

    const typeT = txt('Llamada � Completada', { size: 12, color: T.textMuted });
    typeT.x = 72; typeT.y = 96;
    dialog.appendChild(typeT);

    const stB = badge('Completada', 'green');
    stB.x = 72; stB.y = 112;
    dialog.appendChild(stB);

    const div1 = rect(520, 1, T.border); div1.x = 20; div1.y = 142;
    dialog.appendChild(div1);

    // Info fields
    const fields = [
      { l:'Contacto:',  v:'Carlos Ruiz'      },
      { l:'Empresa:',   v:'Tecno S.A.'        },
      { l:'Fecha/Hora:',v:'Hoy � 10:30 AM'   },
      { l:'Duraci�n:',  v:'25 minutos'        },
      { l:'Asignado a:',v:'Juan Mart�nez'     },
      { l:'Oportunidad:',v:'Licencia ERP anual'},
    ];
    let fY = 158;
    for (const f of fields) {
      const lT = txt(f.l, { size: 11, color: T.textMuted, weight: 'Semi Bold' });
      lT.x = 20; lT.y = fY;
      dialog.appendChild(lT);
      const vT = txt(f.v, { size: 12, color: T.text });
      vT.x = 148; vT.y = fY;
      dialog.appendChild(vT);
      fY += 26;
    }

    const div2 = rect(520, 1, T.border); div2.x = 20; div2.y = 326;
    dialog.appendChild(div2);

    // Notes
    const notT = txt('Notas / Resultado', { size: 12, color: T.text, weight: 'Semi Bold' });
    notT.x = 20; notT.y = 340;
    dialog.appendChild(notT);

    const notBox = frame('NotBox', 520, 64, { fill: { r:0.973,g:0.980,b:0.988 }, radius: 6, stroke: T.border, strokeW: 1 });
    notBox.x = 20; notBox.y = 360;
    const notTxt2 = txt('Cliente confirm� inter�s en el m�dulo ERP. Solicita cotizaci�n actualizada para la pr�xima semana.', { size: 11, color: T.textMuted });
    notTxt2.x = 10; notTxt2.y = 10;
    notBox.appendChild(notTxt2);
    dialog.appendChild(notBox);

    const ftrL = rect(560, 1, T.border); ftrL.x = 0; ftrL.y = 490;
    dialog.appendChild(ftrL);

    const btnEd3 = button('|| Editar', 'primary');
    btnEd3.x = 20; btnEd3.y = 502;
    dialog.appendChild(btnEd3);

    const btnCp = button('|| Registrar seguimiento', 'secondary');
    btnCp.x = 110; btnCp.y = 502;
    dialog.appendChild(btnCp);

    const btnCl3 = button('Cerrar', 'ghost');
    btnCl3.name = 'CloseBtn';
    btnCl3.x = 456; btnCl3.y = 502;
    dialog.appendChild(btnCl3);
  });
}

// -----------------------------------------------------------
//  PANTALLA � Actividades
// -----------------------------------------------------------
async function buildActividadesPage() {
  const PAGE_W = 1440;
  const PAGE_H = 900;
  const CX    = 260;
  const CW    = PAGE_W - CX;
  const padX  = 32;
  const cY    = 64;

  const mf = frame('? Actividades', PAGE_W, PAGE_H, { fill: T.bg });
  mf.clipsContent = true;

  const sb = buildSidebar('Actividades');
  sb.x = 0; sb.y = 0;
  mf.appendChild(sb);

  const hdr = buildHeader('Actividades');
  hdr.x = CX; hdr.y = 0;
  mf.appendChild(hdr);

  // Title row
  const pgT = txt('Actividades', { size: 22, color: T.text, weight: 'Bold' });
  pgT.x = CX + padX; pgT.y = cY + 22;
  mf.appendChild(pgT);

  const pgS = txt('48 actividades este mes � 5 pendientes hoy', { size: 12, color: T.textMuted });
  pgS.x = CX + padX; pgS.y = cY + 50;
  mf.appendChild(pgS);

  // Buttons
  const btnImpA = button('|| Importar', 'secondary');
  btnImpA.x = CX + CW - 268; btnImpA.y = cY + 26;
  mf.appendChild(btnImpA);

  const btnNewAct = button('+ Nueva actividad', 'primary');
  btnNewAct.name = 'Btn / Nueva Actividad ? Modal Nueva Actividad';
  btnNewAct.x = CX + CW - 148; btnNewAct.y = cY + 26;
  mf.appendChild(btnNewAct);

  // KPIs
  const kpisAct = [
    { label:'Total actividades', value:'48', color:T.primaryLight, ibg:{r:0.859,g:0.941,b:0.996}, icon:'||', change:'? 8 vs sem. ant.',  up:true  },
    { label:'Completadas',       value:'31', color:T.success,      ibg:{r:0.859,g:0.988,b:0.902}, icon:'?', change:'Tasa: 82%',         up:true  },
    { label:'Pendientes hoy',    value:'5',  color:T.warning,      ibg:{r:1,g:0.933,b:0.824},     icon:'?', change:'2 vencen pronto',   up:false },
    { label:'Vencidas',          value:'2',  color:T.danger,       ibg:{r:0.996,g:0.886,b:0.886}, icon:'||', change:'? 1 vs sem. ant.', up:false },
  ];
  const kWA  = 268;
  const kpiYA = cY + 70;
  for (let i = 0; i < kpisAct.length; i++) {
    const k = kpisAct[i];
    const c = kpiCard(k.label, k.value, k.change, k.up, k.icon, k.color, k.ibg, kWA);
    c.x = CX + padX + i * (kWA + 12); c.y = kpiYA;
    mf.appendChild(c);
  }

  // Content area
  const contentY = kpiYA + 116;
  const sideW    = 276;
  const listW    = CW - padX * 2 - sideW - 16;

  // -- ACTIVITY LIST CARD ----------------------------------
  const listCard = frame('Card / Lista Actividades', listW, 598, { fill: T.surface, radius: 10, stroke: T.border, strokeW: 1 });
  listCard.x = CX + padX; listCard.y = contentY;

  // Tabs bar
  const actTabBg = frame('TabBar', listW, 46, { fill: T.surface });
  actTabBg.x = 0; actTabBg.y = 0;

  const actTabs = ['Todas','Llamadas','Emails','Reuniones','Tareas'];
  const actTabW  = [52, 64, 52, 68, 52];
  let atX = 12;
  for (let i = 0; i < actTabs.length; i++) {
    const tw = actTabW[i];
    const tabBtn = frame('Tab ' + actTabs[i], tw, 28, {
      fill: i === 0 ? T.primary : T.surface,
      radius: 6,
      stroke: i === 0 ? null : T.border, strokeW: 1,
    });
    tabBtn.x = atX; tabBtn.y = 9;
    const tabTt = txt(actTabs[i], { size: 11, color: i === 0 ? T.white : T.textMuted, weight: i === 0 ? 'Semi Bold' : 'Medium' });
    tabTt.x = (tw - tabTt.width) / 2; tabTt.y = (28 - tabTt.height) / 2;
    tabBtn.appendChild(tabTt);
    actTabBg.appendChild(tabBtn);
    atX += tw + 6;
  }

  // Week selector dropdown
  const wkSel = frame('WeekSel', 110, 28, { fill: { r:0.972,g:0.980,b:0.992 }, radius: 6, stroke: T.border, strokeW: 1 });
  wkSel.x = listW - 126; wkSel.y = 9;
  const wkT = txt('Esta semana ?', { size: 11, color: T.textMuted }); wkT.x = 10; wkT.y = 8;
  wkSel.appendChild(wkT);
  actTabBg.appendChild(wkSel);

  const actTabLine = rect(listW, 1, T.border); actTabLine.x = 0; actTabLine.y = 45;
  actTabBg.appendChild(actTabLine);
  listCard.appendChild(actTabBg);

  // Activity rows
  const icoColors = {
    '||': { r:0.859,g:0.914,b:0.996 },
    '||': { r:0.945,g:0.910,b:0.996 },
    '||': { r:0.996,g:0.953,b:0.843 },
    '?': { r:0.859,g:0.988,b:0.902 },
    '||': T.border2,
  };

  const activitiesData = [
    { ico:'||', title:'Llamada de seguimiento',      contact:'Carlos Ruiz',      co:'Tecno S.A.',   time:'Hoy 10:30',    owner:'JM', status:'Completada', bc:'green'  },
    { ico:'||', title:'Propuesta enviada por email', contact:'Ana L�pez',         co:'Innova LLC',   time:'Hoy 09:15',    owner:'RP', status:'Completada', bc:'green'  },
    { ico:'||', title:'Demo del producto - Q3',      contact:'Pedro Vargas',      co:'GlobalNet',    time:'Hoy 14:00',    owner:'JM', status:'Pendiente',  bc:'yellow' },
    { ico:'?', title:'Actualizar propuesta',        contact:'Mar�a Fern�ndez',   co:'DataPoint',    time:'Hoy 16:00',    owner:'CG', status:'Pendiente',  bc:'yellow' },
    { ico:'||', title:'Negociaci�n contrato anual',  contact:'Luis Torres',       co:'MegaTrade',    time:'Ayer 15:30',   owner:'JM', status:'Completada', bc:'green'  },
    { ico:'||', title:'Env�o de factura',            contact:'Sof�a M�ndez',      co:'NetSol',       time:'Ayer 11:00',   owner:'RP', status:'Completada', bc:'green'  },
    { ico:'||', title:'Kickoff proyecto CRM',        contact:'Roberto G�mez',     co:'TechPlus',     time:'Hace 2d 10:00',owner:'JM', status:'Completada', bc:'green'  },
    { ico:'||', title:'Preparar informe mensual',    contact:'�',                 co:'Interno',      time:'Hace 3d',      owner:'CG', status:'Completada', bc:'green'  },
  ];

  let rowYA = 58;
  for (const a of activitiesData) {
    const rowH = 60;
    const rowBg = frame('Row Act', listW, rowH, { fill: T.surface });
    rowBg.x = 0; rowBg.y = rowYA;

    // Icon circle
    const icoFill = icoColors[a.ico] || T.border2;
    const icoBg = frame('IcoA', 32, 32, { fill: icoFill, radius: 8 });
    icoBg.x = 16; icoBg.y = 14;
    const icoTxt = txt(a.ico, { size: 14 }); icoTxt.x = 8; icoTxt.y = 6;
    icoBg.appendChild(icoTxt);
    rowBg.appendChild(icoBg);

    // Title + badge
    const aTitleT = txt(a.title, { size: 12, color: T.text, weight: 'Semi Bold' });
    aTitleT.name = 'RowLink / ' + a.title;
    aTitleT.x = 60; aTitleT.y = 12;
    rowBg.appendChild(aTitleT);

    const aStB = badge(a.status, a.bc);
    aStB.x = 60 + aTitleT.width + 8; aStB.y = 11;
    rowBg.appendChild(aStB);

    // Contact + company
    const actConT = txt('|| ' + a.contact, { size: 11, color: T.textMuted });
    actConT.x = 60; actConT.y = 30;
    rowBg.appendChild(actConT);

    const actCoT = txt('  || ' + a.co, { size: 11, color: T.textMuted });
    actCoT.x = 60 + actConT.width + 8; actCoT.y = 30;
    rowBg.appendChild(actCoT);

    // Time
    const timeT = txt(a.time, { size: 10, color: T.textMuted });
    timeT.x = listW - 190; timeT.y = 17;
    rowBg.appendChild(timeT);

    // Owner avatar
    const owAv2 = frame('OwAv2', 26, 26, { fill: T.primary, radius: 13 });
    owAv2.x = listW - 80; owAv2.y = 17;
    const owT2 = txt(a.owner, { size: 8, color: T.white, weight: 'Bold' });
    owT2.x = (26 - owT2.width) / 2; owT2.y = (26 - owT2.height) / 2;
    owAv2.appendChild(owT2);
    rowBg.appendChild(owAv2);

    // Check button for pending
    if (a.status === 'Pendiente') {
      const chkBg = frame('ChkBtn', 22, 22, { fill: { r:0.859,g:0.988,b:0.902 }, radius: 11 });
      chkBg.x = listW - 44; chkBg.y = 19;
      const chkT = txt('?', { size: 10, color: T.success, weight: 'Bold' });
      chkT.x = (22 - chkT.width) / 2; chkT.y = (22 - chkT.height) / 2;
      chkBg.appendChild(chkT);
      rowBg.appendChild(chkBg);
    }

    const rowLineA = rect(listW, 1, T.border2);
    rowLineA.x = 0; rowLineA.y = rowH - 1;
    rowBg.appendChild(rowLineA);

    listCard.appendChild(rowBg);
    rowYA += rowH;
  }
  mf.appendChild(listCard);

  // -- SIDEBAR CARDS ---------------------------------------
  const sideX = CX + padX + listW + 16;

  // Pr�ximas Actividades card
  const proxCard = frame('Card / Pr�ximas', sideW, 286, { fill: T.surface, radius: 10, stroke: T.border, strokeW: 1 });
  proxCard.x = sideX; proxCard.y = contentY;

  const proxTitle = txt('Pr�ximas Actividades', { size: 13, color: T.text, weight: 'Semi Bold' });
  proxTitle.x = 16; proxTitle.y = 14;
  proxCard.appendChild(proxTitle);
  const verT = txt('Ver todas', { size: 10, color: T.primaryLight, weight: 'Semi Bold' });
  verT.x = sideW - 60; verT.y = 16;
  proxCard.appendChild(verT);
  const proxDiv = rect(sideW, 1, T.border); proxDiv.x = 0; proxDiv.y = 40;
  proxCard.appendChild(proxDiv);

  const upcoming = [
    { ico:'||', title:'Llamada con Global Corp',    time:'Hoy 14:30',   owner:'JM' },
    { ico:'||', title:'Reuni�n kick-off NetSol',    time:'Ma�ana 09:00',owner:'RP' },
    { ico:'?', title:'Enviar cotizaci�n Tecno S.A.',time:'Ma�ana 12:00',owner:'JM' },
    { ico:'||', title:'Follow-up MegaTrade',        time:'Jue 10:30',   owner:'CG' },
    { ico:'||', title:'Demo API Integration',       time:'Vie 15:00',   owner:'JM' },
  ];
  let upY = 50;
  for (const u of upcoming) {
    const upRow = frame('UpRow', sideW - 16, 44, { fill: { r:0.973,g:0.980,b:0.988 }, radius: 6 });
    upRow.x = 8; upRow.y = upY;

    const upIco = txt(u.ico, { size: 14 }); upIco.x = 8; upIco.y = 12;
    upRow.appendChild(upIco);

    const upTitle = txt(u.title, { size: 11, color: T.text, weight: 'Semi Bold' });
    upTitle.x = 30; upTitle.y = 6;
    upRow.appendChild(upTitle);

    const upTime = txt(u.time, { size: 10, color: T.textMuted });
    upTime.x = 30; upTime.y = 22;
    upRow.appendChild(upTime);

    const upAv = frame('UpAv', 22, 22, { fill: T.primary, radius: 11 });
    upAv.x = sideW - 32; upAv.y = 11;
    const upAvT = txt(u.owner, { size: 7, color: T.white, weight: 'Bold' });
    upAvT.x = (22 - upAvT.width) / 2; upAvT.y = (22 - upAvT.height) / 2;
    upAv.appendChild(upAvT);
    upRow.appendChild(upAv);

    proxCard.appendChild(upRow);
    upY += 48;
  }
  mf.appendChild(proxCard);

  // Por Tipo card
  const tipoCard = frame('Card / Por Tipo', sideW, 204, { fill: T.surface, radius: 10, stroke: T.border, strokeW: 1 });
  tipoCard.x = sideX; tipoCard.y = contentY + 302;

  const tipoTitle = txt('Por Tipo (este mes)', { size: 13, color: T.text, weight: 'Semi Bold' });
  tipoTitle.x = 16; tipoTitle.y = 14;
  tipoCard.appendChild(tipoTitle);
  const tipoDiv = rect(sideW, 1, T.border); tipoDiv.x = 0; tipoDiv.y = 40;
  tipoCard.appendChild(tipoDiv);

  const tipos = [
    { l:'Llamadas',  n:18, color:T.primaryLight, pct:37 },
    { l:'Emails',    n:14, color:T.purple,        pct:29 },
    { l:'Reuniones', n:10, color:T.accent,        pct:21 },
    { l:'Tareas',    n:6,  color:T.success,       pct:13 },
  ];
  let tY = 52;
  for (const t of tipos) {
    const tL = txt(t.l, { size: 12, color: T.textMuted, weight: 'Medium' });
    tL.x = 16; tL.y = tY;
    tipoCard.appendChild(tL);
    const tN = txt(String(t.n), { size: 12, color: T.text, weight: 'Bold' });
    tN.x = sideW - 30; tN.y = tY;
    tipoCard.appendChild(tN);
    const tBar = progressBar(sideW - 32, t.pct * 2.5 > 100 ? 100 : t.pct * 2.5, t.color);
    tBar.x = 16; tBar.y = tY + 16;
    tipoCard.appendChild(tBar);
    tY += 38;
  }
  mf.appendChild(tipoCard);

  // -- MODALES ---------------------------------------------
  // Reuse buildModalNuevaActividad from Session 1 (already defined above)
  const modalNA2 = buildModalNuevaActividad();
  modalNA2.x = 1500; modalNA2.y = 900 + 100;
  mf.appendChild(modalNA2);

  const modalDA = buildModalDetalleActividad();
  modalDA.x = 2200; modalDA.y = 900 + 100;
  mf.appendChild(modalDA);

  return { frame: mf, modalNA2, modalDA, btnNewAct };
}

// -----------------------------------------------------------
//  MODAL � Nuevo Evento (Calendario)
// -----------------------------------------------------------
function buildModalNuevoEvento() {
  return buildModalOverlay('Nuevo Evento', 540, 520, (dialog) => {
    modalHeader(dialog, '|| Nuevo Evento', 540);

    dialog.appendChild(formRow('T�tulo del evento', 'Ej: Reuni�n con Tecno S.A.', 20, 70, 500));
    dialog.appendChild(formRow('Tipo', 'Reuni�n', 20, 148, 152));
    dialog.appendChild(formRow('Fecha', 'dd/mm/aaaa', 182, 148, 160));
    dialog.appendChild(formRow('Hora inicio', '09:00', 352, 148, 148));
    dialog.appendChild(formRow('Hora fin', '10:00', 20, 226, 148));
    dialog.appendChild(formRow('Ubicaci�n / Enlace', 'Sala A / Zoom link�', 178, 226, 322));
    dialog.appendChild(formRow('Contacto vinculado', 'Buscar contacto�', 20, 304, 240));
    dialog.appendChild(formRow('Asignado a', 'Juan Mart�nez', 270, 304, 250));

    const notaLbl = txt('DESCRIPCI�N', { size: 9, color: T.textMuted, weight: 'Semi Bold' });
    notaLbl.letterSpacing = { value: 4, unit: 'PERCENT' };
    notaLbl.x = 20; notaLbl.y = 383;
    dialog.appendChild(notaLbl);

    const notaBox = frame('DescInput', 500, 52, { fill: { r:0.972, g:0.980, b:0.992 }, radius: 6, stroke: T.border, strokeW: 1 });
    notaBox.x = 20; notaBox.y = 400;
    const notaPh = txt('Descripci�n o agenda del evento�', { size: 12, color: T.textMuted });
    notaPh.x = 10; notaPh.y = 10;
    notaBox.appendChild(notaPh);
    dialog.appendChild(notaBox);

    modalFooter(dialog, 540, 520, 'Crear Evento', 'Cancelar');
  });
}

// -----------------------------------------------------------
//  MODAL � Detalle Evento (click on calendar cell event)
// -----------------------------------------------------------
function buildModalDetalleEvento() {
  return buildModalOverlay('Detalle Evento', 520, 480, (dialog) => {
    modalHeader(dialog, '|| Detalle del Evento', 520);

    // Color stripe + title
    const stripe = frame('Stripe', 480, 6, { fill: T.primaryLight, radius: 3 });
    stripe.x = 20; stripe.y = 68;
    dialog.appendChild(stripe);

    const evTitle = txt('Reuni�n Tecno S.A.', { size: 17, color: T.text, weight: 'Bold' });
    evTitle.x = 20; evTitle.y = 82;
    dialog.appendChild(evTitle);

    const evType = badge('Reuni�n', 'blue');
    evType.x = 20; evType.y = 108;
    dialog.appendChild(evType);

    const div1 = rect(480, 1, T.border); div1.x = 20; div1.y = 134;
    dialog.appendChild(div1);

    // Details
    const evFields = [
      { ico:'||', l:'Fecha:',      v:'Mi�rcoles 4 Mar 2026'    },
      { ico:'?', l:'Hora:',       v:'09:00 � 10:30 AM'        },
      { ico:'||', l:'Ubicaci�n:',  v:'Sala A � Piso 3'         },
      { ico:'||', l:'Contacto:',   v:'Carlos Ruiz � Tecno S.A.'},
      { ico:'||||?', l:'Asignado a:', v:'Juan Mart�nez'           },
    ];
    let efY = 148;
    for (const f of evFields) {
      const eIco = txt(f.ico, { size: 12 }); eIco.x = 20; eIco.y = efY;
      dialog.appendChild(eIco);
      const eLbl = txt(f.l, { size: 11, color: T.textMuted, weight: 'Semi Bold' });
      eLbl.x = 40; eLbl.y = efY;
      dialog.appendChild(eLbl);
      const eVal = txt(f.v, { size: 12, color: T.text });
      eVal.x = 136; eVal.y = efY;
      dialog.appendChild(eVal);
      efY += 26;
    }

    const div2 = rect(480, 1, T.border); div2.x = 20; div2.y = 286;
    dialog.appendChild(div2);

    // Notes
    const evNotT = txt('Notas del evento', { size: 12, color: T.text, weight: 'Semi Bold' });
    evNotT.x = 20; evNotT.y = 300;
    dialog.appendChild(evNotT);

    const evNotBox = frame('EvNotBox', 480, 56, { fill: { r:0.973,g:0.980,b:0.988 }, radius: 6, stroke: T.border, strokeW: 1 });
    evNotBox.x = 20; evNotBox.y = 320;
    const evNotTxt = txt('Revisar avance del proyecto. Carlos presentar� propuesta t�cnica actualizada.', { size: 11, color: T.textMuted });
    evNotTxt.x = 10; evNotTxt.y = 10;
    evNotBox.appendChild(evNotTxt);
    dialog.appendChild(evNotBox);

    const ftrL2 = rect(520, 1, T.border); ftrL2.x = 0; ftrL2.y = 432;
    dialog.appendChild(ftrL2);

    const btnEdEv = button('|| Editar evento', 'primary');
    btnEdEv.x = 20; btnEdEv.y = 444;
    dialog.appendChild(btnEdEv);

    const btnDelEv = button('|| Eliminar', 'secondary');
    btnDelEv.x = 168; btnDelEv.y = 444;
    dialog.appendChild(btnDelEv);

    const btnClEv = button('Cerrar', 'ghost');
    btnClEv.name = 'CloseBtn';
    btnClEv.x = 416; btnClEv.y = 444;
    dialog.appendChild(btnClEv);
  });
}

// -----------------------------------------------------------
//  PANTALLA � Calendario
// -----------------------------------------------------------
async function buildCalendarioPage() {
  const PAGE_W = 1440;
  const PAGE_H = 900;
  const CX    = 260;
  const CW    = PAGE_W - CX;
  const padX  = 28;
  const cY    = 64;

  const mf = frame('|| Calendario', PAGE_W, PAGE_H, { fill: T.bg });
  mf.clipsContent = true;

  const sb = buildSidebar('Calendario');
  sb.x = 0; sb.y = 0;
  mf.appendChild(sb);

  const hdr = buildHeader('Calendario');
  hdr.x = CX; hdr.y = 0;
  mf.appendChild(hdr);

  // Title row
  const pgTC = txt('Calendario', { size: 22, color: T.text, weight: 'Bold' });
  pgTC.x = CX + padX; pgTC.y = cY + 22;
  mf.appendChild(pgTC);

  const pgSC = txt('12 eventos en marzo 2026', { size: 12, color: T.textMuted });
  pgSC.x = CX + padX; pgSC.y = cY + 50;
  mf.appendChild(pgSC);

  // View buttons + new event
  const btnSem = button('|| Semana', 'secondary');
  btnSem.x = CX + CW - 378; btnSem.y = cY + 26;
  mf.appendChild(btnSem);

  const btnMes = button('|| Mes', 'secondary');
  btnMes.x = CX + CW - 268; btnMes.y = cY + 26;
  mf.appendChild(btnMes);

  const btnNewEv = button('+ Nuevo evento', 'primary');
  btnNewEv.name = 'Btn / Nuevo Evento ? Modal Nuevo Evento';
  btnNewEv.x = CX + CW - 158; btnNewEv.y = cY + 26;
  mf.appendChild(btnNewEv);

  // Layout
  const contentYC = cY + 76;
  const sideWC    = 280;
  const calW      = CW - padX * 2 - sideWC - 16;

  // -- CALENDAR GRID CARD ----------------------------------
  const calCard = frame('Card / Calendario Marzo', calW, 700, { fill: T.surface, radius: 10, stroke: T.border, strokeW: 1 });
  calCard.x = CX + padX; calCard.y = contentYC;

  // Month nav
  const navBar = frame('NavBar', calW, 48, { fill: T.surface });
  navBar.x = 0; navBar.y = 0;

  const chevL = frame('ChevL', 30, 30, { fill: { r:0.973,g:0.980,b:0.988 }, radius: 6 });
  chevL.x = 16; chevL.y = 9;
  const chevLT = txt('�', { size: 16, color: T.textMuted, weight: 'Semi Bold' }); chevLT.x = 9; chevLT.y = 4;
  chevL.appendChild(chevLT);
  navBar.appendChild(chevL);

  const monthT = txt('Marzo 2026', { size: 15, color: T.text, weight: 'Bold' });
  monthT.x = (calW - monthT.width) / 2; monthT.y = 14;
  navBar.appendChild(monthT);

  const chevR = frame('ChevR', 30, 30, { fill: { r:0.973,g:0.980,b:0.988 }, radius: 6 });
  chevR.x = calW - 46; chevR.y = 9;
  const chevRT = txt('�', { size: 16, color: T.textMuted, weight: 'Semi Bold' }); chevRT.x = 9; chevRT.y = 4;
  chevR.appendChild(chevRT);
  navBar.appendChild(chevR);

  const navLine = rect(calW, 1, T.border); navLine.x = 0; navLine.y = 47;
  navBar.appendChild(navLine);
  calCard.appendChild(navBar);

  // Day-of-week headers
  const dayNames = ['Dom','Lun','Mar','Mi�','Jue','Vie','S�b'];
  const cellW = Math.floor(calW / 7);
  const dayHdr = frame('DayHdr', calW, 32, { fill: { r:0.973,g:0.980,b:0.988 } });
  dayHdr.x = 0; dayHdr.y = 48;
  for (let d = 0; d < 7; d++) {
    const dT = txt(dayNames[d], { size: 10, color: T.textMuted, weight: 'Semi Bold' });
    dT.letterSpacing = { value: 4, unit: 'PERCENT' };
    dT.x = d * cellW + (cellW - dT.width) / 2; dT.y = 10;
    dayHdr.appendChild(dT);
  }
  const dayHdrLine = rect(calW, 1, T.border); dayHdrLine.x = 0; dayHdrLine.y = 31;
  dayHdr.appendChild(dayHdrLine);
  calCard.appendChild(dayHdr);

  // Calendar weeks (March 2026 starts on Sunday = day 0)
  // Row 0: 1-7, Row 1: 8-14, Row 2: 15-21, Row 3: 22-28, Row 4: 29-31 + nulls
  const cellH   = 90;
  const todayN  = 13; // highlighted today from source code
  const eventsMap = {
    4:  [{ t:'Reuni�n Tecno S.A.',   c:'#2563a8' }, { t:'Llamada Global Corp', c:'#7c3aed' }],
    7:  [{ t:'Demo NetSol 10:00',    c:'#16a34a' }],
    10: [{ t:'Follow-up MegaTrade',  c:'#c8a558' }],
    12: [{ t:'Presentaci�n Q1',      c:'#dc2626' }, { t:'Almuerzo ejecutivo',   c:'#c8a558' }],
    15: [{ t:'Llamada pipeline',     c:'#2563a8' }],
    17: [{ t:'Reuni�n equipo',       c:'#7c3aed' }],
    19: [{ t:'Cierre contrato',      c:'#16a34a' }],
    22: [{ t:'Llamada seguimiento',  c:'#2563a8' }, { t:'Review mensual',       c:'#dc2626' }],
    25: [{ t:'Demo Alpha Corp',      c:'#2563a8' }],
    28: [{ t:'Reuni�n directivos',   c:'#7c3aed' }],
  };

  // Build 5 weeks
  const weeks = [];
  let day = 1;
  for (let w = 0; w < 5; w++) {
    const week = [];
    for (let d = 0; d < 7; d++) {
      if (w === 0 && d === 0 && day === 1) { week.push(day++); continue; }
      if (day > 31) { week.push(null); continue; }
      week.push(day++);
    }
    weeks.push(week);
  }

  for (let wi = 0; wi < weeks.length; wi++) {
    const week = weeks[wi];
    const weekY = 80 + wi * (cellH + 1);
    const weekLine = rect(calW, 1, T.border2); weekLine.x = 0; weekLine.y = weekY + cellH;
    calCard.appendChild(weekLine);

    for (let di = 0; di < 7; di++) {
      const d = week[di];
      const cellX = di * cellW;

      if (di > 0) {
        const vLine = rect(1, cellH, T.border2); vLine.x = cellX; vLine.y = weekY;
        calCard.appendChild(vLine);
      }

      if (d === null) {
        const emptyBg = frame('Empty', cellW - 1, cellH, { fill: { r:0.973,g:0.980,b:0.992 } });
        emptyBg.x = cellX + (di > 0 ? 1 : 0); emptyBg.y = weekY;
        calCard.appendChild(emptyBg);
        continue;
      }

      const isToday = d === todayN;
      const cellFill = isToday ? { r:0.933,g:0.945,b:1.0 } : T.surface;
      const cellBg = frame('Cell ' + d, cellW - (di > 0 ? 1 : 0), cellH, { fill: cellFill });
      cellBg.x = cellX + (di > 0 ? 1 : 0); cellBg.y = weekY;

      // Day number circle
      const numBg = frame('Num', 26, 26, {
        fill: isToday ? T.primary : { r:0,g:0,b:0,a:0 },
        radius: 13,
      });
      numBg.x = 4; numBg.y = 4;
      const numT = txt(String(d), { size: 12, color: isToday ? T.white : T.text, weight: isToday ? 'Bold' : 'Medium' });
      numT.x = (26 - numT.width) / 2; numT.y = (26 - numT.height) / 2;
      numBg.appendChild(numT);
      cellBg.appendChild(numBg);

      // Event pills
      const evList = eventsMap[d] || [];
      let evY = 34;
      for (const ev of evList.slice(0, 2)) {
        const hxE = parseInt(ev.c.slice(1), 16);
        const evFill = { r: ((hxE >> 16) & 0xff) / 255, g: ((hxE >> 8) & 0xff) / 255, b: (hxE & 0xff) / 255 };
        const evPill = frame('Ev', cellW - (di > 0 ? 9 : 8), 16, { fill: evFill, radius: 3 });
        evPill.x = 4; evPill.y = evY;
        const evT = txt(ev.t, { size: 9, color: T.white, weight: 'Medium' });
        evT.x = 4; evT.y = 3;
        evPill.appendChild(evT);
        cellBg.appendChild(evPill);
        evY += 19;
      }

      calCard.appendChild(cellBg);
    }
  }
  mf.appendChild(calCard);

  // -- SIDEBAR ---------------------------------------------
  const sideXC = CX + padX + calW + 16;

  // Pr�ximos Eventos
  const proxEvCard = frame('Card / Pr�ximos Eventos', sideWC, 390, { fill: T.surface, radius: 10, stroke: T.border, strokeW: 1 });
  proxEvCard.x = sideXC; proxEvCard.y = contentYC;

  const proxEvTitle = txt('Pr�ximos Eventos', { size: 13, color: T.text, weight: 'Semi Bold' });
  proxEvTitle.x = 16; proxEvTitle.y = 14;
  proxEvCard.appendChild(proxEvTitle);
  const verTodoT = txt('Ver todo', { size: 10, color: T.primaryLight, weight: 'Semi Bold' });
  verTodoT.x = sideWC - 54; verTodoT.y = 16;
  proxEvCard.appendChild(verTodoT);
  const proxEvDiv = rect(sideWC, 1, T.border); proxEvDiv.x = 0; proxEvDiv.y = 40;
  proxEvCard.appendChild(proxEvDiv);

  const evColors = [
    { r:0.859,g:0.914,b:0.996 },
    { r:0.945,g:0.910,b:0.996 },
    { r:0.859,g:0.988,b:0.902 },
    { r:0.996,g:0.953,b:0.843 },
    { r:0.996,g:0.886,b:0.886 },
    { r:0.996,g:0.886,b:0.886 },
  ];
  const upcomingEv = [
    { ico:'||', t:'Reuni�n Tecno S.A.',  d:'Mi� 4 Mar � 09:00',  loc:'Sala A'          },
    { ico:'||', t:'Llamada Global Corp', d:'Mi� 4 Mar � 11:30',  loc:'Zoom'            },
    { ico:'||?', t:'Demo NetSol',         d:'S�b 7 Mar � 10:00',  loc:'Teams'           },
    { ico:'||?', t:'Almuerzo ejecutivo',  d:'Jue 12 Mar � 13:00', loc:'Restaurante Plaza'},
    { ico:'||', t:'Presentaci�n Q1',     d:'Jue 12 Mar � 15:30', loc:'Sala B'          },
    { ico:'||', t:'Review mensual',      d:'Dom 22 Mar � 10:00', loc:'Sala A'          },
  ];
  let evRowY = 50;
  for (let i = 0; i < upcomingEv.length; i++) {
    const u = upcomingEv[i];
    const evRow = frame('EvRow ' + i, sideWC - 16, 48, { fill: { r:0.973,g:0.980,b:0.988 }, radius: 6 });
    evRow.x = 8; evRow.y = evRowY;

    const evIcoBg = frame('EvIcoBg', 30, 30, { fill: evColors[i % evColors.length], radius: 6 });
    evIcoBg.x = 6; evIcoBg.y = 9;
    const evIcoT = txt(u.ico, { size: 14 }); evIcoT.x = 6; evIcoT.y = 5;
    evIcoBg.appendChild(evIcoT);
    evRow.appendChild(evIcoBg);

    const evTitleT = txt(u.t, { size: 11, color: T.text, weight: 'Semi Bold' });
    evTitleT.x = 44; evTitleT.y = 6;
    evRow.appendChild(evTitleT);

    const evDateT = txt(u.d, { size: 10, color: T.textMuted });
    evDateT.x = 44; evDateT.y = 20;
    evRow.appendChild(evDateT);

    const evLocT = txt('|| ' + u.loc, { size: 10, color: T.textMuted });
    evLocT.x = 44; evLocT.y = 32;
    evRow.appendChild(evLocT);

    proxEvCard.appendChild(evRow);
    evRowY += 54;
  }
  mf.appendChild(proxEvCard);

  // Leyenda card
  const legCard = frame('Card / Leyenda', sideWC, 164, { fill: T.surface, radius: 10, stroke: T.border, strokeW: 1 });
  legCard.x = sideXC; legCard.y = contentYC + 406;

  const legTitle = txt('Leyenda', { size: 13, color: T.text, weight: 'Semi Bold' });
  legTitle.x = 16; legTitle.y = 14;
  legCard.appendChild(legTitle);
  const legDiv2 = rect(sideWC, 1, T.border); legDiv2.x = 0; legDiv2.y = 40;
  legCard.appendChild(legDiv2);

  const legends = [
    { c:'#2563a8', l:'Llamadas / Reuniones' },
    { c:'#7c3aed', l:'Demos'               },
    { c:'#16a34a', l:'Cierres'             },
    { c:'#c8a558', l:'Seguimientos'        },
    { c:'#dc2626', l:'Urgente'             },
  ];
  let legY = 52;
  for (const lg of legends) {
    const hxL = parseInt(lg.c.slice(1), 16);
    const lgFill = { r: ((hxL >> 16) & 0xff) / 255, g: ((hxL >> 8) & 0xff) / 255, b: (hxL & 0xff) / 255 };
    const lgDot = frame('LgDot', 10, 10, { fill: lgFill, radius: 5 });
    lgDot.x = 16; lgDot.y = legY + 1;
    legCard.appendChild(lgDot);
    const lgT = txt(lg.l, { size: 12, color: T.textMuted });
    lgT.x = 32; lgT.y = legY;
    legCard.appendChild(lgT);
    legY += 22;
  }
  mf.appendChild(legCard);

  // "Hoy" dark card
  const hoyCard = frame('Card / Hoy', sideWC, 96, { fill: { r:0.059,g:0.133,b:0.251 }, radius: 10 });
  hoyCard.x = sideXC; hoyCard.y = contentYC + 406 + 180;

  const hoyTitle = txt('Hoy � 13 Marzo 2026', { size: 13, color: T.white, weight: 'Bold' });
  hoyTitle.x = 16; hoyTitle.y = 14;
  hoyCard.appendChild(hoyTitle);

  const hoySubT = txt('Sin eventos programados', { size: 12, color: { r:0.635,g:0.671,b:0.729 } });
  hoySubT.x = 16; hoySubT.y = 36;
  hoyCard.appendChild(hoySubT);

  const addHoyBtn = frame('AddHoyBtn', sideWC - 32, 28, { fill: { r:1,g:1,b:1,a:0.08 }, radius: 6 });
  addHoyBtn.x = 16; addHoyBtn.y = 58;
  const addHoyT = txt('+ Agregar evento hoy', { size: 11, color: T.white, weight: 'Semi Bold' });
  addHoyT.x = (sideWC - 32 - addHoyT.width) / 2; addHoyT.y = 7;
  addHoyBtn.appendChild(addHoyT);
  hoyCard.appendChild(addHoyBtn);
  mf.appendChild(hoyCard);

  // -- MODALES ---------------------------------------------
  const modalNE = buildModalNuevoEvento();
  modalNE.x = 1500; modalNE.y = 900 + 100;
  mf.appendChild(modalNE);

  const modalDE = buildModalDetalleEvento();
  modalDE.x = 2200; modalDE.y = 900 + 100;
  mf.appendChild(modalDE);

  return { frame: mf, modalNE, modalDE, btnNewEv };
}

// -----------------------------------------------------------
//  MODAL � Nuevo Producto
// -----------------------------------------------------------
function buildModalNuevoProducto() {
  return buildModalOverlay('Nuevo Producto', 560, 520, (dialog) => {
    modalHeader(dialog, '|| Nuevo Producto', 560);

    dialog.appendChild(formRow('Nombre del producto', 'Ej: CRM Enterprise Suite', 20, 70, 520));
    dialog.appendChild(formRow('C�digo / SKU', 'PRD-0XX', 20, 148, 160));
    dialog.appendChild(formRow('Categor�a', 'Software', 190, 148, 156));
    dialog.appendChild(formRow('Estado', 'Activo', 356, 148, 164));
    dialog.appendChild(formRow('Precio de venta', '$0.00', 20, 226, 248));
    dialog.appendChild(formRow('Costo', '$0.00', 278, 226, 262));
    dialog.appendChild(formRow('Disponibilidad', 'Ilimitado', 20, 304, 248));
    dialog.appendChild(formRow('Unidad', 'Licencia', 278, 304, 262));

    const descLbl = txt('DESCRIPCI�N', { size: 9, color: T.textMuted, weight: 'Semi Bold' });
    descLbl.letterSpacing = { value: 4, unit: 'PERCENT' };
    descLbl.x = 20; descLbl.y = 383;
    dialog.appendChild(descLbl);

    const descBox = frame('DescBox', 520, 56, { fill: { r:0.972, g:0.980, b:0.992 }, radius: 6, stroke: T.border, strokeW: 1 });
    descBox.x = 20; descBox.y = 400;
    const descPh = txt('Descripci�n del producto o servicio�', { size: 12, color: T.textMuted });
    descPh.x = 10; descPh.y = 10;
    descBox.appendChild(descPh);
    dialog.appendChild(descBox);

    modalFooter(dialog, 560, 520, 'Crear Producto', 'Cancelar');
  });
}

// -----------------------------------------------------------
//  MODAL � Detalle Producto
// -----------------------------------------------------------
function buildModalDetalleProducto() {
  return buildModalOverlay('Detalle Producto', 560, 500, (dialog) => {
    modalHeader(dialog, '|| Detalle del Producto', 560);

    // Header info
    const pIcoBg = frame('PIco', 44, 44, { fill: { r:0.910, g:0.941,b:0.976 }, radius: 10 });
    pIcoBg.x = 20; pIcoBg.y = 70;
    const pIcoT = txt('||', { size: 20 }); pIcoT.x = 10; pIcoT.y = 8;
    pIcoBg.appendChild(pIcoT);
    dialog.appendChild(pIcoBg);

    const pNameT = txt('M�dulo HR Empresarial', { size: 16, color: T.text, weight: 'Bold' });
    pNameT.x = 76; pNameT.y = 74;
    dialog.appendChild(pNameT);

    const pSkuT = txt('SKU: MOD-HR-ENT � Categor�a: Software', { size: 11, color: T.textMuted });
    pSkuT.x = 76; pSkuT.y = 96;
    dialog.appendChild(pSkuT);

    const pStB = badge('Activo', 'green');
    pStB.x = 76; pStB.y = 112;
    dialog.appendChild(pStB);

    const div1 = rect(520, 1, T.border); div1.x = 20; div1.y = 144;
    dialog.appendChild(div1);

    // Stats grid
    const pStats = [
      { label:'Precio de venta', val:'$12,600', bg:{ r:0.973,g:0.980,b:0.988 }, valColor:T.primaryLight },
      { label:'Costo',           val:'$4,800',  bg:{ r:0.973,g:0.980,b:0.988 }, valColor:T.text        },
      { label:'Margen',          val:'62%',     bg:{ r:0.941,g:0.992,b:0.957 }, valColor:T.success     },
      { label:'Ventas totales',  val:'128',     bg:{ r:0.973,g:0.980,b:0.988 }, valColor:T.text        },
    ];
    const psW = 246;
    for (let i = 0; i < pStats.length; i++) {
      const psX = 20 + (i % 2) * (psW + 8);
      const psY = 154 + Math.floor(i / 2) * 72;
      const psCell = frame('PS' + i, psW, 62, { fill: pStats[i].bg, radius: 8 });
      psCell.x = psX; psCell.y = psY;
      const psLbl = txt(pStats[i].label, { size: 9, color: T.textMuted });
      psLbl.x = 10; psLbl.y = 8;
      psCell.appendChild(psLbl);
      const psVal = txt(pStats[i].val, { size: 18, color: pStats[i].valColor, weight: 'Bold' });
      psVal.x = 10; psVal.y = 26;
      psCell.appendChild(psVal);
      dialog.appendChild(psCell);
    }

    const div2 = rect(520, 1, T.border); div2.x = 20; div2.y = 306;
    dialog.appendChild(div2);

    // Description
    const descHdr = txt('Descripci�n', { size: 12, color: T.text, weight: 'Semi Bold' });
    descHdr.x = 20; descHdr.y = 320;
    dialog.appendChild(descHdr);

    const descT = txt('M�dulo completo de gesti�n de recursos humanos con n�mina, asistencia,\nvacaciones y evaluaciones. Incluye soporte premium y actualizaciones.', { size: 11, color: T.textMuted });
    descT.x = 20; descT.y = 340;
    dialog.appendChild(descT);

    const ftrL = rect(560, 1, T.border); ftrL.x = 0; ftrL.y = 448;
    dialog.appendChild(ftrL);

    const btnClProd = button('Cerrar', 'ghost');
    btnClProd.name = 'CloseBtn';
    btnClProd.x = 20; btnClProd.y = 460;
    dialog.appendChild(btnClProd);

    const btnEdProd = button('|| Editar producto', 'primary');
    btnEdProd.x = 408; btnEdProd.y = 460;
    dialog.appendChild(btnEdProd);
  });
}

// -----------------------------------------------------------
//  PANTALLA � Productos
// -----------------------------------------------------------
async function buildProductosPage() {
  const PAGE_W = 1440;
  const PAGE_H = 900;
  const CX    = 260;
  const CW    = PAGE_W - CX;
  const padX  = 32;
  const cY    = 64;

  const mf = frame('|| Productos', PAGE_W, PAGE_H, { fill: T.bg });
  mf.clipsContent = true;

  const sb = buildSidebar('Productos');
  sb.x = 0; sb.y = 0;
  mf.appendChild(sb);

  const hdr = buildHeader('Cat�logo de Productos');
  hdr.x = CX; hdr.y = 0;
  mf.appendChild(hdr);

  // Title
  const pgTP = txt('Cat�logo de Productos', { size: 22, color: T.text, weight: 'Bold' });
  pgTP.x = CX + padX; pgTP.y = cY + 22;
  mf.appendChild(pgTP);

  const pgSP = txt('Gesti�n de productos, servicios y precios', { size: 12, color: T.textMuted });
  pgSP.x = CX + padX; pgSP.y = cY + 50;
  mf.appendChild(pgSP);

  // Buttons
  const btnLP = button('|| Lista de precios', 'secondary');
  btnLP.x = CX + CW - 288; btnLP.y = cY + 26;
  mf.appendChild(btnLP);

  const btnNewProd = button('+ Nuevo Producto', 'primary');
  btnNewProd.name = 'Btn / Nuevo Producto ? Modal Nuevo Producto';
  btnNewProd.x = CX + CW - 148; btnNewProd.y = cY + 26;
  mf.appendChild(btnNewProd);

  // KPIs
  const kpisP = [
    { label:'Productos activos',      value:'32',         color:T.primaryLight, ibg:{r:0.859,g:0.941,b:0.996}, icon:'||', change:'Total cat�logo',    up:true  },
    { label:'Ingresos totales (a�o)', value:'$1.24M',     color:T.success,      ibg:{r:0.859,g:0.988,b:0.902}, icon:'||', change:'? 22% vs a�o ant.', up:true  },
    { label:'Ventas este a�o',        value:'762',        color:T.accent,       ibg:{r:0.996,g:0.976,b:0.761}, icon:'||', change:'? 12% vs a�o ant.', up:true  },
    { label:'Margen promedio',        value:'68%',        color:T.warning,      ibg:{r:1,g:0.933,b:0.824},     icon:'||', change:'? 2% vs a�o ant.', up:true  },
  ];
  const kWP  = 268;
  const kpiYP = cY + 70;
  for (let i = 0; i < kpisP.length; i++) {
    const k = kpisP[i];
    const c = kpiCard(k.label, k.value, k.change, k.up, k.icon, k.color, k.ibg, kWP);
    c.x = CX + padX + i * (kWP + 12); c.y = kpiYP;
    mf.appendChild(c);
  }

  // Toolbar: search + filters
  const toolbarY = kpiYP + 116;
  const searchBox = frame('SearchBox', 240, 32, { fill: { r:0.972,g:0.980,b:0.992 }, radius: 6, stroke: T.border, strokeW: 1 });
  searchBox.x = CX + padX; searchBox.y = toolbarY;
  const srIco = txt('||', { size: 10 }); srIco.x = 8; srIco.y = 9;
  const srPh  = txt('Buscar producto o servicio�', { size: 11, color: T.textMuted }); srPh.x = 26; srPh.y = 9;
  searchBox.appendChild(srIco); searchBox.appendChild(srPh);
  mf.appendChild(searchBox);

  // Category filter
  const catFilter = frame('CatFilter', 180, 32, { fill: T.surface, radius: 6, stroke: T.border, strokeW: 1 });
  catFilter.x = CX + padX + 248; catFilter.y = toolbarY;
  const catT = txt('Todas las categor�as ?', { size: 11, color: T.textMuted }); catT.x = 10; catT.y = 9;
  catFilter.appendChild(catT);
  mf.appendChild(catFilter);

  // Status filter
  const stFilter = frame('StFilter', 160, 32, { fill: T.surface, radius: 6, stroke: T.border, strokeW: 1 });
  stFilter.x = CX + padX + 436; stFilter.y = toolbarY;
  const stFT = txt('Todos los estados ?', { size: 11, color: T.textMuted }); stFT.x = 10; stFT.y = 9;
  stFilter.appendChild(stFT);
  mf.appendChild(stFilter);

  // Table card
  const tableYP = toolbarY + 44;
  const tableWP = CW - padX * 2;
  const tableCardP = frame('Card / Tabla Productos', tableWP, 530, { fill: T.surface, radius: 10, stroke: T.border, strokeW: 1 });
  tableCardP.x = CX + padX; tableCardP.y = tableYP;

  // Column headers
  const pCols = [
    { label:'C�digo',        x:12  },
    { label:'Producto',      x:88  },
    { label:'Categor�a',     x:310 },
    { label:'Precio',        x:410 },
    { label:'Costo',         x:490 },
    { label:'Margen',        x:560 },
    { label:'Disponib.',     x:626 },
    { label:'Estado',        x:706 },
    { label:'Ventas',        x:784 },
    { label:'',              x:840 },
  ];
  tableHeader(tableCardP, pCols, 0, tableWP);

  // Product rows
  const productsData = [
    { code:'PRD-001', name:'CRM Enterprise Suite',      cat:'Software',    cat_c:'navy',  price:'$2,400', cost:'$480',   margin:80, stock:'Ilimitado', status:'Activo', st_c:'green', sales:48  },
    { code:'PRD-002', name:'CRM Professional',          cat:'Software',    cat_c:'navy',  price:'$1,200', cost:'$240',   margin:80, stock:'Ilimitado', status:'Activo', st_c:'green', sales:124 },
    { code:'PRD-003', name:'CRM Starter',               cat:'Software',    cat_c:'navy',  price:'$480',   cost:'$96',    margin:80, stock:'Ilimitado', status:'Activo', st_c:'green', sales:312 },
    { code:'PRD-004', name:'M�dulo Marketing Avanzado', cat:'Add-on',      cat_c:'purple',price:'$600',   cost:'$120',   margin:80, stock:'Ilimitado', status:'Activo', st_c:'green', sales:67  },
    { code:'PRD-005', name:'M�dulo Soporte Premium',    cat:'Add-on',      cat_c:'purple',price:'$480',   cost:'$96',    margin:80, stock:'Ilimitado', status:'Activo', st_c:'green', sales:43  },
    { code:'PRD-006', name:'Implementaci�n B�sica',     cat:'Servicio',    cat_c:'blue',  price:'$1,800', cost:'$900',   margin:50, stock:'�',         status:'Activo', st_c:'green', sales:28  },
    { code:'PRD-007', name:'Implementaci�n Enterprise', cat:'Servicio',    cat_c:'blue',  price:'$8,500', cost:'$3,400', margin:60, stock:'�',         status:'Activo', st_c:'green', sales:12  },
    { code:'PRD-008', name:'Soporte Anual B�sico',      cat:'Servicio',    cat_c:'blue',  price:'$960',   cost:'$300',   margin:69, stock:'�',         status:'Activo', st_c:'green', sales:86  },
    { code:'PRD-009', name:'Capacitaci�n (10h)',        cat:'Capacitaci�n',cat_c:'gold',  price:'$1,200', cost:'$400',   margin:67, stock:'�',         status:'Activo', st_c:'green', sales:34  },
    { code:'PRD-010', name:'API Premium (12 meses)',    cat:'Add-on',      cat_c:'purple',price:'$2,400', cost:'$480',   margin:80, stock:'Ilimitado', status:'Beta',   st_c:'blue',  sales:8   },
  ];

  let rowYP = 42;
  for (const p of productsData) {
    const rowBgP = frame('Row ' + p.code, tableWP, 44, { fill: T.surface });
    rowBgP.x = 0; rowBgP.y = rowYP;

    // Product icon
    const pIcoBg2 = frame('PIcon', 28, 28, { fill: { r:0.910,g:0.941,b:0.976 }, radius: 6 });
    pIcoBg2.x = pCols[0].x + 2; pIcoBg2.y = 8;
    const pIcoT2 = txt('||', { size: 11 }); pIcoT2.x = 6; pIcoT2.y = 6;
    pIcoBg2.appendChild(pIcoT2);
    rowBgP.appendChild(pIcoBg2);

    const codeT = txt(p.code, { size: 10, color: T.textMuted });
    codeT.x = pCols[0].x + 2; codeT.y = 30;
    rowBgP.appendChild(codeT);

    const nameT2 = txt(p.name, { size: 12, color: T.text, weight: 'Semi Bold' });
    nameT2.name = 'RowLink / ' + p.name;
    nameT2.x = pCols[1].x; nameT2.y = 14;
    rowBgP.appendChild(nameT2);

    const catB = badge(p.cat, p.cat_c);
    catB.x = pCols[2].x; catB.y = 13;
    rowBgP.appendChild(catB);

    const priceT = txt(p.price, { size: 12, color: T.text, weight: 'Semi Bold' });
    priceT.x = pCols[3].x; priceT.y = 14;
    rowBgP.appendChild(priceT);

    const costT = txt(p.cost, { size: 11, color: T.textMuted });
    costT.x = pCols[4].x; costT.y = 14;
    rowBgP.appendChild(costT);

    const marginColor = p.margin >= 60 ? T.success : p.margin >= 40 ? T.warning : T.danger;
    const marginT = txt(p.margin + '%', { size: 12, color: marginColor, weight: 'Bold' });
    marginT.x = pCols[5].x; marginT.y = 14;
    rowBgP.appendChild(marginT);

    const stockT = txt(p.stock, { size: 11, color: T.textMuted });
    stockT.x = pCols[6].x; stockT.y = 14;
    rowBgP.appendChild(stockT);

    const stBP = badge(p.status, p.st_c);
    stBP.x = pCols[7].x; stBP.y = 13;
    rowBgP.appendChild(stBP);

    const salesT = txt(String(p.sales), { size: 12, color: T.text, weight: 'Semi Bold' });
    salesT.x = pCols[8].x; salesT.y = 14;
    rowBgP.appendChild(salesT);

    const moreTP = txt('?', { size: 14, color: T.textMuted });
    moreTP.x = pCols[9].x; moreTP.y = 12;
    rowBgP.appendChild(moreTP);

    const rowLineP = rect(tableWP, 1, T.border2);
    rowLineP.x = 0; rowLineP.y = 43;
    rowBgP.appendChild(rowLineP);

    tableCardP.appendChild(rowBgP);
    rowYP += 44;
  }

  // Pagination footer
  const paginP = frame('Paginacion', tableWP, 40, { fill: T.surface });
  paginP.x = 0; paginP.y = 484;
  const paginLine = rect(tableWP, 1, T.border); paginLine.x = 0; paginLine.y = 0;
  paginP.appendChild(paginLine);
  const paginT = txt('Mostrando 1-10 de 32 productos', { size: 11, color: T.textMuted });
  paginT.x = 16; paginT.y = 13;
  paginP.appendChild(paginT);
  const pageNums = ['1','2','3','�','8'];
  let pnX = tableWP - 170;
  for (const pn of pageNums) {
    const pnBg = frame('Pn', 26, 26, { fill: pn === '1' ? T.primary : T.surface, radius: 4, stroke: pn === '1' ? null : T.border, strokeW: 1 });
    pnBg.x = pnX; pnBg.y = 7;
    const pnT = txt(pn, { size: 11, color: pn === '1' ? T.white : T.textMuted });
    pnT.x = (26 - pnT.width) / 2; pnT.y = (26 - pnT.height) / 2;
    pnBg.appendChild(pnT);
    paginP.appendChild(pnBg);
    pnX += 30;
  }
  tableCardP.appendChild(paginP);
  mf.appendChild(tableCardP);

  // -- MODALES ---------------------------------------------
  const modalNP = buildModalNuevoProducto();
  modalNP.x = 1500; modalNP.y = 900 + 100;
  mf.appendChild(modalNP);

  const modalDP = buildModalDetalleProducto();
  modalDP.x = 2200; modalDP.y = 900 + 100;
  mf.appendChild(modalDP);

  return { frame: mf, modalNP, modalDP, btnNewProd };
}

// -----------------------------------------------------------
//  MODAL � Nueva Cotizaci�n
// -----------------------------------------------------------
function buildModalNuevaCotizacion() {
  return buildModalOverlay('Nueva Cotizaci�n', 600, 580, (dialog) => {
    modalHeader(dialog, '|| Nueva Cotizaci�n', 600);

    dialog.appendChild(formRow('Cliente / Empresa', 'Buscar cliente�', 20, 70, 560));
    dialog.appendChild(formRow('Contacto', 'Seleccionar contacto�', 20, 148, 270));
    dialog.appendChild(formRow('Vigencia', 'dd/mm/aaaa', 300, 148, 280));
    dialog.appendChild(formRow('Oportunidad vinculada', 'Opcional�', 20, 226, 270));
    dialog.appendChild(formRow('Moneda', 'USD', 300, 226, 280));

    // Items section
    const itemsLbl = txt('�TEMS', { size: 9, color: T.textMuted, weight: 'Semi Bold' });
    itemsLbl.letterSpacing = { value: 4, unit: 'PERCENT' };
    itemsLbl.x = 20; itemsLbl.y = 305;
    dialog.appendChild(itemsLbl);

    // Items header row
    const itemHdr = frame('ItemHdr', 560, 26, { fill: { r:0.973,g:0.980,b:0.988 }, radius: 4 });
    itemHdr.x = 20; itemHdr.y = 320;
    const ihCols = [{ l:'Producto', x:8 }, { l:'Cant.', x:260 }, { l:'Precio unit.', x:310 }, { l:'Subtotal', x:420 }];
    for (const ih of ihCols) {
      const ihT = txt(ih.l, { size: 9, color: T.textMuted, weight: 'Semi Bold' });
      ihT.x = ih.x; ihT.y = 7;
      itemHdr.appendChild(ihT);
    }
    dialog.appendChild(itemHdr);

    // Sample item row
    const itemRow = frame('ItemRow', 560, 34, { fill: T.surface, radius: 4, stroke: T.border2, strokeW: 1 });
    itemRow.x = 20; itemRow.y = 350;
    const irProd = frame('IrProd', 240, 24, { fill: { r:0.972,g:0.980,b:0.992 }, radius: 4 });
    irProd.x = 8; irProd.y = 5;
    const irProdPh = txt('Seleccionar producto�', { size: 11, color: T.textMuted }); irProdPh.x = 6; irProdPh.y = 5;
    irProd.appendChild(irProdPh);
    itemRow.appendChild(irProd);
    const irQty = frame('IrQty', 36, 24, { fill: { r:0.972,g:0.980,b:0.992 }, radius: 4 });
    irQty.x = 260; irQty.y = 5;
    const irQtyT = txt('1', { size: 11, color: T.text }); irQtyT.x = 14; irQtyT.y = 5;
    irQty.appendChild(irQtyT);
    itemRow.appendChild(irQty);
    const irPrice = frame('IrPrice', 96, 24, { fill: { r:0.972,g:0.980,b:0.992 }, radius: 4 });
    irPrice.x = 310; irPrice.y = 5;
    const irPriceT = txt('$0.00', { size: 11, color: T.text }); irPriceT.x = 6; irPriceT.y = 5;
    irPrice.appendChild(irPriceT);
    itemRow.appendChild(irPrice);
    const irSub = txt('$0.00', { size: 11, color: T.text, weight: 'Bold' }); irSub.x = 420; irSub.y = 10;
    itemRow.appendChild(irSub);
    dialog.appendChild(itemRow);

    const addItemBtn = frame('AddItemBtn', 128, 26, { fill: { r:0.859,g:0.914,b:0.996 }, radius: 4 });
    addItemBtn.x = 20; addItemBtn.y = 390;
    const addItemT = txt('+ Agregar �tem', { size: 11, color: T.primaryLight, weight: 'Semi Bold' });
    addItemT.x = (128 - addItemT.width) / 2; addItemT.y = 6;
    addItemBtn.appendChild(addItemT);
    dialog.appendChild(addItemBtn);

    // Totals
    const totDiv = rect(560, 1, T.border); totDiv.x = 20; totDiv.y = 426;
    dialog.appendChild(totDiv);

    const totRows = [{ l:'Subtotal:', v:'$0.00'}, { l:'IVA (19%):', v:'$0.00'}, { l:'Total:', v:'$0.00'}];
    let totY = 436;
    for (const tr of totRows) {
      const isTotal = tr.l === 'Total:';
      const trL = txt(tr.l, { size: isTotal ? 13 : 11, color: isTotal ? T.text : T.textMuted, weight: isTotal ? 'Bold' : 'Medium' });
      trL.x = 380; trL.y = totY;
      dialog.appendChild(trL);
      const trV = txt(tr.v, { size: isTotal ? 14 : 11, color: isTotal ? T.text : T.textMuted, weight: isTotal ? 'Bold' : 'Medium' });
      trV.x = 520; trV.y = totY;
      dialog.appendChild(trV);
      totY += 22;
    }

    modalFooter(dialog, 600, 580, 'Crear Cotizaci�n', 'Cancelar');
  });
}

// -----------------------------------------------------------
//  MODAL � Detalle Cotizaci�n (preview)
// -----------------------------------------------------------
function buildModalDetalleCotizacion() {
  return buildModalOverlay('Detalle Cotizaci�n', 640, 620, (dialog) => {
    modalHeader(dialog, '|| Cotizaci�n COT-2026-041', 640);

    // Header
    const qClientT = txt('Tecno S.A.', { size: 17, color: T.text, weight: 'Bold' });
    qClientT.x = 20; qClientT.y = 72;
    dialog.appendChild(qClientT);

    const qContactT = txt('Contacto: Carlos Ruiz', { size: 12, color: T.textMuted });
    qContactT.x = 20; qContactT.y = 96;
    dialog.appendChild(qContactT);

    const qStB = badge('Aprobada', 'green');
    qStB.x = 20; qStB.y = 116;
    dialog.appendChild(qStB);

    const qDiv1 = rect(600, 1, T.border); qDiv1.x = 20; qDiv1.y = 144;
    dialog.appendChild(qDiv1);

    // Meta info
    const qMeta = [
      { l:'Fecha emisi�n:', v:'5 Mar 2026'  },
      { l:'Vigencia:',      v:'5 Abr 2026'  },
      { l:'Asignado a:',    v:'Juan M.'     },
      { l:'Moneda:',        v:'USD'         },
    ];
    for (let i = 0; i < qMeta.length; i++) {
      const mx = 20 + (i % 2) * 310;
      const my = i < 2 ? 156 : 180;
      const mL = txt(qMeta[i].l, { size: 11, color: T.textMuted, weight: 'Semi Bold' }); mL.x = mx; mL.y = my;
      dialog.appendChild(mL);
      const mV = txt(qMeta[i].v, { size: 11, color: T.text }); mV.x = mx + 110; mV.y = my;
      dialog.appendChild(mV);
    }

    const qDiv2 = rect(600, 1, T.border); qDiv2.x = 20; qDiv2.y = 208;
    dialog.appendChild(qDiv2);

    // Items table
    const qItemHdr = frame('QItemHdr', 600, 26, { fill: { r:0.973,g:0.980,b:0.988 }, radius: 4 });
    qItemHdr.x = 20; qItemHdr.y = 218;
    const qihCols = [{ l:'Producto', x:8 }, { l:'Cant.', x:280 }, { l:'Precio', x:330 }, { l:'Subtotal', x:476 }];
    for (const qih of qihCols) {
      const qihT = txt(qih.l, { size: 9, color: T.textMuted, weight: 'Semi Bold' }); qihT.x = qih.x; qihT.y = 7;
      qItemHdr.appendChild(qihT);
    }
    dialog.appendChild(qItemHdr);

    const qItems = [
      { name:'CRM Enterprise Suite',   qty:1, price:'$2,400', sub:'$2,400'  },
      { name:'M�dulo Marketing Avanzado',qty:2,price:'$600',   sub:'$1,200'  },
      { name:'Implementaci�n Enterprise',qty:1,price:'$8,500', sub:'$8,500'  },
      { name:'Soporte Anual B�sico',    qty:1, price:'$960',   sub:'$960'    },
      { name:'Capacitaci�n (10h)',      qty:1, price:'$1,200', sub:'$1,200'  },
    ];
    let qItemY = 248;
    for (const qi of qItems) {
      const qiT = txt(qi.name, { size: 11, color: T.text, weight: 'Medium' }); qiT.x = 28; qiT.y = qItemY;
      dialog.appendChild(qiT);
      const qiQty = txt(String(qi.qty), { size: 11, color: T.textMuted }); qiQty.x = 298; qiQty.y = qItemY;
      dialog.appendChild(qiQty);
      const qiP = txt(qi.price, { size: 11, color: T.textMuted }); qiP.x = 348; qiP.y = qItemY;
      dialog.appendChild(qiP);
      const qiS = txt(qi.sub, { size: 11, color: T.text, weight: 'Bold' }); qiS.x = 494; qiS.y = qItemY;
      dialog.appendChild(qiS);
      qItemY += 24;
    }

    const qDiv3 = rect(600, 1, T.border); qDiv3.x = 20; qDiv3.y = 418;
    dialog.appendChild(qDiv3);

    // Totals
    const qTots = [{ l:'Subtotal:', v:'$14,260' }, { l:'IVA (19%):', v:'$2,709.4' }, { l:'TOTAL:', v:'$16,969.4' }];
    let qtY = 428;
    for (const qt of qTots) {
      const isT = qt.l === 'TOTAL:';
      const qtL = txt(qt.l, { size: isT ? 13 : 11, color: T.textMuted, weight: isT ? 'Bold' : 'Medium' });
      qtL.x = 420; qtL.y = qtY;
      dialog.appendChild(qtL);
      const qtV = txt(qt.v, { size: isT ? 15 : 11, color: isT ? T.text : T.textMuted, weight: isT ? 'Bold' : 'Medium' });
      qtV.x = 534; qtV.y = qtY;
      dialog.appendChild(qtV);
      qtY += 24;
    }

    const ftrLQ = rect(640, 1, T.border); ftrLQ.x = 0; ftrLQ.y = 570;
    dialog.appendChild(ftrLQ);

    const btnEnv = button('|| Enviar al cliente', 'primary');
    btnEnv.x = 20; btnEnv.y = 582;
    dialog.appendChild(btnEnv);

    const btnDl = button('? Descargar PDF', 'secondary');
    btnDl.x = 190; btnDl.y = 582;
    dialog.appendChild(btnDl);

    const btnClQ = button('Cerrar', 'ghost');
    btnClQ.name = 'CloseBtn';
    btnClQ.x = 536; btnClQ.y = 582;
    dialog.appendChild(btnClQ);
  });
}

// -----------------------------------------------------------
//  PANTALLA � Cotizaciones
// -----------------------------------------------------------
async function buildCotizacionesPage() {
  const PAGE_W = 1440;
  const PAGE_H = 900;
  const CX    = 260;
  const CW    = PAGE_W - CX;
  const padX  = 32;
  const cY    = 64;

  const mf = frame('|| Cotizaciones', PAGE_W, PAGE_H, { fill: T.bg });
  mf.clipsContent = true;

  const sb = buildSidebar('Cotizaciones');
  sb.x = 0; sb.y = 0;
  mf.appendChild(sb);

  const hdr = buildHeader('Cotizaciones');
  hdr.x = CX; hdr.y = 0;
  mf.appendChild(hdr);

  const pgTQ = txt('Cotizaciones', { size: 22, color: T.text, weight: 'Bold' });
  pgTQ.x = CX + padX; pgTQ.y = cY + 22;
  mf.appendChild(pgTQ);

  const pgSQ = txt('8 cotizaciones � $169,150 en total', { size: 12, color: T.textMuted });
  pgSQ.x = CX + padX; pgSQ.y = cY + 50;
  mf.appendChild(pgSQ);

  const pendSpanQ = txt('� 3 pendientes', { size: 12, color: T.warning, weight: 'Semi Bold' });
  pendSpanQ.x = CX + padX + pgSQ.width; pendSpanQ.y = cY + 50;
  mf.appendChild(pendSpanQ);

  // Buttons
  const btnImpQ = button('|| Importar', 'secondary');
  btnImpQ.x = CX + CW - 268; btnImpQ.y = cY + 26;
  mf.appendChild(btnImpQ);

  const btnNewQ = button('+ Nueva cotizaci�n', 'primary');
  btnNewQ.name = 'Btn / Nueva Cotizaci�n ? Modal Nueva Cotizaci�n';
  btnNewQ.x = CX + CW - 156; btnNewQ.y = cY + 26;
  mf.appendChild(btnNewQ);

  // KPIs
  const kpisQ = [
    { label:'Valor total',  value:'$169K', color:T.primaryLight, ibg:{r:0.859,g:0.941,b:0.996}, icon:'||', change:'este mes',    up:true  },
    { label:'Aprobadas',    value:'4',     color:T.success,      ibg:{r:0.859,g:0.988,b:0.902}, icon:'?', change:'$73,700',     up:true  },
    { label:'Pendientes',   value:'3',     color:T.warning,      ibg:{r:1,g:0.933,b:0.824},     icon:'?', change:'$80,850',     up:false },
    { label:'Rechazadas',   value:'1',     color:T.danger,       ibg:{r:0.996,g:0.886,b:0.886}, icon:'?', change:'$4,800',      up:false },
  ];
  const kWQ   = 268;
  const kpiYQ = cY + 70;
  for (let i = 0; i < kpisQ.length; i++) {
    const k = kpisQ[i];
    const c = kpiCard(k.label, k.value, k.change, k.up, k.icon, k.color, k.ibg, kWQ);
    c.x = CX + padX + i * (kWQ + 12); c.y = kpiYQ;
    mf.appendChild(c);
  }

  // Table card
  const tableYQ = kpiYQ + 116;
  const tableWQ = CW - padX * 2;
  const tableCardQ = frame('Card / Tabla Cotizaciones', tableWQ, 510, { fill: T.surface, radius: 10, stroke: T.border, strokeW: 1 });
  tableCardQ.x = CX + padX; tableCardQ.y = tableYQ;

  // Tabs + filter bar
  const tabBgQ = frame('TabBarQ', tableWQ, 46, { fill: T.surface });
  tabBgQ.x = 0; tabBgQ.y = 0;

  const qTabs = ['Todas','Aprobadas','Pendientes','Rechazadas'];
  const qTabW  = [52, 70, 72, 70];
  let qtabX = 12;
  for (let i = 0; i < qTabs.length; i++) {
    const tw = qTabW[i];
    const tabBtnQ = frame('Tab ' + qTabs[i], tw, 28, {
      fill: i === 0 ? T.primary : T.surface,
      radius: 6,
      stroke: i === 0 ? null : T.border, strokeW: 1,
    });
    tabBtnQ.x = qtabX; tabBtnQ.y = 9;
    const tabTtQ = txt(qTabs[i], { size: 11, color: i === 0 ? T.white : T.textMuted, weight: i === 0 ? 'Semi Bold' : 'Medium' });
    tabTtQ.x = (tw - tabTtQ.width) / 2; tabTtQ.y = (28 - tabTtQ.height) / 2;
    tabBtnQ.appendChild(tabTtQ);
    tabBgQ.appendChild(tabBtnQ);
    qtabX += tw + 6;
  }

  const qMonthSel = frame('MonthSel', 110, 28, { fill: { r:0.972,g:0.980,b:0.992 }, radius: 6, stroke: T.border, strokeW: 1 });
  qMonthSel.x = tableWQ - 126; qMonthSel.y = 9;
  const qMonthT = txt('Marzo 2026 ?', { size: 11, color: T.textMuted }); qMonthT.x = 10; qMonthT.y = 8;
  qMonthSel.appendChild(qMonthT);
  tabBgQ.appendChild(qMonthSel);

  const tabLineQ = rect(tableWQ, 1, T.border); tabLineQ.x = 0; tabLineQ.y = 45;
  tabBgQ.appendChild(tabLineQ);
  tableCardQ.appendChild(tabBgQ);

  // Headers
  const qCols = [
    { label:'ID',         x:12  },
    { label:'Cliente',    x:130 },
    { label:'Contacto',   x:300 },
    { label:'�tems',      x:410 },
    { label:'Monto',      x:460 },
    { label:'Estado',     x:540 },
    { label:'Fecha',      x:620 },
    { label:'Vence',      x:706 },
    { label:'Asig.',      x:790 },
    { label:'',           x:832 },
  ];
  tableHeader(tableCardQ, qCols, 46, tableWQ);

  // Rows
  const quotesData = [
    { id:'COT-2026-041', client:'Tecno S.A.',   contact:'Carlos Ruiz',    items:5, monto:'$12,500', estado:'Aprobada',  ec:'green',  fecha:'5 Mar 2026',   vence:'5 Abr 2026',   owner:'JM' },
    { id:'COT-2026-040', client:'Global Corp',  contact:'Pedro Vargas',   items:3, monto:'$38,700', estado:'Pendiente', ec:'yellow', fecha:'3 Mar 2026',   vence:'3 Abr 2026',   owner:'RP' },
    { id:'COT-2026-039', client:'Innova LLC',   contact:'Ana L�pez',      items:7, monto:'$8,250',  estado:'Pendiente', ec:'yellow', fecha:'28 Feb 2026',  vence:'28 Mar 2026',  owner:'JM' },
    { id:'COT-2026-038', client:'NetSol',       contact:'Sof�a M�ndez',   items:2, monto:'$4,800',  estado:'Rechazada', ec:'red',    fecha:'22 Feb 2026',  vence:'22 Mar 2026',  owner:'CG' },
    { id:'COT-2026-037', client:'DataPoint',    contact:'Mar�a Fern�ndez',items:4, monto:'$16,400', estado:'Aprobada',  ec:'green',  fecha:'18 Feb 2026',  vence:'18 Mar 2026',  owner:'JM' },
    { id:'COT-2026-036', client:'MegaTrade',    contact:'Luis Torres',    items:6, monto:'$29,900', estado:'Pendiente', ec:'yellow', fecha:'15 Feb 2026',  vence:'15 Mar 2026',  owner:'RP' },
    { id:'COT-2026-035', client:'TechPlus',     contact:'Roberto G�mez', items:3, monto:'$7,600',  estado:'Aprobada',  ec:'green',  fecha:'10 Feb 2026',  vence:'10 Mar 2026',  owner:'CG' },
    { id:'COT-2026-034', client:'Alpha Corp',   contact:'Laura Jim�nez',  items:8, monto:'$52,000', estado:'Aprobada',  ec:'green',  fecha:'5 Feb 2026',   vence:'5 Mar 2026',   owner:'JM' },
  ];

  let rowYQ = 78;
  for (const q of quotesData) {
    const isHighlight = q.estado === 'Pendiente';
    const rowFillQ = isHighlight ? { r:1,g:0.980,b:0.941 } : T.surface;
    const rowBgQ = frame('Row ' + q.id, tableWQ, 44, { fill: rowFillQ });
    rowBgQ.x = 0; rowBgQ.y = rowYQ;

    const idT = txt(q.id, { size: 10, color: T.primaryLight, weight: 'Semi Bold' });
    idT.name = 'RowLink / ' + q.id;
    idT.x = qCols[0].x; idT.y = 15;
    rowBgQ.appendChild(idT);

    const clAv = frame('ClAv', 26, 26, { fill: T.primary, radius: 13 });
    clAv.x = qCols[1].x; clAv.y = 9;
    const clAvT = txt(q.client.slice(0,2), { size: 8, color: T.white, weight: 'Bold' });
    clAvT.x = (26 - clAvT.width) / 2; clAvT.y = (26 - clAvT.height) / 2;
    clAv.appendChild(clAvT);
    rowBgQ.appendChild(clAv);

    const clT = txt(q.client, { size: 12, color: T.text, weight: 'Semi Bold' });
    clT.x = qCols[1].x + 32; clT.y = 14;
    rowBgQ.appendChild(clT);

    const conT = txt(q.contact, { size: 11, color: T.textMuted });
    conT.x = qCols[2].x; conT.y = 14;
    rowBgQ.appendChild(conT);

    const itmBg = frame('ItmBg', 24, 24, { fill: { r:0.859,g:0.914,b:0.996 }, radius: 12 });
    itmBg.x = qCols[3].x; itmBg.y = 10;
    const itmT = txt(String(q.items), { size: 10, color: T.primaryLight, weight: 'Bold' });
    itmT.x = (24 - itmT.width) / 2; itmT.y = (24 - itmT.height) / 2;
    itmBg.appendChild(itmT);
    rowBgQ.appendChild(itmBg);

    const montoT = txt(q.monto, { size: 12, color: T.text, weight: 'Bold' });
    montoT.x = qCols[4].x; montoT.y = 14;
    rowBgQ.appendChild(montoT);

    const qStB = badge(q.estado, q.ec);
    qStB.x = qCols[5].x; qStB.y = 13;
    rowBgQ.appendChild(qStB);

    const fechaT = txt(q.fecha, { size: 10, color: T.textMuted });
    fechaT.x = qCols[6].x; fechaT.y = 14;
    rowBgQ.appendChild(fechaT);

    const venceT = txt(q.vence, { size: 10, color: T.textMuted });
    venceT.x = qCols[7].x; venceT.y = 14;
    rowBgQ.appendChild(venceT);

    const owBgQ = frame('OwBgQ', 24, 24, { fill: T.primary, radius: 12 });
    owBgQ.x = qCols[8].x; owBgQ.y = 10;
    const owTQ = txt(q.owner, { size: 7, color: T.white, weight: 'Bold' });
    owTQ.x = (24 - owTQ.width) / 2; owTQ.y = (24 - owTQ.height) / 2;
    owBgQ.appendChild(owTQ);
    rowBgQ.appendChild(owBgQ);

    const moreTQ = txt('?', { size: 14, color: T.textMuted });
    moreTQ.x = qCols[9].x; moreTQ.y = 12;
    rowBgQ.appendChild(moreTQ);

    const rowLineQ = rect(tableWQ, 1, T.border2);
    rowLineQ.x = 0; rowLineQ.y = 43;
    rowBgQ.appendChild(rowLineQ);

    tableCardQ.appendChild(rowBgQ);
    rowYQ += 44;
  }

  // Pagination
  const paginQ = frame('PaginQ', tableWQ, 40, { fill: T.surface });
  paginQ.x = 0; paginQ.y = 466;
  const paginLineQ = rect(tableWQ, 1, T.border); paginLineQ.x = 0; paginLineQ.y = 0;
  paginQ.appendChild(paginLineQ);
  const paginTQ = txt('Mostrando 8 de 41 cotizaciones', { size: 11, color: T.textMuted });
  paginTQ.x = 16; paginTQ.y = 13;
  paginQ.appendChild(paginTQ);
  const pageNumsQ = ['1','2','3','�','8'];
  let pnXQ = tableWQ - 170;
  for (const pn of pageNumsQ) {
    const pnBgQ = frame('PnQ', 26, 26, { fill: pn === '1' ? T.primary : T.surface, radius: 4, stroke: pn === '1' ? null : T.border, strokeW: 1 });
    pnBgQ.x = pnXQ; pnBgQ.y = 7;
    const pnTQ = txt(pn, { size: 11, color: pn === '1' ? T.white : T.textMuted });
    pnTQ.x = (26 - pnTQ.width) / 2; pnTQ.y = (26 - pnTQ.height) / 2;
    pnBgQ.appendChild(pnTQ);
    paginQ.appendChild(pnBgQ);
    pnXQ += 30;
  }
  tableCardQ.appendChild(paginQ);
  mf.appendChild(tableCardQ);

  // -- MODALES ---------------------------------------------
  const modalNQ = buildModalNuevaCotizacion();
  modalNQ.x = 1500; modalNQ.y = 900 + 100;
  mf.appendChild(modalNQ);

  const modalDQ = buildModalDetalleCotizacion();
  modalDQ.x = 2200; modalDQ.y = 900 + 100;
  mf.appendChild(modalDQ);

  return { frame: mf, modalNQ, modalDQ, btnNewQ };
}

// -----------------------------------------------------------
//  MODAL � Nueva Factura
// -----------------------------------------------------------
function buildModalNuevaFactura() {
  return buildModalOverlay('Nueva Factura', 580, 520, (dialog) => {
    modalHeader(dialog, '|| Nueva Factura', 580);

    dialog.appendChild(formRow('Cliente / Empresa', 'Seleccionar cliente�', 20, 70, 540));
    dialog.appendChild(formRow('Cotizaci�n origen', 'Opcional: COT-2026-XXX', 20, 148, 259));
    dialog.appendChild(formRow('Fecha de emisi�n', 'dd/mm/aaaa', 289, 148, 271));
    dialog.appendChild(formRow('Fecha de vencimiento', 'dd/mm/aaaa', 20, 226, 259));
    dialog.appendChild(formRow('M�todo de pago', 'Transferencia', 289, 226, 271));
    dialog.appendChild(formRow('Moneda', 'USD', 20, 304, 160));
    dialog.appendChild(formRow('Notas', 'Condiciones de pago�', 190, 304, 370));

    // Items section
    const fItemsLbl = txt('�TEMS', { size: 9, color: T.textMuted, weight: 'Semi Bold' });
    fItemsLbl.letterSpacing = { value: 4, unit: 'PERCENT' };
    fItemsLbl.x = 20; fItemsLbl.y = 383;
    dialog.appendChild(fItemsLbl);

    const fItemHdr = frame('FItemHdr', 540, 26, { fill: { r:0.973,g:0.980,b:0.988 }, radius: 4 });
    fItemHdr.x = 20; fItemHdr.y = 398;
    const fihCols = [{ l:'Descripci�n', x:8 }, { l:'Cant.', x:280 }, { l:'Precio', x:330 }, { l:'Total', x:464 }];
    for (const fih of fihCols) {
      const fihT = txt(fih.l, { size: 9, color: T.textMuted, weight: 'Semi Bold' }); fihT.x = fih.x; fihT.y = 7;
      fItemHdr.appendChild(fihT);
    }
    dialog.appendChild(fItemHdr);

    const fItemRow = frame('FItemRow', 540, 32, { fill: T.surface, radius: 4, stroke: T.border2, strokeW: 1 });
    fItemRow.x = 20; fItemRow.y = 428;
    const fIrPh = txt('Seleccionar producto o servicio�', { size: 11, color: T.textMuted }); fIrPh.x = 8; fIrPh.y = 9;
    fItemRow.appendChild(fIrPh);
    dialog.appendChild(fItemRow);

    modalFooter(dialog, 580, 520, 'Emitir Factura', 'Cancelar');
  });
}

// -----------------------------------------------------------
//  MODAL � Detalle Factura
// -----------------------------------------------------------
function buildModalDetalleFactura() {
  return buildModalOverlay('Detalle Factura', 620, 600, (dialog) => {
    modalHeader(dialog, '|| Factura FAC-2026-118', 620);

    // Header
    const fClientT = txt('Alpha Corp', { size: 17, color: T.text, weight: 'Bold' });
    fClientT.x = 20; fClientT.y = 72;
    dialog.appendChild(fClientT);

    const fB = badge('Pagada', 'green');
    fB.x = 20; fB.y = 98;
    dialog.appendChild(fB);

    const fDiv1 = rect(580, 1, T.border); fDiv1.x = 20; fDiv1.y = 126;
    dialog.appendChild(fDiv1);

    // Meta
    const fMeta = [
      { l:'Emisi�n:',    v:'1 Mar 2026'    },
      { l:'Vencimiento:',v:'31 Mar 2026'   },
      { l:'M�todo:',     v:'Transferencia' },
      { l:'Moneda:',     v:'USD'           },
    ];
    for (let i = 0; i < fMeta.length; i++) {
      const fx = 20 + (i % 2) * 300;
      const fy = 138 + Math.floor(i / 2) * 22;
      const fmL = txt(fMeta[i].l, { size: 11, color: T.textMuted, weight: 'Semi Bold' }); fmL.x = fx; fmL.y = fy;
      dialog.appendChild(fmL);
      const fmV = txt(fMeta[i].v, { size: 11, color: T.text }); fmV.x = fx + 100; fmV.y = fy;
      dialog.appendChild(fmV);
    }

    const fDiv2 = rect(580, 1, T.border); fDiv2.x = 20; fDiv2.y = 190;
    dialog.appendChild(fDiv2);

    // Items
    const fItemHdr2 = frame('FItemHdr2', 580, 26, { fill: { r:0.973,g:0.980,b:0.988 }, radius: 4 });
    fItemHdr2.x = 20; fItemHdr2.y = 200;
    const fihCols2 = [{ l:'Descripci�n', x:8 }, { l:'Cant.', x:280 }, { l:'Precio', x:328 }, { l:'Total', x:456 }];
    for (const fih of fihCols2) {
      const fihT2 = txt(fih.l, { size: 9, color: T.textMuted, weight: 'Semi Bold' }); fihT2.x = fih.x; fihT2.y = 7;
      fItemHdr2.appendChild(fihT2);
    }
    dialog.appendChild(fItemHdr2);

    const fItems = [
      { name:'CRM Enterprise Suite',    qty:1, price:'$2,400',  total:'$2,400'  },
      { name:'Implementaci�n Enterprise',qty:1, price:'$8,500',  total:'$8,500'  },
      { name:'M�dulo Marketing Avanzado',qty:2, price:'$600',    total:'$1,200'  },
      { name:'Soporte Anual B�sico',     qty:5, price:'$960',    total:'$4,800'  },
      { name:'Capacitaci�n 10h',         qty:3, price:'$1,200',  total:'$3,600'  },
    ];
    let fItemY2 = 230;
    for (const fi of fItems) {
      const fiT = txt(fi.name, { size: 11, color: T.text, weight: 'Medium' }); fiT.x = 28; fiT.y = fItemY2;
      dialog.appendChild(fiT);
      const fiQ = txt(String(fi.qty), { size: 11, color: T.textMuted }); fiQ.x = 288; fiQ.y = fItemY2;
      dialog.appendChild(fiQ);
      const fiP = txt(fi.price, { size: 11, color: T.textMuted }); fiP.x = 336; fiP.y = fItemY2;
      dialog.appendChild(fiP);
      const fiTot = txt(fi.total, { size: 11, color: T.text, weight: 'Bold' }); fiTot.x = 464; fiTot.y = fItemY2;
      dialog.appendChild(fiTot);
      fItemY2 += 24;
    }

    const fDiv3 = rect(580, 1, T.border); fDiv3.x = 20; fDiv3.y = 360;
    dialog.appendChild(fDiv3);

    // Payment status
    const fPayT = txt('Estado de pago', { size: 12, color: T.text, weight: 'Semi Bold' });
    fPayT.x = 20; fPayT.y = 374;
    dialog.appendChild(fPayT);

    const fPayBar = progressBar(580, 100, T.success);
    fPayBar.x = 20; fPayBar.y = 396;
    dialog.appendChild(fPayBar);

    const fPayInfo = txt('$52,000 pagados de $52,000 � Pagado el 8 Mar 2026', { size: 11, color: T.textMuted });
    fPayInfo.x = 20; fPayInfo.y = 410;
    dialog.appendChild(fPayInfo);

    // Totals
    const fTots = [{ l:'Subtotal:', v:'$44,000' }, { l:'IVA (19%):', v:'$8,360' }, { l:'TOTAL:', v:'$52,360' }];
    let ftY = 434;
    for (const ft of fTots) {
      const isT = ft.l === 'TOTAL:';
      const ftL = txt(ft.l, { size: isT ? 13 : 11, color: T.textMuted, weight: isT ? 'Bold' : 'Medium' });
      ftL.x = 400; ftL.y = ftY;
      dialog.appendChild(ftL);
      const ftV = txt(ft.v, { size: isT ? 15 : 11, color: isT ? T.text : T.textMuted, weight: isT ? 'Bold' : 'Medium' });
      ftV.x = 530; ftV.y = ftY;
      dialog.appendChild(ftV);
      ftY += 24;
    }

    const ftrLF = rect(620, 1, T.border); ftrLF.x = 0; ftrLF.y = 550;
    dialog.appendChild(ftrLF);

    const btnDlF = button('? Descargar PDF', 'primary');
    btnDlF.x = 20; btnDlF.y = 562;
    dialog.appendChild(btnDlF);

    const btnRegPago = button('|| Registrar pago', 'secondary');
    btnRegPago.x = 190; btnRegPago.y = 562;
    dialog.appendChild(btnRegPago);

    const btnClF = button('Cerrar', 'ghost');
    btnClF.name = 'CloseBtn';
    btnClF.x = 516; btnClF.y = 562;
    dialog.appendChild(btnClF);
  });
}

// -----------------------------------------------------------
//  PANTALLA � Facturas
// -----------------------------------------------------------
async function buildFacturasPage() {
  const PAGE_W = 1440;
  const PAGE_H = 900;
  const CX    = 260;
  const CW    = PAGE_W - CX;
  const padX  = 32;
  const cY    = 64;

  const mf = frame('|| Facturas', PAGE_W, PAGE_H, { fill: T.bg });
  mf.clipsContent = true;

  const sb = buildSidebar('Facturas');
  sb.x = 0; sb.y = 0;
  mf.appendChild(sb);

  const hdr = buildHeader('Facturas');
  hdr.x = CX; hdr.y = 0;
  mf.appendChild(hdr);

  const pgTF = txt('Facturas', { size: 22, color: T.text, weight: 'Bold' });
  pgTF.x = CX + padX; pgTF.y = cY + 22;
  mf.appendChild(pgTF);

  const pgSF = txt('8 facturas � Total: $170,150', { size: 12, color: T.textMuted });
  pgSF.x = CX + padX; pgSF.y = cY + 50;
  mf.appendChild(pgSF);

  const venSpanF = txt('� 1 vencida', { size: 12, color: T.danger, weight: 'Semi Bold' });
  venSpanF.x = CX + padX + pgSF.width; venSpanF.y = cY + 50;
  mf.appendChild(venSpanF);

  // Buttons
  const btnExpF = button('? Exportar', 'secondary');
  btnExpF.x = CX + CW - 268; btnExpF.y = cY + 26;
  mf.appendChild(btnExpF);

  const btnNewF = button('+ Nueva factura', 'primary');
  btnNewF.name = 'Btn / Nueva Factura ? Modal Nueva Factura';
  btnNewF.x = CX + CW - 148; btnNewF.y = cY + 26;
  mf.appendChild(btnNewF);

  // KPIs
  const kpisF = [
    { label:'Total facturado', value:'$170K', color:T.primaryLight, ibg:{r:0.859,g:0.941,b:0.996}, icon:'||', change:'? 8.2% vs feb', up:true  },
    { label:'Cobradas',        value:'$80K',  color:T.success,      ibg:{r:0.859,g:0.988,b:0.902}, icon:'?', change:'? 4 facturas',  up:true  },
    { label:'Por cobrar',      value:'$61K',  color:T.warning,      ibg:{r:1,g:0.933,b:0.824},     icon:'?', change:'3 pendientes',  up:false },
    { label:'Vencidas',        value:'$30K',  color:T.danger,       ibg:{r:0.996,g:0.886,b:0.886}, icon:'||', change:'1 vencida',     up:false },
  ];
  const kWF   = 268;
  const kpiYF = cY + 70;
  for (let i = 0; i < kpisF.length; i++) {
    const k = kpisF[i];
    const c = kpiCard(k.label, k.value, k.change, k.up, k.icon, k.color, k.ibg, kWF);
    c.x = CX + padX + i * (kWF + 12); c.y = kpiYF;
    mf.appendChild(c);
  }

  // Estado de cobro bar
  const cobBarY = kpiYF + 116;
  const cobCard = frame('Card / Cobro', CW - padX * 2, 90, { fill: T.surface, radius: 10, stroke: T.border, strokeW: 1 });
  cobCard.x = CX + padX; cobCard.y = cobBarY;

  const cobTitle = txt('Estado de Cobro', { size: 13, color: T.text, weight: 'Semi Bold' });
  cobTitle.x = 16; cobTitle.y = 13;
  cobCard.appendChild(cobTitle);
  const cobTotalT = txt('Total: $170,150', { size: 11, color: T.textMuted });
  cobTotalT.x = (CW - padX * 2) - 120; cobTotalT.y = 15;
  cobCard.appendChild(cobTotalT);

  // Stacked bar
  const barWF = (CW - padX * 2) - 32;
  const segments = [
    { pct:47, fill:T.success,  label:'47% Pagadas' },
    { pct:36, fill:T.warning,  label:'36% Pendiente' },
    { pct:17, fill:T.danger,   label:'17% Vencida' },
  ];
  let bxF = 16;
  for (const seg of segments) {
    const sw = Math.round((seg.pct / 100) * barWF);
    const segF = frame('SegF', sw, 24, { fill: seg.fill });
    segF.x = bxF; segF.y = 36;
    const segLT = txt(seg.label, { size: 9, color: T.white, weight: 'Bold' });
    segLT.x = Math.max(2, (sw - segLT.width) / 2); segLT.y = 7;
    segF.appendChild(segLT);
    cobCard.appendChild(segF);
    bxF += sw;
  }

  // Legend
  const cobLeg = [
    { l:'Cobradas',   v:'$80,800', c:T.success },
    { l:'Pendientes', v:'$61,450', c:T.warning },
    { l:'Vencidas',   v:'$29,900', c:T.danger  },
  ];
  let cobLegX = 16;
  for (const cl of cobLeg) {
    const clDot = frame('CLDot', 10, 10, { fill: cl.c, radius: 5 });
    clDot.x = cobLegX; clDot.y = 68;
    cobCard.appendChild(clDot);
    const clLT = txt(cl.l, { size: 11, color: T.textMuted }); clLT.x = cobLegX + 14; clLT.y = 65;
    cobCard.appendChild(clLT);
    const clVT = txt(cl.v, { size: 11, color: T.text, weight: 'Bold' }); clVT.x = cobLegX + 14 + clLT.width + 4; clVT.y = 65;
    cobCard.appendChild(clVT);
    cobLegX += 180;
  }
  mf.appendChild(cobCard);

  // Table card
  const tableYF = cobBarY + 106;
  const tableWF = CW - padX * 2;
  const tableCardF = frame('Card / Tabla Facturas', tableWF, 490, { fill: T.surface, radius: 10, stroke: T.border, strokeW: 1 });
  tableCardF.x = CX + padX; tableCardF.y = tableYF;

  // Tabs
  const tabBgF = frame('TabBarF', tableWF, 46, { fill: T.surface });
  tabBgF.x = 0; tabBgF.y = 0;

  const fTabs = ['Todas','Pagadas','Pendientes','Vencidas'];
  const fTabW  = [52, 62, 72, 60];
  let ftabX = 12;
  for (let i = 0; i < fTabs.length; i++) {
    const tw = fTabW[i];
    const tabBtnF = frame('Tab ' + fTabs[i], tw, 28, {
      fill: i === 0 ? T.primary : T.surface,
      radius: 6,
      stroke: i === 0 ? null : T.border, strokeW: 1,
    });
    tabBtnF.x = ftabX; tabBtnF.y = 9;
    const tabTtF = txt(fTabs[i], { size: 11, color: i === 0 ? T.white : T.textMuted, weight: i === 0 ? 'Semi Bold' : 'Medium' });
    tabTtF.x = (tw - tabTtF.width) / 2; tabTtF.y = (28 - tabTtF.height) / 2;
    tabBtnF.appendChild(tabTtF);
    tabBgF.appendChild(tabBtnF);
    ftabX += tw + 6;
  }

  const fMonthSel = frame('FMonthSel', 110, 28, { fill: { r:0.972,g:0.980,b:0.992 }, radius: 6, stroke: T.border, strokeW: 1 });
  fMonthSel.x = tableWF - 126; fMonthSel.y = 9;
  const fMonthT = txt('Marzo 2026 ?', { size: 11, color: T.textMuted }); fMonthT.x = 10; fMonthT.y = 8;
  fMonthSel.appendChild(fMonthT);
  tabBgF.appendChild(fMonthSel);

  const tabLineF = rect(tableWF, 1, T.border); tabLineF.x = 0; tabLineF.y = 45;
  tabBgF.appendChild(tabLineF);
  tableCardF.appendChild(tabBgF);

  // Headers
  const fCols = [
    { label:'Factura',    x:12  },
    { label:'Cliente',    x:132 },
    { label:'Monto',      x:300 },
    { label:'Pagado',     x:380 },
    { label:'Estado',     x:490 },
    { label:'Emisi�n',    x:574 },
    { label:'Vencimiento',x:660 },
    { label:'M�todo',     x:754 },
    { label:'',           x:848 },
  ];
  tableHeader(tableCardF, fCols, 46, tableWF);

  // Rows
  const invoicesData = [
    { id:'FAC-2026-118', client:'Alpha Corp',  monto:'$52,000', pagado:'$52,000', pct:100, estado:'Pagada',   ec:'green',  emision:'1 Mar 2026',   vence:'31 Mar 2026', mop:'Transferencia' },
    { id:'FAC-2026-117', client:'Tecno S.A.',  monto:'$12,500', pagado:'$6,250',  pct:50,  estado:'Parcial',  ec:'yellow', emision:'28 Feb 2026',  vence:'30 Mar 2026', mop:'Cr�dito 30d'   },
    { id:'FAC-2026-116', client:'Global Corp', monto:'$38,700', pagado:'$0',      pct:0,   estado:'Pendiente',ec:'orange', emision:'25 Feb 2026',  vence:'27 Mar 2026', mop:'Cr�dito 30d'   },
    { id:'FAC-2026-115', client:'DataPoint',   monto:'$16,400', pagado:'$16,400', pct:100, estado:'Pagada',   ec:'green',  emision:'20 Feb 2026',  vence:'22 Mar 2026', mop:'Transferencia' },
    { id:'FAC-2026-114', client:'MegaTrade',   monto:'$29,900', pagado:'$0',      pct:0,   estado:'Vencida',  ec:'red',    emision:'10 Feb 2026',  vence:'12 Mar 2026', mop:'Cr�dito 30d'   },
    { id:'FAC-2026-113', client:'TechPlus',    monto:'$7,600',  pagado:'$7,600',  pct:100, estado:'Pagada',   ec:'green',  emision:'5 Feb 2026',   vence:'7 Mar 2026',  mop:'Efectivo'      },
    { id:'FAC-2026-112', client:'Innova LLC',  monto:'$8,250',  pagado:'$0',      pct:0,   estado:'Pendiente',ec:'orange', emision:'1 Feb 2026',   vence:'3 Mar 2026',  mop:'Cr�dito 15d'   },
    { id:'FAC-2026-111', client:'NetSol',      monto:'$4,800',  pagado:'$4,800',  pct:100, estado:'Pagada',   ec:'green',  emision:'28 Ene 2026',  vence:'27 Feb 2026', mop:'Transferencia' },
  ];

  let rowYF = 78;
  for (const f of invoicesData) {
    const isVencida = f.estado === 'Vencida';
    const rowFillF = isVencida ? { r:1,g:0.961,b:0.961 } : T.surface;
    const rowBgF = frame('Row ' + f.id, tableWF, 46, { fill: rowFillF });
    rowBgF.x = 0; rowBgF.y = rowYF;

    const fidT = txt(f.id, { size: 10, color: T.primaryLight, weight: 'Semi Bold' });
    fidT.name = 'RowLink / ' + f.id;
    fidT.x = fCols[0].x; fidT.y = 16;
    rowBgF.appendChild(fidT);

    const fClAv = frame('FClAv', 26, 26, { fill: T.primary, radius: 13 });
    fClAv.x = fCols[1].x; fClAv.y = 10;
    const fClAvT = txt(f.client.slice(0,2), { size: 8, color: T.white, weight: 'Bold' });
    fClAvT.x = (26 - fClAvT.width) / 2; fClAvT.y = (26 - fClAvT.height) / 2;
    fClAv.appendChild(fClAvT);
    rowBgF.appendChild(fClAv);

    const fClT = txt(f.client, { size: 12, color: T.text, weight: 'Semi Bold' });
    fClT.x = fCols[1].x + 32; fClT.y = 15;
    rowBgF.appendChild(fClT);

    const fMontoT = txt(f.monto, { size: 13, color: T.text, weight: 'Bold' });
    fMontoT.x = fCols[2].x; fMontoT.y = 15;
    rowBgF.appendChild(fMontoT);

    // Pagado + mini bar
    const fPagT = txt(f.pagado, { size: 11, color: T.text, weight: 'Semi Bold' });
    fPagT.x = fCols[3].x; fPagT.y = 8;
    rowBgF.appendChild(fPagT);
    const fPBar = progressBar(88, f.pct, T.success);
    fPBar.x = fCols[3].x; fPBar.y = 28;
    rowBgF.appendChild(fPBar);

    const fStB = badge(f.estado, f.ec);
    fStB.x = fCols[4].x; fStB.y = 14;
    rowBgF.appendChild(fStB);

    const fEmT = txt(f.emision, { size: 10, color: T.textMuted });
    fEmT.x = fCols[5].x; fEmT.y = 16;
    rowBgF.appendChild(fEmT);

    const fVenT = txt(f.vence, { size: 10, color: isVencida ? T.danger : T.textMuted });
    fVenT.x = fCols[6].x; fVenT.y = 16;
    rowBgF.appendChild(fVenT);

    const fMopT = txt(f.mop, { size: 10, color: T.textMuted });
    fMopT.x = fCols[7].x; fMopT.y = 16;
    rowBgF.appendChild(fMopT);

    const moreTF = txt('?', { size: 14, color: T.textMuted });
    moreTF.x = fCols[8].x; moreTF.y = 14;
    rowBgF.appendChild(moreTF);

    const rowLineF = rect(tableWF, 1, T.border2);
    rowLineF.x = 0; rowLineF.y = 45;
    rowBgF.appendChild(rowLineF);

    tableCardF.appendChild(rowBgF);
    rowYF += 46;
  }
  mf.appendChild(tableCardF);

  // -- MODALES ---------------------------------------------
  const modalNF = buildModalNuevaFactura();
  modalNF.x = 1500; modalNF.y = 900 + 100;
  mf.appendChild(modalNF);

  const modalDF = buildModalDetalleFactura();
  modalDF.x = 2200; modalDF.y = 900 + 100;
  mf.appendChild(modalDF);

  return { frame: mf, modalNF, modalDF, btnNewF };
}

// -----------------------------------------------------------
//  PROTOTYPE � Gen�rico (bot�n ? overlay)
// -----------------------------------------------------------
function wireGenericOverlay(parentFrame, triggerBtn, modal) {
  if (triggerBtn && modal) {
    triggerBtn.reactions = [{
      actions: [{
        type: 'NODE',
        destinationId: modal.id,
        navigation: 'OVERLAY',
        transition: { type: 'DISSOLVE', duration: 0.2, easing: { type: 'EASE_OUT' } },
        preserveScrollPosition: false,
        overlayRelativePosition: { x: 0, y: 0 },
      }],
      trigger: { type: 'ON_CLICK' },
    }];
  }
  parentFrame.findAll(n => n.name === 'CloseBtn').forEach(n => {
    try { n.reactions = [{ actions: [{ type: 'BACK', navigation: 'BACK' }], trigger: { type: 'ON_CLICK' } }]; } catch (_) {}
  });
}

// -----------------------------------------------------------
//  PROTOTYPE � Actividades
// -----------------------------------------------------------
function wireActividadesPrototype(actFrame, btnNewAct, modalNA2) {
  if (btnNewAct && modalNA2) {
    btnNewAct.reactions = [{
      actions: [{
        type: 'NODE',
        destinationId: modalNA2.id,
        navigation: 'OVERLAY',
        transition: { type: 'DISSOLVE', duration: 0.2, easing: { type: 'EASE_OUT' } },
        preserveScrollPosition: false,
        overlayRelativePosition: { x: 0, y: 0 },
      }],
      trigger: { type: 'ON_CLICK' },
    }];
  }
  actFrame.findAll(n => n.name === 'CloseBtn').forEach(n => {
    try { n.reactions = [{ actions: [{ type: 'BACK', navigation: 'BACK' }], trigger: { type: 'ON_CLICK' } }]; } catch (_) {}
  });
}

// -----------------------------------------------------------
//  PROTOTYPE � Calendario
// -----------------------------------------------------------
function wireCalendarioPrototype(calFrame, btnNewEv, modalNE) {
  if (btnNewEv && modalNE) {
    btnNewEv.reactions = [{
      actions: [{
        type: 'NODE',
        destinationId: modalNE.id,
        navigation: 'OVERLAY',
        transition: { type: 'DISSOLVE', duration: 0.2, easing: { type: 'EASE_OUT' } },
        preserveScrollPosition: false,
        overlayRelativePosition: { x: 0, y: 0 },
      }],
      trigger: { type: 'ON_CLICK' },
    }];
  }
  calFrame.findAll(n => n.name === 'CloseBtn').forEach(n => {
    try { n.reactions = [{ actions: [{ type: 'BACK', navigation: 'BACK' }], trigger: { type: 'ON_CLICK' } }]; } catch (_) {}
  });
}

// -----------------------------------------------------------
//  PROTOTYPE � Leads
// -----------------------------------------------------------
function wireLeadsPrototype(leadsFrame, btnNewLead, modalNL) {
  if (btnNewLead && modalNL) {
    btnNewLead.reactions = [{
      actions: [{
        type: 'NODE',
        destinationId: modalNL.id,
        navigation: 'OVERLAY',
        transition: { type: 'DISSOLVE', duration: 0.2, easing: { type: 'EASE_OUT' } },
        preserveScrollPosition: false,
        overlayRelativePosition: { x: 0, y: 0 },
      }],
      trigger: { type: 'ON_CLICK' },
    }];
  }
  leadsFrame.findAll(n => n.name === 'CloseBtn').forEach(n => {
    try { n.reactions = [{ actions: [{ type: 'BACK', navigation: 'BACK' }], trigger: { type: 'ON_CLICK' } }]; } catch (_) {}
  });
}

// -----------------------------------------------------------
//  PROTOTYPE � Oportunidades
// -----------------------------------------------------------
function wireOportunidadesPrototype(opFrame, btnNewOp, modalNO) {
  if (btnNewOp && modalNO) {
    btnNewOp.reactions = [{
      actions: [{
        type: 'NODE',
        destinationId: modalNO.id,
        navigation: 'OVERLAY',
        transition: { type: 'DISSOLVE', duration: 0.2, easing: { type: 'EASE_OUT' } },
        preserveScrollPosition: false,
        overlayRelativePosition: { x: 0, y: 0 },
      }],
      trigger: { type: 'ON_CLICK' },
    }];
  }
  opFrame.findAll(n => n.name === 'CloseBtn').forEach(n => {
    try { n.reactions = [{ actions: [{ type: 'BACK', navigation: 'BACK' }], trigger: { type: 'ON_CLICK' } }]; } catch (_) {}
  });
}

// -----------------------------------------------------------
//  MODAL � Nueva Campa�a
// -----------------------------------------------------------
function buildModalNuevaCampana() {
  return buildModalOverlay('Nueva Campa�a', 560, 540, (dialog) => {
    modalHeader(dialog, '|| Nueva Campa�a', 560);

    dialog.appendChild(formRow('Nombre de la campa�a', 'Ej: Campa�a Renovaci�n Q2 2026', 20, 70, 520));
    dialog.appendChild(formRow('Tipo', 'Email', 20, 148, 160));
    dialog.appendChild(formRow('Estado inicial', 'Borrador', 190, 148, 156));
    dialog.appendChild(formRow('Fecha inicio', 'dd/mm/aaaa', 356, 148, 164));
    dialog.appendChild(formRow('P�blico objetivo', 'Todos los contactos', 20, 226, 250));
    dialog.appendChild(formRow('Responsable', 'Seleccionar�', 280, 226, 260));

    // Asunto del email
    const subLbl = txt('ASUNTO DEL EMAIL', { size: 9, color: T.textMuted, weight: 'Semi Bold' });
    subLbl.letterSpacing = { value: 4, unit: 'PERCENT' };
    subLbl.x = 20; subLbl.y = 305;
    dialog.appendChild(subLbl);

    const subBox = frame('SubBox', 520, 34, { fill: { r:0.972, g:0.980, b:0.992 }, radius: 6, stroke: T.border, strokeW: 1 });
    subBox.x = 20; subBox.y = 323;
    const subPh = txt('Escribe el asunto del correo�', { size: 12, color: T.textMuted });
    subPh.x = 10; subPh.y = 10;
    subBox.appendChild(subPh);
    dialog.appendChild(subBox);

    // Mensaje
    const msgLbl = txt('MENSAJE / CUERPO', { size: 9, color: T.textMuted, weight: 'Semi Bold' });
    msgLbl.letterSpacing = { value: 4, unit: 'PERCENT' };
    msgLbl.x = 20; msgLbl.y = 370;
    dialog.appendChild(msgLbl);

    const msgBox = frame('MsgBox', 520, 66, { fill: { r:0.972, g:0.980, b:0.992 }, radius: 6, stroke: T.border, strokeW: 1 });
    msgBox.x = 20; msgBox.y = 388;
    const msgPh = txt('Escribe el mensaje de la campa�a�', { size: 12, color: T.textMuted });
    msgPh.x = 10; msgPh.y = 10;
    msgBox.appendChild(msgPh);
    dialog.appendChild(msgBox);

    modalFooter(dialog, 560, 540, 'Crear Campa�a', 'Cancelar');
  });
}

// -----------------------------------------------------------
//  MODAL � Detalle Campa�a
// -----------------------------------------------------------
function buildModalDetalleCampana() {
  return buildModalOverlay('Detalle Campa�a', 580, 560, (dialog) => {
    modalHeader(dialog, '|| Campa�a Renovaci�n Q1 2026', 580);

    // Header row
    const campIcoBg = frame('CampIco', 40, 40, { fill: { r: 0.859, g: 0.914, b: 0.996 }, radius: 8 });
    campIcoBg.x = 20; campIcoBg.y = 70;
    const campIcoT = txt('||', { size: 18 }); campIcoT.x = 8; campIcoT.y = 6;
    campIcoBg.appendChild(campIcoT);
    dialog.appendChild(campIcoBg);

    const campNameT = txt('Campa�a Renovaci�n Q1 2026', { size: 15, color: T.text, weight: 'Bold' });
    campNameT.x = 72; campNameT.y = 74;
    dialog.appendChild(campNameT);

    const campTypB = badge('Email', 'blue');
    campTypB.x = 72; campTypB.y = 96;
    dialog.appendChild(campTypB);
    const campStB = badge('Activa', 'green');
    campStB.x = 72 + 58; campStB.y = 96;
    dialog.appendChild(campStB);

    const div1 = rect(540, 1, T.border); div1.x = 20; div1.y = 126;
    dialog.appendChild(div1);

    // Stats 4-box grid
    const cStats = [
      { label:'Enviados',   val:'3,200',  color:T.primaryLight, bg:{ r:0.859,g:0.914,b:0.996 } },
      { label:'Leads',      val:'198',    color:T.success,      bg:{ r:0.859,g:0.988,b:0.902 } },
      { label:'Ingresos',   val:'$2,400', color:T.accent,       bg:{ r:0.996,g:0.976,b:0.761 } },
      { label:'Apertura',   val:'47%',    color:T.warning,      bg:{ r:1,g:0.933,b:0.824 }     },
    ];
    const csW = 124;
    for (let i = 0; i < cStats.length; i++) {
      const csx = 20 + i * (csW + 6);
      const csCell = frame('CS' + i, csW, 58, { fill: cStats[i].bg, radius: 8 });
      csCell.x = csx; csCell.y = 136;
      const csLbl = txt(cStats[i].label, { size: 9, color: T.textMuted });
      csLbl.x = 8; csLbl.y = 6;
      csCell.appendChild(csLbl);
      const csVal = txt(cStats[i].val, { size: 16, color: cStats[i].color, weight: 'Bold' });
      csVal.x = 8; csVal.y = 24;
      csCell.appendChild(csVal);
      dialog.appendChild(csCell);
    }

    const div2 = rect(540, 1, T.border); div2.x = 20; div2.y = 208;
    dialog.appendChild(div2);

    // Progress rings row (apertura / clics / conversi�n)
    const ringsTitle = txt('M�tricas de rendimiento', { size: 12, color: T.text, weight: 'Semi Bold' });
    ringsTitle.x = 20; ringsTitle.y = 220;
    dialog.appendChild(ringsTitle);

    const rings = [
      { label:'Apertura',    pct:47,  pctLabel:'47%', color:T.primaryLight },
      { label:'Clics',       pct:18,  pctLabel:'18%', color:T.accent       },
      { label:'Conversi�n',  pct:6,   pctLabel:'6.2%',color:T.success      },
    ];
    for (let i = 0; i < rings.length; i++) {
      const rx = 20 + i * 180;
      const ringBg = frame('Ring' + i, 160, 72, { fill: { r:0.973,g:0.980,b:0.988 }, radius: 8 });
      ringBg.x = rx; ringBg.y = 240;

      // Circular arc placeholder
      const arcBg = frame('ArcBg', 48, 48, { fill: { r:0.925,g:0.945,b:0.965 }, radius: 24 });
      arcBg.x = 8; arcBg.y = 12;
      const arcPct = txt(rings[i].pctLabel, { size: 11, color: rings[i].color, weight: 'Bold' });
      arcPct.x = (48 - arcPct.width) / 2; arcPct.y = (48 - arcPct.height) / 2;
      arcBg.appendChild(arcPct);
      ringBg.appendChild(arcBg);

      const ringLbl = txt(rings[i].label, { size: 11, color: T.text, weight: 'Semi Bold' });
      ringLbl.x = 64; ringLbl.y = 18;
      ringBg.appendChild(ringLbl);

      const progBg2 = frame('PBar2', 80, 8, { fill: { r:0.882,g:0.906,b:0.933 }, radius: 4 });
      progBg2.x = 64; progBg2.y = 38;
      const progFg2 = frame('PFg2', Math.round(80 * (rings[i].pct / 100)), 8, { fill: rings[i].color, radius: 4 });
      progFg2.x = 0; progFg2.y = 0;
      progBg2.appendChild(progFg2);
      ringBg.appendChild(progBg2);

      dialog.appendChild(ringBg);
    }

    const div3 = rect(540, 1, T.border); div3.x = 20; div3.y = 328;
    dialog.appendChild(div3);

    // Meta
    const metaItems = [
      { l:'Responsable:',  v:'Ra�l P�rez'    },
      { l:'Fecha inicio:',  v:'1 Mar 2026'   },
      { l:'Segmento:',     v:'Todos'         },
      { l:'Tipo:',         v:'Email'         },
    ];
    for (let i = 0; i < metaItems.length; i++) {
      const mx = 20 + (i % 2) * 280;
      const my = 340 + Math.floor(i / 2) * 22;
      const mL = txt(metaItems[i].l, { size: 11, color: T.textMuted, weight: 'Semi Bold' });
      mL.x = mx; mL.y = my;
      dialog.appendChild(mL);
      const mV = txt(metaItems[i].v, { size: 11, color: T.text });
      mV.x = mx + 110; mV.y = my;
      dialog.appendChild(mV);
    }

    const ftrLC = rect(580, 1, T.border); ftrLC.x = 0; ftrLC.y = 506;
    dialog.appendChild(ftrLC);

    const btnCl = button('Cerrar', 'ghost');
    btnCl.name = 'CloseBtn';
    btnCl.x = 20; btnCl.y = 518;
    dialog.appendChild(btnCl);

    const btnActivar = button('? Activar campa�a', 'primary');
    btnActivar.x = 406; btnActivar.y = 518;
    dialog.appendChild(btnActivar);
  });
}

// -----------------------------------------------------------
//  PANTALLA � Campa�as
// -----------------------------------------------------------
async function buildCampanasPage() {
  const PAGE_W = 1440;
  const PAGE_H = 900;
  const CX     = 260;
  const CW     = PAGE_W - CX;
  const padX   = 32;
  const cY     = 64;

  const mf = frame('|| Campa�as', PAGE_W, PAGE_H, { fill: T.bg });
  mf.clipsContent = true;

  const sb = buildSidebar('Campa�as');
  sb.x = 0; sb.y = 0;
  mf.appendChild(sb);

  const hdr = buildHeader('Campa�as');
  hdr.x = CX; hdr.y = 0;
  mf.appendChild(hdr);

  const pgTC = txt('Campa�as', { size: 22, color: T.text, weight: 'Bold' });
  pgTC.x = CX + padX; pgTC.y = cY + 22;
  mf.appendChild(pgTC);

  const pgSC = txt('6 campa�as � 3 activas', { size: 12, color: T.textMuted });
  pgSC.x = CX + padX; pgSC.y = cY + 50;
  mf.appendChild(pgSC);

  const btnAnalytics = button('|| Anal�ticas', 'secondary');
  btnAnalytics.x = CX + CW - 268; btnAnalytics.y = cY + 26;
  mf.appendChild(btnAnalytics);

  const btnNewCamp = button('+ Nueva campa�a', 'primary');
  btnNewCamp.name = 'Btn / Nueva Campa�a ? Modal Nueva Campa�a';
  btnNewCamp.x = CX + CW - 156; btnNewCamp.y = cY + 26;
  mf.appendChild(btnNewCamp);

  // KPIs
  const kpisC = [
    { label:'Campa�as activas', value:'3',      color:T.primaryLight, ibg:{r:0.859,g:0.941,b:0.996}, icon:'||', change:'? 1 vs sem. ant', up:true  },
    { label:'Total enviados',   value:'24,050', color:T.purple,       ibg:{r:0.925,g:0.882,b:0.996}, icon:'||', change:'este mes',         up:true  },
    { label:'Tasa apertura',    value:'43.6%',  color:T.accent,       ibg:{r:0.996,g:0.976,b:0.761}, icon:'||', change:'? 2.1% promedio',  up:true  },
    { label:'Leads generados',  value:'834',    color:T.success,      ibg:{r:0.859,g:0.988,b:0.902}, icon:'||', change:'? 18%',            up:true  },
  ];
  const kWC   = 268;
  const kpiYC = cY + 70;
  for (let i = 0; i < kpisC.length; i++) {
    const k = kpisC[i];
    const c = kpiCard(k.label, k.value, k.change, k.up, k.icon, k.color, k.ibg, kWC);
    c.x = CX + padX + i * (kWC + 12); c.y = kpiYC;
    mf.appendChild(c);
  }

  // Tabs + type filter toolbar
  const toolbarYC = kpiYC + 116;
  const tabsC = ['Todas','Activas','Enviadas','Pausadas','Borradores'];
  const tabWC  = [52, 56, 62, 62, 76];
  let tabXC = CX + padX;
  for (let i = 0; i < tabsC.length; i++) {
    const tw = tabWC[i];
    const tabBtnC = frame('Tab ' + tabsC[i], tw, 30, {
      fill: i === 0 ? T.primary : T.surface,
      radius: 6,
      stroke: i === 0 ? null : T.border, strokeW: 1,
    });
    tabBtnC.x = tabXC; tabBtnC.y = toolbarYC;
    const tabTtC = txt(tabsC[i], { size: 11, color: i === 0 ? T.white : T.textMuted, weight: i === 0 ? 'Semi Bold' : 'Medium' });
    tabTtC.x = (tw - tabTtC.width) / 2; tabTtC.y = (30 - tabTtC.height) / 2;
    tabBtnC.appendChild(tabTtC);
    mf.appendChild(tabBtnC);
    tabXC += tw + 6;
  }

  const typeFilter = frame('TypeFilter', 148, 30, { fill: T.surface, radius: 6, stroke: T.border, strokeW: 1 });
  typeFilter.x = CX + CW - padX - 148; typeFilter.y = toolbarYC;
  const typeT = txt('Todos los tipos ?', { size: 11, color: T.textMuted }); typeT.x = 10; typeT.y = 8;
  typeFilter.appendChild(typeT);
  mf.appendChild(typeFilter);

  // Campaign cards grid (3 cols � 2 rows)
  const cardGridY = toolbarYC + 46;
  const cardW     = Math.floor((CW - padX * 2 - 24) / 3);
  const cardH     = 222;

  const campaignsData = [
    { ico:'||', name:'Campa�a Renovaci�n Q1 2026', type:'Email',    type_c:'blue',   status:'Activa',   sc:'green',  sent:3200,  open:47, click:18, conv:6.2, leads:198, ing:'$2,400', owner:'RP', date:'1 Mar 2026'  },
    { ico:'||', name:'Promo Software CRM Pro',      type:'WhatsApp', type_c:'green',  status:'Activa',   sc:'green',  sent:850,   open:71, click:32, conv:9.4, leads:80,  ing:'$1,100', owner:'JM', date:'5 Mar 2026'  },
    { ico:'||', name:'Retargeting Enterprise',      type:'Display',  type_c:'purple', status:'Pausada',  sc:'yellow', sent:12500, open:8,  click:3,  conv:1.8, leads:225, ing:'$4,800', owner:'CG', date:'15 Feb 2026' },
    { ico:'||', name:'Newsletter Marzo',            type:'Email',    type_c:'blue',   status:'Enviada',  sc:'blue',   sent:5400,  open:38, click:12, conv:3.1, leads:167, ing:'$0',     owner:'RP', date:'10 Mar 2026' },
    { ico:'||', name:'LinkedIn B2B Reach',         type:'LinkedIn', type_c:'navy',   status:'Activa',   sc:'green',  sent:2100,  open:54, click:21, conv:7.8, leads:164, ing:'$3,200', owner:'JM', date:'8 Mar 2026'  },
    { ico:'||', name:'Seguimiento Demos',          type:'Email',    type_c:'blue',   status:'Borrador', sc:'gray',   sent:0,     open:0,  click:0,  conv:0,   leads:0,   ing:'$0',     owner:'CG', date:'�'            },
  ];

  for (let i = 0; i < campaignsData.length; i++) {
    const c  = campaignsData[i];
    const cx = CX + padX + (i % 3) * (cardW + 12);
    const cy = cardGridY + Math.floor(i / 3) * (cardH + 14);

    const card = frame('Card camp ' + i, cardW, cardH, { fill: T.surface, radius: 12, stroke: T.border, strokeW: 1 });
    card.x = cx; card.y = cy;

    // Top section
    const cardTopLine = rect(cardW, 1, T.border2); cardTopLine.x = 0; cardTopLine.y = 68;
    card.appendChild(cardTopLine);

    // Icon
    const icoBg = frame('IcoC', 36, 36, { fill: { r:0.859,g:0.914,b:0.996 }, radius: 8 });
    icoBg.x = 14; icoBg.y = 16;
    const icoT = txt(c.ico, { size: 16 }); icoT.x = 8; icoT.y = 6;
    icoBg.appendChild(icoT);
    card.appendChild(icoBg);

    const cname = txt(c.name.length > 30 ? c.name.slice(0, 28) + '�' : c.name, { size: 12, color: T.text, weight: 'Bold' });
    cname.x = 58; cname.y = 16;
    card.appendChild(cname);

    const ctypB = badge(c.type, c.type_c);
    ctypB.x = 58; ctypB.y = 36;
    card.appendChild(ctypB);
    const cstB = badge(c.status, c.sc);
    cstB.x = 58 + 58; cstB.y = 36;
    card.appendChild(cstB);

    // 2�2 stats grid
    const stats2x2 = [
      { l:'Enviados', v: c.sent > 0 ? c.sent.toLocaleString() : '�' },
      { l:'Leads',    v: c.leads > 0 ? String(c.leads) : '�'        },
      { l:'Ingresos', v: c.ing                                        },
      { l:'Fecha',    v: c.date                                       },
    ];
    for (let s = 0; s < 4; s++) {
      const sx = 14 + (s % 2) * (Math.floor(cardW / 2) - 2);
      const sy = 80 + Math.floor(s / 2) * 34;
      const sLbl = txt(stats2x2[s].l.toUpperCase(), { size: 8, color: T.textMuted });
      sLbl.letterSpacing = { value: 4, unit: 'PERCENT' };
      sLbl.x = sx; sLbl.y = sy;
      card.appendChild(sLbl);
      const sVal = txt(stats2x2[s].v, { size: 13, color: T.text, weight: 'Bold' });
      sVal.x = sx; sVal.y = sy + 12;
      card.appendChild(sVal);
    }

    const midLine = rect(cardW, 1, T.border2); midLine.x = 0; midLine.y = 154;
    card.appendChild(midLine);

    // Progress rings row (apertura / clics / conversi�n)
    const ringsData = [
      { l:'Apertura',   v:c.open,  vc:c.open + '%', col:T.primaryLight },
      { l:'Clics',      v:c.click, vc:c.click + '%', col:T.accent      },
      { l:'Conversi�n', v:c.conv,  vc:c.conv + '%',  col:T.success     },
    ];
    const ringSize = Math.floor((cardW - 44) / 3);
    for (let r = 0; r < 3; r++) {
      const rd = ringsData[r];
      const rx = 14 + r * ringSize;
      // Circle bg
      const cBg = frame('RBg' + r, 36, 36, { fill: { r:0.918,g:0.937,b:0.957 }, radius: 18 });
      cBg.x = rx + Math.floor((ringSize - 36) / 2); cBg.y = 162;
      const cPct = txt(rd.vc, { size: rd.v >= 10 ? 9 : 10, color: rd.col, weight: 'Bold' });
      cPct.x = (36 - cPct.width) / 2; cPct.y = (36 - cPct.height) / 2;
      cBg.appendChild(cPct);
      card.appendChild(cBg);

      const rLbl = txt(rd.l, { size: 9, color: T.textMuted });
      rLbl.x = rx + Math.floor((ringSize - rLbl.width) / 2); rLbl.y = 200;
      card.appendChild(rLbl);
    }

    // Owner avatar
    const owBg = frame('OwC', 26, 26, { fill: T.primary, radius: 13 });
    owBg.x = cardW - 42; owBg.y = 167;
    const owT = txt(c.owner, { size: 8, color: T.white, weight: 'Bold' });
    owT.x = (26 - owT.width) / 2; owT.y = (26 - owT.height) / 2;
    owBg.appendChild(owT);
    card.appendChild(owBg);

    mf.appendChild(card);
  }

  // -- MODALES ---------------------------------------------
  const modalNC = buildModalNuevaCampana();
  modalNC.x = 1500; modalNC.y = 900 + 100;
  mf.appendChild(modalNC);

  const modalDC = buildModalDetalleCampana();
  modalDC.x = 2200; modalDC.y = 900 + 100;
  mf.appendChild(modalDC);

  return { frame: mf, modalNC, modalDC, btnNewCamp };
}

// -----------------------------------------------------------
//  MODAL � Nuevo Ticket
// -----------------------------------------------------------
function buildModalNuevoTicket() {
  return buildModalOverlay('Nuevo Ticket', 540, 500, (dialog) => {
    modalHeader(dialog, '|| Nuevo Ticket de Soporte', 540);

    dialog.appendChild(formRow('Asunto del problema', 'Describe el problema brevemente�', 20, 70, 500));
    dialog.appendChild(formRow('Cliente', 'Buscar cliente�', 20, 148, 240));
    dialog.appendChild(formRow('Contacto', 'Seleccionar contacto�', 270, 148, 250));
    dialog.appendChild(formRow('Prioridad', 'Media', 20, 226, 160));
    dialog.appendChild(formRow('Agente asignado', 'Seleccionar�', 190, 226, 160));
    dialog.appendChild(formRow('Canal', 'Email', 360, 226, 160));

    const descLbl = txt('DESCRIPCI�N DETALLADA', { size: 9, color: T.textMuted, weight: 'Semi Bold' });
    descLbl.letterSpacing = { value: 4, unit: 'PERCENT' };
    descLbl.x = 20; descLbl.y = 305;
    dialog.appendChild(descLbl);

    const descBox = frame('DescBox', 500, 82, { fill: { r:0.972, g:0.980, b:0.992 }, radius: 6, stroke: T.border, strokeW: 1 });
    descBox.x = 20; descBox.y = 323;
    const descPh = txt('Describe el problema con detalle, incluyendo pasos para reproducirlo�', { size: 12, color: T.textMuted });
    descPh.x = 10; descPh.y = 10;
    descBox.appendChild(descPh);
    dialog.appendChild(descBox);

    modalFooter(dialog, 540, 500, 'Crear Ticket', 'Cancelar');
  });
}

// -----------------------------------------------------------
//  MODAL � Detalle Ticket
// -----------------------------------------------------------
function buildModalDetalleTicket() {
  return buildModalOverlay('Detalle Ticket', 600, 580, (dialog) => {
    modalHeader(dialog, '|| TKT-2026-412', 600);

    // Subject + priority
    const tkSubT = txt('Error al exportar reportes PDF', { size: 15, color: T.text, weight: 'Bold' });
    tkSubT.x = 20; tkSubT.y = 72;
    dialog.appendChild(tkSubT);

    const tkPriB = badge('Cr�tica', 'purple');
    tkPriB.x = 20; tkPriB.y = 96;
    dialog.appendChild(tkPriB);
    const tkStB = badge('Abierto', 'red');
    tkStB.x = 20 + 64; tkStB.y = 96;
    dialog.appendChild(tkStB);

    const tkTimeT = txt('? Abierto hace 2h', { size: 11, color: T.textMuted });
    tkTimeT.x = 20 + 64 + 58; tkTimeT.y = 98;
    dialog.appendChild(tkTimeT);

    const div1 = rect(560, 1, T.border); div1.x = 20; div1.y = 122;
    dialog.appendChild(div1);

    // Meta info
    const tkMeta = [
      { l:'Cliente:',        v:'Alpha Corp'         },
      { l:'Contacto:',       v:'Laura Jim�nez'      },
      { l:'Agente:',         v:'Juan Mart�nez'      },
      { l:'Creado:',         v:'Hoy, 09:15'         },
    ];
    for (let i = 0; i < tkMeta.length; i++) {
      const mx = 20 + (i % 2) * 290;
      const my = 134 + Math.floor(i / 2) * 22;
      const tkL = txt(tkMeta[i].l, { size: 11, color: T.textMuted, weight: 'Semi Bold' }); tkL.x = mx; tkL.y = my;
      dialog.appendChild(tkL);
      const tkV = txt(tkMeta[i].v, { size: 11, color: T.text }); tkV.x = mx + 100; tkV.y = my;
      dialog.appendChild(tkV);
    }

    const div2 = rect(560, 1, T.border); div2.x = 20; div2.y = 186;
    dialog.appendChild(div2);

    // Description
    const descHdr = txt('Descripci�n', { size: 12, color: T.text, weight: 'Semi Bold' });
    descHdr.x = 20; descHdr.y = 200;
    dialog.appendChild(descHdr);

    const descBox2 = frame('DescB', 560, 68, { fill: { r:0.973,g:0.980,b:0.988 }, radius: 6 });
    descBox2.x = 20; descBox2.y = 218;
    const descT2 = txt('Al hacer clic en "Exportar PDF" desde la secci�n de Reportes,\nel sistema muestra un spinner indefinido y no genera el archivo.\nReproducible en Chrome y Firefox con todos los tipos de reporte.', { size: 11, color: T.textMuted });
    descT2.x = 10; descT2.y = 8;
    descBox2.appendChild(descT2);
    dialog.appendChild(descBox2);

    const div3 = rect(560, 1, T.border); div3.x = 20; div3.y = 298;
    dialog.appendChild(div3);

    // Activity / conversation thread
    const convHdr = txt('Conversaci�n', { size: 12, color: T.text, weight: 'Semi Bold' });
    convHdr.x = 20; convHdr.y = 312;
    dialog.appendChild(convHdr);

    const msgs = [
      { who:'Laura J.',   init:'LJ', color:T.success, time:'09:15', msg:'Hola, ning�n PDF se genera. Pruebo en distintos navegadores y el mismo error.',  side:'left'  },
      { who:'Juan M.',    init:'JM', color:T.primary,  time:'09:28', msg:'Gracias por reportarlo. Revisando el servicio de exportaci�n ahora mismo.',        side:'right' },
      { who:'Sistema',    init:'?', color:T.textMuted, time:'09:30', msg:'Ticket escalado a prioridad Cr�tica autom�ticamente (tiempo >30min sin respuesta).', side:'left' },
    ];

    let msgY = 330;
    for (const m of msgs) {
      const isRight = m.side === 'right';
      const avBg = frame('Av' + m.init, 26, 26, { fill: m.color, radius: 13 });
      avBg.x = isRight ? 20 + 536 : 20;
      avBg.y = msgY;
      const avT = txt(m.init, { size: m.init.length === 1 ? 12 : 7, color: T.white, weight: 'Bold' });
      avT.x = (26 - avT.width) / 2; avT.y = (26 - avT.height) / 2;
      avBg.appendChild(avT);
      dialog.appendChild(avBg);

      const msgBg = frame('Msg ' + m.who, 460, 44, { fill: isRight ? { r:0.859,g:0.914,b:0.996 } : { r:0.973,g:0.980,b:0.988 }, radius: 8 });
      msgBg.x = isRight ? 20 + 36 : 20 + 30;
      msgBg.y = msgY;
      const msgWho = txt(m.who + '  ' + m.time, { size: 9, color: T.textMuted });
      msgWho.x = 8; msgWho.y = 4;
      msgBg.appendChild(msgWho);
      const msgT = txt(m.msg.length > 72 ? m.msg.slice(0, 70) + '�' : m.msg, { size: 11, color: T.text });
      msgT.x = 8; msgT.y = 18;
      msgBg.appendChild(msgT);
      dialog.appendChild(msgBg);

      msgY += 56;
    }

    // Reply box
    const replyBox = frame('ReplyBox', 560, 34, { fill: { r:0.972,g:0.980,b:0.992 }, radius: 6, stroke: T.border, strokeW: 1 });
    replyBox.x = 20; replyBox.y = msgY + 4;
    const replyPh = txt('Escribe una respuesta�', { size: 11, color: T.textMuted });
    replyPh.x = 10; replyPh.y = 10;
    replyBox.appendChild(replyPh);
    dialog.appendChild(replyBox);

    const ftrLTk = rect(600, 1, T.border); ftrLTk.x = 0; ftrLTk.y = 528;
    dialog.appendChild(ftrLTk);

    const btnClTk = button('Cerrar', 'ghost');
    btnClTk.name = 'CloseBtn';
    btnClTk.x = 20; btnClTk.y = 540;
    dialog.appendChild(btnClTk);

    const btnRes = button('? Marcar resuelto', 'secondary');
    btnRes.x = 288; btnRes.y = 540;
    dialog.appendChild(btnRes);

    const btnReply = button('|| Responder', 'primary');
    btnReply.x = 460; btnReply.y = 540;
    dialog.appendChild(btnReply);
  });
}

// -----------------------------------------------------------
//  PANTALLA � Tickets
// -----------------------------------------------------------
async function buildTicketsPage() {
  const PAGE_W = 1440;
  const PAGE_H = 900;
  const CX     = 260;
  const CW     = PAGE_W - CX;
  const padX   = 32;
  const cY     = 64;

  const mf = frame('|| Tickets', PAGE_W, PAGE_H, { fill: T.bg });
  mf.clipsContent = true;

  const sb = buildSidebar('Tickets');
  sb.x = 0; sb.y = 0;
  mf.appendChild(sb);

  const hdr = buildHeader('Tickets de Soporte');
  hdr.x = CX; hdr.y = 0;
  mf.appendChild(hdr);

  const pgTTk = txt('Soporte � Tickets', { size: 22, color: T.text, weight: 'Bold' });
  pgTTk.x = CX + padX; pgTTk.y = cY + 22;
  mf.appendChild(pgTTk);

  const pgSTk = txt('8 tickets activos � ', { size: 12, color: T.textMuted });
  pgSTk.x = CX + padX; pgSTk.y = cY + 50;
  mf.appendChild(pgSTk);
  const criticoSpan = txt('1 cr�tico', { size: 12, color: T.danger, weight: 'Semi Bold' });
  criticoSpan.x = CX + padX + pgSTk.width; criticoSpan.y = cY + 50;
  mf.appendChild(criticoSpan);

  // Buttons
  const btnExpTk = button('|| Exportar', 'secondary');
  btnExpTk.x = CX + CW - 248; btnExpTk.y = cY + 26;
  mf.appendChild(btnExpTk);

  const btnNewTk = button('+ Nuevo ticket', 'primary');
  btnNewTk.name = 'Btn / Nuevo Ticket ? Modal Nuevo Ticket';
  btnNewTk.x = CX + CW - 140; btnNewTk.y = cY + 26;
  mf.appendChild(btnNewTk);

  // KPIs
  const kpisTk = [
    { label:'Tickets abiertos', value:'8',    color:T.danger,  ibg:{r:0.996,g:0.886,b:0.886}, icon:'||', change:'? 2 vs ayer',   up:false },
    { label:'En proceso',       value:'2',    color:T.warning, ibg:{r:1,g:0.933,b:0.824},     icon:'||', change:'asignados',      up:true  },
    { label:'Resueltos hoy',    value:'3',    color:T.success, ibg:{r:0.859,g:0.988,b:0.902}, icon:'?', change:'? buen d�a',     up:true  },
    { label:'Tiempo promedio',  value:'4.2h', color:T.primaryLight, ibg:{r:0.859,g:0.941,b:0.996}, icon:'?', change:'? 0.8h mejor', up:true },
  ];
  const kWTk   = 268;
  const kpiYTk = cY + 70;
  for (let i = 0; i < kpisTk.length; i++) {
    const k = kpisTk[i];
    const c = kpiCard(k.label, k.value, k.change, k.up, k.icon, k.color, k.ibg, kWTk);
    c.x = CX + padX + i * (kWTk + 12); c.y = kpiYTk;
    mf.appendChild(c);
  }

  // SLA Card
  const slaY = kpiYTk + 116;
  const slaCard = frame('Card / SLA', CW - padX * 2, 92, { fill: T.surface, radius: 10, stroke: T.border, strokeW: 1 });
  slaCard.x = CX + padX; slaCard.y = slaY;

  const slaTitleT = txt('Cumplimiento SLA', { size: 13, color: T.text, weight: 'Semi Bold' });
  slaTitleT.x = 16; slaTitleT.y = 14;
  slaCard.appendChild(slaTitleT);

  const slaMetaT = txt('Meta: 95%', { size: 11, color: T.textMuted });
  slaMetaT.x = (CW - padX * 2) - 70; slaMetaT.y = 16;
  slaCard.appendChild(slaMetaT);

  const slaMetrics = [
    { l:'Respuesta inicial (<1h)', v:88, col:T.primaryLight },
    { l:'Resoluci�n (<24h)',       v:76, col:T.accent       },
    { l:'Satisfacci�n cliente',    v:94, col:T.success      },
  ];
  const slaColW = Math.floor((CW - padX * 2 - 48) / 3);
  for (let i = 0; i < slaMetrics.length; i++) {
    const sm = slaMetrics[i];
    const sx = 16 + i * (slaColW + 8);
    const slaMT = txt(sm.l, { size: 11, color: T.textMuted });
    slaMT.x = sx; slaMT.y = 42;
    slaCard.appendChild(slaMT);

    const slaPct = txt(sm.v + '%', { size: 13, color: sm.col, weight: 'Bold' });
    slaPct.x = sx + slaColW - slaPct.width - 4; slaPct.y = 40;
    slaCard.appendChild(slaPct);

    const slaBarBg = frame('SLABarBg', slaColW, 8, { fill: { r:0.882,g:0.906,b:0.933 }, radius: 4 });
    slaBarBg.x = sx; slaBarBg.y = 62;
    const slaBarFg = frame('SLABarFg', Math.round(slaColW * sm.v / 100), 8, { fill: sm.col, radius: 4 });
    slaBarFg.x = 0; slaBarFg.y = 0;
    slaBarBg.appendChild(slaBarFg);
    slaCard.appendChild(slaBarBg);
  }
  mf.appendChild(slaCard);

  // Table card
  const tableYTk = slaY + 108;
  const tableWTk = CW - padX * 2;
  const tableCardTk = frame('Card / Tabla Tickets', tableWTk, 450, { fill: T.surface, radius: 10, stroke: T.border, strokeW: 1 });
  tableCardTk.x = CX + padX; tableCardTk.y = tableYTk;

  // Tabs + agent filter
  const tabBgTk = frame('TabBarTk', tableWTk, 46, { fill: T.surface });
  tabBgTk.x = 0; tabBgTk.y = 0;

  const tkTabs = ['Todos','Abiertos','En proceso','Resueltos'];
  const tkTabW  = [52, 62, 78, 70];
  let tktabX = 12;
  for (let i = 0; i < tkTabs.length; i++) {
    const tw = tkTabW[i];
    const tabBtnTk = frame('Tab ' + tkTabs[i], tw, 28, {
      fill: i === 0 ? T.primary : T.surface,
      radius: 6,
      stroke: i === 0 ? null : T.border, strokeW: 1,
    });
    tabBtnTk.x = tktabX; tabBtnTk.y = 9;
    const tabTtTk = txt(tkTabs[i], { size: 11, color: i === 0 ? T.white : T.textMuted, weight: i === 0 ? 'Semi Bold' : 'Medium' });
    tabTtTk.x = (tw - tabTtTk.width) / 2; tabTtTk.y = (28 - tabTtTk.height) / 2;
    tabBtnTk.appendChild(tabTtTk);
    tabBgTk.appendChild(tabBtnTk);
    tktabX += tw + 6;
  }

  const agentFilter = frame('AgentFilter', 140, 28, { fill: { r:0.972,g:0.980,b:0.992 }, radius: 6, stroke: T.border, strokeW: 1 });
  agentFilter.x = tableWTk - 156; agentFilter.y = 9;
  const agentT = txt('Todos los agentes ?', { size: 11, color: T.textMuted }); agentT.x = 8; agentT.y = 8;
  agentFilter.appendChild(agentT);
  tabBgTk.appendChild(agentFilter);

  const tabLineTk = rect(tableWTk, 1, T.border); tabLineTk.x = 0; tabLineTk.y = 45;
  tabBgTk.appendChild(tabLineTk);
  tableCardTk.appendChild(tabBgTk);

  // Column headers
  const tkCols = [
    { label:'ID',              x:12  },
    { label:'Asunto',          x:128 },
    { label:'Cliente',         x:390 },
    { label:'Prioridad',       x:530 },
    { label:'Estado',          x:614 },
    { label:'Agente',          x:686 },
    { label:'Tiempo abierto',  x:724 },
    { label:'Creado',          x:826 },
    { label:'',                x:886 },
  ];
  tableHeader(tableCardTk, tkCols, 46, tableWTk);

  const ticketsData = [
    { id:'TKT-2026-412', subject:'Error al exportar reportes PDF',          contact:'Laura J.',   client:'Alpha Corp',  prior:'Cr�tica',   pc:'purple', estado:'Abierto',    ec:'red',    agent:'JM', tiempo:'2h',  created:'Hoy'      },
    { id:'TKT-2026-411', subject:'Integraci�n API falla espor�dicamente',   contact:'Carlos R.',  client:'Tecno S.A.',  prior:'Alta',      pc:'red',    estado:'En proceso', ec:'orange', agent:'RP', tiempo:'8h',  created:'Hoy'      },
    { id:'TKT-2026-410', subject:'No carga dashboard en Safari',            contact:'Pedro V.',   client:'Global Corp', prior:'Media',     pc:'yellow', estado:'Abierto',    ec:'orange', agent:'CG', tiempo:'1d',  created:'Ayer'     },
    { id:'TKT-2026-409', subject:'Configurar permisos por rol',             contact:'Mar�a F.',   client:'DataPoint',   prior:'Baja',      pc:'green',  estado:'Abierto',    ec:'blue',   agent:'JM', tiempo:'2d',  created:'Ayer'     },
    { id:'TKT-2026-408', subject:'Importaci�n CSV duplica registros',       contact:'Sof�a M.',   client:'NetSol',      prior:'Alta',      pc:'red',    estado:'En proceso', ec:'orange', agent:'RP', tiempo:'3d',  created:'Hace 3d'  },
    { id:'TKT-2026-407', subject:'Notificaciones email no llegan',          contact:'Luis T.',    client:'MegaTrade',   prior:'Media',     pc:'yellow', estado:'Abierto',    ec:'orange', agent:'CG', tiempo:'4d',  created:'Hace 4d'  },
    { id:'TKT-2026-406', subject:'Campo personalizado no se guarda',        contact:'Roberto G.', client:'TechPlus',    prior:'Baja',      pc:'green',  estado:'Resuelto',   ec:'green',  agent:'JM', tiempo:'5d',  created:'Hace 5d'  },
    { id:'TKT-2026-405', subject:'Reporte de ventas incorrecto',            contact:'Ana L.',     client:'Innova LLC',  prior:'Alta',      pc:'red',    estado:'Resuelto',   ec:'green',  agent:'RP', tiempo:'6d',  created:'Hace 6d'  },
  ];

  let rowYTk = 78;
  for (const t of ticketsData) {
    const isCritica = t.prior === 'Cr�tica';
    const rowFillTk = isCritica ? { r:1, g:0.957, b:0.957 } : T.surface;
    const rowBgTk = frame('Row ' + t.id, tableWTk, 44, { fill: rowFillTk });
    rowBgTk.x = 0; rowBgTk.y = rowYTk;

    const tkIdT = txt(t.id, { size: 10, color: T.primaryLight, weight: 'Semi Bold' });
    tkIdT.name = 'RowLink / ' + t.id;
    tkIdT.x = tkCols[0].x; tkIdT.y = 10;
    rowBgTk.appendChild(tkIdT);

    const tkSubT2 = txt(t.subject.length > 30 ? t.subject.slice(0, 28) + '�' : t.subject, { size: 12, color: T.text, weight: 'Semi Bold' });
    tkSubT2.x = tkCols[1].x; tkSubT2.y = 8;
    rowBgTk.appendChild(tkSubT2);
    const tkConT = txt(t.contact, { size: 10, color: T.textMuted });
    tkConT.x = tkCols[1].x; tkConT.y = 26;
    rowBgTk.appendChild(tkConT);

    const tkClAv = frame('TkClAv', 26, 26, { fill: T.primary, radius: 13 });
    tkClAv.x = tkCols[2].x; tkClAv.y = 9;
    const tkClAvT = txt(t.client.slice(0, 2), { size: 7, color: T.white, weight: 'Bold' });
    tkClAvT.x = (26 - tkClAvT.width) / 2; tkClAvT.y = (26 - tkClAvT.height) / 2;
    tkClAv.appendChild(tkClAvT);
    rowBgTk.appendChild(tkClAv);
    const tkClT = txt(t.client, { size: 11, color: T.textMuted });
    tkClT.x = tkCols[2].x + 30; tkClT.y = 14;
    rowBgTk.appendChild(tkClT);

    // Priority dot + badge
    const prioDot = frame('PrioDot', 8, 8, { fill: t.pc === 'purple' ? T.purple : t.pc === 'red' ? T.danger : t.pc === 'yellow' ? T.warning : T.success, radius: 4 });
    prioDot.x = tkCols[3].x; prioDot.y = 18;
    rowBgTk.appendChild(prioDot);
    const prioBadge = badge(t.prior, t.pc);
    prioBadge.x = tkCols[3].x + 12; prioBadge.y = 13;
    rowBgTk.appendChild(prioBadge);

    const tkStB = badge(t.estado, t.ec);
    tkStB.x = tkCols[4].x; tkStB.y = 13;
    rowBgTk.appendChild(tkStB);

    const agBg = frame('AgBg', 26, 26, { fill: T.primary, radius: 13 });
    agBg.x = tkCols[5].x; agBg.y = 9;
    const agT = txt(t.agent, { size: 7, color: T.white, weight: 'Bold' });
    agT.x = (26 - agT.width) / 2; agT.y = (26 - agT.height) / 2;
    agBg.appendChild(agT);
    rowBgTk.appendChild(agBg);

    const tkTimeT2 = txt(t.tiempo, { size: 13, color: T.text, weight: 'Bold' });
    tkTimeT2.x = tkCols[6].x; tkTimeT2.y = 14;
    rowBgTk.appendChild(tkTimeT2);

    const tkCreT = txt(t.created, { size: 11, color: T.textMuted });
    tkCreT.x = tkCols[7].x; tkCreT.y = 14;
    rowBgTk.appendChild(tkCreT);

    const moreTTk = txt('?', { size: 14, color: T.textMuted });
    moreTTk.x = tkCols[8].x; moreTTk.y = 12;
    rowBgTk.appendChild(moreTTk);

    const rowLineTk = rect(tableWTk, 1, T.border2);
    rowLineTk.x = 0; rowLineTk.y = 43;
    rowBgTk.appendChild(rowLineTk);

    tableCardTk.appendChild(rowBgTk);
    rowYTk += 44;
  }
  mf.appendChild(tableCardTk);

  // -- MODALES ---------------------------------------------
  const modalNTk = buildModalNuevoTicket();
  modalNTk.x = 1500; modalNTk.y = 900 + 100;
  mf.appendChild(modalNTk);

  const modalDTk = buildModalDetalleTicket();
  modalDTk.x = 2200; modalDTk.y = 900 + 100;
  mf.appendChild(modalDTk);

  return { frame: mf, modalNTk, modalDTk, btnNewTk };
}

// -----------------------------------------------------------
//  MODAL � Invitar Miembro
// -----------------------------------------------------------
function buildModalInvitarMiembro() {
  return buildModalOverlay('Invitar Miembro', 520, 460, (dialog) => {
    modalHeader(dialog, '|| Invitar Miembro', 520);

    dialog.appendChild(formRow('Nombre', 'Nombre completo', 20, 70, 230));
    dialog.appendChild(formRow('Apellido', 'Apellido', 260, 70, 240));
    dialog.appendChild(formRow('Email corporativo', 'correo@empresa.com', 20, 148, 480));
    dialog.appendChild(formRow('Cargo / Rol', 'Ej: Ejecutivo de Ventas', 20, 226, 480));
    dialog.appendChild(formRow('Departamento', 'Ventas', 20, 304, 230));
    dialog.appendChild(formRow('Nivel de acceso', 'Usuario est�ndar', 260, 304, 240));

    // Permisos r�pidos
    const permLbl = txt('PERMISOS', { size: 9, color: T.textMuted, weight: 'Semi Bold' });
    permLbl.letterSpacing = { value: 4, unit: 'PERCENT' };
    permLbl.x = 20; permLbl.y = 384;
    dialog.appendChild(permLbl);

    const perms = ['Leer contactos', 'Crear leads', 'Ver reportes'];
    for (let i = 0; i < perms.length; i++) {
      const chkBg = frame('Perm' + i, 10, 10, { fill: T.primary, radius: 2 });
      chkBg.x = 20 + i * 160; chkBg.y = 400;
      dialog.appendChild(chkBg);
      const chkL = txt(perms[i], { size: 11, color: T.textMuted });
      chkL.x = 34 + i * 160; chkL.y = 397;
      dialog.appendChild(chkL);
    }

    modalFooter(dialog, 520, 460, '|| Enviar invitaci�n', 'Cancelar');
  });
}

// -----------------------------------------------------------
//  PANTALLA � Equipo
// -----------------------------------------------------------
async function buildEquipoPage() {
  const PAGE_W = 1440;
  const PAGE_H = 900;
  const CX     = 260;
  const CW     = PAGE_W - CX;
  const padX   = 32;
  const cY     = 64;

  const mf = frame('|| Equipo', PAGE_W, PAGE_H, { fill: T.bg });
  mf.clipsContent = true;

  const sb = buildSidebar('Equipo');
  sb.x = 0; sb.y = 0;
  mf.appendChild(sb);

  const hdr = buildHeader('Equipo');
  hdr.x = CX; hdr.y = 0;
  mf.appendChild(hdr);

  const pgTE = txt('Equipo', { size: 22, color: T.text, weight: 'Bold' });
  pgTE.x = CX + padX; pgTE.y = cY + 22;
  mf.appendChild(pgTE);

  const pgSE = txt('6 miembros � 4 en l�nea ahora', { size: 12, color: T.textMuted });
  pgSE.x = CX + padX; pgSE.y = cY + 50;
  mf.appendChild(pgSE);

  // Department filter
  const deptSel = frame('DeptSel', 180, 30, { fill: T.surface, radius: 6, stroke: T.border, strokeW: 1 });
  deptSel.x = CX + CW - 316; deptSel.y = cY + 29;
  const deptT = txt('Todos los departamentos ?', { size: 10, color: T.textMuted }); deptT.x = 10; deptT.y = 9;
  deptSel.appendChild(deptT);
  mf.appendChild(deptSel);

  const btnInvite = button('+ Invitar miembro', 'primary');
  btnInvite.name = 'Btn / Invitar Miembro ? Modal';
  btnInvite.x = CX + CW - 128; btnInvite.y = cY + 26;
  mf.appendChild(btnInvite);

  // KPIs
  const kpisE = [
    { label:'Miembros activos',    value:'6',     color:T.primaryLight, ibg:{r:0.859,g:0.941,b:0.996}, icon:'||', change:'en el equipo',     up:true  },
    { label:'En l�nea ahora',      value:'4',     color:T.success,      ibg:{r:0.859,g:0.988,b:0.902}, icon:'||', change:'disponibles',       up:true  },
    { label:'Tratos este mes',     value:'53',    color:T.accent,       ibg:{r:0.996,g:0.976,b:0.761}, icon:'||', change:'total equipo',      up:true  },
    { label:'Revenue del equipo',  value:'$264K', color:T.purple,       ibg:{r:0.925,g:0.882,b:0.996}, icon:'||', change:'este mes',          up:true  },
  ];
  const kWE   = 268;
  const kpiYE = cY + 70;
  for (let i = 0; i < kpisE.length; i++) {
    const k = kpisE[i];
    const c = kpiCard(k.label, k.value, k.change, k.up, k.icon, k.color, k.ibg, kWE);
    c.x = CX + padX + i * (kWE + 12); c.y = kpiYE;
    mf.appendChild(c);
  }

  // Team member cards grid: 3 columns � 2 rows
  const cardW  = Math.floor((CW - padX * 2 - 24) / 3);
  const cardH  = 240;
  const gridY  = kpiYE + 116;

  const teamData = [
    { n:'Juan Mart�nez', role:'Gerente de Ventas',      dept:'Ventas',     deptC:'blue',   status:'En l�nea',    sc:'green', init:'JM', deals:22, leads:64,  rate:'72%' },
    { n:'Roberto P�rez', role:'Ejecutivo de Ventas',    dept:'Ventas',     deptC:'blue',   status:'En l�nea',    sc:'green', init:'RP', deals:17, leads:51,  rate:'58%' },
    { n:'Carmen Garc�a', role:'Ejecutiva de Ventas',    dept:'Ventas',     deptC:'blue',   status:'Ausente',     sc:'yellow',init:'CG', deals:14, leads:43,  rate:'50%' },
    { n:'Diego Morales', role:'Especialista Marketing', dept:'Marketing',  deptC:'purple', status:'En l�nea',    sc:'green', init:'DM', deals:0,  leads:120, rate:'�'   },
    { n:'Laura S�nchez', role:'Soporte al Cliente',     dept:'Soporte',    deptC:'orange', status:'En l�nea',    sc:'green', init:'LS', deals:0,  leads:0,   rate:'94%' },
    { n:'Pablo R�os',    role:'Desarrollador CRM',      dept:'Tecnolog�a', deptC:'green',  status:'No molestar', sc:'red',   init:'PR', deals:0,  leads:0,   rate:'�'   },
  ];

  const avatarGrads = {
    JM: T.accent,
    RP: T.primaryLight,
    CG: T.purple,
    DM: T.info,
    LS: T.danger,
    PR: T.success,
  };

  for (let i = 0; i < teamData.length; i++) {
    const m  = teamData[i];
    const cx = CX + padX + (i % 3) * (cardW + 12);
    const cy = gridY + Math.floor(i / 3) * (cardH + 12);

    const card = frame('Card / ' + m.n, cardW, cardH, { fill: T.surface, radius: 12, stroke: T.border, strokeW: 1 });
    card.x = cx; card.y = cy;

    // Card header banner
    const banner = frame('Banner', cardW, 72, { fill: { r:0.055,g:0.133,b:0.251 }, radius: 0 });
    banner.x = 0; banner.y = 0;
    // top-left radius only via clip � use full rect + overlay mask workaround: just use the card's radius
    card.appendChild(banner);

    // Status chip on banner
    const scColors = { green: { fill:{ r:0.067,g:0.396,b:0.243 }, txC:{ r:0.537,g:0.882,b:0.624 } }, yellow: { fill:{ r:0.451,g:0.380,b:0 }, txC:{ r:0.984,g:0.875,b:0.039 } }, red: { fill:{ r:0.490,g:0.063,b:0.063 }, txC:{ r:0.988,g:0.490,b:0.490 } } };
    const scc  = scColors[m.sc];
    const sBg  = frame('StatusChip', 80 + m.status.length * 2, 20, { fill: scc.fill, radius: 10 });
    sBg.x = cardW - 94; sBg.y = 10;
    const sDot = frame('Dot', 6, 6, { fill: scc.txC, radius: 3 }); sDot.x = 6; sDot.y = 7;
    sBg.appendChild(sDot);
    const sTxt = txt(m.status, { size: 9, color: scc.txC, weight: 'Semi Bold' }); sTxt.x = 16; sTxt.y = 5;
    sBg.appendChild(sTxt);
    card.appendChild(sBg);

    // Avatar (positioned across the banner/body seam)
    const avBg = frame('Av', 48, 48, { fill: avatarGrads[m.init] || T.primary, radius: 24 });
    avBg.x = 20; avBg.y = 48;
    const avT = txt(m.init, { size: 14, color: T.white, weight: 'Bold' });
    avT.x = (48 - avT.width) / 2; avT.y = (48 - avT.height) / 2;
    avBg.appendChild(avT);
    card.appendChild(avBg);

    // Name & role
    const nameT = txt(m.n, { size: 13, color: T.text, weight: 'Bold' });
    nameT.x = 20; nameT.y = 102;
    card.appendChild(nameT);

    const roleT = txt(m.role, { size: 10, color: T.textMuted });
    roleT.x = 20; roleT.y = 118;
    card.appendChild(roleT);

    const deptB = badge(m.dept, m.deptC);
    deptB.x = 20; deptB.y = 134;
    card.appendChild(deptB);

    // Email & phone
    const emailT = txt('|| ' + m.n.split(' ')[0].toLowerCase()[0] + '.' + m.n.split(' ')[1].toLowerCase() + '@nexuscrm.com', { size: 9, color: T.textMuted });
    emailT.x = 20; emailT.y = 158;
    card.appendChild(emailT);

    // Stats row
    const statsDiv = rect(cardW, 1, T.border2);
    statsDiv.x = 0; statsDiv.y = 196;
    card.appendChild(statsDiv);

    const stats = [
      { l:'Tratos', v: String(m.deals) },
      { l:'Leads',  v: String(m.leads) },
      { l:'Tasa',   v: m.rate          },
    ];
    for (let j = 0; j < stats.length; j++) {
      const sx = Math.round(cardW / 3) * j + Math.round((cardW / 3 - 40) / 2);
      const svT = txt(stats[j].v, { size: 16, color: j === 2 ? T.success : T.text, weight: 'Bold' });
      svT.x = sx; svT.y = 205;
      card.appendChild(svT);
      const slT = txt(stats[j].l, { size: 8, color: T.textMuted });
      slT.x = sx; slT.y = 224;
      card.appendChild(slT);
    }

    mf.appendChild(card);
  }

  // Modal
  const modalIM = buildModalInvitarMiembro();
  modalIM.x = 1500; modalIM.y = 900 + 100;
  mf.appendChild(modalIM);

  return { frame: mf, modalIM, btnInvite };
}

// -----------------------------------------------------------
//  PANTALLA � Configuraci�n
// -----------------------------------------------------------
async function buildConfiguracionPage() {
  const PAGE_W = 1440;
  const PAGE_H = 900;
  const CX     = 260;
  const CW     = PAGE_W - CX;
  const padX   = 32;
  const cY     = 64;

  const mf = frame('|| Configuraci�n', PAGE_W, PAGE_H, { fill: T.bg });
  mf.clipsContent = true;

  const sb = buildSidebar('Configuraci�n');
  sb.x = 0; sb.y = 0;
  mf.appendChild(sb);

  const hdr = buildHeader('Configuraci�n');
  hdr.x = CX; hdr.y = 0;
  mf.appendChild(hdr);

  const pgTC = txt('Configuraci�n', { size: 22, color: T.text, weight: 'Bold' });
  pgTC.x = CX + padX; pgTC.y = cY + 22;
  mf.appendChild(pgTC);

  const pgSC = txt('Gestiona tu cuenta, equipo y preferencias', { size: 12, color: T.textMuted });
  pgSC.x = CX + padX; pgSC.y = cY + 50;
  mf.appendChild(pgSC);

  // -- Layout: Left tab nav (220px) + Right content panel --
  const layoutY  = cY + 76;
  const tabNavW  = 220;
  const contentX = CX + padX + tabNavW + 16;
  const contentW = CW - padX * 2 - tabNavW - 16;

  // Tab nav card
  const tabNav = frame('Card / Tab Nav', tabNavW, 336, { fill: T.surface, radius: 12, stroke: T.border, strokeW: 1 });
  tabNav.x = CX + padX; tabNav.y = layoutY;

  const settingsTabs = [
    { l:'General',         ico:'||' },
    { l:'Perfil',          ico:'||' },
    { l:'Usuarios',        ico:'||' },
    { l:'Integraciones',   ico:'||' },
    { l:'Notificaciones',  ico:'||' },
    { l:'Seguridad',       ico:'||' },
  ];
  for (let i = 0; i < settingsTabs.length; i++) {
    const isActive = i === 0;
    const tabBg = frame('Tab / ' + settingsTabs[i].l, tabNavW, 56, {
      fill: isActive ? { r:0.933,g:0.953,b:1.0 } : T.surface,
      radius: 0,
    });
    tabBg.x = 0; tabBg.y = i * 56;
    if (isActive) {
      const accentBar = frame('ActiveBar', 3, 56, { fill: T.accent, radius: 0 });
      accentBar.x = 0; accentBar.y = 0;
      tabBg.appendChild(accentBar);
    }
    const tabIco = txt(settingsTabs[i].ico, { size: 14 }); tabIco.x = 18; tabIco.y = 20;
    tabBg.appendChild(tabIco);
    const tabLbl = txt(settingsTabs[i].l, { size: 13, color: isActive ? T.primary : T.textMuted, weight: isActive ? 'Semi Bold' : 'Medium' });
    tabLbl.x = 40; tabLbl.y = 20;
    tabBg.appendChild(tabLbl);
    if (i < settingsTabs.length - 1) {
      const divLine = rect(tabNavW, 1, T.border2); divLine.x = 0; divLine.y = 55;
      tabBg.appendChild(divLine);
    }
    tabNav.appendChild(tabBg);
  }
  mf.appendChild(tabNav);

  // -- GENERAL PANEL (shown by default) --
  const panelH1 = 244;
  const orgCard = frame('Card / Organizaci�n', contentW, panelH1, { fill: T.surface, radius: 12, stroke: T.border, strokeW: 1 });
  orgCard.x = contentX; orgCard.y = layoutY;

  const orgTitle = txt('Informaci�n de la Organizaci�n', { size: 14, color: T.text, weight: 'Bold' });
  orgTitle.x = 20; orgTitle.y = 16;
  orgCard.appendChild(orgTitle);

  const orgFields = [
    { l:'Nombre de la empresa',  v:'NexusCRM Inc.',              x:16,  y:50, w:220 },
    { l:'Dominio web',           v:'nexuscrm.com',               x:248, y:50, w:220 },
    { l:'Zona horaria',          v:'Am�rica/Bogot� (UTC-5)',     x:16,  y:128, w:220 },
    { l:'Idioma',                v:'Espa�ol (Colombia)',          x:248, y:128, w:220 },
    { l:'Moneda',                v:'USD � D�lar estadounidense',  x:16,  y:206 - 60, w:220 },
    { l:'Formato de fecha',      v:'DD/MM/YYYY',                  x:248, y:206 - 60, w:220 },
  ];
  for (const f of orgFields) {
    const fl = txt(f.l, { size: 9, color: T.textMuted, weight: 'Semi Bold' });
    fl.letterSpacing = { value: 4, unit: 'PERCENT' };
    fl.x = f.x; fl.y = f.y;
    orgCard.appendChild(fl);
    const fb = frame('Field ' + f.l, f.w, 30, { fill: { r:0.972,g:0.980,b:0.992 }, radius: 6, stroke: T.border, strokeW: 1 });
    fb.x = f.x; fb.y = f.y + 14;
    const fv = txt(f.v, { size: 11, color: T.text }); fv.x = 10; fv.y = 9;
    fb.appendChild(fv);
    orgCard.appendChild(fb);
  }

  const saveBtn1 = button('? Guardar cambios', 'primary');
  saveBtn1.x = contentW - 148; saveBtn1.y = panelH1 - 46;
  orgCard.appendChild(saveBtn1);
  mf.appendChild(orgCard);

  // Apariencia card
  const appCard = frame('Card / Apariencia', contentW, 130, { fill: T.surface, radius: 12, stroke: T.border, strokeW: 1 });
  appCard.x = contentX; appCard.y = layoutY + panelH1 + 14;

  const appTitle = txt('Apariencia', { size: 14, color: T.text, weight: 'Bold' });
  appTitle.x = 20; appTitle.y = 16;
  appCard.appendChild(appTitle);

  const themes = [
    { l:'Claro', ico:'||', active:true  },
    { l:'Oscuro',ico:'||', active:false },
    { l:'Sistema',ico:'||',active:false },
  ];
  const thW = Math.floor((contentW - 48) / 3);
  for (let i = 0; i < themes.length; i++) {
    const th = themes[i];
    const thBg = frame('Theme ' + th.l, thW, 72, {
      fill: th.active ? { r:0.933,g:0.953,b:1.0 } : T.surface,
      radius: 10,
      stroke: th.active ? T.primary : T.border,
      strokeW: th.active ? 2 : 1,
    });
    thBg.x = 16 + i * (thW + 8); thBg.y = 38;
    const thIco = txt(th.ico, { size: 22 }); thIco.x = (thW - 22) / 2; thIco.y = 10;
    thBg.appendChild(thIco);
    const thLbl = txt(th.l, { size: 12, color: th.active ? T.primary : T.textMuted, weight: 'Semi Bold' });
    thLbl.x = (thW - thLbl.width) / 2; thLbl.y = 42;
    thBg.appendChild(thLbl);
    appCard.appendChild(thBg);
  }
  mf.appendChild(appCard);

  // -- NOTIFICACIONES preview (right column, same y as orgCard) --
  // We show the General tab panel as the primary view.
  // Additional tab content sketched as ghost panels below.

  // Ghost: Notificaciones tab preview tile
  const notifCard = frame('Card / Notificaciones Preview', contentW, 160, { fill: T.surface, radius: 12, stroke: T.border, strokeW: 1 });
  notifCard.x = contentX; notifCard.y = layoutY + panelH1 + 14 + 144;

  const notifTitle = txt('Preferencias de Notificaciones', { size: 14, color: T.text, weight: 'Bold' });
  notifTitle.x = 20; notifTitle.y = 16;
  notifCard.appendChild(notifTitle);

  const notifRows = [
    { g:'Ventas',     items:['Nuevo lead asignado', 'Trato cerrado'] },
    { g:'Actividades',items:['Recordatorio de tarea','Reuni�n pr�xima'] },
    { g:'Sistema',    items:['Ticket soporte urgente','Reporte semanal'] },
  ];
  // Render as toggle rows
  let nry = 42;
  for (const ng of notifRows) {
    const ngLbl = txt(ng.g.toUpperCase(), { size: 8, color: T.textMuted, weight: 'Semi Bold' });
    ngLbl.letterSpacing = { value: 4, unit: 'PERCENT' };
    ngLbl.x = 20; ngLbl.y = nry;
    notifCard.appendChild(ngLbl);
    nry += 14;
    for (const ni of ng.items) {
      const niRow = frame('NR ' + ni, contentW - 32, 20, { fill: T.surface });
      niRow.x = 16; niRow.y = nry;
      const niT = txt(ni, { size: 11, color: T.textMuted }); niT.x = 0; niT.y = 3;
      niRow.appendChild(niT);
      // toggle pill
      const tgBg = frame('Tg', 32, 16, { fill: T.primary, radius: 8 });
      tgBg.x = contentW - 52; tgBg.y = 2;
      const tgKnob = frame('Knob', 12, 12, { fill: T.white, radius: 6 }); tgKnob.x = 18; tgKnob.y = 2;
      tgBg.appendChild(tgKnob);
      niRow.appendChild(tgBg);
      notifCard.appendChild(niRow);
      nry += 22;
    }
    if (nry > 120) break;
  }
  mf.appendChild(notifCard);

  // -- SEGURIDAD card sketch --
  const secCard = frame('Card / Seguridad', contentW, 170, { fill: T.surface, radius: 12, stroke: T.border, strokeW: 1 });
  secCard.x = contentX; secCard.y = layoutY + panelH1 + 14 + 144 + 174;

  const secTitle = txt('Seguridad', { size: 14, color: T.text, weight: 'Bold' });
  secTitle.x = 20; secTitle.y = 16;
  secCard.appendChild(secTitle);

  // 2FA status row
  const tfaBg = frame('TFABg', contentW - 32, 52, { fill: { r:0.941,g:0.988,b:0.961 }, radius: 10, stroke: { r:0.694,g:0.929,b:0.769 }, strokeW: 1 });
  tfaBg.x = 16; tfaBg.y = 42;
  const tfaIco = txt('||?', { size: 22 }); tfaIco.x = 12; tfaIco.y = 14;
  tfaBg.appendChild(tfaIco);
  const tfaTitle = txt('2FA Activado', { size: 13, color: T.success, weight: 'Bold' }); tfaTitle.x = 50; tfaTitle.y = 10;
  tfaBg.appendChild(tfaTitle);
  const tfaSub = txt('Aplicaci�n autenticadora configurada', { size: 11, color: { r:0.047,g:0.580,b:0.235 } }); tfaSub.x = 50; tfaSub.y = 28;
  tfaBg.appendChild(tfaSub);
  const tfaDis = txt('Desactivar', { size: 11, color: T.danger, weight: 'Bold' }); tfaDis.x = contentW - 100; tfaDis.y = 20;
  tfaBg.appendChild(tfaDis);
  secCard.appendChild(tfaBg);

  // Active sessions
  const sessTitle = txt('Sesiones Activas', { size: 12, color: T.text, weight: 'Bold' }); sessTitle.x = 20; sessTitle.y = 106;
  secCard.appendChild(sessTitle);

  const sessBuf = [
    { d:'Chrome � Mac OS',    l:'Bogot�, Colombia',  t:'Activo ahora', cur:true  },
    { d:'Safari � iPhone',    l:'Bogot�, Colombia',  t:'Hace 2h',      cur:false },
    { d:'Chrome � Windows',   l:'Medell�n, Colombia',t:'Hace 1d',      cur:false },
  ];
  for (let i = 0; i < sessBuf.length; i++) {
    const ss = sessBuf[i];
    const ssY = 122 + i * 22;
    const ssIco = txt('||', { size: 11 }); ssIco.x = 20; ssIco.y = ssY;
    secCard.appendChild(ssIco);
    const ssD = txt(ss.d, { size: 11, color: T.text, weight: 'Semi Bold' }); ssD.x = 40; ssD.y = ssY;
    secCard.appendChild(ssD);
    const ssL = txt(ss.l, { size: 9, color: T.textMuted }); ssL.x = 160; ssL.y = ssY + 2;
    secCard.appendChild(ssL);
    const ssT = txt(ss.t, { size: 10, color: ss.cur ? T.success : T.textMuted }); ssT.x = contentW - 130; ssT.y = ssY;
    secCard.appendChild(ssT);
    if (!ss.cur) {
      const closeT = txt('Cerrar', { size: 10, color: T.danger, weight: 'Bold' }); closeT.x = contentW - 48; closeT.y = ssY;
      secCard.appendChild(closeT);
    }
  }
  mf.appendChild(secCard);

  return { frame: mf };
}

// -----------------------------------------------------------
//  MODAL � Subir Documento
// -----------------------------------------------------------
function buildModalSubirDocumento() {
  return buildModalOverlay('Subir Documento', 520, 460, (dialog) => {
    modalHeader(dialog, '|| Subir Documento', 520);

    // Drop zone
    const dropZone = frame('DropZone', 480, 88, { fill: { r:0.973,g:0.980,b:0.996 }, radius: 10, stroke: T.primaryLight, strokeW: 1 });
    dropZone.x = 20; dropZone.y = 70;
    // dashed border effect via inner rect
    const dropIco = txt('||', { size: 26 }); dropIco.x = 220; dropIco.y = 14;
    dropZone.appendChild(dropIco);
    const dropT1 = txt('Arrastra archivos aqu� o haz clic para seleccionar', { size: 12, color: T.primaryLight, weight: 'Semi Bold' });
    dropT1.x = (480 - dropT1.width) / 2; dropT1.y = 50;
    dropZone.appendChild(dropT1);
    const dropT2 = txt('PDF, DOCX, PPTX, XLSX � M�x. 50 MB', { size: 10, color: T.textMuted });
    dropT2.x = (480 - dropT2.width) / 2; dropT2.y = 66;
    dropZone.appendChild(dropT2);
    dialog.appendChild(dropZone);

    dialog.appendChild(formRow('Nombre del documento', 'Nombre descriptivo�', 20, 172, 480));
    dialog.appendChild(formRow('Tipo de documento', 'Contrato', 20, 250, 230));
    dialog.appendChild(formRow('Nivel de acceso', 'Equipo', 260, 250, 240));
    dialog.appendChild(formRow('Vinculado a (cliente/cuenta)', 'Buscar�', 20, 328, 480));

    const notasLbl = txt('NOTAS', { size: 9, color: T.textMuted, weight: 'Semi Bold' });
    notasLbl.letterSpacing = { value: 4, unit: 'PERCENT' };
    notasLbl.x = 20; notasLbl.y = 405;
    dialog.appendChild(notasLbl);

    const notasBox = frame('NotasBox', 480, 34, { fill: { r:0.972,g:0.980,b:0.992 }, radius: 6, stroke: T.border, strokeW: 1 });
    notasBox.x = 20; notasBox.y = 420;
    const notasPh = txt('Descripci�n opcional del documento�', { size: 12, color: T.textMuted });
    notasPh.x = 10; notasPh.y = 10;
    notasBox.appendChild(notasPh);
    dialog.appendChild(notasBox);

    modalFooter(dialog, 520, 460, 'Subir documento', 'Cancelar');
  });
}

// -----------------------------------------------------------
//  MODAL � Compartir Documento
// -----------------------------------------------------------
function buildModalCompartirDocumento() {
  return buildModalOverlay('Compartir Documento', 500, 440, (dialog) => {
    modalHeader(dialog, '|| Compartir Documento', 500);

    // File preview card
    const fileCard = frame('FileCard', 460, 56, { fill: { r:0.973,g:0.980,b:0.988 }, radius: 8, stroke: T.border, strokeW: 1 });
    fileCard.x = 20; fileCard.y = 70;
    const fileIco = txt('||', { size: 22 }); fileIco.x = 12; fileIco.y = 14;
    fileCard.appendChild(fileIco);
    const fileName = txt('Contrato_Marco_Tecno_SA_2026.pdf', { size: 12, color: T.text, weight: 'Semi Bold' });
    fileName.x = 50; fileName.y = 12;
    fileCard.appendChild(fileName);
    const fileMeta = txt('PDF � 2.4 MB � Subido: 1 Mar 2026', { size: 10, color: T.textMuted });
    fileMeta.x = 50; fileMeta.y = 32;
    fileCard.appendChild(fileMeta);
    dialog.appendChild(fileCard);

    dialog.appendChild(formRow('Compartir con (email o usuario)', 'nombre@empresa.com', 20, 142, 460));
    dialog.appendChild(formRow('Nivel de acceso', 'Solo lectura', 20, 220, 230));
    dialog.appendChild(formRow('Expira en', '7 d�as', 260, 220, 220));

    // Enlace p�blico
    const eLinkLbl = txt('ENLACE P�BLICO', { size: 9, color: T.textMuted, weight: 'Semi Bold' });
    eLinkLbl.letterSpacing = { value: 4, unit: 'PERCENT' };
    eLinkLbl.x = 20; eLinkLbl.y = 300;
    dialog.appendChild(eLinkLbl);

    const linkBox = frame('LinkBox', 380, 32, { fill: { r:0.972,g:0.980,b:0.992 }, radius: 6, stroke: T.border, strokeW: 1 });
    linkBox.x = 20; linkBox.y = 318;
    const linkT = txt('crm.maki.io/docs/contrato-tecno-sa', { size: 10, color: T.textMuted });
    linkT.x = 10; linkT.y = 10;
    linkBox.appendChild(linkT);
    dialog.appendChild(linkBox);

    const copyBtn = button('|| Copiar', 'secondary');
    copyBtn.x = 408; copyBtn.y = 320;
    dialog.appendChild(copyBtn);

    // Checkboxes row
    const chk1Bg = frame('Chk1', 10, 10, { fill: T.surface, radius: 2, stroke: T.border, strokeW: 1 });
    chk1Bg.x = 20; chk1Bg.y = 368;
    dialog.appendChild(chk1Bg);
    const chk1L = txt('Enlace con contrase�a', { size: 11, color: T.textMuted });
    chk1L.x = 36; chk1L.y = 365;
    dialog.appendChild(chk1L);

    const chk2Bg = frame('Chk2', 10, 10, { fill: T.surface, radius: 2, stroke: T.border, strokeW: 1 });
    chk2Bg.x = 200; chk2Bg.y = 368;
    dialog.appendChild(chk2Bg);
    const chk2L = txt('Expira en 7 d�as', { size: 11, color: T.textMuted });
    chk2L.x = 216; chk2L.y = 365;
    dialog.appendChild(chk2L);

    modalFooter(dialog, 500, 440, '|| Compartir', 'Cancelar');
  });
}

// -----------------------------------------------------------
//  PANTALLA � Documentos
// -----------------------------------------------------------
async function buildDocumentosPage() {
  const PAGE_W = 1440;
  const PAGE_H = 900;
  const CX     = 260;
  const CW     = PAGE_W - CX;
  const padX   = 32;
  const cY     = 64;

  const mf = frame('|| Documentos', PAGE_W, PAGE_H, { fill: T.bg });
  mf.clipsContent = true;

  const sb = buildSidebar('Documentos');
  sb.x = 0; sb.y = 0;
  mf.appendChild(sb);

  const hdr = buildHeader('Documentos');
  hdr.x = CX; hdr.y = 0;
  mf.appendChild(hdr);

  const pgTD = txt('Documentos', { size: 22, color: T.text, weight: 'Bold' });
  pgTD.x = CX + padX; pgTD.y = cY + 22;
  mf.appendChild(pgTD);

  const pgSD = txt('Repositorio centralizado de contratos, propuestas y archivos del CRM', { size: 12, color: T.textMuted });
  pgSD.x = CX + padX; pgSD.y = cY + 50;
  mf.appendChild(pgSD);

  // Buttons
  const btnNewFolder = button('|| Nueva carpeta', 'secondary');
  btnNewFolder.x = CX + CW - 278; btnNewFolder.y = cY + 26;
  mf.appendChild(btnNewFolder);

  const btnUpload = button('|| Subir documento', 'primary');
  btnUpload.name = 'Btn / Subir Documento ? Modal Subir Documento';
  btnUpload.x = CX + CW - 158; btnUpload.y = cY + 26;
  mf.appendChild(btnUpload);

  // KPIs
  const kpisD = [
    { label:'Total documentos',      value:'248',    color:T.primaryLight, ibg:{r:0.859,g:0.941,b:0.996}, icon:'||', change:'repositorio',      up:true  },
    { label:'Almacenamiento usado',  value:'1.2 GB', color:T.success,      ibg:{r:0.859,g:0.988,b:0.902}, icon:'||', change:'de 10 GB',          up:true  },
    { label:'Contratos activos',     value:'48',     color:T.accent,       ibg:{r:0.996,g:0.976,b:0.761}, icon:'||', change:'vigentes',          up:true  },
    { label:'Por vencer',            value:'12',     color:T.warning,      ibg:{r:1,g:0.933,b:0.824},     icon:'||', change:'requieren revisi�n',up:false },
  ];
  const kWD   = 268;
  const kpiYD = cY + 70;
  for (let i = 0; i < kpisD.length; i++) {
    const k = kpisD[i];
    const c = kpiCard(k.label, k.value, k.change, k.up, k.icon, k.color, k.ibg, kWD);
    c.x = CX + padX + i * (kWD + 12); c.y = kpiYD;
    mf.appendChild(c);
  }

  // Quick folders row
  const foldersY = kpiYD + 116;
  const folders = [
    { ico:'||', label:'Contratos',    n:48  },
    { ico:'||', label:'Propuestas',   n:36  },
    { ico:'||', label:'Reportes',     n:28  },
    { ico:'||', label:'Marketing',    n:24  },
    { ico:'||', label:'Manuales',     n:15  },
    { ico:'||', label:'Plantillas',   n:22  },
    { ico:'||?', label:'Contratos CRM',n:18  },
  ];
  let folderX = CX + padX;
  for (const fl of folders) {
    const flW  = 100 + fl.label.length * 4;
    const flBg = frame('Folder ' + fl.label, flW, 36, { fill: T.surface, radius: 8, stroke: T.border, strokeW: 1 });
    flBg.x = folderX; flBg.y = foldersY;
    const flIco = txt(fl.ico, { size: 13 }); flIco.x = 10; flIco.y = 10;
    flBg.appendChild(flIco);
    const flLbl = txt(fl.label, { size: 11, color: T.text, weight: 'Semi Bold' }); flLbl.x = 28; flLbl.y = 11;
    flBg.appendChild(flLbl);
    const flN = badge(String(fl.n), 'gray'); flN.x = flW - 30; flN.y = 9;
    flBg.appendChild(flN);
    mf.appendChild(flBg);
    folderX += flW + 8;
  }

  // Toolbar
  const toolbarYD = foldersY + 48;
  const searchBoxD = frame('SearchBoxD', 240, 32, { fill: { r:0.972,g:0.980,b:0.992 }, radius: 6, stroke: T.border, strokeW: 1 });
  searchBoxD.x = CX + padX; searchBoxD.y = toolbarYD;
  const srIcoD = txt('||', { size: 10 }); srIcoD.x = 8; srIcoD.y = 9;
  const srPhD  = txt('Buscar documento�', { size: 11, color: T.textMuted }); srPhD.x = 26; srPhD.y = 9;
  searchBoxD.appendChild(srIcoD); searchBoxD.appendChild(srPhD);
  mf.appendChild(searchBoxD);

  const typeFilterD = frame('TypeFilterD', 166, 32, { fill: T.surface, radius: 6, stroke: T.border, strokeW: 1 });
  typeFilterD.x = CX + padX + 248; typeFilterD.y = toolbarYD;
  const typeFT = txt('Todos los tipos ?', { size: 11, color: T.textMuted }); typeFT.x = 10; typeFT.y = 9;
  typeFilterD.appendChild(typeFT);
  mf.appendChild(typeFilterD);

  const accFilterD = frame('AccFilterD', 162, 32, { fill: T.surface, radius: 6, stroke: T.border, strokeW: 1 });
  accFilterD.x = CX + padX + 422; accFilterD.y = toolbarYD;
  const accFT = txt('Todos los accesos ?', { size: 11, color: T.textMuted }); accFT.x = 10; accFT.y = 9;
  accFilterD.appendChild(accFT);
  mf.appendChild(accFilterD);

  // Table card
  const tableYD = toolbarYD + 44;
  const tableWD = CW - padX * 2;
  const tableCardD = frame('Card / Tabla Documentos', tableWD, 480, { fill: T.surface, radius: 10, stroke: T.border, strokeW: 1 });
  tableCardD.x = CX + padX; tableCardD.y = tableYD;

  const dCols = [
    { label:'Nombre del archivo', x:12  },
    { label:'Tipo',               x:322 },
    { label:'Tama�o',             x:398 },
    { label:'Fecha',              x:462 },
    { label:'Propietario',        x:556 },
    { label:'Vinculado a',        x:650 },
    { label:'Acceso',             x:768 },
    { label:'Acciones',           x:840 },
  ];
  tableHeader(tableCardD, dCols, 0, tableWD);

  const docsData = [
    { name:'Contrato Marco - Tecno S.A.',    ext:'PDF',  extC:T.danger,       tipo:'Contrato',    tipoC:'navy',   size:'2.4 MB', date:'01 Mar 2026', owner:'Carlos V.', linked:'Tecno S.A.',  access:'Privado', accC:'gray'  },
    { name:'Propuesta Comercial - Global',   ext:'DOCX', extC:T.primaryLight, tipo:'Propuesta',   tipoC:'blue',   size:'1.8 MB', date:'28 Feb 2026', owner:'Mar�a P.',  linked:'Global Corp',  access:'Equipo',  accC:'blue'  },
    { name:'NDA - NetSol Ltda.',             ext:'PDF',  extC:T.danger,       tipo:'Contrato',    tipoC:'navy',   size:'0.5 MB', date:'25 Feb 2026', owner:'Luis A.',   linked:'NetSol Ltda.', access:'Privado', accC:'gray'  },
    { name:'Presentaci�n Ejecutiva Q1 2026', ext:'PPTX', extC:T.warning,      tipo:'Presentaci�n',tipoC:'purple', size:'8.2 MB', date:'22 Feb 2026', owner:'Mar�a P.',  linked:'(General)',    access:'P�blico', accC:'green' },
    { name:'SLA MegaTrade 2026',             ext:'PDF',  extC:T.danger,       tipo:'Contrato',    tipoC:'navy',   size:'1.2 MB', date:'18 Feb 2026', owner:'Pedro S.',  linked:'MegaTrade',    access:'Equipo',  accC:'blue'  },
    { name:'Invoice Template 2026',          ext:'XLSX', extC:T.success,      tipo:'Plantilla',   tipoC:'yellow', size:'0.3 MB', date:'15 Feb 2026', owner:'Carlos V.', linked:'(General)',    access:'Equipo',  accC:'blue'  },
    { name:'Gu�a de onboarding clientes',    ext:'PDF',  extC:T.danger,       tipo:'Manual',      tipoC:'green',  size:'3.6 MB', date:'10 Feb 2026', owner:'Ana R.',    linked:'(General)',    access:'P�blico', accC:'green' },
    { name:'Estudio de mercado Q4 2025',     ext:'PDF',  extC:T.danger,       tipo:'Reporte',     tipoC:'orange', size:'5.1 MB', date:'05 Feb 2026', owner:'Luis A.',   linked:'(Interno)',    access:'Equipo',  accC:'blue'  },
  ];

  let rowYD = 42;
  for (const d of docsData) {
    const rowBgD = frame('Row ' + d.name, tableWD, 46, { fill: T.surface });
    rowBgD.x = 0; rowBgD.y = rowYD;

    // File icon with ext
    const extBg = frame('ExtBg', 32, 32, { fill: { r:0.973,g:0.980,b:0.988 }, radius: 6 });
    extBg.x = dCols[0].x; extBg.y = 7;
    const extT = txt(d.ext, { size: 7, color: d.extC, weight: 'Bold' });
    extT.x = (32 - extT.width) / 2; extT.y = (32 - extT.height) / 2;
    extBg.appendChild(extT);
    rowBgD.appendChild(extBg);

    const dNameT = txt(d.name.length > 30 ? d.name.slice(0, 28) + '�' : d.name, { size: 12, color: T.text, weight: 'Semi Bold' });
    dNameT.x = dCols[0].x + 38; dNameT.y = 16;
    rowBgD.appendChild(dNameT);

    const tipoBadge = badge(d.tipo, d.tipoC);
    tipoBadge.x = dCols[1].x; tipoBadge.y = 14;
    rowBgD.appendChild(tipoBadge);

    const sizeT = txt(d.size, { size: 11, color: T.textMuted });
    sizeT.x = dCols[2].x; sizeT.y = 16;
    rowBgD.appendChild(sizeT);

    const dateT = txt(d.date, { size: 10, color: T.textMuted });
    dateT.x = dCols[3].x; dateT.y = 16;
    rowBgD.appendChild(dateT);

    const ownerT = txt(d.owner, { size: 11, color: T.textMuted });
    ownerT.x = dCols[4].x; ownerT.y = 16;
    rowBgD.appendChild(ownerT);

    const linkedT = txt(d.linked, { size: 11, color: T.primaryLight });
    linkedT.x = dCols[5].x; linkedT.y = 16;
    rowBgD.appendChild(linkedT);

    const accBadge = badge(d.access, d.accC);
    accBadge.x = dCols[6].x; accBadge.y = 14;
    rowBgD.appendChild(accBadge);

    // Action icons
    const dlIco = txt('||', { size: 11 }); dlIco.x = dCols[7].x; dlIco.y = 15;
    rowBgD.appendChild(dlIco);
    const shrIco = txt('||', { size: 11 }); shrIco.x = dCols[7].x + 24; shrIco.y = 15;
    rowBgD.appendChild(shrIco);
    const moreD = txt('?', { size: 14, color: T.textMuted }); moreD.x = dCols[7].x + 48; moreD.y = 13;
    rowBgD.appendChild(moreD);

    const rowLineD = rect(tableWD, 1, T.border2);
    rowLineD.x = 0; rowLineD.y = 45;
    rowBgD.appendChild(rowLineD);

    tableCardD.appendChild(rowBgD);
    rowYD += 46;
  }

  // Pagination footer
  const paginD = frame('PaginD', tableWD, 40, { fill: T.surface });
  paginD.x = 0; paginD.y = 434;
  const paginLineD = rect(tableWD, 1, T.border); paginLineD.x = 0; paginLineD.y = 0;
  paginD.appendChild(paginLineD);
  const paginTD = txt('Mostrando 1-8 de 248 documentos', { size: 11, color: T.textMuted });
  paginTD.x = 16; paginTD.y = 13;
  paginD.appendChild(paginTD);
  tableCardD.appendChild(paginD);
  mf.appendChild(tableCardD);

  // -- MODALES ---------------------------------------------
  const modalSD = buildModalSubirDocumento();
  modalSD.x = 1500; modalSD.y = 900 + 100;
  mf.appendChild(modalSD);

  const modalCD = buildModalCompartirDocumento();
  modalCD.x = 2200; modalCD.y = 900 + 100;
  mf.appendChild(modalCD);

  return { frame: mf, modalSD, modalCD, btnUpload };
}

// -----------------------------------------------------------
//  MODAL � Nuevo Reporte
// -----------------------------------------------------------
function buildModalNuevoReporte() {
  return buildModalOverlay('Nuevo Reporte', 520, 440, (dialog) => {
    modalHeader(dialog, '|| Nuevo Reporte', 520);

    dialog.appendChild(formRow('Nombre del reporte', 'Ej: Ventas Q2 2026', 20, 70, 480));
    dialog.appendChild(formRow('Tipo de reporte', 'Ventas', 20, 148, 230));
    dialog.appendChild(formRow('Per�odo', 'Este mes', 260, 148, 240));
    dialog.appendChild(formRow('Agrupado por', 'Vendedor', 20, 226, 230));
    dialog.appendChild(formRow('Formato de salida', 'PDF', 260, 226, 240));

    // Filtros avanzados
    const filtLbl = txt('FILTROS', { size: 9, color: T.textMuted, weight: 'Semi Bold' });
    filtLbl.letterSpacing = { value: 4, unit: 'PERCENT' };
    filtLbl.x = 20; filtLbl.y = 308;
    dialog.appendChild(filtLbl);

    const filterTags = ['Todos los vendedores', 'Todas las cuentas', 'Todos los estados'];
    for (let i = 0; i < filterTags.length; i++) {
      const ftBg = frame('FTag' + i, 156, 26, { fill: { r:0.859,g:0.914,b:0.996 }, radius: 6 });
      ftBg.x = 20 + i * 164; ftBg.y = 324;
      const ftT = txt(filterTags[i], { size: 10, color: T.primaryLight });
      ftT.x = (156 - ftT.width) / 2; ftT.y = (26 - ftT.height) / 2;
      ftBg.appendChild(ftT);
      dialog.appendChild(ftBg);
    }

    // Programar env�o
    const schedLbl = txt('PROGRAMAR ENV�O AUTOM�TICO', { size: 9, color: T.textMuted, weight: 'Semi Bold' });
    schedLbl.letterSpacing = { value: 4, unit: 'PERCENT' };
    schedLbl.x = 20; schedLbl.y = 368;
    dialog.appendChild(schedLbl);

    const schedBg = frame('SchedRow', 480, 32, { fill: { r:0.973,g:0.980,b:0.988 }, radius: 6, stroke: T.border, strokeW: 1 });
    schedBg.x = 20; schedBg.y = 384;
    const schedT = txt('Desactivado � haz clic para programar env�o por email', { size: 11, color: T.textMuted });
    schedT.x = 10; schedT.y = 10;
    schedBg.appendChild(schedT);
    dialog.appendChild(schedBg);

    modalFooter(dialog, 520, 440, '|| Generar reporte', 'Cancelar');
  });
}

// -----------------------------------------------------------
//  PANTALLA � Reportes
// -----------------------------------------------------------
async function buildReportesPage() {
  const PAGE_W = 1440;
  const PAGE_H = 900;
  const CX     = 260;
  const CW     = PAGE_W - CX;
  const padX   = 32;
  const cY     = 64;

  const mf = frame('|| Reportes', PAGE_W, PAGE_H, { fill: T.bg });
  mf.clipsContent = true;

  const sb = buildSidebar('Reportes');
  sb.x = 0; sb.y = 0;
  mf.appendChild(sb);

  const hdr = buildHeader('Reportes & Anal�ticas');
  hdr.x = CX; hdr.y = 0;
  mf.appendChild(hdr);

  const pgTR = txt('Reportes & Anal�ticas', { size: 22, color: T.text, weight: 'Bold' });
  pgTR.x = CX + padX; pgTR.y = cY + 22;
  mf.appendChild(pgTR);

  const pgSR = txt('Datos en tiempo real � �ltimo cierre: 11 Mar 2026', { size: 12, color: T.textMuted });
  pgSR.x = CX + padX; pgSR.y = cY + 50;
  mf.appendChild(pgSR);

  // Controls
  const periodSel = frame('PeriodSel', 150, 30, { fill: T.surface, radius: 6, stroke: T.border, strokeW: 1 });
  periodSel.x = CX + CW - 460; periodSel.y = cY + 29;
  const periodT = txt('�ltimos 6 meses ?', { size: 11, color: T.textMuted }); periodT.x = 10; periodT.y = 9;
  periodSel.appendChild(periodT);
  mf.appendChild(periodSel);

  const btnExpR = button('? Exportar', 'secondary');
  btnExpR.x = CX + CW - 296; btnExpR.y = cY + 26;
  mf.appendChild(btnExpR);

  const btnNewRep = button('+ Nuevo reporte', 'primary');
  btnNewRep.name = 'Btn / Nuevo Reporte ? Modal Nuevo Reporte';
  btnNewRep.x = CX + CW - 158; btnNewRep.y = cY + 26;
  mf.appendChild(btnNewRep);

  // KPIs
  const kpisR = [
    { label:'Ingresos totales', value:'$550K', color:T.primaryLight, ibg:{r:0.859,g:0.941,b:0.996}, icon:'||', change:'+21.4%', up:true  },
    { label:'Tratos cerrados',  value:'113',   color:T.success,      ibg:{r:0.859,g:0.988,b:0.902}, icon:'||', change:'+8.2%',  up:true  },
    { label:'Tasa conversi�n',  value:'38.4%', color:T.accent,       ibg:{r:0.996,g:0.976,b:0.761}, icon:'||', change:'+3.1%',  up:true  },
    { label:'Ciclo promedio',   value:'24d',   color:T.purple,       ibg:{r:0.925,g:0.882,b:0.996}, icon:'?', change:'-2.1d',  up:true  },
  ];
  const kWR   = 268;
  const kpiYR = cY + 70;
  for (let i = 0; i < kpisR.length; i++) {
    const k = kpisR[i];
    const c = kpiCard(k.label, k.value, k.change, k.up, k.icon, k.color, k.ibg, kWR);
    c.x = CX + padX + i * (kWR + 12); c.y = kpiYR;
    mf.appendChild(c);
  }

  // -- ROW 1: Revenue chart (2/3) + Pipeline by stage (1/3) --
  const row1Y = kpiYR + 116;
  const row1H = 230;
  const col2W = Math.round((CW - padX * 2) * 0.64);
  const col1W = CW - padX * 2 - col2W - 12;

  // Revenue bar chart card
  const revCard = frame('Card / Ingresos Mensuales', col2W, row1H, { fill: T.surface, radius: 10, stroke: T.border, strokeW: 1 });
  revCard.x = CX + padX; revCard.y = row1Y;

  const revTitle = txt('Ingresos Mensuales (USD k)', { size: 13, color: T.text, weight: 'Bold' });
  revTitle.x = 16; revTitle.y = 14;
  revCard.appendChild(revTitle);

  // Legend
  const legDot1 = frame('LD1', 12, 12, { fill: { r:0.102,g:0.239,b:0.420 }, radius: 2 });
  legDot1.x = col2W - 210; legDot1.y = 16;
  revCard.appendChild(legDot1);
  const legT1 = txt('Ingresos', { size: 10, color: T.textMuted }); legT1.x = col2W - 196; legT1.y = 16;
  revCard.appendChild(legT1);
  const legDot2 = frame('LD2', 12, 12, { fill: T.accent, radius: 2 });
  legDot2.x = col2W - 118; legDot2.y = 16;
  revCard.appendChild(legDot2);
  const legT2 = txt('Tratos', { size: 10, color: T.textMuted }); legT2.x = col2W - 104; legT2.y = 16;
  revCard.appendChild(legT2);

  // Bars
  const months = ['Sep','Oct','Nov','Dic','Ene','Feb','Mar'];
  const revenue = [62, 71, 58, 94, 88, 82, 97];
  const deals   = [14, 17, 12, 21, 19, 18, 22];
  const maxRev  = 100;
  const maxDeals= 25;
  const barAreaH = 150;
  const barAreaY = 42;
  const barGap   = Math.floor((col2W - 48) / months.length);

  for (let i = 0; i < months.length; i++) {
    const bx = 24 + i * barGap;
    const isLast = i === months.length - 1;

    const revH = Math.round((revenue[i] / maxRev) * (barAreaH - 20));
    const revBar = frame('RevBar' + i, 18, revH, { fill: isLast ? { r:0.102,g:0.239,b:0.420 } : { r:0.859,g:0.898,b:0.960 }, radius: 3 });
    revBar.x = bx; revBar.y = barAreaY + barAreaH - revH - 20;
    revCard.appendChild(revBar);

    const dealH = Math.round((deals[i] / maxDeals) * (barAreaH - 20));
    const dealBar = frame('Deal' + i, 14, dealH, { fill: isLast ? T.accent : { r:0.996,g:0.980,b:0.839 }, radius: 3 });
    dealBar.x = bx + 20; dealBar.y = barAreaY + barAreaH - dealH - 20;
    revCard.appendChild(dealBar);

    const mLbl = txt(months[i], { size: 9, color: T.textMuted }); mLbl.x = bx + 2; mLbl.y = barAreaY + barAreaH - 14;
    revCard.appendChild(mLbl);

    const vLbl = txt('$' + revenue[i] + 'K', { size: 8, color: isLast ? T.text : T.textMuted, weight: isLast ? 'Bold' : 'Medium' });
    vLbl.x = bx; vLbl.y = barAreaY + barAreaH + 2;
    revCard.appendChild(vLbl);
  }

  mf.appendChild(revCard);

  // Pipeline by stage card
  const piCard = frame('Card / Pipeline Etapa', col1W, row1H, { fill: T.surface, radius: 10, stroke: T.border, strokeW: 1 });
  piCard.x = CX + padX + col2W + 12; piCard.y = row1Y;

  const piTitle = txt('Pipeline por Etapa ($K)', { size: 13, color: T.text, weight: 'Bold' });
  piTitle.x = 16; piTitle.y = 14;
  piCard.appendChild(piTitle);

  const piStages = [
    { l:'Prospecci�n', v:28, color:{ r:0.012,g:0.522,b:0.780 } },
    { l:'Calificaci�n', v:45, color:{ r:0.486,g:0.227,b:0.929 } },
    { l:'Propuesta',   v:63, color:{ r:0.784,g:0.647,b:0.345 } },
    { l:'Negociaci�n', v:73, color:{ r:0.851,g:0.592,b:0.027 } },
    { l:'Cierre',      v:39, color:{ r:0.086,g:0.639,b:0.243 } },
  ];
  const piBarW = col1W - 40;
  const maxPi  = 73;
  for (let i = 0; i < piStages.length; i++) {
    const ps = piStages[i];
    const py = 38 + i * 32;

    const psLbl = txt(ps.l, { size: 11, color: T.textMuted }); psLbl.x = 16; psLbl.y = py;
    piCard.appendChild(psLbl);
    const psVal = txt('$' + ps.v + 'K', { size: 12, color: T.text, weight: 'Bold' }); psVal.x = piBarW - 20; psVal.y = py;
    piCard.appendChild(psVal);

    const piBg = frame('PiBg' + i, piBarW, 8, { fill: { r:0.882,g:0.906,b:0.933 }, radius: 4 });
    piBg.x = 16; piBg.y = py + 16;
    const piFg = frame('PiFg' + i, Math.round(piBarW * (ps.v / maxPi)), 8, { fill: ps.color, radius: 4 });
    piFg.x = 0; piFg.y = 0;
    piBg.appendChild(piFg);
    piCard.appendChild(piBg);
  }

  const piTotalLbl = txt('Total pipeline', { size: 10, color: T.textMuted }); piTotalLbl.x = 16; piTotalLbl.y = row1H - 40;
  piCard.appendChild(piTotalLbl);
  const piTotalVal = txt('$248K', { size: 20, color: T.text, weight: 'Bold' }); piTotalVal.x = 16; piTotalVal.y = row1H - 26;
  piCard.appendChild(piTotalVal);

  mf.appendChild(piCard);

  // -- ROW 2: Top Vendedores + Leads por Fuente + M�tricas R�pidas --
  const row2Y = row1Y + row1H + 14;
  const colW3 = Math.floor((CW - padX * 2 - 24) / 3);
  const row2H = 220;

  // Top Vendedores
  const tvCard = frame('Card / Top Vendedores', colW3, row2H, { fill: T.surface, radius: 10, stroke: T.border, strokeW: 1 });
  tvCard.x = CX + padX; tvCard.y = row2Y;
  const tvTitle = txt('Top Vendedores � Marzo', { size: 13, color: T.text, weight: 'Bold' }); tvTitle.x = 16; tvTitle.y = 14;
  tvCard.appendChild(tvTitle);

  const topReps = [
    { n:'Juan Mart�nez', r:'JM', deals:9, rev:'$48K', rate:'72%' },
    { n:'Roberto P�rez', r:'RP', deals:7, rev:'$36K', rate:'58%' },
    { n:'Carmen Garc�a', r:'CG', deals:6, rev:'$29K', rate:'50%' },
  ];
  for (let i = 0; i < topReps.length; i++) {
    const rp = topReps[i];
    const ry = 40 + i * 54;

    const rankT = txt(String(i + 1), { size: 18, color: T.border, weight: 'Bold' }); rankT.x = 12; rankT.y = ry;
    tvCard.appendChild(rankT);

    const avBg = frame('TvAv' + i, 32, 32, { fill: T.primary, radius: 16 });
    avBg.x = 34; avBg.y = ry;
    const avT = txt(rp.r, { size: 8, color: T.white, weight: 'Bold' }); avT.x = (32 - avT.width) / 2; avT.y = (32 - avT.height) / 2;
    avBg.appendChild(avT);
    tvCard.appendChild(avBg);

    const repName = txt(rp.n, { size: 12, color: T.text, weight: 'Bold' }); repName.x = 72; repName.y = ry + 2;
    tvCard.appendChild(repName);
    const repSub = txt(rp.deals + ' tratos � ' + rp.rev, { size: 10, color: T.textMuted }); repSub.x = 72; repSub.y = ry + 18;
    tvCard.appendChild(repSub);
    const repRate = txt(rp.rate, { size: 13, color: T.success, weight: 'Bold' }); repRate.x = colW3 - 48; repRate.y = ry + 8;
    tvCard.appendChild(repRate);

    if (i < 2) {
      const sepLine = rect(colW3 - 32, 1, T.border2); sepLine.x = 16; sepLine.y = ry + 46;
      tvCard.appendChild(sepLine);
    }
  }
  mf.appendChild(tvCard);

  // Leads por Fuente
  const lfCard = frame('Card / Leads Fuente', colW3, row2H, { fill: T.surface, radius: 10, stroke: T.border, strokeW: 1 });
  lfCard.x = CX + padX + colW3 + 12; lfCard.y = row2Y;
  const lfTitle = txt('Leads por Fuente', { size: 13, color: T.text, weight: 'Bold' }); lfTitle.x = 16; lfTitle.y = 14;
  lfCard.appendChild(lfTitle);

  const leadSources = [
    { l:'Email Campaign', v:32, color:T.primaryLight },
    { l:'LinkedIn',       v:24, color:{ r:0.055,g:0.463,b:0.659 } },
    { l:'Referidos',      v:20, color:T.success      },
    { l:'Website',        v:15, color:T.accent       },
    { l:'Otros',          v:9,  color:T.border       },
  ];
  const lfBarW = colW3 - 80;
  for (let i = 0; i < leadSources.length; i++) {
    const ls = leadSources[i];
    const lsy = 40 + i * 34;

    const lsDot = frame('LSDot' + i, 10, 10, { fill: ls.color, radius: 5 }); lsDot.x = 16; lsDot.y = lsy + 2;
    lfCard.appendChild(lsDot);
    const lsLbl = txt(ls.l, { size: 11, color: T.textMuted }); lsLbl.x = 30; lsLbl.y = lsy;
    lfCard.appendChild(lsLbl);
    const lsPct = txt(ls.v + '%', { size: 11, color: T.text, weight: 'Bold' }); lsPct.x = colW3 - 30; lsPct.y = lsy;
    lfCard.appendChild(lsPct);

    const lsBg = frame('LSBg' + i, lfBarW, 6, { fill: { r:0.918,g:0.929,b:0.941 }, radius: 3 });
    lsBg.x = 30; lsBg.y = lsy + 18;
    const lsFg = frame('LSFg' + i, Math.round(lfBarW * ls.v / 100), 6, { fill: ls.color, radius: 3 });
    lsFg.x = 0; lsFg.y = 0;
    lsBg.appendChild(lsFg);
    lfCard.appendChild(lsBg);
  }
  mf.appendChild(lfCard);

  // M�tricas R�pidas
  const mqCard = frame('Card / M�tricas R�pidas', colW3, row2H, { fill: T.surface, radius: 10, stroke: T.border, strokeW: 1 });
  mqCard.x = CX + padX + (colW3 + 12) * 2; mqCard.y = row2Y;
  const mqTitle = txt('M�tricas R�pidas', { size: 13, color: T.text, weight: 'Bold' }); mqTitle.x = 16; mqTitle.y = 14;
  mqCard.appendChild(mqTitle);

  const quickMetrics = [
    { l:'Valor promedio trato',    v:'$8,750', c:T.primaryLight },
    { l:'Leads nuevos este mes',   v:'47',     c:T.success      },
    { l:'Actividades completadas', v:'31',     c:T.accent       },
    { l:'Tickets resueltos',       v:'18',     c:T.purple       },
    { l:'NPS clientes',            v:'72',     c:T.success      },
    { l:'Retenci�n anual',         v:'91%',    c:T.primaryLight },
  ];
  for (let i = 0; i < quickMetrics.length; i++) {
    const qm = quickMetrics[i];
    const qmY2 = 38 + i * 28;

    const qmLbl = txt(qm.l, { size: 11, color: T.textMuted }); qmLbl.x = 16; qmLbl.y = qmY2;
    mqCard.appendChild(qmLbl);
    const qmVal = txt(qm.v, { size: 14, color: qm.c, weight: 'Bold' }); qmVal.x = colW3 - 52; qmVal.y = qmY2 - 1;
    mqCard.appendChild(qmVal);
    if (i < quickMetrics.length - 1) {
      const qmLine = rect(colW3 - 32, 1, T.border2); qmLine.x = 16; qmLine.y = qmY2 + 20;
      mqCard.appendChild(qmLine);
    }
  }
  mf.appendChild(mqCard);

  // -- MODAL ------------------------------------------------
  const modalNR = buildModalNuevoReporte();
  modalNR.x = 1500; modalNR.y = 900 + 100;
  mf.appendChild(modalNR);

  return { frame: mf, modalNR, btnNewRep };
}

// -----------------------------------------------------------
//  SESI�N 9 � NAVEGACI�N SIDEBAR + DETALLE CONTACTO
// -----------------------------------------------------------

// -----------------------------------------------------------
//  PROTOTYPE � Wiring de navegaci�n sidebar (todas las screens)
// -----------------------------------------------------------
function wireSidebarNavigation(frameMap) {
  // frameMap: { label: figmaFrameNode }
  // Finds every "NavItem {label}" node inside each source frame
  // and wires it to NAVIGATE to the corresponding target frame.
  for (const [srcLabel, srcFrame] of Object.entries(frameMap)) {
    if (!srcFrame) continue;
    let navItems;
    try {
      navItems = srcFrame.findAll(n => n.name && n.name.startsWith('NavItem '));
    } catch (e) { console.warn('findAll sidebar ' + srcLabel + ':', e); continue; }

    for (const navItem of navItems) {
      const destLabel = navItem.name.replace('NavItem ', '');
      const destFrame = frameMap[destLabel];
      if (!destFrame || destFrame === srcFrame) continue;
      try {
        navItem.reactions = [{
          actions: [{
            type: 'NODE',
            destinationId: destFrame.id,
            navigation: 'NAVIGATE',
            transition: {
              type: 'SLIDE_IN',
              duration: 0.25,
              easing: { type: 'EASE_IN_AND_OUT' },
              direction: 'LEFT',
            },
            preserveScrollPosition: false,
          }],
          trigger: { type: 'ON_CLICK' },
        }];
      } catch (e) { console.warn('nav wire ' + destLabel + ':', e); }
    }
  }
}

// -----------------------------------------------------------
//  PROTOTYPE � Wire table-row name links ? Detalle frame
// -----------------------------------------------------------
function wireRowLinks(sourceFrame, detalleFrame, namePrefix) {
  // Find all text nodes whose name starts with namePrefix
  let links;
  try {
    links = sourceFrame.findAll(n => n.name && n.name.startsWith(namePrefix));
  } catch (e) { console.warn('wireRowLinks findAll:', e); return; }

  for (const link of links) {
    try {
      link.reactions = [{
        actions: [{
          type: 'NODE',
          destinationId: detalleFrame.id,
          navigation: 'NAVIGATE',
          transition: {
            type: 'SLIDE_IN',
            duration: 0.25,
            easing: { type: 'EASE_IN_AND_OUT' },
            direction: 'LEFT',
          },
          preserveScrollPosition: false,
        }],
        trigger: { type: 'ON_CLICK' },
      }];
    } catch (e) { console.warn('wireRowLinks link:', e); }
  }
}

// -----------------------------------------------------------
//  PANTALLA � Detalle de Contacto
// -----------------------------------------------------------
async function buildDetalleContactoPage() {
  const PAGE_W = 1440;
  const PAGE_H = 900;
  const CX     = 260;
  const CW     = PAGE_W - CX;
  const padX   = 32;

  const mf = frame('|| Detalle � Juan P�rez Garc�a', PAGE_W, PAGE_H, { fill: T.bg });
  mf.clipsContent = true;

  const sb = buildSidebar('Contactos');
  sb.x = 0; sb.y = 0;
  mf.appendChild(sb);

  const hdr = buildHeader('Contactos');
  hdr.x = CX; hdr.y = 0;
  mf.appendChild(hdr);

  // -- Profile Banner --------------------------------------
  const bannerH = 110;
  const banner  = frame('Profile Banner', CW, bannerH, { fill: { r:0.055,g:0.133,b:0.251 }, radius: 0 });
  banner.x = CX; banner.y = 64;

  // Breadcrumb
  const bcTxt = txt('Contactos  /  Juan P�rez Garc�a', { size: 11, color: T.white });
  bcTxt.fills = solidPaint(T.white, 0.5);
  bcTxt.x = padX; bcTxt.y = 10;
  banner.appendChild(bcTxt);

  // Big avatar
  const bigAv = frame('BigAv', 64, 64, { fill: T.primaryLight, radius: 32 });
  bigAv.x = padX; bigAv.y = 30;
  const bigAvT = txt('JP', { size: 22, color: T.white, weight: 'Bold' });
  bigAvT.x = (64 - bigAvT.width) / 2; bigAvT.y = (64 - bigAvT.height) / 2;
  bigAv.appendChild(bigAvT);
  banner.appendChild(bigAv);

  // Name & role
  const nameTxt = txt('Juan P�rez Garc�a', { size: 22, color: T.white, weight: 'Bold' });
  nameTxt.x = padX + 78; nameTxt.y = 28;
  banner.appendChild(nameTxt);

  const roleTxt = txt('CEO  �  Tecno S.A.', { size: 13, color: T.white });
  roleTxt.fills = solidPaint(T.white, 0.65);
  roleTxt.x = padX + 78; roleTxt.y = 54;
  banner.appendChild(roleTxt);

  // Status chip
  const stBg = frame('StChip', 64, 22, { fill: T.success, radius: 11 });
  stBg.x = padX + 78; stBg.y = 74;
  const stT = txt('Cliente', { size: 10, color: T.white, weight: 'Bold' });
  stT.x = (64 - stT.width) / 2; stT.y = (22 - stT.height) / 2;
  stBg.appendChild(stT);
  banner.appendChild(stBg);

  // Action buttons on banner right
  const btnEmail  = button('|| Email',  'secondary');
  const btnCall   = button('|| Llamar', 'secondary');
  const btnEdit   = button('|| Editar', 'primary');
  btnEdit.name    = 'BtnEditarContacto';
  btnEmail.x = CW - 350; btnEmail.y = 42;
  btnCall.x  = CW - 238; btnCall.y = 42;
  btnEdit.x  = CW - 126; btnEdit.y = 42;
  banner.appendChild(btnEmail);
  banner.appendChild(btnCall);
  banner.appendChild(btnEdit);

  // Back button
  const backBtn = frame('BtnVolver', 88, 28, { fill: { r:1,g:1,b:1 }, radius: 6 });
  backBtn.fills = solidPaint(T.white, 0.12);
  backBtn.name  = 'Btn / Volver ? Contactos';
  backBtn.x = CW - 110; backBtn.y = 10;
  const backT = txt('? Volver', { size: 11, color: T.white, weight: 'Semi Bold' });
  backT.x = (88 - backT.width) / 2; backT.y = (28 - backT.height) / 2;
  backBtn.appendChild(backT);
  banner.appendChild(backBtn);

  mf.appendChild(banner);

  // -- TWO-COLUMN BODY ------------------------------------
  const bodyY  = 64 + bannerH + 16;
  const leftW  = 336;
  const rightW = CW - padX * 2 - leftW - 16;
  const leftX  = CX + padX;
  const rightX = leftX + leftW + 16;

  // -- LEFT: Contact Info Card -----------------------------
  const infoCard = frame('Card / Info Contacto', leftW, 272, { fill: T.surface, radius: 12, stroke: T.border, strokeW: 1 });
  infoCard.x = leftX; infoCard.y = bodyY;

  const infoTitle = txt('Informaci�n de contacto', { size: 13, color: T.text, weight: 'Bold' });
  infoTitle.x = 16; infoTitle.y = 14;
  infoCard.appendChild(infoTitle);

  const infoRows = [
    { ico:'||', l:'Email',           v:'j.perez@tecno.com'        },
    { ico:'||', l:'Tel�fono',        v:'+57 310 000 0001'         },
    { ico:'||', l:'Empresa',         v:'Tecno S.A.'               },
    { ico:'||', l:'Ciudad',          v:'Bogot�, Colombia'         },
    { ico:'||', l:'Fuente',          v:'Referido'                  },
    { ico:'||', l:'Propietario',     v:'Juan Mart�nez'             },
    { ico:'||', l:'Creado',          v:'15 Ene 2026'              },
  ];
  for (let i = 0; i < infoRows.length; i++) {
    const ir = infoRows[i];
    const iry = 40 + i * 32;
    const irIco = txt(ir.ico, { size: 12 }); irIco.x = 16; irIco.y = iry;
    infoCard.appendChild(irIco);
    const irL = txt(ir.l, { size: 10, color: T.textMuted }); irL.x = 38; irL.y = iry;
    infoCard.appendChild(irL);
    const irV = txt(ir.v, { size: 11, color: T.text, weight: 'Semi Bold' }); irV.x = 128; irV.y = iry;
    infoCard.appendChild(irV);
    if (i < infoRows.length - 1) {
      const irLine = rect(leftW - 32, 1, T.border2); irLine.x = 16; irLine.y = iry + 22;
      infoCard.appendChild(irLine);
    }
  }
  mf.appendChild(infoCard);

  // -- LEFT: Tags Card --------------------------------------
  const tagsCard = frame('Card / Etiquetas', leftW, 82, { fill: T.surface, radius: 12, stroke: T.border, strokeW: 1 });
  tagsCard.x = leftX; tagsCard.y = bodyY + 272 + 12;
  const tagsTitle = txt('Etiquetas', { size: 13, color: T.text, weight: 'Bold' });
  tagsTitle.x = 16; tagsTitle.y = 14;
  tagsCard.appendChild(tagsTitle);

  const tags = ['Decision maker', 'Key account', 'Referido'];
  let tagX = 16;
  for (const tg of tags) {
    const tgBg = frame('Tag ' + tg, 12 + tg.length * 5.8, 22, { fill: { r:0.859,g:0.914,b:0.996 }, radius: 6 });
    tgBg.x = tagX; tgBg.y = 44;
    const tgT = txt(tg, { size: 10, color: T.primaryLight, weight: 'Semi Bold' });
    tgT.x = 6; tgT.y = (22 - tgT.height) / 2;
    tgBg.appendChild(tgT);
    tagsCard.appendChild(tgBg);
    tagX += tgBg.width + 8;
  }
  mf.appendChild(tagsCard);

  // -- LEFT: Stats Card -------------------------------------
  const statsCard = frame('Card / Estad�sticas', leftW, 98, { fill: T.surface, radius: 12, stroke: T.border, strokeW: 1 });
  statsCard.x = leftX; statsCard.y = bodyY + 272 + 12 + 82 + 12;
  const statsTitle = txt('Actividad', { size: 13, color: T.text, weight: 'Bold' });
  statsTitle.x = 16; statsTitle.y = 14;
  statsCard.appendChild(statsTitle);

  const miniStats = [
    { l:'Oportunidades', v:'3'   },
    { l:'Actividades',   v:'12'  },
    { l:'Facturas',      v:'$68K'  },
  ];
  const msW = (leftW - 32) / 3;
  for (let i = 0; i < miniStats.length; i++) {
    const msX = 16 + i * msW;
    const msV = txt(miniStats[i].v, { size: 20, color: T.text, weight: 'Bold' });
    msV.x = msX + 6; msV.y = 38;
    statsCard.appendChild(msV);
    const msL = txt(miniStats[i].l, { size: 9, color: T.textMuted });
    msL.x = msX + 6; msL.y = 62;
    statsCard.appendChild(msL);
    if (i < 2) {
      const msDiv = rect(1, 44, T.border); msDiv.x = msX + msW - 1; msDiv.y = 36;
      statsCard.appendChild(msDiv);
    }
  }
  mf.appendChild(statsCard);

  // -- RIGHT: Activity Timeline -----------------------------
  const timelineH = 284;
  const tlCard = frame('Card / Actividad Reciente', rightW, timelineH, { fill: T.surface, radius: 12, stroke: T.border, strokeW: 1 });
  tlCard.x = rightX; tlCard.y = bodyY;

  const tlTitle = txt('Actividad Reciente', { size: 13, color: T.text, weight: 'Bold' });
  tlTitle.x = 16; tlTitle.y = 14;
  tlCard.appendChild(tlTitle);

  const tlBtnNew = button('+ Actividad', 'secondary');
  tlBtnNew.x = rightW - 110; tlBtnNew.y = 10;
  tlCard.appendChild(tlBtnNew);

  const tlItems = [
    { ico:'||', color:T.primaryLight, type:'Email enviado',      title:'"Propuesta Q1 2026 � seguimiento"',  time:'Hoy � 14:32',    who:'Juan Mart�nez' },
    { ico:'||', color:T.success,      type:'Llamada',             title:'"Demo del producto � 25 min"',        time:'Ayer � 10:15',   who:'Juan Mart�nez' },
    { ico:'||', color:T.accent,       type:'Reuni�n',             title:'"Presentaci�n ejecutiva equipo"',    time:'8 Mar � 09:00',  who:'Mar�a P�rez'   },
    { ico:'||', color:T.purple,       type:'Nota',                title:'"Cliente muy interesado en upgrade"', time:'5 Mar � 16:45',  who:'Juan Mart�nez' },
    { ico:'?', color:T.success,      type:'Tarea completada',    title:'"Enviar contrato NDA"',               time:'2 Mar � 11:00',  who:'Roberto P�rez' },
  ];
  for (let i = 0; i < tlItems.length; i++) {
    const it = tlItems[i];
    const ity = 40 + i * 46;

    // Vertical connector line
    if (i < tlItems.length - 1) {
      const vLine = rect(2, 46, T.border); vLine.x = 27; vLine.y = ity + 22;
      tlCard.appendChild(vLine);
    }

    // Dot
    const dot = frame('TLDot' + i, 18, 18, { fill: { r:0.859,g:0.941,b:0.996 }, radius: 9 });
    dot.x = 18; dot.y = ity + 5;
    const dotIco = txt(it.ico, { size: 10 }); dotIco.x = 3; dotIco.y = 3;
    dot.appendChild(dotIco);
    tlCard.appendChild(dot);

    // Content
    const itType = txt(it.type, { size: 10, color: T.textMuted }); itType.x = 46; itType.y = ity + 2;
    tlCard.appendChild(itType);
    const itTitle = txt(it.title, { size: 12, color: T.text, weight: 'Semi Bold' }); itTitle.x = 46; itTitle.y = ity + 16;
    tlCard.appendChild(itTitle);
    const itMeta = txt(it.time + '  �  ' + it.who, { size: 10, color: T.textMuted }); itMeta.x = 46; itMeta.y = ity + 32;
    tlCard.appendChild(itMeta);
  }
  mf.appendChild(tlCard);

  // -- RIGHT: Oportunidades relacionadas --------------------
  const oppCard = frame('Card / Oportunidades', rightW, 200, { fill: T.surface, radius: 12, stroke: T.border, strokeW: 1 });
  oppCard.x = rightX; oppCard.y = bodyY + timelineH + 14;

  const oppTitle = txt('Oportunidades Relacionadas', { size: 13, color: T.text, weight: 'Bold' });
  oppTitle.x = 16; oppTitle.y = 14;
  oppCard.appendChild(oppTitle);

  const relOps = [
    { n:'Contrato Enterprise 2026', val:'$45,000', stage:'Negociaci�n', pct:85, c:T.warning   },
    { n:'M�dulo Analytics Q2',      val:'$12,000', stage:'Propuesta',   pct:60, c:T.primaryLight },
    { n:'Licencias Pro x 20',       val:'$8,400',  stage:'Calificando', pct:35, c:T.purple     },
  ];
  for (let i = 0; i < relOps.length; i++) {
    const op = relOps[i];
    const opy = 40 + i * 50;
    const opNameT = txt(op.n, { size: 12, color: T.text, weight: 'Semi Bold' }); opNameT.x = 16; opNameT.y = opy;
    oppCard.appendChild(opNameT);
    const opValT = txt(op.val, { size: 14, color: T.success, weight: 'Bold' }); opValT.x = rightW - 80; opValT.y = opy;
    oppCard.appendChild(opValT);
    const opStageB = badge(op.stage, 'blue'); opStageB.x = 16; opStageB.y = opy + 18;
    oppCard.appendChild(opStageB);
    const pbBg = frame('OppPBg' + i, 180, 6, { fill: { r:0.882,g:0.902,b:0.933 }, radius: 3 });
    pbBg.x = rightW - 200; pbBg.y = opy + 22;
    const pbFg = frame('OppPFg' + i, Math.round(180 * op.pct / 100), 6, { fill: op.c, radius: 3 });
    pbFg.x = 0; pbFg.y = 0;
    pbBg.appendChild(pbFg);
    oppCard.appendChild(pbBg);
    const pctT = txt(op.pct + '%', { size: 10, color: op.c, weight: 'Bold' }); pctT.x = rightW - 32; pctT.y = opy + 20;
    oppCard.appendChild(pctT);
    if (i < relOps.length - 1) {
      const opLine = rect(rightW - 32, 1, T.border2); opLine.x = 16; opLine.y = opy + 40;
      oppCard.appendChild(opLine);
    }
  }
  mf.appendChild(oppCard);

  return { frame: mf, backBtn };
}

// -----------------------------------------------------------
//  SESI�N 10 � DETALLE OPORTUNIDAD + CUENTA + LEAD
// -----------------------------------------------------------

// -----------------------------------------------------------
//  PANTALLA � Detalle de Oportunidad
// -----------------------------------------------------------
async function buildDetalleOportunidadPage() {
  const PAGE_W = 1440, PAGE_H = 900, CX = 260, CW = PAGE_W - CX, padX = 32;

  const mf = frame('|| Detalle � Enterprise Plan - MegaTrade', PAGE_W, PAGE_H, { fill: T.bg });
  mf.clipsContent = true;

  const sb = buildSidebar('Oportunidades');
  sb.x = 0; sb.y = 0; mf.appendChild(sb);

  const hdr = buildHeader('Oportunidades');
  hdr.x = CX; hdr.y = 0; mf.appendChild(hdr);

  // Banner
  const banner = frame('Banner', CW, 110, { fill: { r:0.055,g:0.133,b:0.251 } });
  banner.x = CX; banner.y = 64;

  const bcT = txt('Oportunidades  /  Enterprise Plan - MegaTrade', { size: 11, color: T.white });
  bcT.fills = solidPaint(T.white, 0.5); bcT.x = padX; bcT.y = 10; banner.appendChild(bcT);

  const bigAvOp = frame('BigAv', 56, 56, { fill: T.warning, radius: 28 });
  bigAvOp.x = padX; bigAvOp.y = 34;
  const bigAvOpT = txt('MT', { size: 18, color: T.white, weight: 'Bold' });
  bigAvOpT.x = (56 - bigAvOpT.width) / 2; bigAvOpT.y = (56 - bigAvOpT.height) / 2;
  bigAvOp.appendChild(bigAvOpT); banner.appendChild(bigAvOp);

  const opTitle = txt('Enterprise Plan � MegaTrade', { size: 20, color: T.white, weight: 'Bold' });
  opTitle.x = padX + 68; opTitle.y = 32; banner.appendChild(opTitle);
  const opSub = txt('|| Negociaci�n  �  $42,000  �  Cierre esperado: 28 Mar 2026', { size: 12, color: T.white });
  opSub.fills = solidPaint(T.white, 0.65); opSub.x = padX + 68; opSub.y = 56; banner.appendChild(opSub);
  const probBg = frame('ProbChip', 72, 22, { fill: T.warning, radius: 11 });
  probBg.x = padX + 68; probBg.y = 76;
  const probT = txt('75% prob.', { size: 10, color: T.white, weight: 'Bold' });
  probT.x = (72 - probT.width) / 2; probT.y = (22 - probT.height) / 2;
  probBg.appendChild(probT); banner.appendChild(probBg);

  const backBtnOp = frame('Btn / Volver ? Oportunidades', 88, 28, { fill: T.surface, radius: 6 });
  backBtnOp.fills = solidPaint(T.white, 0.12);
  backBtnOp.x = CW - 110; backBtnOp.y = 10;
  const backOpT = txt('? Volver', { size: 11, color: T.white, weight: 'Semi Bold' });
  backOpT.x = (88 - backOpT.width) / 2; backOpT.y = (28 - backOpT.height) / 2;
  backBtnOp.appendChild(backOpT); banner.appendChild(backBtnOp);

  const btnEditOp = button('|| Editar', 'primary');
  btnEditOp.x = CW - 126; btnEditOp.y = 44; banner.appendChild(btnEditOp);
  mf.appendChild(banner);

  // Stage stepper
  const stageBarY = 64 + 110 + 12;
  const stages = ['Prospecci�n', 'Calificaci�n', 'Propuesta', 'Negociaci�n', 'Ganado'];
  const stageColors = [
    { r:0.012,g:0.522,b:0.780 }, { r:0.486,g:0.227,b:0.929 },
    { r:0.784,g:0.647,b:0.345 }, { r:0.851,g:0.592,b:0.027 }, { r:0.086,g:0.639,b:0.243 },
  ];
  const activeStage = 3; // Negociaci�n (0-indexed)
  const stepW = Math.floor((CW - padX * 2) / stages.length);
  const stageCard = frame('Card / Etapas', CW - padX * 2, 52, { fill: T.surface, radius: 10, stroke: T.border, strokeW: 1 });
  stageCard.x = CX + padX; stageCard.y = stageBarY;
  for (let i = 0; i < stages.length; i++) {
    const active   = i <= activeStage;
    const isCurrent = i === activeStage;
    const segBg = frame('Seg' + i, stepW, 52, {
      fill: isCurrent ? stageColors[i] : (active ? { r:0.898,g:0.949,b:0.996 } : T.surface)
    });
    segBg.x = i * stepW; segBg.y = 0;
    const segT = txt(stages[i], { size: 11, color: isCurrent ? T.white : (active ? T.primaryLight : T.textMuted), weight: isCurrent ? 'Bold' : 'Medium' });
    segT.x = (stepW - segT.width) / 2; segT.y = (52 - segT.height) / 2;
    segBg.appendChild(segT);
    stageCard.appendChild(segBg);
    if (i < stages.length - 1) {
      const segDiv = rect(1, 52, T.border); segDiv.x = (i + 1) * stepW - 1; segDiv.y = 0;
      stageCard.appendChild(segDiv);
    }
  }
  mf.appendChild(stageCard);

  // Body
  const bodyY  = stageBarY + 52 + 14;
  const leftW  = 320;
  const rightW = CW - padX * 2 - leftW - 16;
  const leftX  = CX + padX;
  const rightX = leftX + leftW + 16;

  // Left: Info card
  const infoCardOp = frame('Card / Info Op', leftW, 262, { fill: T.surface, radius: 12, stroke: T.border, strokeW: 1 });
  infoCardOp.x = leftX; infoCardOp.y = bodyY;
  const infoTitleOp = txt('Detalles de la Oportunidad', { size: 13, color: T.text, weight: 'Bold' });
  infoTitleOp.x = 16; infoTitleOp.y = 14; infoCardOp.appendChild(infoTitleOp);
  const opInfoRows = [
    { ico:'||', l:'Valor',            v:'$42,000'       },
    { ico:'||', l:'Cuenta',           v:'MegaTrade'     },
    { ico:'||', l:'Contacto',         v:'Luis Torres'   },
    { ico:'||', l:'Responsable',      v:'Carlos V.'     },
    { ico:'||', l:'Fuente',           v:'Llamada fr�a'  },
    { ico:'||', l:'Fecha cierre',     v:'28 Mar 2026'   },
    { ico:'||', l:'Probabilidad',     v:'75%'           },
  ];
  for (let i = 0; i < opInfoRows.length; i++) {
    const ir = opInfoRows[i];
    const iry = 40 + i * 30;
    const irI = txt(ir.ico, { size: 11 }); irI.x = 16; irI.y = iry; infoCardOp.appendChild(irI);
    const irL = txt(ir.l, { size: 10, color: T.textMuted }); irL.x = 36; irL.y = iry; infoCardOp.appendChild(irL);
    const irV = txt(ir.v, { size: 11, color: T.text, weight: 'Semi Bold' }); irV.x = 128; irV.y = iry; infoCardOp.appendChild(irV);
    if (i < opInfoRows.length - 1) { const irLine = rect(leftW - 32, 1, T.border2); irLine.x = 16; irLine.y = iry + 22; infoCardOp.appendChild(irLine); }
  }
  mf.appendChild(infoCardOp);

  // Left: Forecast card
  const fcCard = frame('Card / Forecast', leftW, 110, { fill: T.surface, radius: 12, stroke: T.border, strokeW: 1 });
  fcCard.x = leftX; fcCard.y = bodyY + 262 + 12;
  const fcTitle = txt('Forecast', { size: 13, color: T.text, weight: 'Bold' }); fcTitle.x = 16; fcTitle.y = 14; fcCard.appendChild(fcTitle);
  const fcVal = txt('$31,500', { size: 26, color: T.success, weight: 'Bold' }); fcVal.x = 16; fcVal.y = 36; fcCard.appendChild(fcVal);
  const fcSub = txt('Valor ponderado (75% � $42,000)', { size: 10, color: T.textMuted }); fcSub.x = 16; fcSub.y = 68; fcCard.appendChild(fcSub);
  const fcBar = progressBar(leftW - 32, 8, 75, T.warning, T.border);
  fcBar.x = 16; fcBar.y = 84; fcCard.appendChild(fcBar);
  mf.appendChild(fcCard);

  // Right: Activity timeline
  const tlCardOp = frame('Card / Timeline Op', rightW, 262, { fill: T.surface, radius: 12, stroke: T.border, strokeW: 1 });
  tlCardOp.x = rightX; tlCardOp.y = bodyY;
  const tlTitleOp = txt('Actividad Reciente', { size: 13, color: T.text, weight: 'Bold' }); tlTitleOp.x = 16; tlTitleOp.y = 14; tlCardOp.appendChild(tlTitleOp);
  const tlItems2 = [
    { ico:'||', t:'Email',      d:'"Propuesta de contrato Enterprise"',    m:'Hoy � 11:30 � Carlos V.'  },
    { ico:'||', t:'Llamada',    d:'"Revisi�n de t�rminos � 40 min"',       m:'Ayer � 16:00 � Carlos V.' },
    { ico:'||', t:'Reuni�n',    d:'"Demo t�cnica con equipo MegaTrade"',   m:'7 Mar � 10:00 � Mar�a P.' },
    { ico:'||', t:'Nota',       d:'"Requieren personalizaci�n m�dulo HR"', m:'5 Mar � 09:20 � Carlos V.'},
    { ico:'?', t:'Tarea',      d:'"Enviar propuesta revisada v2"',        m:'3 Mar � 14:00 � Carlos V.'},
  ];
  for (let i = 0; i < tlItems2.length; i++) {
    const it = tlItems2[i];
    const ity = 40 + i * 44;
    if (i < tlItems2.length - 1) { const vl = rect(2, 44, T.border); vl.x = 25; vl.y = ity + 18; tlCardOp.appendChild(vl); }
    const d = frame('TLDot' + i, 16, 16, { fill: { r:0.859,g:0.941,b:0.996 }, radius: 8 });
    d.x = 17; d.y = ity + 4;
    const di = txt(it.ico, { size: 9 }); di.x = 2; di.y = 3; d.appendChild(di); tlCardOp.appendChild(d);
    const iT = txt(it.t,  { size: 9,  color: T.textMuted }); iT.x = 42; iT.y = ity; tlCardOp.appendChild(iT);
    const iD = txt(it.d,  { size: 11, color: T.text, weight: 'Semi Bold' }); iD.x = 42; iD.y = ity + 13; tlCardOp.appendChild(iD);
    const iM = txt(it.m,  { size: 9,  color: T.textMuted }); iM.x = 42; iM.y = ity + 28; tlCardOp.appendChild(iM);
  }
  mf.appendChild(tlCardOp);

  // Right: Related contacts
  const rContCard = frame('Card / Contactos Vinculados', rightW, 120, { fill: T.surface, radius: 12, stroke: T.border, strokeW: 1 });
  rContCard.x = rightX; rContCard.y = bodyY + 262 + 12;
  const rContTitle = txt('Contactos Vinculados', { size: 13, color: T.text, weight: 'Bold' }); rContTitle.x = 16; rContTitle.y = 14; rContCard.appendChild(rContTitle);
  const rCont = [
    { n:'Luis Torres', r:'Director Comercial', init:'LT' },
    { n:'Ana Garc�a',  r:'Gerente de Compras', init:'AG' },
  ];
  for (let i = 0; i < rCont.length; i++) {
    const rc = rCont[i];
    const rcy = 40 + i * 36;
    const rcAv = frame('RCAv' + i, 26, 26, { fill: T.primary, radius: 13 }); rcAv.x = 16; rcAv.y = rcy;
    const rcAT = txt(rc.init, { size: 8, color: T.white, weight: 'Bold' }); rcAT.x = (26 - rcAT.width) / 2; rcAT.y = (26 - rcAT.height) / 2; rcAv.appendChild(rcAT); rContCard.appendChild(rcAv);
    const rcN = txt(rc.n, { size: 12, color: T.text, weight: 'Semi Bold' }); rcN.x = 50; rcN.y = rcy + 2; rContCard.appendChild(rcN);
    const rcR = txt(rc.r, { size: 10, color: T.textMuted }); rcR.x = 50; rcR.y = rcy + 17; rContCard.appendChild(rcR);
    if (i < rCont.length - 1) { const rcLine = rect(rightW - 32, 1, T.border2); rcLine.x = 16; rcLine.y = rcy + 28; rContCard.appendChild(rcLine); }
  }
  mf.appendChild(rContCard);

  return { frame: mf, backBtn: backBtnOp };
}

// -----------------------------------------------------------
//  PANTALLA � Detalle de Cuenta
// -----------------------------------------------------------
async function buildDetalleCuentaPage() {
  const PAGE_W = 1440, PAGE_H = 900, CX = 260, CW = PAGE_W - CX, padX = 32;

  const mf = frame('|| Detalle � Tecno S.A.', PAGE_W, PAGE_H, { fill: T.bg });
  mf.clipsContent = true;

  const sb = buildSidebar('Cuentas');
  sb.x = 0; sb.y = 0; mf.appendChild(sb);
  const hdr = buildHeader('Cuentas');
  hdr.x = CX; hdr.y = 0; mf.appendChild(hdr);

  // Banner
  const bannerC = frame('Banner', CW, 110, { fill: { r:0.055,g:0.133,b:0.251 } });
  bannerC.x = CX; bannerC.y = 64;
  const bcTC = txt('Cuentas  /  Tecno S.A.', { size: 11, color: T.white }); bcTC.fills = solidPaint(T.white, 0.5); bcTC.x = padX; bcTC.y = 10; bannerC.appendChild(bcTC);
  const bigAvC = frame('BigAv', 56, 56, { fill: T.primaryLight, radius: 14 }); bigAvC.x = padX; bigAvC.y = 34;
  const bigAvCT = txt('TS', { size: 18, color: T.white, weight: 'Bold' }); bigAvCT.x = (56 - bigAvCT.width) / 2; bigAvCT.y = (56 - bigAvCT.height) / 2; bigAvC.appendChild(bigAvCT); bannerC.appendChild(bigAvC);
  const accTitle = txt('Tecno S.A.', { size: 20, color: T.white, weight: 'Bold' }); accTitle.x = padX + 68; accTitle.y = 32; bannerC.appendChild(accTitle);
  const accSub = txt('Tecnolog�a  �  8 contactos  �  Revenue: $34,200', { size: 12, color: T.white }); accSub.fills = solidPaint(T.white, 0.65); accSub.x = padX + 68; accSub.y = 56; bannerC.appendChild(accSub);
  const accBg = frame('AccCh', 62, 22, { fill: T.success, radius: 11 }); accBg.x = padX + 68; accBg.y = 76;
  const accBT = txt('Cliente', { size: 10, color: T.white, weight: 'Bold' }); accBT.x = (62 - accBT.width) / 2; accBT.y = (22 - accBT.height) / 2; accBg.appendChild(accBT); bannerC.appendChild(accBg);
  const backBtnC = frame('Btn / Volver ? Cuentas', 88, 28, { fill: T.surface, radius: 6 }); backBtnC.fills = solidPaint(T.white, 0.12); backBtnC.x = CW - 110; backBtnC.y = 10;
  const backCT = txt('? Volver', { size: 11, color: T.white, weight: 'Semi Bold' }); backCT.x = (88 - backCT.width) / 2; backCT.y = (28 - backCT.height) / 2; backBtnC.appendChild(backCT); bannerC.appendChild(backBtnC);
  const btnEditC = button('|| Editar', 'primary'); btnEditC.x = CW - 126; btnEditC.y = 44; bannerC.appendChild(btnEditC);
  mf.appendChild(bannerC);

  const bodyYC = 64 + 110 + 16;
  const leftWC = 320, rightWC = CW - padX * 2 - leftWC - 16;
  const leftXC = CX + padX, rightXC = leftXC + leftWC + 16;

  // Left: Account info card
  const aicCard = frame('Card / Info Cuenta', leftWC, 250, { fill: T.surface, radius: 12, stroke: T.border, strokeW: 1 });
  aicCard.x = leftXC; aicCard.y = bodyYC;
  const aicTitle = txt('Informaci�n de la Cuenta', { size: 13, color: T.text, weight: 'Bold' }); aicTitle.x = 16; aicTitle.y = 14; aicCard.appendChild(aicTitle);
  const aicRows = [
    { ico:'||', l:'Industria',    v:'Tecnolog�a'             },
    { ico:'||?', l:'Tipo',         v:'Cliente'                },
    { ico:'||', l:'Propietario',  v:'Carlos V.'              },
    { ico:'||', l:'Web',          v:'tecno-sa.com'           },
    { ico:'||', l:'Tel�fono',     v:'+57 1 800 0001'         },
    { ico:'||', l:'Ciudad',       v:'Bogot�, Colombia'       },
    { ico:'||', l:'Potencial',    v:'$80,000 ARR'            },
  ];
  for (let i = 0; i < aicRows.length; i++) {
    const r = aicRows[i]; const ry = 40 + i * 28;
    const rI = txt(r.ico, { size: 11 }); rI.x = 16; rI.y = ry; aicCard.appendChild(rI);
    const rL = txt(r.l, { size: 10, color: T.textMuted }); rL.x = 36; rL.y = ry; aicCard.appendChild(rL);
    const rV = txt(r.v, { size: 11, color: T.text, weight: 'Semi Bold' }); rV.x = 120; rV.y = ry; aicCard.appendChild(rV);
    if (i < aicRows.length - 1) { const rl = rect(leftWC - 32, 1, T.border2); rl.x = 16; rl.y = ry + 20; aicCard.appendChild(rl); }
  }
  mf.appendChild(aicCard);

  // Left: Revenue stats mini
  const revCard = frame('Card / Revenue', leftWC, 108, { fill: T.surface, radius: 12, stroke: T.border, strokeW: 1 });
  revCard.x = leftXC; revCard.y = bodyYC + 250 + 12;
  const revTitle = txt('Revenue & Pipeline', { size: 13, color: T.text, weight: 'Bold' }); revTitle.x = 16; revTitle.y = 14; revCard.appendChild(revTitle);
  const revMetrics = [
    { l:'Revenue acumulado', v:'$34,200', c:T.success },
    { l:'Pipeline activo',   v:'$45,000', c:T.warning },
    { l:'�ltima factura',    v:'$8,500',  c:T.primaryLight },
  ];
  for (let i = 0; i < revMetrics.length; i++) {
    const rm = revMetrics[i]; const rmy = 38 + i * 22;
    const rmL = txt(rm.l, { size: 10, color: T.textMuted }); rmL.x = 16; rmL.y = rmy; revCard.appendChild(rmL);
    const rmV = txt(rm.v, { size: 12, color: rm.c, weight: 'Bold' }); rmV.x = leftWC - 72; rmV.y = rmy; revCard.appendChild(rmV);
    if (i < revMetrics.length - 1) { const rl = rect(leftWC - 32, 1, T.border2); rl.x = 16; rl.y = rmy + 16; revCard.appendChild(rl); }
  }
  mf.appendChild(revCard);

  // Right: Contacts at this account
  const contTableH = 250;
  const contCard = frame('Card / Contactos Cuenta', rightWC, contTableH, { fill: T.surface, radius: 12, stroke: T.border, strokeW: 1 });
  contCard.x = rightXC; contCard.y = bodyYC;
  const contTitle = txt('Contactos en Tecno S.A.', { size: 13, color: T.text, weight: 'Bold' }); contTitle.x = 16; contTitle.y = 14; contCard.appendChild(contTitle);
  const ctaBtn = button('+ Contacto', 'secondary'); ctaBtn.x = rightWC - 100; ctaBtn.y = 10; contCard.appendChild(ctaBtn);
  const accContacts = [
    { n:'Carlos Ruiz',      r:'CEO',                init:'CR', sc:'green'  },
    { n:'Marta Torres',     r:'CTO',                init:'MT', sc:'green'  },
    { n:'Felipe Garc�a',    r:'Dir. Finanzas',       init:'FG', sc:'yellow' },
    { n:'Ana Quintero',     r:'Gerente Compras',     init:'AQ', sc:'green'  },
    { n:'Ricardo Blanco',   r:'Analista TI',         init:'RB', sc:'gray'   },
  ];
  const acCols = [
    { label:'Nombre',    x:16  },
    { label:'Cargo',     x:210 },
    { label:'Estado',    x:380 },
    { label:'Acciones',  x:460 },
  ];
  tableHeader(contCard, acCols, 36, rightWC);
  let acRY = 66;
  for (const cc of accContacts) {
    const acRow = frame('ACRow', rightWC, 36, { fill: T.surface }); acRow.x = 0; acRow.y = acRY;
    const acAv = frame('Av', 24, 24, { fill: T.primary, radius: 12 }); acAv.x = acCols[0].x; acAv.y = 6;
    const acAvT = txt(cc.init, { size: 8, color: T.white, weight: 'Bold' }); acAvT.x = (24 - acAvT.width) / 2; acAvT.y = (24 - acAvT.height) / 2; acAv.appendChild(acAvT); acRow.appendChild(acAv);
    const acN = txt(cc.n, { size: 12, color: T.text, weight: 'Semi Bold' }); acN.x = acCols[0].x + 30; acN.y = 11; acRow.appendChild(acN);
    const acR = txt(cc.r, { size: 11, color: T.textMuted }); acR.x = acCols[1].x; acR.y = 11; acRow.appendChild(acR);
    const scColors3 = { green: T.success, yellow: T.warning, gray: T.textMuted };
    const scDot = frame('Dot', 8, 8, { fill: scColors3[cc.sc] || T.textMuted, radius: 4 }); scDot.x = acCols[2].x; scDot.y = 14; acRow.appendChild(scDot);
    const scT = txt(cc.sc === 'green' ? 'En l�nea' : cc.sc === 'yellow' ? 'Ausente' : 'Inactivo', { size: 10, color: T.textMuted }); scT.x = acCols[2].x + 12; scT.y = 11; acRow.appendChild(scT);
    const viewT = txt('Ver', { size: 11, color: T.primaryLight, weight: 'Semi Bold' }); viewT.x = acCols[3].x; viewT.y = 11; acRow.appendChild(viewT);
    const acLine = rect(rightWC, 1, T.border2); acLine.x = 0; acLine.y = 35; acRow.appendChild(acLine);
    contCard.appendChild(acRow); acRY += 36;
  }
  mf.appendChild(contCard);

  // Right: Linked Opportunities
  const ropCard = frame('Card / Ops Cuenta', rightWC, 120, { fill: T.surface, radius: 12, stroke: T.border, strokeW: 1 });
  ropCard.x = rightXC; ropCard.y = bodyYC + contTableH + 12;
  const ropTitle = txt('Oportunidades Activas', { size: 13, color: T.text, weight: 'Bold' }); ropTitle.x = 16; ropTitle.y = 14; ropCard.appendChild(ropTitle);
  const ropItems = [
    { n:'Software Suite - Tecno S.A.', v:'$28,500', s:'Propuesta',  c:T.accent  },
    { n:'Soporte Anual 2026',          v:'$12,000', s:'Negociaci�n',c:T.warning },
  ];
  for (let i = 0; i < ropItems.length; i++) {
    const ro = ropItems[i]; const roy = 38 + i * 36;
    const roN = txt(ro.n, { size: 12, color: T.text, weight: 'Semi Bold' }); roN.x = 16; roN.y = roy; ropCard.appendChild(roN);
    const roV = txt(ro.v, { size: 13, color: T.success, weight: 'Bold' }); roV.x = rightWC - 72; roV.y = roy; ropCard.appendChild(roV);
    const roS = badge(ro.s, 'blue'); roS.x = 16; roS.y = roy + 16; ropCard.appendChild(roS);
    if (i < ropItems.length - 1) { const rol = rect(rightWC - 32, 1, T.border2); rol.x = 16; rol.y = roy + 28; ropCard.appendChild(rol); }
  }
  mf.appendChild(ropCard);

  return { frame: mf, backBtn: backBtnC };
}

// -----------------------------------------------------------
//  PANTALLA � Detalle de Lead
// -----------------------------------------------------------
async function buildDetalleLeadPage() {
  const PAGE_W = 1440, PAGE_H = 900, CX = 260, CW = PAGE_W - CX, padX = 32;

  const mf = frame('|| Detalle � Roberto Jim�nez', PAGE_W, PAGE_H, { fill: T.bg });
  mf.clipsContent = true;

  const sb = buildSidebar('Leads');
  sb.x = 0; sb.y = 0; mf.appendChild(sb);
  const hdr = buildHeader('Leads');
  hdr.x = CX; hdr.y = 0; mf.appendChild(hdr);

  // Banner
  const bannerL = frame('Banner', CW, 110, { fill: { r:0.055,g:0.133,b:0.251 } });
  bannerL.x = CX; bannerL.y = 64;
  const bcTL = txt('Leads  /  Roberto Jim�nez', { size: 11, color: T.white }); bcTL.fills = solidPaint(T.white, 0.5); bcTL.x = padX; bcTL.y = 10; bannerL.appendChild(bcTL);
  const bigAvL = frame('BigAv', 56, 56, { fill: T.accent, radius: 28 }); bigAvL.x = padX; bigAvL.y = 34;
  const bigAvLT = txt('RJ', { size: 18, color: T.white, weight: 'Bold' }); bigAvLT.x = (56 - bigAvLT.width) / 2; bigAvLT.y = (56 - bigAvLT.height) / 2; bigAvL.appendChild(bigAvLT); bannerL.appendChild(bigAvL);
  const leadTitle = txt('Roberto Jim�nez', { size: 20, color: T.white, weight: 'Bold' }); leadTitle.x = padX + 68; leadTitle.y = 32; bannerL.appendChild(leadTitle);
  const leadSub = txt('Alpha IT  �  Sitio Web  �  Creado: Hoy', { size: 12, color: T.white }); leadSub.fills = solidPaint(T.white, 0.65); leadSub.x = padX + 68; leadSub.y = 56; bannerL.appendChild(leadSub);
  const nuevoChip = frame('NuevoCh', 52, 22, { fill: T.primaryLight, radius: 11 }); nuevoChip.x = padX + 68; nuevoChip.y = 76;
  const nChT = txt('Nuevo', { size: 10, color: T.white, weight: 'Bold' }); nChT.x = (52 - nChT.width) / 2; nChT.y = (22 - nChT.height) / 2; nuevoChip.appendChild(nChT); bannerL.appendChild(nuevoChip);
  // Score chip
  const scoreChip = frame('ScoreCh', 76, 22, { fill: T.success, radius: 11 }); scoreChip.x = padX + 130; scoreChip.y = 76;
  const scoreChT = txt('Score: 82', { size: 10, color: T.white, weight: 'Bold' }); scoreChT.x = (76 - scoreChT.width) / 2; scoreChT.y = (22 - scoreChT.height) / 2; scoreChip.appendChild(scoreChT); bannerL.appendChild(scoreChip);
  const backBtnL = frame('Btn / Volver ? Leads', 88, 28, { fill: T.surface, radius: 6 }); backBtnL.fills = solidPaint(T.white, 0.12); backBtnL.x = CW - 110; backBtnL.y = 10;
  const backLT = txt('? Volver', { size: 11, color: T.white, weight: 'Semi Bold' }); backLT.x = (88 - backLT.width) / 2; backLT.y = (28 - backLT.height) / 2; backBtnL.appendChild(backLT); bannerL.appendChild(backBtnL);
  const btnConvL = button('|| Convertir Lead', 'primary'); btnConvL.x = CW - 176; btnConvL.y = 44; bannerL.appendChild(btnConvL);
  mf.appendChild(bannerL);

  const bodyYL = 64 + 110 + 16;
  const leftWL = 320, rightWL = CW - padX * 2 - leftWL - 16;
  const leftXL = CX + padX, rightXL = leftXL + leftWL + 16;

  // Left: Lead info
  const linfoCard = frame('Card / Info Lead', leftWL, 240, { fill: T.surface, radius: 12, stroke: T.border, strokeW: 1 });
  linfoCard.x = leftXL; linfoCard.y = bodyYL;
  const linfoTitle = txt('Informaci�n del Lead', { size: 13, color: T.text, weight: 'Bold' }); linfoTitle.x = 16; linfoTitle.y = 14; linfoCard.appendChild(linfoTitle);
  const leadInfoRows = [
    { ico:'||', l:'Email',       v:'r.jimenez@alphait.com' },
    { ico:'||', l:'Tel�fono',    v:'+57 311 222 3344'      },
    { ico:'||', l:'Empresa',     v:'Alpha IT'              },
    { ico:'||', l:'Fuente',      v:'Sitio Web'             },
    { ico:'||', l:'Campa�a',     v:'Q1 Email'              },
    { ico:'||', l:'Propietario', v:'Carlos V.'             },
    { ico:'||', l:'Creado',      v:'Hoy � 09:14'          },
  ];
  for (let i = 0; i < leadInfoRows.length; i++) {
    const lr = leadInfoRows[i]; const lry = 40 + i * 28;
    const lrI = txt(lr.ico, { size: 11 }); lrI.x = 16; lrI.y = lry; linfoCard.appendChild(lrI);
    const lrL = txt(lr.l, { size: 10, color: T.textMuted }); lrL.x = 36; lrL.y = lry; linfoCard.appendChild(lrL);
    const lrV = txt(lr.v, { size: 11, color: T.text, weight: 'Semi Bold' }); lrV.x = 116; lrV.y = lry; linfoCard.appendChild(lrV);
    if (i < leadInfoRows.length - 1) { const lrl = rect(leftWL - 32, 1, T.border2); lrl.x = 16; lrl.y = lry + 20; linfoCard.appendChild(lrl); }
  }
  mf.appendChild(linfoCard);

  // Left: Lead Score gauge card
  const lscCard = frame('Card / Lead Score', leftWL, 130, { fill: T.surface, radius: 12, stroke: T.border, strokeW: 1 });
  lscCard.x = leftXL; lscCard.y = bodyYL + 240 + 12;
  const lscTitle = txt('Lead Score', { size: 13, color: T.text, weight: 'Bold' }); lscTitle.x = 16; lscTitle.y = 14; lscCard.appendChild(lscTitle);
  const scoreVal = txt('82', { size: 40, color: T.success, weight: 'Bold' }); scoreVal.x = 16; scoreVal.y = 32; lscCard.appendChild(scoreVal);
  const scoreLabel = txt('/ 100 � Calidad Alta', { size: 11, color: T.textMuted }); scoreLabel.x = 16; scoreLabel.y = 80; lscCard.appendChild(scoreLabel);
  const scorePB = progressBar(leftWL - 32, 10, 82, T.success, T.border);
  scorePB.x = 16; scorePB.y = 96; lscCard.appendChild(scorePB);
  const scoreFactors = [
    { l:'Cargo ejecutivo',  v:'+20' },
    { l:'Empresa tama�o M', v:'+18' },
    { l:'Inter�s en demo',  v:'+15' },
  ];
  const sfY = 110;
  // mini rows below bar
  mf.appendChild(lscCard);

  // Right: Calificaci�n form + notes
  const qualCard = frame('Card / Calificaci�n', rightWL, 260, { fill: T.surface, radius: 12, stroke: T.border, strokeW: 1 });
  qualCard.x = rightXL; qualCard.y = bodyYL;
  const qualTitle = txt('Calificaci�n BANT', { size: 13, color: T.text, weight: 'Bold' }); qualTitle.x = 16; qualTitle.y = 14; qualCard.appendChild(qualTitle);
  const bantItems = [
    { l:'Presupuesto (Budget)',       v:'$15,000�$20,000 estimado',  ico:'||', pct:70 },
    { l:'Autoridad (Authority)',      v:'Tomador de decisiones',      ico:'||', pct:90 },
    { l:'Necesidad (Need)',           v:'Migraci�n a la nube',        ico:'||', pct:85 },
    { l:'Tiempo (Timeline)',          v:'Q2 2026 � urgente',         ico:'?',  pct:75 },
  ];
  for (let i = 0; i < bantItems.length; i++) {
    const bi = bantItems[i]; const biy = 40 + i * 50;
    const biI = txt(bi.ico, { size: 14 }); biI.x = 16; biI.y = biy; qualCard.appendChild(biI);
    const biL = txt(bi.l, { size: 10, color: T.textMuted }); biL.x = 36; biL.y = biy; qualCard.appendChild(biL);
    const biV = txt(bi.v, { size: 11, color: T.text, weight: 'Semi Bold' }); biV.x = 36; biV.y = biy + 14; qualCard.appendChild(biV);
    const biPB = progressBar(rightWL - 200, 6, bi.pct, T.primaryLight, T.border);
    biPB.x = rightWL - 184; biPB.y = biy + 8; qualCard.appendChild(biPB);
    const biPct = txt(bi.pct + '%', { size: 10, color: T.primaryLight, weight: 'Bold' }); biPct.x = rightWL - 36; biPct.y = biy + 6; qualCard.appendChild(biPct);
    if (i < bantItems.length - 1) { const bil = rect(rightWL - 32, 1, T.border2); bil.x = 16; bil.y = biy + 38; qualCard.appendChild(bil); }
  }
  mf.appendChild(qualCard);

  // Right: Notes / Timeline
  const notesCard = frame('Card / Notes Lead', rightWL, 118, { fill: T.surface, radius: 12, stroke: T.border, strokeW: 1 });
  notesCard.x = rightXL; notesCard.y = bodyYL + 260 + 12;
  const notesTitle = txt('Notas y Seguimiento', { size: 13, color: T.text, weight: 'Bold' }); notesTitle.x = 16; notesTitle.y = 14; notesCard.appendChild(notesTitle);
  const notesItems2 = [
    { t:'Lead ingres� por formulario web � inter�s en m�dulo Cloud',  m:'Hoy � 09:14' },
    { t:'Se le enviar� email de bienvenida autom�tico en 1h',          m:'Hoy � 09:15' },
    { t:'Primer contacto programado para ma�ana 10:00',               m:'Pendiente'    },
  ];
  for (let i = 0; i < notesItems2.length; i++) {
    const ni = notesItems2[i]; const niy = 36 + i * 26;
    const niDot = frame('Dot', 7, 7, { fill: T.primaryLight, radius: 4 }); niDot.x = 16; niDot.y = niy + 4; notesCard.appendChild(niDot);
    const niT = txt(ni.t, { size: 10, color: T.text }); niT.x = 30; niT.y = niy; notesCard.appendChild(niT);
    const niM = txt(ni.m, { size: 9, color: T.textMuted }); niM.x = rightWL - 80; niM.y = niy; notesCard.appendChild(niM);
  }
  mf.appendChild(notesCard);

  return { frame: mf, backBtn: backBtnL };
}

// -----------------------------------------------------------
//  SESI�N 11 � DETALLE ACTIVIDAD + PRODUCTO + COTIZACI�N
// -----------------------------------------------------------

// -----------------------------------------------------------
//  PANTALLA � Detalle de Actividad
// -----------------------------------------------------------
async function buildDetalleActividadPage() {
  const PAGE_W = 1440, PAGE_H = 900, CX = 260, CW = PAGE_W - CX, padX = 32;

  const mf = frame('|| Detalle � Seguimiento propuesta', PAGE_W, PAGE_H, { fill: T.bg });
  mf.clipsContent = true;

  const sb = buildSidebar('Actividades');
  sb.x = 0; sb.y = 0; mf.appendChild(sb);
  const hdr = buildHeader('Actividades');
  hdr.x = CX; hdr.y = 0; mf.appendChild(hdr);

  // Banner
  const bannerA = frame('Banner', CW, 110, { fill: { r:0.055,g:0.133,b:0.251 } });
  bannerA.x = CX; bannerA.y = 64;
  const bcTA = txt('Actividades  /  Seguimiento propuesta', { size: 11, color: T.white });
  bcTA.fills = solidPaint(T.white, 0.5); bcTA.x = padX; bcTA.y = 10; bannerA.appendChild(bcTA);
  const bigIcoA = frame('IcoBg', 56, 56, { fill: { r:0.012,g:0.753,b:0.627 }, radius: 28 });
  bigIcoA.x = padX; bigIcoA.y = 34;
  const bigIcoAT = txt('||', { size: 24 }); bigIcoAT.x = 12; bigIcoAT.y = 10; bigIcoA.appendChild(bigIcoAT);
  bannerA.appendChild(bigIcoA);
  const actTitleT = txt('Seguimiento propuesta Enterprise', { size: 20, color: T.white, weight: 'Bold' });
  actTitleT.x = padX + 68; actTitleT.y = 30; bannerA.appendChild(actTitleT);
  const actSubT = txt('|| Llamada  �  Carlos Ruiz / Tecno S.A.  �  Hoy 10:00', { size: 12, color: T.white });
  actSubT.fills = solidPaint(T.white, 0.65); actSubT.x = padX + 68; actSubT.y = 56; bannerA.appendChild(actSubT);
  // Priority + Status chips
  const urgCh = frame('UrgCh', 58, 22, { fill: T.danger, radius: 11 }); urgCh.x = padX + 68; urgCh.y = 76;
  const urgT = txt('|| Alta', { size: 10, color: T.white, weight: 'Bold' }); urgT.x = 8; urgT.y = (22 - urgT.height) / 2;
  urgCh.appendChild(urgT); bannerA.appendChild(urgCh);
  const pendCh = frame('PendCh', 72, 22, { fill: { r:0.012,g:0.376,b:0.824 }, radius: 11 }); pendCh.x = padX + 136; pendCh.y = 76;
  const pendT = txt('Pendiente', { size: 10, color: T.white, weight: 'Bold' }); pendT.x = (72 - pendT.width) / 2; pendT.y = (22 - pendT.height) / 2;
  pendCh.appendChild(pendT); bannerA.appendChild(pendCh);
  const backBtnA = frame('Btn / Volver ? Actividades', 88, 28, { fill: T.surface, radius: 6 });
  backBtnA.fills = solidPaint(T.white, 0.12); backBtnA.x = CW - 110; backBtnA.y = 10;
  const backAT = txt('? Volver', { size: 11, color: T.white, weight: 'Semi Bold' });
  backAT.x = (88 - backAT.width) / 2; backAT.y = (28 - backAT.height) / 2;
  backBtnA.appendChild(backAT); bannerA.appendChild(backBtnA);
  const btnCompA = button('? Completar', 'primary'); btnCompA.x = CW - 234; btnCompA.y = 44; bannerA.appendChild(btnCompA);
  const btnRepA = button('|| Reprogramar', 'secondary'); btnRepA.x = CW - 360; btnRepA.y = 44; bannerA.appendChild(btnRepA);
  mf.appendChild(bannerA);

  const bodyYA = 64 + 110 + 16;
  const leftWA = 320, rightWA = CW - padX * 2 - leftWA - 16;
  const leftXA = CX + padX, rightXA = leftXA + leftWA + 16;

  // Left: Activity Info card
  const actInfo = frame('Card / Info Actividad', leftWA, 260, { fill: T.surface, radius: 12, stroke: T.border, strokeW: 1 });
  actInfo.x = leftXA; actInfo.y = bodyYA;
  const actIT = txt('Detalles de la Actividad', { size: 13, color: T.text, weight: 'Bold' });
  actIT.x = 16; actIT.y = 14; actInfo.appendChild(actIT);
  const actInfoRows = [
    { ico:'||', l:'Tipo',          v:'Llamada'                },
    { ico:'||', l:'Contacto',      v:'Carlos Ruiz'            },
    { ico:'||', l:'Empresa',       v:'Tecno S.A.'             },
    { ico:'||', l:'Oportunidad',   v:'Software Suite - Tecno' },
    { ico:'||', l:'Responsable',   v:'Carlos V.'              },
    { ico:'||', l:'Fecha / Hora',  v:'Hoy � 10:00 AM'        },
    { ico:'?',  l:'Duraci�n est.', v:'30 min'                },
    { ico:'||', l:'Recurrencia',   v:'No'                    },
  ];
  for (let i = 0; i < actInfoRows.length; i++) {
    const r = actInfoRows[i]; const ry = 40 + i * 28;
    const ri = txt(r.ico, { size: 11 }); ri.x = 16; ri.y = ry; actInfo.appendChild(ri);
    const rl = txt(r.l, { size: 10, color: T.textMuted }); rl.x = 36; rl.y = ry; actInfo.appendChild(rl);
    const rv = txt(r.v, { size: 11, color: T.text, weight: 'Semi Bold' }); rv.x = 120; rv.y = ry; actInfo.appendChild(rv);
    if (i < actInfoRows.length - 1) { const rll = rect(leftWA - 32, 1, T.border2); rll.x = 16; rll.y = ry + 20; actInfo.appendChild(rll); }
  }
  mf.appendChild(actInfo);

  // Left: Quick actions
  const actAct = frame('Card / Acciones R�pidas', leftWA, 108, { fill: T.surface, radius: 12, stroke: T.border, strokeW: 1 });
  actAct.x = leftXA; actAct.y = bodyYA + 260 + 12;
  const actActT = txt('Acciones R�pidas', { size: 13, color: T.text, weight: 'Bold' });
  actActT.x = 16; actActT.y = 14; actAct.appendChild(actActT);
  const actBtns = [
    { l:'|| Llamar ahora',  c:'primary'   },
    { l:'|| Enviar email',  c:'secondary' },
    { l:'|| Agregar nota',  c:'secondary' },
  ];
  for (let i = 0; i < actBtns.length; i++) {
    const ab = button(actBtns[i].l, actBtns[i].c);
    ab.x = 16; ab.y = 38 + i * 24; actAct.appendChild(ab);
  }
  mf.appendChild(actAct);

  // Right: Description / Script card
  const descCard = frame('Card / Descripci�n', rightWA, 160, { fill: T.surface, radius: 12, stroke: T.border, strokeW: 1 });
  descCard.x = rightXA; descCard.y = bodyYA;
  const descT = txt('Objetivo de la Llamada', { size: 13, color: T.text, weight: 'Bold' });
  descT.x = 16; descT.y = 14; descCard.appendChild(descT);
  const descBody = txt(
    'Hacer seguimiento a la propuesta COT-2026-042 enviada el 1 Mar 2026.\n' +
    'Verificar si Carlos Ruiz recibi� la propuesta y tiene dudas.\n' +
    'Objetivo: confirmar la reuni�n de negociaci�n para esta semana.\n\n' +
    '|| Mencionar descuento por pago anticipado (5%).',
    { size: 11, color: T.textMuted }
  );
  descBody.x = 16; descBody.y = 38; descBody.resize(rightWA - 32, 100);
  descCard.appendChild(descBody);
  mf.appendChild(descCard);

  // Right: Activity history (related)
  const histCard = frame('Card / Historial', rightWA, 220, { fill: T.surface, radius: 12, stroke: T.border, strokeW: 1 });
  histCard.x = rightXA; histCard.y = bodyYA + 160 + 12;
  const histT = txt('Historial con Tecno S.A.', { size: 13, color: T.text, weight: 'Bold' });
  histT.x = 16; histT.y = 14; histCard.appendChild(histT);
  const histItems = [
    { ico:'||', t:'Email',   d:'"Propuesta COT-2026-042 enviada"',           m:'1 Mar � 09:00 � Carlos V.',  st:'?' },
    { ico:'||', t:'Reuni�n', d:'"Demo del m�dulo de reportes � 60 min"',    m:'24 Feb � 11:00 � Mar�a P.',  st:'?' },
    { ico:'||', t:'Llamada', d:'"Presentaci�n inicial � inter�s confirmado"', m:'20 Feb � 16:30 � Carlos V.', st:'?' },
    { ico:'?', t:'Tarea',   d:'"Preparar material de la demo"',             m:'19 Feb � completa',          st:'?' },
  ];
  for (let i = 0; i < histItems.length; i++) {
    const hi = histItems[i]; const hiy = 40 + i * 44;
    if (i < histItems.length - 1) { const vl = rect(2, 44, T.border); vl.x = 25; vl.y = hiy + 18; histCard.appendChild(vl); }
    const hD = frame('TLDot' + i, 16, 16, { fill: { r:0.859,g:0.941,b:0.996 }, radius: 8 });
    hD.x = 17; hD.y = hiy + 4;
    const hDT = txt(hi.ico, { size: 9 }); hDT.x = 2; hDT.y = 3; hD.appendChild(hDT); histCard.appendChild(hD);
    const hT = txt(hi.t, { size: 9, color: T.textMuted }); hT.x = 42; hT.y = hiy; histCard.appendChild(hT);
    const hDe = txt(hi.d, { size: 11, color: T.text, weight: 'Semi Bold' }); hDe.x = 42; hDe.y = hiy + 12; histCard.appendChild(hDe);
    const hM = txt(hi.m, { size: 9, color: T.textMuted }); hM.x = 42; hM.y = hiy + 26; histCard.appendChild(hM);
    const hSt = txt(hi.st, { size: 10 }); hSt.x = rightWA - 24; hSt.y = hiy + 12; histCard.appendChild(hSt);
  }
  mf.appendChild(histCard);

  return { frame: mf, backBtn: backBtnA };
}

// -----------------------------------------------------------
//  PANTALLA � Detalle de Producto
// -----------------------------------------------------------
async function buildDetalleProductoPage() {
  const PAGE_W = 1440, PAGE_H = 900, CX = 260, CW = PAGE_W - CX, padX = 32;

  const mf = frame('|| Detalle � CRM Enterprise Suite', PAGE_W, PAGE_H, { fill: T.bg });
  mf.clipsContent = true;

  const sb = buildSidebar('Productos');
  sb.x = 0; sb.y = 0; mf.appendChild(sb);
  const hdr = buildHeader('Productos');
  hdr.x = CX; hdr.y = 0; mf.appendChild(hdr);

  // Banner
  const bannerP = frame('Banner', CW, 110, { fill: { r:0.055,g:0.133,b:0.251 } });
  bannerP.x = CX; bannerP.y = 64;
  const bcTP = txt('Productos  /  CRM Enterprise Suite', { size: 11, color: T.white });
  bcTP.fills = solidPaint(T.white, 0.5); bcTP.x = padX; bcTP.y = 10; bannerP.appendChild(bcTP);
  const bigIcoP = frame('IcoBg', 56, 56, { fill: T.primaryLight, radius: 14 }); bigIcoP.x = padX; bigIcoP.y = 34;
  const bigIcoPT = txt('||', { size: 24 }); bigIcoPT.x = 12; bigIcoPT.y = 10; bigIcoP.appendChild(bigIcoPT); bannerP.appendChild(bigIcoP);
  const prodTitleT = txt('CRM Enterprise Suite', { size: 20, color: T.white, weight: 'Bold' }); prodTitleT.x = padX + 68; prodTitleT.y = 30; bannerP.appendChild(prodTitleT);
  const prodSubT = txt('PRD-001  �  Software  �  Precio: $2,400 / a�o', { size: 12, color: T.white });
  prodSubT.fills = solidPaint(T.white, 0.65); prodSubT.x = padX + 68; prodSubT.y = 56; bannerP.appendChild(prodSubT);
  const activoCh = frame('ActiveCh', 56, 22, { fill: T.success, radius: 11 }); activoCh.x = padX + 68; activoCh.y = 76;
  const acT = txt('Activo', { size: 10, color: T.white, weight: 'Bold' }); acT.x = (56 - acT.width) / 2; acT.y = (22 - acT.height) / 2;
  activoCh.appendChild(acT); bannerP.appendChild(activoCh);
  const backBtnP = frame('Btn / Volver ? Productos', 88, 28, { fill: T.surface, radius: 6 });
  backBtnP.fills = solidPaint(T.white, 0.12); backBtnP.x = CW - 110; backBtnP.y = 10;
  const backPT = txt('? Volver', { size: 11, color: T.white, weight: 'Semi Bold' }); backPT.x = (88 - backPT.width) / 2; backPT.y = (28 - backPT.height) / 2;
  backBtnP.appendChild(backPT); bannerP.appendChild(backBtnP);
  const btnEditP = button('|| Editar Producto', 'primary'); btnEditP.x = CW - 196; btnEditP.y = 44; bannerP.appendChild(btnEditP);
  mf.appendChild(bannerP);

  // KPI strip
  const kpiStripY = 64 + 110 + 12;
  const kpiProdData = [
    { l:'Precio unitario',  v:'$2,400',   c:T.primaryLight },
    { l:'Costo unitario',   v:'$480',     c:T.textMuted    },
    { l:'Margen bruto',     v:'80%',      c:T.success      },
    { l:'Ventas este a�o',  v:'48',       c:T.accent       },
    { l:'Ingresos totales', v:'$115,200', c:T.success      },
  ];
  const kpiSW = Math.floor((CW - padX * 2) / kpiProdData.length);
  const kpiStripCard = frame('KPIStrip', CW - padX * 2, 64, { fill: T.surface, radius: 12, stroke: T.border, strokeW: 1 });
  kpiStripCard.x = CX + padX; kpiStripCard.y = kpiStripY;
  for (let i = 0; i < kpiProdData.length; i++) {
    const kd = kpiProdData[i];
    const kdc = frame('KD' + i, kpiSW, 64, { fill: T.surface });
    kdc.x = i * kpiSW; kdc.y = 0;
    const kdV = txt(kd.v, { size: 18, color: kd.c, weight: 'Bold' }); kdV.x = (kpiSW - kdV.width) / 2; kdV.y = 12; kdc.appendChild(kdV);
    const kdL = txt(kd.l, { size: 9, color: T.textMuted }); kdL.x = (kpiSW - kdL.width) / 2; kdL.y = 40; kdc.appendChild(kdL);
    kpiStripCard.appendChild(kdc);
    if (i < kpiProdData.length - 1) { const kdd = rect(1, 40, T.border); kdd.x = (i + 1) * kpiSW; kdd.y = 12; kpiStripCard.appendChild(kdd); }
  }
  mf.appendChild(kpiStripCard);

  const bodyYP = kpiStripY + 64 + 14;
  const leftWP = 320, rightWP = CW - padX * 2 - leftWP - 16;
  const leftXP = CX + padX, rightXP = leftXP + leftWP + 16;

  // Left: Product info card
  const pinfoCard = frame('Card / Info Producto', leftWP, 270, { fill: T.surface, radius: 12, stroke: T.border, strokeW: 1 });
  pinfoCard.x = leftXP; pinfoCard.y = bodyYP;
  const pinfoT = txt('Informaci�n del Producto', { size: 13, color: T.text, weight: 'Bold' });
  pinfoT.x = 16; pinfoT.y = 14; pinfoCard.appendChild(pinfoT);
  const prodInfoRows = [
    { ico:'||', l:'C�digo',         v:'PRD-001'             },
    { ico:'||', l:'Categor�a',      v:'Software'            },
    { ico:'||', l:'Precio',         v:'$2,400 / a�o'        },
    { ico:'||?', l:'Costo',          v:'$480'                },
    { ico:'||', l:'Margen',         v:'80%'                 },
    { ico:'||', l:'Disponibilidad', v:'Ilimitado'           },
    { ico:'||', l:'Incluye',        v:'M�dulos base + API'  },
    { ico:'||', l:'Actualizado',    v:'15 Feb 2026'         },
  ];
  for (let i = 0; i < prodInfoRows.length; i++) {
    const pr = prodInfoRows[i]; const pry = 40 + i * 28;
    const pri = txt(pr.ico, { size: 11 }); pri.x = 16; pri.y = pry; pinfoCard.appendChild(pri);
    const prl = txt(pr.l, { size: 10, color: T.textMuted }); prl.x = 36; prl.y = pry; pinfoCard.appendChild(prl);
    const prv = txt(pr.v, { size: 11, color: T.text, weight: 'Semi Bold' }); prv.x = 140; prv.y = pry; pinfoCard.appendChild(prv);
    if (i < prodInfoRows.length - 1) { const prl2 = rect(leftWP - 32, 1, T.border2); prl2.x = 16; prl2.y = pry + 20; pinfoCard.appendChild(prl2); }
  }
  mf.appendChild(pinfoCard);

  // Left: Sales bar chart (ventas por mes simplificado)
  const salesChCard = frame('Card / Ventas', leftWP, 116, { fill: T.surface, radius: 12, stroke: T.border, strokeW: 1 });
  salesChCard.x = leftXP; salesChCard.y = bodyYP + 270 + 12;
  const salesChT = txt('Ventas Mensuales', { size: 13, color: T.text, weight: 'Bold' });
  salesChT.x = 16; salesChT.y = 14; salesChCard.appendChild(salesChT);
  const monthlyV = [3, 4, 5, 6, 4, 7, 8, 6, 5, 9, 7, 8]; // last 12 months (relative)
  const barW2 = Math.floor((leftWP - 32) / 12) - 2;
  const maxV = Math.max(...monthlyV);
  const months3 = ['E','F','M','A','M','J','J','A','S','O','N','D'];
  for (let i = 0; i < 12; i++) {
    const bh = Math.round((monthlyV[i] / maxV) * 52);
    const bx = 16 + i * (barW2 + 2);
    const barBg = frame('BarBg' + i, barW2, 52, { fill: T.border2, radius: 2 });
    barBg.x = bx; barBg.y = 36; salesChCard.appendChild(barBg);
    const barFg = frame('BarFg' + i, barW2, bh, { fill: T.primaryLight, radius: 2 });
    barFg.x = bx; barFg.y = 36 + (52 - bh); salesChCard.appendChild(barFg);
    const mT = txt(months3[i], { size: 7, color: T.textMuted }); mT.x = bx + (barW2 - mT.width) / 2; mT.y = 92; salesChCard.appendChild(mT);
  }
  mf.appendChild(salesChCard);

  // Right: Recent sales table
  const recentSalesCard = frame('Card / Ventas Recientes', rightWP, 252, { fill: T.surface, radius: 12, stroke: T.border, strokeW: 1 });
  recentSalesCard.x = rightXP; recentSalesCard.y = bodyYP;
  const rsT = txt('Ventas Recientes', { size: 13, color: T.text, weight: 'Bold' }); rsT.x = 16; rsT.y = 14; recentSalesCard.appendChild(rsT);
  const rsCols = [{ label:'Cotizaci�n', x:16 }, { label:'Cliente', x:148 }, { label:'Fecha', x:292 }, { label:'Monto', x:400 }, { label:'Estado', x:490 }];
  tableHeader(recentSalesCard, rsCols, 36, rightWP);
  const recentSales = [
    { cot:'COT-2026-042', cl:'Tecno S.A.',    f:'01 Mar 2026', m:'$2,400',  s:'Enviada',    sc:'blue'   },
    { cot:'COT-2026-039', cl:'InnoTech',       f:'22 Feb 2026', m:'$2,400',  s:'Aceptada',   sc:'green'  },
    { cot:'COT-2026-036', cl:'Retail Max',     f:'10 Feb 2026', m:'$2,400',  s:'Aceptada',   sc:'green'  },
    { cot:'COT-2026-033', cl:'DataPoint S.A.', f:'05 Feb 2026', m:'$2,400',  s:'Rechazada',  sc:'red'    },
    { cot:'COT-2026-030', cl:'FinGroup',       f:'28 Ene 2026', m:'$2,400',  s:'Enviada',    sc:'blue'   },
  ];
  let rsY = 58;
  for (const rs of recentSales) {
    const rsRow = frame('RSRow', rightWP, 36, { fill: T.surface }); rsRow.x = 0; rsRow.y = rsY;
    const rsCotT = txt(rs.cot, { size: 11, color: T.primaryLight, weight: 'Semi Bold' }); rsCotT.x = rsCols[0].x; rsCotT.y = 11; rsRow.appendChild(rsCotT);
    const rsClT = txt(rs.cl, { size: 11, color: T.text }); rsClT.x = rsCols[1].x; rsClT.y = 11; rsRow.appendChild(rsClT);
    const rsFT = txt(rs.f, { size: 10, color: T.textMuted }); rsFT.x = rsCols[2].x; rsFT.y = 11; rsRow.appendChild(rsFT);
    const rsMT = txt(rs.m, { size: 11, color: T.text, weight: 'Bold' }); rsMT.x = rsCols[3].x; rsMT.y = 11; rsRow.appendChild(rsMT);
    const rsSt = badge(rs.s, rs.sc); rsSt.x = rsCols[4].x; rsSt.y = 9; rsRow.appendChild(rsSt);
    const rsLine = rect(rightWP, 1, T.border2); rsLine.x = 0; rsLine.y = 35; rsRow.appendChild(rsLine);
    recentSalesCard.appendChild(rsRow); rsY += 36;
  }
  mf.appendChild(recentSalesCard);

  // Right: Description / features
  const featCard = frame('Card / Caracter�sticas', rightWP, 130, { fill: T.surface, radius: 12, stroke: T.border, strokeW: 1 });
  featCard.x = rightXP; featCard.y = bodyYP + 252 + 12;
  const featT = txt('Caracter�sticas Incluidas', { size: 13, color: T.text, weight: 'Bold' }); featT.x = 16; featT.y = 14; featCard.appendChild(featT);
  const features = ['? CRM completo (Contactos, Cuentas, Oportunidades)', '? M�dulo Campa�as + Marketing automation', '? API Premium + Webhook + Integraciones', '? Soporte prioritario 24/7 + SLA garantizado'];
  for (let i = 0; i < features.length; i++) {
    const fT = txt(features[i], { size: 11, color: T.text }); fT.x = 16; fT.y = 38 + i * 22; featCard.appendChild(fT);
  }
  mf.appendChild(featCard);

  return { frame: mf, backBtn: backBtnP };
}

// -----------------------------------------------------------
//  PANTALLA � Detalle de Cotizaci�n
// -----------------------------------------------------------
async function buildDetalleCotizacionPage() {
  const PAGE_W = 1440, PAGE_H = 900, CX = 260, CW = PAGE_W - CX, padX = 32;

  const mf = frame('|| Detalle � COT-2026-042', PAGE_W, PAGE_H, { fill: T.bg });
  mf.clipsContent = true;

  const sb = buildSidebar('Cotizaciones');
  sb.x = 0; sb.y = 0; mf.appendChild(sb);
  const hdr = buildHeader('Cotizaciones');
  hdr.x = CX; hdr.y = 0; mf.appendChild(hdr);

  // Banner
  const bannerCot = frame('Banner', CW, 110, { fill: { r:0.055,g:0.133,b:0.251 } });
  bannerCot.x = CX; bannerCot.y = 64;
  const bcTCot = txt('Cotizaciones  /  COT-2026-042', { size: 11, color: T.white });
  bcTCot.fills = solidPaint(T.white, 0.5); bcTCot.x = padX; bcTCot.y = 10; bannerCot.appendChild(bcTCot);
  const bigIcoCot = frame('IcoBg', 56, 56, { fill: T.accent, radius: 14 }); bigIcoCot.x = padX; bigIcoCot.y = 34;
  const bigIcoCotT = txt('||', { size: 24 }); bigIcoCotT.x = 12; bigIcoCotT.y = 10; bigIcoCot.appendChild(bigIcoCotT); bannerCot.appendChild(bigIcoCot);
  const cotTitleT = txt('COT-2026-042', { size: 20, color: T.white, weight: 'Bold' }); cotTitleT.x = padX + 68; cotTitleT.y = 30; bannerCot.appendChild(cotTitleT);
  const cotSubT = txt('Tecno S.A.  �  Carlos Ruiz  �  Emitida: 01 Mar 2026  �  V�lida hasta: 31 Mar 2026', { size: 12, color: T.white });
  cotSubT.fills = solidPaint(T.white, 0.65); cotSubT.x = padX + 68; cotSubT.y = 56; bannerCot.appendChild(cotSubT);
  const envCh = frame('EnvCh', 60, 22, { fill: { r:0.012,g:0.376,b:0.824 }, radius: 11 }); envCh.x = padX + 68; envCh.y = 76;
  const envT = txt('Enviada', { size: 10, color: T.white, weight: 'Bold' }); envT.x = (60 - envT.width) / 2; envT.y = (22 - envT.height) / 2;
  envCh.appendChild(envT); bannerCot.appendChild(envCh);
  const probCh = frame('ProbCh', 74, 22, { fill: T.success, radius: 11 }); probCh.x = padX + 140; probCh.y = 76;
  const probChT = txt('75% prob.', { size: 10, color: T.white, weight: 'Bold' }); probChT.x = (74 - probChT.width) / 2; probChT.y = (22 - probChT.height) / 2;
  probCh.appendChild(probChT); bannerCot.appendChild(probCh);
  const backBtnCot = frame('Btn / Volver ? Cotizaciones', 88, 28, { fill: T.surface, radius: 6 });
  backBtnCot.fills = solidPaint(T.white, 0.12); backBtnCot.x = CW - 110; backBtnCot.y = 10;
  const backCotT = txt('? Volver', { size: 11, color: T.white, weight: 'Semi Bold' }); backCotT.x = (88 - backCotT.width) / 2; backCotT.y = (28 - backCotT.height) / 2;
  backBtnCot.appendChild(backCotT); bannerCot.appendChild(backBtnCot);
  const btnFacCot = button('|| ? Factura', 'primary'); btnFacCot.x = CW - 246; btnFacCot.y = 44; bannerCot.appendChild(btnFacCot);
  const btnDupCot = button('|| Duplicar', 'secondary'); btnDupCot.x = CW - 356; btnDupCot.y = 44; bannerCot.appendChild(btnDupCot);
  mf.appendChild(bannerCot);

  const bodyYCot = 64 + 110 + 16;
  const leftWCot = 300, rightWCot = CW - padX * 2 - leftWCot - 16;
  const leftXCot = CX + padX, rightXCot = leftXCot + leftWCot + 16;

  // Left: Client + Quote Info
  const cotInfoCard = frame('Card / Info Cot', leftWCot, 270, { fill: T.surface, radius: 12, stroke: T.border, strokeW: 1 });
  cotInfoCard.x = leftXCot; cotInfoCard.y = bodyYCot;
  const cotInfoT = txt('Datos de la Cotizaci�n', { size: 13, color: T.text, weight: 'Bold' }); cotInfoT.x = 16; cotInfoT.y = 14; cotInfoCard.appendChild(cotInfoT);
  const cotInfoRows = [
    { ico:'||', l:'N�mero',        v:'COT-2026-042'    },
    { ico:'||', l:'Cliente',       v:'Tecno S.A.'      },
    { ico:'||', l:'Contacto',      v:'Carlos Ruiz'     },
    { ico:'||', l:'Oportunidad',   v:'Software Suite'  },
    { ico:'||', l:'Subtotal',      v:'$27,143'         },
    { ico:'||', l:'IVA (5%)',      v:'$1,357'          },
    { ico:'||', l:'Total',         v:'$28,500'         },
    { ico:'||', l:'V�lida hasta',  v:'31 Mar 2026'     },
  ];
  for (let i = 0; i < cotInfoRows.length; i++) {
    const cr = cotInfoRows[i]; const cry = 40 + i * 28;
    const cri = txt(cr.ico, { size: 11 }); cri.x = 16; cri.y = cry; cotInfoCard.appendChild(cri);
    const crl = txt(cr.l, { size: 10, color: T.textMuted }); crl.x = 36; crl.y = cry; cotInfoCard.appendChild(crl);
    const crv = txt(cr.v, { size: 11, color: T.text, weight: 'Semi Bold' }); crv.x = 120; crv.y = cry; cotInfoCard.appendChild(crv);
    if (i < cotInfoRows.length - 1) { const crll = rect(leftWCot - 32, 1, T.border2); crll.x = 16; crll.y = cry + 20; cotInfoCard.appendChild(crll); }
  }
  mf.appendChild(cotInfoCard);

  // Left: Timeline
  const cotTimeCard = frame('Card / Timeline Cot', leftWCot, 96, { fill: T.surface, radius: 12, stroke: T.border, strokeW: 1 });
  cotTimeCard.x = leftXCot; cotTimeCard.y = bodyYCot + 270 + 12;
  const cotTimeT = txt('L�nea de Tiempo', { size: 13, color: T.text, weight: 'Bold' }); cotTimeT.x = 16; cotTimeT.y = 14; cotTimeCard.appendChild(cotTimeT);
  const cotSteps = [
    { s:'Borrador',  d:'28 Feb', done:true  },
    { s:'Enviada',   d:'01 Mar', done:true  },
    { s:'Revisi�n',  d:'�',      done:false },
    { s:'Aceptada',  d:'�',      done:false },
  ];
  const stepXGap = Math.floor((leftWCot - 32) / 4);
  for (let i = 0; i < cotSteps.length; i++) {
    const cs = cotSteps[i]; const csx = 16 + i * stepXGap;
    const csD = frame('CSdot' + i, 14, 14, { fill: cs.done ? T.success : T.border, radius: 7 }); csD.x = csx; csD.y = 36; cotTimeCard.appendChild(csD);
    const csL = txt(cs.s, { size: 9, color: cs.done ? T.success : T.textMuted, weight: cs.done ? 'Bold' : 'Medium' }); csL.x = csx - (csL.width - 14) / 2; csL.y = 54; cotTimeCard.appendChild(csL);
    const csDate = txt(cs.d, { size: 8, color: T.textMuted }); csDate.x = csx - (csDate.width - 14) / 2; csDate.y = 68; cotTimeCard.appendChild(csDate);
    if (i < cotSteps.length - 1) { const csl = rect(stepXGap - 14, 2, cs.done ? T.success : T.border); csl.x = csx + 14; csl.y = 42; cotTimeCard.appendChild(csl); }
  }
  mf.appendChild(cotTimeCard);

  // Right: Line items table
  const lineItemsCard = frame('Card / L�neas Cot', rightWCot, 280, { fill: T.surface, radius: 12, stroke: T.border, strokeW: 1 });
  lineItemsCard.x = rightXCot; lineItemsCard.y = bodyYCot;
  const liT = txt('L�neas de la Cotizaci�n', { size: 13, color: T.text, weight: 'Bold' }); liT.x = 16; liT.y = 14; lineItemsCard.appendChild(liT);
  const liCols = [
    { label:'Producto / Servicio',  x:16  },
    { label:'Cantidad',             x:258 },
    { label:'Precio Unit.',         x:320 },
    { label:'Descuento',            x:410 },
    { label:'Subtotal',             x:490 },
  ];
  tableHeader(lineItemsCard, liCols, 36, rightWCot);
  const lineItems = [
    { n:'CRM Enterprise Suite',        q:1,  p:'$2,400',  d:'0%',  s:'$2,400'  },
    { n:'Implementaci�n Enterprise',   q:1,  p:'$8,500',  d:'5%',  s:'$8,075'  },
    { n:'M�dulo Marketing Avanzado',   q:2,  p:'$600',    d:'0%',  s:'$1,200'  },
    { n:'Soporte Anual B�sico',        q:3,  p:'$960',    d:'10%', s:'$2,592'  },
    { n:'Capacitaci�n (10h)',          q:2,  p:'$1,200',  d:'5%',  s:'$2,280'  },
    { n:'API Premium (12 meses)',      q:1,  p:'$2,400',  d:'0%',  s:'$2,400'  },
  ];
  let liY = 58;
  for (const li of lineItems) {
    const liRow = frame('LIRow', rightWCot, 32, { fill: T.surface }); liRow.x = 0; liRow.y = liY;
    const liNT = txt(li.n, { size: 11, color: T.text }); liNT.x = liCols[0].x; liNT.y = 9; liRow.appendChild(liNT);
    const liQT = txt(String(li.q), { size: 11, color: T.text, weight: 'Semi Bold' }); liQT.x = liCols[1].x; liQT.y = 9; liRow.appendChild(liQT);
    const liPT = txt(li.p, { size: 11, color: T.text }); liPT.x = liCols[2].x; liPT.y = 9; liRow.appendChild(liPT);
    const liDT = txt(li.d, { size: 11, color: li.d !== '0%' ? T.warning : T.textMuted }); liDT.x = liCols[3].x; liDT.y = 9; liRow.appendChild(liDT);
    const liST = txt(li.s, { size: 11, color: T.text, weight: 'Bold' }); liST.x = liCols[4].x; liST.y = 9; liRow.appendChild(liST);
    const liLine = rect(rightWCot, 1, T.border2); liLine.x = 0; liLine.y = 31; liRow.appendChild(liLine);
    lineItemsCard.appendChild(liRow); liY += 32;
  }
  // Totals
  const totBg = frame('TotBg', rightWCot, 44, { fill: { r:0.949,g:0.961,b:0.976 } }); totBg.x = 0; totBg.y = liY + 4;
  const subLbl = txt('Subtotal', { size: 11, color: T.textMuted }); subLbl.x = liCols[3].x; subLbl.y = 6; totBg.appendChild(subLbl);
  const subV = txt('$27,143', { size: 11, color: T.text, weight: 'Bold' }); subV.x = liCols[4].x; subV.y = 6; totBg.appendChild(subV);
  const ivaLbl = txt('IVA 5%', { size: 11, color: T.textMuted }); ivaLbl.x = liCols[3].x; ivaLbl.y = 22; totBg.appendChild(ivaLbl);
  const ivaV = txt('$1,357', { size: 11, color: T.text, weight: 'Bold' }); ivaV.x = liCols[4].x; ivaV.y = 22; totBg.appendChild(ivaV);
  lineItemsCard.appendChild(totBg);
  const totalBg = frame('TotalBg', rightWCot, 32, { fill: T.primary, radius: 8 }); totalBg.x = 0; totalBg.y = liY + 52;
  const totalLbl = txt('TOTAL', { size: 11, color: T.white, weight: 'Bold' }); totalLbl.x = liCols[3].x; totalLbl.y = 9; totalBg.appendChild(totalLbl);
  const totalV = txt('$28,500', { size: 13, color: T.white, weight: 'Bold' }); totalV.x = liCols[4].x; totalV.y = 7; totalBg.appendChild(totalV);
  lineItemsCard.appendChild(totalBg);
  mf.appendChild(lineItemsCard);

  // Right: Notes / Terms
  const notesC = frame('Card / Terms', rightWCot, 94, { fill: T.surface, radius: 12, stroke: T.border, strokeW: 1 });
  notesC.x = rightXCot; notesC.y = bodyYCot + 280 + 12;
  const notesCT = txt('T�rminos y Condiciones', { size: 13, color: T.text, weight: 'Bold' }); notesCT.x = 16; notesCT.y = 14; notesC.appendChild(notesCT);
  const termsBody = txt(
    '� Pagadero a 30 d�as desde la aceptaci�n.\n' +
    '� Descuento adicional del 5% por pago anticipado.\n' +
    '� Implementaci�n inicia dentro de 10 d�as h�biles de aceptada la cotizaci�n.',
    { size: 10, color: T.textMuted }
  );
  termsBody.x = 16; termsBody.y = 36; termsBody.resize(rightWCot - 32, 50);
  notesC.appendChild(termsBody);
  mf.appendChild(notesC);

  return { frame: mf, backBtn: backBtnCot };
}

// -----------------------------------------------------------
//  SESI�N 12 � DETALLE FACTURA + DETALLE TICKET + LOGIN
// -----------------------------------------------------------

// -----------------------------------------------------------
//  PANTALLA � Detalle de Factura
// -----------------------------------------------------------
async function buildDetalleFacturaPage() {
  const PAGE_W = 1440, PAGE_H = 900, CX = 260, CW = PAGE_W - CX, padX = 32;

  const mf = frame('|| Detalle � FAC-2026-087', PAGE_W, PAGE_H, { fill: T.bg });
  mf.clipsContent = true;

  const sb = buildSidebar('Facturas');
  sb.x = 0; sb.y = 0; mf.appendChild(sb);
  const hdr = buildHeader('Facturas');
  hdr.x = CX; hdr.y = 0; mf.appendChild(hdr);

  // Banner
  const bannerF = frame('Banner', CW, 110, { fill: { r:0.055,g:0.133,b:0.251 } });
  bannerF.x = CX; bannerF.y = 64;
  const bcTF = txt('Facturas  /  FAC-2026-087', { size: 11, color: T.white });
  bcTF.fills = solidPaint(T.white, 0.5); bcTF.x = padX; bcTF.y = 10; bannerF.appendChild(bcTF);
  const bigIcoF = frame('IcoBg', 56, 56, { fill: T.accent, radius: 14 }); bigIcoF.x = padX; bigIcoF.y = 34;
  const bigIcoFT = txt('||', { size: 24 }); bigIcoFT.x = 12; bigIcoFT.y = 10; bigIcoF.appendChild(bigIcoFT); bannerF.appendChild(bigIcoF);
  const facTitleT = txt('FAC-2026-087', { size: 20, color: T.white, weight: 'Bold' }); facTitleT.x = padX + 68; facTitleT.y = 30; bannerF.appendChild(facTitleT);
  const facSubT = txt('Retail Max  �  Emitida: 28 Feb 2026  �  Vence: 30 Mar 2026  �  $22,000', { size: 12, color: T.white });
  facSubT.fills = solidPaint(T.white, 0.65); facSubT.x = padX + 68; facSubT.y = 56; bannerF.appendChild(facSubT);
  const pendCh2 = frame('PendCh2', 68, 22, { fill: { r:0.012,g:0.376,b:0.824 }, radius: 11 }); pendCh2.x = padX + 68; pendCh2.y = 76;
  const pCT = txt('Pendiente', { size: 10, color: T.white, weight: 'Bold' }); pCT.x = (68 - pCT.width) / 2; pCT.y = (22 - pCT.height) / 2;
  pendCh2.appendChild(pCT); bannerF.appendChild(pendCh2);
  const backBtnF = frame('Btn / Volver ? Facturas', 88, 28, { fill: T.surface, radius: 6 });
  backBtnF.fills = solidPaint(T.white, 0.12); backBtnF.x = CW - 110; backBtnF.y = 10;
  const backFT = txt('? Volver', { size: 11, color: T.white, weight: 'Semi Bold' }); backFT.x = (88 - backFT.width) / 2; backFT.y = (28 - backFT.height) / 2;
  backBtnF.appendChild(backFT); bannerF.appendChild(backBtnF);
  const btnCobrarF = button('|| Registrar Pago', 'primary'); btnCobrarF.x = CW - 228; btnCobrarF.y = 44; bannerF.appendChild(btnCobrarF);
  const btnPdfF = button('|| Descargar PDF', 'secondary'); btnPdfF.x = CW - 358; btnPdfF.y = 44; bannerF.appendChild(btnPdfF);
  mf.appendChild(bannerF);

  const bodyYF = 64 + 110 + 16;
  const leftWF2 = 300, rightWF2 = CW - padX * 2 - leftWF2 - 16;
  const leftXF2 = CX + padX, rightXF2 = leftXF2 + leftWF2 + 16;

  // Left: Invoice info
  const finfoCard = frame('Card / Info Factura', leftWF2, 274, { fill: T.surface, radius: 12, stroke: T.border, strokeW: 1 });
  finfoCard.x = leftXF2; finfoCard.y = bodyYF;
  const finfoTit = txt('Datos de la Factura', { size: 13, color: T.text, weight: 'Bold' }); finfoTit.x = 16; finfoTit.y = 14; finfoCard.appendChild(finfoTit);
  const facInfoRows = [
    { ico:'||', l:'N�mero',          v:'FAC-2026-087'       },
    { ico:'||', l:'Cliente',         v:'Retail Max'         },
    { ico:'||', l:'Cotizaci�n',      v:'COT-2026-036'       },
    { ico:'||', l:'Oportunidad',     v:'CRM Impl. Retail Max'},
    { ico:'||', l:'Monto total',     v:'$22,000'            },
    { ico:'?', l:'Monto pagado',    v:'$0'                 },
    { ico:'||', l:'Monto pendiente', v:'$22,000'            },
    { ico:'||', l:'Vencimiento',     v:'30 Mar 2026'        },
    { ico:'||', l:'M�todo',          v:'�  Pendiente'       },
  ];
  for (let i = 0; i < facInfoRows.length; i++) {
    const r = facInfoRows[i]; const ry = 40 + i * 26;
    const ri = txt(r.ico, { size: 11 }); ri.x = 16; ri.y = ry; finfoCard.appendChild(ri);
    const rl = txt(r.l, { size: 10, color: T.textMuted }); rl.x = 36; rl.y = ry; finfoCard.appendChild(rl);
    const rv = txt(r.v, { size: 11, color: T.text, weight: 'Semi Bold' }); rv.x = 140; rv.y = ry; finfoCard.appendChild(rv);
    if (i < facInfoRows.length - 1) { const rll = rect(leftWF2 - 32, 1, T.border2); rll.x = 16; rll.y = ry + 18; finfoCard.appendChild(rll); }
  }
  mf.appendChild(finfoCard);

  // Left: Payment history
  const paymCard = frame('Card / Pagos', leftWF2, 90, { fill: T.surface, radius: 12, stroke: T.border, strokeW: 1 });
  paymCard.x = leftXF2; paymCard.y = bodyYF + 274 + 12;
  const paymTit = txt('Historial de Pagos', { size: 13, color: T.text, weight: 'Bold' }); paymTit.x = 16; paymTit.y = 14; paymCard.appendChild(paymTit);
  const noPayT = txt('||  No se han registrado pagos para esta factura.', { size: 11, color: T.textMuted }); noPayT.x = 16; noPayT.y = 40; paymCard.appendChild(noPayT);
  const regPayT = txt('+ Registrar pago', { size: 11, color: T.primaryLight, weight: 'Semi Bold' }); regPayT.x = 16; regPayT.y = 60; paymCard.appendChild(regPayT);
  mf.appendChild(paymCard);

  // Right: Line items
  const fLineCard = frame('Card / L�neas Factura', rightWF2, 318, { fill: T.surface, radius: 12, stroke: T.border, strokeW: 1 });
  fLineCard.x = rightXF2; fLineCard.y = bodyYF;
  const fLT = txt('Conceptos Facturados', { size: 13, color: T.text, weight: 'Bold' }); fLT.x = 16; fLT.y = 14; fLineCard.appendChild(fLT);
  const fLCols = [
    { label:'Descripci�n',  x:16  },
    { label:'Cant.',        x:268 },
    { label:'Precio Unit.', x:318 },
    { label:'Desc.',        x:420 },
    { label:'Subtotal',     x:480 },
  ];
  tableHeader(fLineCard, fLCols, 36, rightWF2);
  const fLines = [
    { d:'CRM Enterprise Suite (12 meses)',   q:1, p:'$2,400',  dc:'0%',  s:'$2,400'  },
    { d:'Implementaci�n Enterprise',          q:1, p:'$8,500',  dc:'0%',  s:'$8,500'  },
    { d:'M�dulo Marketing Avanzado � 2',     q:2, p:'$600',    dc:'0%',  s:'$1,200'  },
    { d:'Soporte Anual Premium',             q:1, p:'$3,600',  dc:'5%',  s:'$3,420'  },
    { d:'Capacitaci�n On-site (2 d�as)',     q:1, p:'$2,400',  dc:'0%',  s:'$2,400'  },
    { d:'Migraci�n de datos legado',         q:1, p:'$1,800',  dc:'0%',  s:'$1,800'  },
  ];
  let fLY = 58;
  for (const fl of fLines) {
    const fLRow = frame('FLRow', rightWF2, 32, { fill: T.surface }); fLRow.x = 0; fLRow.y = fLY;
    const fLD = txt(fl.d, { size: 11, color: T.text }); fLD.x = fLCols[0].x; fLD.y = 9; fLRow.appendChild(fLD);
    const fLQ = txt(String(fl.q), { size: 11, color: T.text, weight: 'Semi Bold' }); fLQ.x = fLCols[1].x; fLQ.y = 9; fLRow.appendChild(fLQ);
    const fLP = txt(fl.p, { size: 11, color: T.text }); fLP.x = fLCols[2].x; fLP.y = 9; fLRow.appendChild(fLP);
    const fLDc = txt(fl.dc, { size: 11, color: fl.dc !== '0%' ? T.warning : T.textMuted }); fLDc.x = fLCols[3].x; fLDc.y = 9; fLRow.appendChild(fLDc);
    const fLS = txt(fl.s, { size: 11, color: T.text, weight: 'Bold' }); fLS.x = fLCols[4].x; fLS.y = 9; fLRow.appendChild(fLS);
    const fLLine = rect(rightWF2, 1, T.border2); fLLine.x = 0; fLLine.y = 31; fLRow.appendChild(fLLine);
    fLineCard.appendChild(fLRow); fLY += 32;
  }
  // Totals block
  const fTotBg = frame('FTotBg', rightWF2, 40, { fill: { r:0.949,g:0.961,b:0.976 } }); fTotBg.x = 0; fTotBg.y = fLY + 4;
  const fSubL = txt('Subtotal', { size: 11, color: T.textMuted }); fSubL.x = fLCols[3].x; fSubL.y = 6; fTotBg.appendChild(fSubL);
  const fSubV = txt('$20,952', { size: 11, color: T.text, weight: 'Bold' }); fSubV.x = fLCols[4].x; fSubV.y = 6; fTotBg.appendChild(fSubV);
  const fIvaL = txt('IVA 5%', { size: 11, color: T.textMuted }); fIvaL.x = fLCols[3].x; fIvaL.y = 22; fTotBg.appendChild(fIvaL);
  const fIvaV = txt('$1,048', { size: 11, color: T.text, weight: 'Bold' }); fIvaV.x = fLCols[4].x; fIvaV.y = 22; fTotBg.appendChild(fIvaV);
  fLineCard.appendChild(fTotBg);
  const fTotalBg = frame('FTotalBg', rightWF2, 34, { fill: T.primary, radius: 8 }); fTotalBg.x = 0; fTotalBg.y = fLY + 48;
  const fTotalL = txt('TOTAL A PAGAR', { size: 11, color: T.white, weight: 'Bold' }); fTotalL.x = fLCols[3].x; fTotalL.y = 9; fTotalBg.appendChild(fTotalL);
  const fTotalV = txt('$22,000', { size: 13, color: T.white, weight: 'Bold' }); fTotalV.x = fLCols[4].x; fTotalV.y = 7; fTotalBg.appendChild(fTotalV);
  fLineCard.appendChild(fTotalBg);
  mf.appendChild(fLineCard);

  // Right: Aging card
  const agingCard = frame('Card / Aging', rightWF2, 56, { fill: T.surface, radius: 12, stroke: T.border, strokeW: 1 });
  agingCard.x = rightXF2; agingCard.y = bodyYF + 318 + 12;
  const agingT = txt('Antig�edad de la deuda', { size: 13, color: T.text, weight: 'Bold' }); agingT.x = 16; agingT.y = 14; agingCard.appendChild(agingT);
  const agingBuckets = [
    { l:'Corriente', v:'$22,000', c:T.success },
    { l:'> 30d',     v:'$0',      c:T.textMuted },
    { l:'> 60d',     v:'$0',      c:T.textMuted },
    { l:'> 90d',     v:'$0',      c:T.textMuted },
  ];
  for (let i = 0; i < agingBuckets.length; i++) {
    const ab = agingBuckets[i]; const abx = 16 + i * Math.floor((rightWF2 - 32) / 4);
    const abL = txt(ab.l, { size: 9, color: T.textMuted }); abL.x = abx; abL.y = 28; agingCard.appendChild(abL);
    const abV = txt(ab.v, { size: 13, color: ab.c, weight: 'Bold' }); abV.x = abx; abV.y = 10; agingCard.appendChild(abV);
  }
  mf.appendChild(agingCard);

  return { frame: mf, backBtn: backBtnF };
}

// -----------------------------------------------------------
//  PANTALLA � Detalle de Ticket de Soporte
// -----------------------------------------------------------
async function buildDetalleTicketPage() {
  const PAGE_W = 1440, PAGE_H = 900, CX = 260, CW = PAGE_W - CX, padX = 32;

  const mf = frame('|| Detalle � Ticket #1042', PAGE_W, PAGE_H, { fill: T.bg });
  mf.clipsContent = true;

  const sb = buildSidebar('Tickets');
  sb.x = 0; sb.y = 0; mf.appendChild(sb);
  const hdr = buildHeader('Tickets');
  hdr.x = CX; hdr.y = 0; mf.appendChild(hdr);

  // Banner (red for critical)
  const bannerTk = frame('Banner', CW, 110, { fill: { r:0.118,g:0.051,b:0.051 } });
  bannerTk.x = CX; bannerTk.y = 64;
  const bcTTk = txt('Tickets  /  #1042', { size: 11, color: T.white });
  bcTTk.fills = solidPaint(T.white, 0.5); bcTTk.x = padX; bcTTk.y = 10; bannerTk.appendChild(bcTTk);
  const bigIcoTk = frame('IcoBg', 56, 56, { fill: T.danger, radius: 28 }); bigIcoTk.x = padX; bigIcoTk.y = 34;
  const bigIcoTkT = txt('||', { size: 24 }); bigIcoTkT.x = 12; bigIcoTkT.y = 10; bigIcoTk.appendChild(bigIcoTkT); bannerTk.appendChild(bigIcoTk);
  const tkTitle2 = txt('#1042 � Error en m�dulo de facturaci�n', { size: 18, color: T.white, weight: 'Bold' }); tkTitle2.x = padX + 68; tkTitle2.y = 30; bannerTk.appendChild(tkTitle2);
  const tkSub2 = txt('Tecno S.A.  �  Bug  �  Asignado a: Carlos V.  �  Hace 2h', { size: 12, color: T.white });
  tkSub2.fills = solidPaint(T.white, 0.65); tkSub2.x = padX + 68; tkSub2.y = 56; bannerTk.appendChild(tkSub2);
  const criCh = frame('CriCh', 60, 22, { fill: T.danger, radius: 11 }); criCh.x = padX + 68; criCh.y = 76;
  const criT = txt('Cr�tico', { size: 10, color: T.white, weight: 'Bold' }); criT.x = (60 - criT.width) / 2; criT.y = (22 - criT.height) / 2;
  criCh.appendChild(criT); bannerTk.appendChild(criCh);
  const abiertoCh = frame('AbiertoCh', 60, 22, { fill: { r:0.012,g:0.376,b:0.824 }, radius: 11 }); abiertoCh.x = padX + 140; abiertoCh.y = 76;
  const abiT = txt('Abierto', { size: 10, color: T.white, weight: 'Bold' }); abiT.x = (60 - abiT.width) / 2; abiT.y = (22 - abiT.height) / 2;
  abiertoCh.appendChild(abiT); bannerTk.appendChild(abiertoCh);
  const backBtnTk = frame('Btn / Volver ? Tickets', 88, 28, { fill: T.surface, radius: 6 });
  backBtnTk.fills = solidPaint(T.white, 0.12); backBtnTk.x = CW - 110; backBtnTk.y = 10;
  const backTkT = txt('? Volver', { size: 11, color: T.white, weight: 'Semi Bold' }); backTkT.x = (88 - backTkT.width) / 2; backTkT.y = (28 - backTkT.height) / 2;
  backBtnTk.appendChild(backTkT); bannerTk.appendChild(backBtnTk);
  const btnCerrarTk = button('? Cerrar Ticket', 'primary'); btnCerrarTk.x = CW - 240; btnCerrarTk.y = 44; bannerTk.appendChild(btnCerrarTk);
  const btnEscTk = button('? Escalar', 'secondary'); btnEscTk.x = CW - 348; btnEscTk.y = 44; bannerTk.appendChild(btnEscTk);
  mf.appendChild(bannerTk);

  const bodyYTk = 64 + 110 + 16;
  const leftWTk = 300, rightWTk = CW - padX * 2 - leftWTk - 16;
  const leftXTk = CX + padX, rightXTk = leftXTk + leftWTk + 16;

  // Left: Ticket info card
  const tkInfoCard = frame('Card / Info Ticket', leftWTk, 268, { fill: T.surface, radius: 12, stroke: T.border, strokeW: 1 });
  tkInfoCard.x = leftXTk; tkInfoCard.y = bodyYTk;
  const tkInfoTit = txt('Informaci�n del Ticket', { size: 13, color: T.text, weight: 'Bold' }); tkInfoTit.x = 16; tkInfoTit.y = 14; tkInfoCard.appendChild(tkInfoTit);
  const tkInfoRows = [
    { ico:'||', l:'ID',            v:'#1042'                  },
    { ico:'||', l:'Tipo',          v:'Bug'                    },
    { ico:'||', l:'Prioridad',     v:'Cr�tico'                },
    { ico:'||', l:'Estado',        v:'Abierto'                },
    { ico:'||', l:'Cliente',       v:'Tecno S.A.'             },
    { ico:'||', l:'Reportado por', v:'Carlos Ruiz'            },
    { ico:'||', l:'Asignado a',    v:'Carlos V.'              },
    { ico:'||', l:'Creado',        v:'Hoy � 10:30 AM'        },
    { ico:'?',  l:'SLA restante',  v:'22h (meta = 24h)'      },
  ];
  for (let i = 0; i < tkInfoRows.length; i++) {
    const r = tkInfoRows[i]; const ry = 40 + i * 26;
    const ri = txt(r.ico, { size: 11 }); ri.x = 16; ri.y = ry; tkInfoCard.appendChild(ri);
    const rl = txt(r.l, { size: 10, color: T.textMuted }); rl.x = 36; rl.y = ry; tkInfoCard.appendChild(rl);
    const rv = txt(r.v, { size: 11, color: T.text, weight: 'Semi Bold' }); rv.x = 136; rv.y = ry; tkInfoCard.appendChild(rv);
    if (i < tkInfoRows.length - 1) { const rll = rect(leftWTk - 32, 1, T.border2); rll.x = 16; rll.y = ry + 18; tkInfoCard.appendChild(rll); }
  }
  mf.appendChild(tkInfoCard);

  // Left: Related assets
  const tkRelCard = frame('Card / Entorno', leftWTk, 96, { fill: T.surface, radius: 12, stroke: T.border, strokeW: 1 });
  tkRelCard.x = leftXTk; tkRelCard.y = bodyYTk + 268 + 12;
  const tkRelTit = txt('Entorno Afectado', { size: 13, color: T.text, weight: 'Bold' }); tkRelTit.x = 16; tkRelTit.y = 14; tkRelCard.appendChild(tkRelTit);
  const tkRelItems = [
    { l:'M�dulo',  v:'Facturaci�n' },
    { l:'Versi�n', v:'v4.2.1'      },
    { l:'Entorno', v:'Producci�n'  },
  ];
  for (let i = 0; i < tkRelItems.length; i++) {
    const ri = tkRelItems[i]; const rix = 16 + i * Math.floor((leftWTk - 32) / 3);
    const riL = txt(ri.l, { size: 9, color: T.textMuted }); riL.x = rix; riL.y = 38; tkRelCard.appendChild(riL);
    const riV = txt(ri.v, { size: 12, color: T.text, weight: 'Bold' }); riV.x = rix; riV.y = 54; tkRelCard.appendChild(riV);
  }
  mf.appendChild(tkRelCard);

  // Right: Description
  const descCardTk = frame('Card / Descripci�n Tk', rightWTk, 140, { fill: T.surface, radius: 12, stroke: T.border, strokeW: 1 });
  descCardTk.x = rightXTk; descCardTk.y = bodyYTk;
  const descTkTit = txt('Descripci�n del Problema', { size: 13, color: T.text, weight: 'Bold' }); descTkTit.x = 16; descTkTit.y = 14; descCardTk.appendChild(descTkTit);
  const descTkBody = txt(
    'Al intentar generar la factura FAC-2026-087 el sistema arroja el error:\n' +
    '"TypeError: Cannot read property \'total\' of undefined en line 342 de invoice.js".\n\n' +
    'El error ocurre consistentemente cuando el cliente tiene �tems con descuento.\n' +
    'Se repite en Chrome 122 y Safari 17. Bloqueante para el cierre del mes.',
    { size: 11, color: T.textMuted }
  );
  descTkBody.x = 16; descTkBody.y = 38; descTkBody.resize(rightWTk - 32, 90);
  descCardTk.appendChild(descTkBody);
  mf.appendChild(descCardTk);

  // Right: Thread / comments
  const threadCard = frame('Card / Hilo', rightWTk, 226, { fill: T.surface, radius: 12, stroke: T.border, strokeW: 1 });
  threadCard.x = rightXTk; threadCard.y = bodyYTk + 140 + 12;
  const threadTit = txt('Conversaci�n', { size: 13, color: T.text, weight: 'Bold' }); threadTit.x = 16; threadTit.y = 14; threadCard.appendChild(threadTit);
  const threadItems = [
    { init:'CR', name:'Carlos Ruiz',   t:'Hoy 10:30', msg:'Report� el bug por primera vez. Ocurre al generar facturas con descuento.', own:false },
    { init:'CV', name:'Carlos V.',     t:'Hoy 10:48', msg:'Recibido. Revisando el c�digo del m�dulo de facturaci�n. ETA: 2h.',           own:true  },
    { init:'CR', name:'Carlos Ruiz',   t:'Hoy 11:15', msg:'�Alguna actualizaci�n? El cierre de mes es hoy a las 17:00.',                 own:false },
    { init:'CV', name:'Carlos V.',     t:'Hoy 11:30', msg:'Encontr� el problema. Ser� resuelto antes de las 13:00. Actualizando.',       own:true  },
  ];
  let thY = 36;
  for (const th of threadItems) {
    const thRow = frame('ThRow' + th.name, rightWTk - 32, 42, { fill: th.own ? { r:0.937,g:0.961,b:0.976 } : { r:0.973,g:0.980,b:0.988 }, radius: 8 });
    thRow.x = 16; thRow.y = thY;
    const thAv = frame('ThAv', 24, 24, { fill: th.own ? T.primary : T.border2, radius: 12 }); thAv.x = 8; thAv.y = 9;
    const thAvT = txt(th.init, { size: 8, color: T.white, weight: 'Bold' }); thAvT.x = (24 - thAvT.width) / 2; thAvT.y = (24 - thAvT.height) / 2; thAv.appendChild(thAvT); thRow.appendChild(thAv);
    const thN = txt(th.name, { size: 10, color: T.text, weight: 'Bold' }); thN.x = 40; thN.y = 8; thRow.appendChild(thN);
    const thT = txt(th.t, { size: 9, color: T.textMuted }); thT.x = (rightWTk - 32) - 56; thT.y = 9; thRow.appendChild(thT);
    const thM = txt(th.msg, { size: 10, color: T.textMuted }); thM.x = 40; thM.y = 22; thRow.appendChild(thM);
    threadCard.appendChild(thRow); thY += 48;
  }
  // Reply input
  const replyBg = frame('ReplyInput', rightWTk - 32, 30, { fill: { r:0.972,g:0.980,b:0.992 }, radius: 8, stroke: T.border, strokeW: 1 });
  replyBg.x = 16; replyBg.y = thY + 4;
  const replyPh = txt('Escribe una respuesta�', { size: 11, color: T.textMuted }); replyPh.x = 12; replyPh.y = 9; replyBg.appendChild(replyPh);
  threadCard.appendChild(replyBg);
  mf.appendChild(threadCard);

  return { frame: mf, backBtn: backBtnTk };
}

// -----------------------------------------------------------
//  PANTALLA � Login / Welcome
// -----------------------------------------------------------
async function buildLoginPage() {
  const PAGE_W = 1440, PAGE_H = 900;

  const mf = frame('|| Login � Maki CRM', PAGE_W, PAGE_H, { fill: { r:0.055,g:0.133,b:0.251 } });
  mf.clipsContent = true;

  // Left panel (branding)
  const leftPanel = frame('LeftPanel', 680, PAGE_H, { fill: T.primary });
  leftPanel.x = 0; leftPanel.y = 0;

  // Geometric accent circles (decorative)
  const c1 = frame('Deco1', 320, 320, { fill: T.primaryLight, radius: 160 });
  c1.fills = solidPaint(T.white, 0.04); c1.x = -80; c1.y = -80; leftPanel.appendChild(c1);
  const c2 = frame('Deco2', 240, 240, { fill: T.primaryLight, radius: 120 });
  c2.fills = solidPaint(T.white, 0.06); c2.x = 440; c2.y = 600; leftPanel.appendChild(c2);
  const c3 = frame('Deco3', 160, 160, { fill: T.primaryLight, radius: 80 });
  c3.fills = solidPaint(T.white, 0.05); c3.x = 540; c3.y = 80; leftPanel.appendChild(c3);

  // Logo mark
  const logoMark = frame('LogoMark', 64, 64, { fill: T.white, radius: 18 });
  logoMark.x = 64; logoMark.y = 60;
  const logoT = txt('M', { size: 34, color: T.primary, weight: 'Bold' });
  logoT.x = (64 - logoT.width) / 2; logoT.y = (64 - logoT.height) / 2;
  logoMark.appendChild(logoT); leftPanel.appendChild(logoMark);
  const brandT = txt('Maki CRM', { size: 22, color: T.white, weight: 'Bold' }); brandT.x = 140; brandT.y = 74; leftPanel.appendChild(brandT);
  const taglineT = txt('by Maki Studio', { size: 12, color: T.white }); taglineT.fills = solidPaint(T.white, 0.5); taglineT.x = 140; taglineT.y = 100; leftPanel.appendChild(taglineT);

  // Main headline
  const h1 = txt('Gestiona tu negocio\nen un solo lugar.', { size: 42, color: T.white, weight: 'Bold' });
  h1.x = 64; h1.y = 240; leftPanel.appendChild(h1);
  const sub = txt('El CRM inteligente que conecta a tu equipo\ncon cada cliente, oportunidad y resultado.', { size: 16, color: T.white });
  sub.fills = solidPaint(T.white, 0.7); sub.x = 64; sub.y = 360; leftPanel.appendChild(sub);

  // Feature list
  const features2 = [
    { ico:'?', t:'360� de cada cliente y oportunidad'     },
    { ico:'||', t:'Reportes en tiempo real y forecasting'  },
    { ico:'||', t:'Comunicaci�n y actividades centralizadas'},
    { ico:'||', t:'Seguridad empresarial y roles granulares'},
  ];
  for (let i = 0; i < features2.length; i++) {
    const fBg = frame('FeatRow' + i, 540, 36, { fill: T.surface, radius: 10 });
    fBg.fills = solidPaint(T.white, 0.08);
    fBg.x = 64; fBg.y = 460 + i * 46;
    const fIco = txt(features2[i].ico, { size: 14 }); fIco.x = 12; fIco.y = 11; fBg.appendChild(fIco);
    const fTxt = txt(features2[i].t, { size: 12, color: T.white }); fTxt.x = 40; fTxt.y = 12; fBg.appendChild(fTxt);
    leftPanel.appendChild(fBg);
  }

  // Footer copy
  const fCopy = txt('� 2026 Maki Studio. Todos los derechos reservados.', { size: 10, color: T.white }); fCopy.fills = solidPaint(T.white, 0.35); fCopy.x = 64; fCopy.y = 860; leftPanel.appendChild(fCopy);

  mf.appendChild(leftPanel);

  // Right panel (login form)
  const rightPanel = frame('RightPanel', PAGE_W - 680, PAGE_H, { fill: T.bg });
  rightPanel.x = 680; rightPanel.y = 0;

  const formW = 380;
  const formX = Math.floor(((PAGE_W - 680) - formW) / 2);
  const formY = 140;

  const welcomeT = txt('Bienvenido de nuevo ||', { size: 26, color: T.text, weight: 'Bold' }); welcomeT.x = formX; welcomeT.y = formY; rightPanel.appendChild(welcomeT);
  const signinT = txt('Inicia sesi�n en tu cuenta para continuar.', { size: 13, color: T.textMuted }); signinT.x = formX; signinT.y = formY + 38; rightPanel.appendChild(signinT);

  // Email field
  const emailLbl = txt('CORREO ELECTR�NICO', { size: 9, color: T.textMuted, weight: 'Semi Bold' }); emailLbl.letterSpacing = { value:4, unit:'PERCENT' };
  emailLbl.x = formX; emailLbl.y = formY + 88; rightPanel.appendChild(emailLbl);
  const emailBox = frame('EmailInput', formW, 44, { fill: T.surface, radius: 8, stroke: T.border, strokeW: 1 });
  emailBox.x = formX; emailBox.y = formY + 106;
  const emailPh = txt('correo@empresa.com', { size: 13, color: T.textMuted }); emailPh.x = 14; emailPh.y = 14;
  emailBox.appendChild(emailPh); rightPanel.appendChild(emailBox);

  // Password field
  const passLbl = txt('CONTRASE�A', { size: 9, color: T.textMuted, weight: 'Semi Bold' }); passLbl.letterSpacing = { value:4, unit:'PERCENT' };
  passLbl.x = formX; passLbl.y = formY + 168; rightPanel.appendChild(passLbl);
  const passBox = frame('PassInput', formW, 44, { fill: T.surface, radius: 8, stroke: T.border, strokeW: 1 });
  passBox.x = formX; passBox.y = formY + 186;
  const passPh = txt('����������', { size: 16, color: T.textMuted }); passPh.x = 14; passPh.y = 12;
  passBox.appendChild(passPh);
  const showT = txt('Mostrar', { size: 11, color: T.primaryLight, weight: 'Semi Bold' }); showT.x = formW - 58; showT.y = 15; passBox.appendChild(showT);
  rightPanel.appendChild(passBox);

  // Forgot password
  const forgotT = txt('�Olvidaste tu contrase�a?', { size: 11, color: T.primaryLight, weight: 'Semi Bold' }); forgotT.x = formX + formW - forgotT.width; forgotT.y = formY + 240; rightPanel.appendChild(forgotT);

  // Remember me
  const remBox = frame('RemCheck', 16, 16, { fill: T.primary, radius: 4 }); remBox.x = formX; remBox.y = formY + 242;
  const remChT = txt('?', { size: 9, color: T.white, weight: 'Bold' }); remChT.x = 3; remChT.y = 3; remBox.appendChild(remChT); rightPanel.appendChild(remBox);
  const remT = txt('Mantener sesi�n iniciada', { size: 12, color: T.textMuted }); remT.x = formX + 22; remT.y = formY + 241; rightPanel.appendChild(remT);

  // Login button
  const loginBtn = frame('Btn / Iniciar Sesi�n', formW, 48, { fill: T.primary, radius: 10 });
  loginBtn.x = formX; loginBtn.y = formY + 272;
  const loginBtnT = txt('Iniciar sesi�n', { size: 14, color: T.white, weight: 'Bold' }); loginBtnT.x = (formW - loginBtnT.width) / 2; loginBtnT.y = (48 - loginBtnT.height) / 2;
  loginBtn.appendChild(loginBtnT); rightPanel.appendChild(loginBtn);

  // Divider
  const divL = rect(174, 1, T.border); divL.x = formX; divL.y = formY + 340; rightPanel.appendChild(divL);
  const divTxt = txt('o contin�a con', { size: 11, color: T.textMuted }); divTxt.x = formX + 186; divTxt.y = formY + 334; rightPanel.appendChild(divTxt);
  const divR = rect(174, 1, T.border); divR.x = formX + 206; divR.y = formY + 340; rightPanel.appendChild(divR);

  // Social login buttons
  const gBtn = frame('GBtn', Math.floor(formW / 2) - 6, 44, { fill: T.surface, radius: 8, stroke: T.border, strokeW: 1 });
  gBtn.x = formX; gBtn.y = formY + 356;
  const gBtnT = txt('|| Google', { size: 12, color: T.text, weight: 'Semi Bold' }); gBtnT.x = (gBtn.width - gBtnT.width) / 2; gBtnT.y = 14; gBtn.appendChild(gBtnT); rightPanel.appendChild(gBtn);
  const msBtn = frame('MSBtn', Math.floor(formW / 2) - 6, 44, { fill: T.surface, radius: 8, stroke: T.border, strokeW: 1 });
  msBtn.x = formX + Math.floor(formW / 2) + 6; msBtn.y = formY + 356;
  const msBtnT = txt('|| Microsoft', { size: 12, color: T.text, weight: 'Semi Bold' }); msBtnT.x = (msBtn.width - msBtnT.width) / 2; msBtnT.y = 14; msBtn.appendChild(msBtnT); rightPanel.appendChild(msBtn);

  // Sign-up prompt
  const signupT = txt('�No tienes cuenta?', { size: 12, color: T.textMuted }); signupT.x = formX + Math.floor((formW - signupT.width - 94) / 2); signupT.y = formY + 424; rightPanel.appendChild(signupT);
  const signupLinkT = txt('Solicitar acceso ?', { size: 12, color: T.primaryLight, weight: 'Bold' }); signupLinkT.x = signupT.x + signupT.width + 6; signupLinkT.y = formY + 424; rightPanel.appendChild(signupLinkT);

  // Wire the login button ? Dashboard
  mf.appendChild(leftPanel);
  mf.appendChild(rightPanel);

  return { frame: mf, loginBtn };
}

// -----------------------------------------------------------
//  MAIN BUILD
// -----------------------------------------------------------
async function buildAll() {
  await loadFonts();

  // -- Sesi�n 1: Dashboard ----------------------------------
  const dash = await buildDashboard();
  dash.x = 0; dash.y = 0;
  figma.currentPage.appendChild(dash);
  try { wirePrototype(dash); } catch (e) { console.warn('wire dash:', e); }

  // -- Sesi�n 2: Contactos ----------------------------------
  const { frame: contactsFrame, modalNC, btnNew } = await buildContactsPage();
  contactsFrame.x = 1500; contactsFrame.y = 0;
  figma.currentPage.appendChild(contactsFrame);
  try { wireContactsPrototype(contactsFrame, btnNew, modalNC); } catch (e) { console.warn('wire contacts:', e); }

  // -- Sesi�n 2: Cuentas ------------------------------------
  const { frame: accountsFrame, modalNC2, btnNewC } = await buildAccountsPage();
  accountsFrame.x = 3000; accountsFrame.y = 0;
  figma.currentPage.appendChild(accountsFrame);
  try { wireAccountsPrototype(accountsFrame, btnNewC, modalNC2); } catch (e) { console.warn('wire accounts:', e); }

  // -- Sesi�n 3: Leads ---------------------------------------
  const { frame: leadsFrame, modalNL, btnNewLead } = await buildLeadsPage();
  leadsFrame.x = 4500; leadsFrame.y = 0;
  figma.currentPage.appendChild(leadsFrame);
  try { wireLeadsPrototype(leadsFrame, btnNewLead, modalNL); } catch (e) { console.warn('wire leads:', e); }

  // -- Sesi�n 3: Oportunidades ------------------------------
  const { frame: opFrame, modalNO, btnNewOp } = await buildOportunidadesPage();
  opFrame.x = 6000; opFrame.y = 0;
  figma.currentPage.appendChild(opFrame);
  try { wireOportunidadesPrototype(opFrame, btnNewOp, modalNO); } catch (e) { console.warn('wire oportunidades:', e); }

  // -- Sesi�n 4: Actividades --------------------------------
  const { frame: actFrame, modalNA2, btnNewAct } = await buildActividadesPage();
  actFrame.x = 7500; actFrame.y = 0;
  figma.currentPage.appendChild(actFrame);
  try { wireActividadesPrototype(actFrame, btnNewAct, modalNA2); } catch (e) { console.warn('wire actividades:', e); }

  // -- Sesi�n 4: Calendario ---------------------------------
  const { frame: calFrame, modalNE, btnNewEv } = await buildCalendarioPage();
  calFrame.x = 9000; calFrame.y = 0;
  figma.currentPage.appendChild(calFrame);
  try { wireCalendarioPrototype(calFrame, btnNewEv, modalNE); } catch (e) { console.warn('wire calendario:', e); }

  // -- Sesi�n 5: Productos ----------------------------------
  const { frame: prodFrame, modalNP, modalDP, btnNewProd } = await buildProductosPage();
  prodFrame.x = 10500; prodFrame.y = 0;
  figma.currentPage.appendChild(prodFrame);
  try { wireGenericOverlay(prodFrame, btnNewProd, modalNP); } catch (e) { console.warn('wire productos:', e); }

  // -- Sesi�n 5: Cotizaciones --------------------------------
  const { frame: cotFrame, modalNQ, modalDQ, btnNewQ } = await buildCotizacionesPage();
  cotFrame.x = 12000; cotFrame.y = 0;
  figma.currentPage.appendChild(cotFrame);
  try { wireGenericOverlay(cotFrame, btnNewQ, modalNQ); } catch (e) { console.warn('wire cotizaciones:', e); }

  // -- Sesi�n 5: Facturas ------------------------------------
  const { frame: facFrame, modalNF, modalDF, btnNewF } = await buildFacturasPage();
  facFrame.x = 13500; facFrame.y = 0;
  figma.currentPage.appendChild(facFrame);
  try { wireGenericOverlay(facFrame, btnNewF, modalNF); } catch (e) { console.warn('wire facturas:', e); }

  // -- Sesi�n 6: Campa�as ------------------------------------
  const { frame: campFrame, modalNC: modalNCamp, btnNewCamp } = await buildCampanasPage();
  campFrame.x = 15000; campFrame.y = 0;
  figma.currentPage.appendChild(campFrame);
  try { wireGenericOverlay(campFrame, btnNewCamp, modalNCamp); } catch (e) { console.warn('wire campa�as:', e); }

  // -- Sesi�n 6: Tickets ------------------------------------
  const { frame: tickFrame, modalNTk, btnNewTk } = await buildTicketsPage();
  tickFrame.x = 16500; tickFrame.y = 0;
  figma.currentPage.appendChild(tickFrame);
  try { wireGenericOverlay(tickFrame, btnNewTk, modalNTk); } catch (e) { console.warn('wire tickets:', e); }

  // -- Sesi�n 7: Documentos ------------------------------------
  const { frame: docFrame, modalSD, modalCD, btnUpload } = await buildDocumentosPage();
  docFrame.x = 18000; docFrame.y = 0;
  figma.currentPage.appendChild(docFrame);
  try { wireGenericOverlay(docFrame, btnUpload, modalSD); } catch (e) { console.warn('wire documentos:', e); }

  // -- Sesi�n 7: Reportes --------------------------------------
  const { frame: repFrame, modalNR, btnNewRep } = await buildReportesPage();
  repFrame.x = 19500; repFrame.y = 0;
  figma.currentPage.appendChild(repFrame);
  try { wireGenericOverlay(repFrame, btnNewRep, modalNR); } catch (e) { console.warn('wire reportes:', e); }

  // -- Sesi�n 8: Equipo ----------------------------------------
  const { frame: equipoFrame, modalIM, btnInvite } = await buildEquipoPage();
  equipoFrame.x = 21000; equipoFrame.y = 0;
  figma.currentPage.appendChild(equipoFrame);
  try { wireGenericOverlay(equipoFrame, btnInvite, modalIM); } catch (e) { console.warn('wire equipo:', e); }

  // -- Sesi�n 8: Configuraci�n ---------------------------------
  const { frame: configFrame } = await buildConfiguracionPage();
  configFrame.x = 22500; configFrame.y = 0;
  figma.currentPage.appendChild(configFrame);

  // -- Sesi�n 9: Detalle Contacto -------------------------------
  const { frame: detalleContactoFrame, backBtn: backBtnDC } = await buildDetalleContactoPage();
  detalleContactoFrame.x = 24000; detalleContactoFrame.y = 0;
  figma.currentPage.appendChild(detalleContactoFrame);

  // Wire "Volver" back button
  try {
    backBtnDC.reactions = [{
      actions: [{ type: 'BACK', navigation: 'BACK' }],
      trigger: { type: 'ON_CLICK' },
    }];
  } catch (e) { console.warn('wire back detalle:', e); }

  // Wire contact name links in Contacts table ? detail page
  try { wireRowLinks(contactsFrame, detalleContactoFrame, 'RowLink / '); } catch (e) {}

  // -- Sesi�n 10: Detalle Oportunidad --------------------------
  const { frame: detOpFrame, backBtn: backBtnOp } = await buildDetalleOportunidadPage();
  detOpFrame.x = 25500; detOpFrame.y = 0;
  figma.currentPage.appendChild(detOpFrame);
  try { backBtnOp.reactions = [{ actions: [{ type: 'BACK', navigation: 'BACK' }], trigger: { type: 'ON_CLICK' } }]; } catch (e) { console.warn('wire back detalle op:', e); }
  try { wireRowLinks(opFrame, detOpFrame, 'RowLink / '); } catch (e) {}

  // -- Sesi�n 10: Detalle Cuenta --------------------------------
  const { frame: detCuentaFrame, backBtn: backBtnCuenta } = await buildDetalleCuentaPage();
  detCuentaFrame.x = 27000; detCuentaFrame.y = 0;
  figma.currentPage.appendChild(detCuentaFrame);
  try { backBtnCuenta.reactions = [{ actions: [{ type: 'BACK', navigation: 'BACK' }], trigger: { type: 'ON_CLICK' } }]; } catch (e) { console.warn('wire back detalle cuenta:', e); }
  try { wireRowLinks(accountsFrame, detCuentaFrame, 'RowLink / '); } catch (e) {}

  // -- Sesi�n 10: Detalle Lead ----------------------------------
  const { frame: detLeadFrame, backBtn: backBtnLead } = await buildDetalleLeadPage();
  detLeadFrame.x = 28500; detLeadFrame.y = 0;
  figma.currentPage.appendChild(detLeadFrame);
  try { backBtnLead.reactions = [{ actions: [{ type: 'BACK', navigation: 'BACK' }], trigger: { type: 'ON_CLICK' } }]; } catch (e) { console.warn('wire back detalle lead:', e); }
  try { wireRowLinks(leadsFrame, detLeadFrame, 'RowLink / '); } catch (e) {}

  // -- Sesi�n 11: Detalle Actividad -----------------------------
  const { frame: detActFrame, backBtn: backBtnAct } = await buildDetalleActividadPage();
  detActFrame.x = 30000; detActFrame.y = 0;
  figma.currentPage.appendChild(detActFrame);
  try { backBtnAct.reactions = [{ actions: [{ type: 'BACK', navigation: 'BACK' }], trigger: { type: 'ON_CLICK' } }]; } catch (e) { console.warn('wire back act:', e); }
  try { wireRowLinks(actFrame, detActFrame, 'RowLink / '); } catch (e) {}

  // -- Sesi�n 11: Detalle Producto ------------------------------
  const { frame: detProdFrame, backBtn: backBtnProd } = await buildDetalleProductoPage();
  detProdFrame.x = 31500; detProdFrame.y = 0;
  figma.currentPage.appendChild(detProdFrame);
  try { backBtnProd.reactions = [{ actions: [{ type: 'BACK', navigation: 'BACK' }], trigger: { type: 'ON_CLICK' } }]; } catch (e) { console.warn('wire back prod:', e); }
  try { wireRowLinks(prodFrame, detProdFrame, 'RowLink / '); } catch (e) {}

  // -- Sesi�n 11: Detalle Cotizaci�n ----------------------------
  const { frame: detCotFrame, backBtn: backBtnCot } = await buildDetalleCotizacionPage();
  detCotFrame.x = 33000; detCotFrame.y = 0;
  figma.currentPage.appendChild(detCotFrame);
  try { backBtnCot.reactions = [{ actions: [{ type: 'BACK', navigation: 'BACK' }], trigger: { type: 'ON_CLICK' } }]; } catch (e) { console.warn('wire back cot:', e); }
  try { wireRowLinks(cotFrame, detCotFrame, 'RowLink / '); } catch (e) {}

  // -- Sesi�n 12: Detalle Factura --------------------------------
  const { frame: detFacFrame, backBtn: backBtnFac } = await buildDetalleFacturaPage();
  detFacFrame.x = 34500; detFacFrame.y = 0;
  figma.currentPage.appendChild(detFacFrame);
  try { backBtnFac.reactions = [{ actions: [{ type: 'BACK', navigation: 'BACK' }], trigger: { type: 'ON_CLICK' } }]; } catch (e) { console.warn('wire back fac:', e); }
  try { wireRowLinks(facFrame, detFacFrame, 'RowLink / '); } catch (e) {}

  // -- Sesi�n 12: Detalle Ticket ---------------------------------
  const { frame: detTickFrame, backBtn: backBtnTick } = await buildDetalleTicketPage();
  detTickFrame.x = 36000; detTickFrame.y = 0;
  figma.currentPage.appendChild(detTickFrame);
  try { backBtnTick.reactions = [{ actions: [{ type: 'BACK', navigation: 'BACK' }], trigger: { type: 'ON_CLICK' } }]; } catch (e) { console.warn('wire back tick:', e); }
  try { wireRowLinks(tickFrame, detTickFrame, 'RowLink / '); } catch (e) {}

  // -- Sesi�n 12: Login ------------------------------------------
  const { frame: loginFrame, loginBtn } = await buildLoginPage();
  loginFrame.x = 37500; loginFrame.y = 0;
  figma.currentPage.appendChild(loginFrame);
  try {
    loginBtn.reactions = [{
      actions: [{ type: 'NODE', destinationId: dash.id, navigation: 'NAVIGATE',
        transition: { type: 'SLIDE_IN', duration: 0.3, easing: { type: 'EASE_IN_AND_OUT' }, direction: 'LEFT' },
        preserveScrollPosition: false }],
      trigger: { type: 'ON_CLICK' }
    }];
  } catch (e) { console.warn('wire login:', e); }

  // -- Sidebar Navigation Wiring (todas las pantallas) ---------
  const sidebarNavMap = {
    'Dashboard':      dash,
    'Contactos':      contactsFrame,
    'Cuentas':        accountsFrame,
    'Leads':          leadsFrame,
    'Oportunidades':  opFrame,
    'Actividades':    actFrame,
    'Calendario':     calFrame,
    'Productos':      prodFrame,
    'Cotizaciones':   cotFrame,
    'Facturas':       facFrame,
    'Campa�as':       campFrame,
    'Tickets':        tickFrame,
    'Documentos':     docFrame,
    'Reportes':       repFrame,
    'Equipo':         equipoFrame,
    'Configuraci�n':  configFrame,
  };
  try { wireSidebarNavigation(sidebarNavMap); } catch (e) { console.warn('wireSidebarNavigation:', e); }

  // Select all & zoom
  figma.currentPage.selection = [dash, contactsFrame, accountsFrame, leadsFrame, opFrame, actFrame, calFrame, prodFrame, cotFrame, facFrame, campFrame, tickFrame, docFrame, repFrame, equipoFrame, configFrame, detalleContactoFrame, detOpFrame, detCuentaFrame, detLeadFrame, detActFrame, detProdFrame, detCotFrame, detFacFrame, detTickFrame, loginFrame];
  figma.viewport.scrollAndZoomIntoView([dash, contactsFrame, accountsFrame, leadsFrame, opFrame, actFrame, calFrame, prodFrame, cotFrame, facFrame, campFrame, tickFrame, docFrame, repFrame, equipoFrame, configFrame, detalleContactoFrame, detOpFrame, detCuentaFrame, detLeadFrame, detActFrame, detProdFrame, detCotFrame, detFacFrame, detTickFrame, loginFrame]);
}

// -- Auto-run --
(async () => { await buildAll(); figma.closePlugin('[OK] Maki CRM listo'); })();
