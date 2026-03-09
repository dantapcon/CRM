/* =========================================================
   CRM NexusCRM — Componente React/Tailwind para Figma
   Basado en la plantilla "About me" de Figma Make
   ========================================================= */

// ── Iconos SVG ───────────────────────────────────────────────
function IconDashboard() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
      <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
    </svg>
  );
}
function IconUser() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  );
}
function IconBuilding() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="2" width="16" height="20"/><path d="M8 6h8M8 10h8M8 14h8M12 18v4"/>
    </svg>
  );
}
function IconTarget() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
    </svg>
  );
}
function IconBriefcase() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
    </svg>
  );
}
function IconCheck() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  );
}
function IconCalendar() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
      <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  );
}
function IconBox() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
    </svg>
  );
}
function IconClipboard() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
      <rect x="8" y="2" width="8" height="4" rx="1"/>
    </svg>
  );
}
function IconReceipt() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1-2-1z"/>
      <line x1="8" y1="8" x2="16" y2="8"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="8" y1="16" x2="13" y2="16"/>
    </svg>
  );
}
function IconMegaphone() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 11l19-9-9 19-2-8-8-2z"/>
    </svg>
  );
}
function IconTicket() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 0 0-2 2v3a2 2 0 0 1 0 4v3a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-3a2 2 0 0 1 0-4V7a2 2 0 0 0-2-2H5z"/>
    </svg>
  );
}
function IconFolder() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
    </svg>
  );
}
function IconChart() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/>
      <line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/>
    </svg>
  );
}
function IconUsers() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  );
}
function IconSettings() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
    </svg>
  );
}
function IconSearch() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
  );
}
function IconBell() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
    </svg>
  );
}
function IconArrowUp() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/>
    </svg>
  );
}
function IconArrowDown() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/>
    </svg>
  );
}
function IconMinus() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <line x1="5" y1="12" x2="19" y2="12"/>
    </svg>
  );
}
function IconPhone() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.53a2 2 0 0 1 1.97-2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.16 6.16l1.62-1.62a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
    </svg>
  );
}
function IconMail() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  );
}
function IconPlus() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
    </svg>
  );
}
function IconMoreH() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>
    </svg>
  );
}
function IconTrendUp() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
      <polyline points="17 6 23 6 23 12"/>
    </svg>
  );
}

// ── Componentes de Badge y Avatar ────────────────────────────
function Badge({ color, children }) {
  const colors = {
    blue:   'bg-blue-100 text-blue-700',
    green:  'bg-green-100 text-green-700',
    red:    'bg-red-100 text-red-700',
    yellow: 'bg-yellow-100 text-yellow-700',
    orange: 'bg-orange-100 text-orange-700',
    purple: 'bg-purple-100 text-purple-700',
    gray:   'bg-slate-100 text-slate-600',
    navy:   'bg-blue-50 text-blue-900',
    gold:   'bg-amber-100 text-amber-800',
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold whitespace-nowrap ${colors[color] ?? colors.gray}`}>
      {children}
    </span>
  );
}

function Avatar({ initials, gradient, size = 'sm' }) {
  const sizes = { sm: 'w-8 h-8 text-xs', md: 'w-10 h-10 text-sm', lg: 'w-12 h-12 text-base' };
  return (
    <div
      className={`${sizes[size]} rounded-full flex items-center justify-center font-bold text-white flex-shrink-0`}
      style={{ background: gradient ?? 'linear-gradient(135deg,#1a3d6b,#2563a8)' }}
    >
      {initials}
    </div>
  );
}

// ── Barra de progreso ────────────────────────────────────────
function ProgressBar({ pct, color }) {
  return (
    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
      <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: color }} />
    </div>
  );
}

// ── KPI Card ─────────────────────────────────────────────────
function KPICard({ label, value, change, changeType, icon, accentColor, bgColor }) {
  const changeEl = { up: 'text-green-600', down: 'text-red-600', flat: 'text-slate-400' }[changeType ?? 'flat'];
  const arrowEl = { up: <IconArrowUp />, down: <IconArrowDown />, flat: <IconMinus /> }[changeType ?? 'flat'];
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm relative overflow-hidden"
         style={{ borderTop: `3px solid ${accentColor}` }}>
      <div className="absolute top-4 right-4 w-10 h-10 rounded-lg flex items-center justify-center"
           style={{ background: bgColor }}>
        <span style={{ color: accentColor }}>{icon}</span>
      </div>
      <div className="text-[28px] font-['Inter:Bold',sans-serif] font-bold text-slate-800 leading-tight">
        {value}
      </div>
      <div className="text-[13px] text-slate-500 font-medium mt-1">{label}</div>
      <div className={`flex items-center gap-1 mt-2 text-[11px] font-semibold ${changeEl}`}>
        {arrowEl}{change}
      </div>
    </div>
  );
}

// ── Sidebar ──────────────────────────────────────────────────
const navGroups = [
  {
    group: 'Principal',
    items: [
      { label: 'Dashboard',     icon: <IconDashboard />, href: '#', active: true,  badge: null },
    ],
  },
  {
    group: 'Ventas & CRM',
    items: [
      { label: 'Contactos',     icon: <IconUser />,       href: '#', active: false, badge: null },
      { label: 'Cuentas',       icon: <IconBuilding />,   href: '#', active: false, badge: null },
      { label: 'Leads',         icon: <IconTarget />,     href: '#', active: false, badge: '12' },
      { label: 'Oportunidades', icon: <IconBriefcase />,  href: '#', active: false, badge: null },
      { label: 'Actividades',   icon: <IconCheck />,      href: '#', active: false, badge: '5'  },
      { label: 'Calendario',    icon: <IconCalendar />,   href: '#', active: false, badge: null },
    ],
  },
  {
    group: 'Comercial',
    items: [
      { label: 'Productos',     icon: <IconBox />,        href: '#', active: false, badge: null },
      { label: 'Cotizaciones',  icon: <IconClipboard />,  href: '#', active: false, badge: '3'  },
      { label: 'Facturas',      icon: <IconReceipt />,    href: '#', active: false, badge: null },
    ],
  },
  {
    group: 'Marketing',
    items: [
      { label: 'Campañas',      icon: <IconMegaphone />,  href: '#', active: false, badge: null },
    ],
  },
  {
    group: 'Soporte',
    items: [
      { label: 'Tickets',       icon: <IconTicket />,     href: '#', active: false, badge: '8'  },
      { label: 'Documentos',    icon: <IconFolder />,     href: '#', active: false, badge: null },
    ],
  },
  {
    group: 'Análisis',
    items: [
      { label: 'Reportes',      icon: <IconChart />,      href: '#', active: false, badge: null },
    ],
  },
  {
    group: 'Administración',
    items: [
      { label: 'Equipo',        icon: <IconUsers />,      href: '#', active: false, badge: null },
      { label: 'Configuración', icon: <IconSettings />,   href: '#', active: false, badge: null },
    ],
  },
];

function Sidebar() {
  return (
    <aside className="w-[260px] min-h-screen bg-[#0f2240] text-slate-400 flex flex-col flex-shrink-0" data-name="Sidebar">

      {/* Logo */}
      <div className="px-5 py-5 border-b border-white/[0.08]">
        <div className="flex items-center gap-2.5">
          <div className="w-[34px] h-[34px] rounded-[8px] flex items-center justify-center text-sm font-bold text-white"
               style={{ background: 'linear-gradient(135deg,#2563a8,#c8a558)' }}>
            N
          </div>
          <div>
            <div className="text-[17px] font-['Inter:Bold',sans-serif] font-bold text-white tracking-[-0.4px]">
              NexusCRM
            </div>
            <div className="text-[10px] text-[#c8a558] font-semibold tracking-widest uppercase">
              Enterprise Suite
            </div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-2 overflow-y-auto">
        {navGroups.map((g) => (
          <div key={g.group}>
            <div className="px-5 pt-4 pb-1.5 text-[10px] font-semibold tracking-[0.1em] uppercase text-slate-600">
              {g.group}
            </div>
            {g.items.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`flex items-center gap-2.5 px-5 py-[9px] text-[13px] font-medium transition-colors
                  ${item.active
                    ? 'bg-[rgba(37,99,168,0.35)] text-white border-r-[3px] border-[#c8a558]'
                    : 'text-slate-400 hover:bg-white/[0.06] hover:text-slate-200'}`}
              >
                <span className={item.active ? 'text-white' : 'text-slate-500'}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
                {item.badge && (
                  <span className="ml-auto bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                    {item.badge}
                  </span>
                )}
              </a>
            ))}
          </div>
        ))}
      </nav>

      {/* User footer */}
      <div className="px-5 py-4 border-t border-white/[0.08]">
        <div className="flex items-center gap-2.5">
          <Avatar initials="JM" gradient="linear-gradient(135deg,#c8a558,#a8873a)" size="sm" />
          <div>
            <div className="text-[12px] font-semibold text-slate-200">Juan Martínez</div>
            <div className="text-[11px] text-slate-500">Administrador</div>
          </div>
          <button className="ml-auto text-slate-500 hover:text-slate-300">
            <IconSettings />
          </button>
        </div>
      </div>
    </aside>
  );
}

// ── Header ───────────────────────────────────────────────────
function Header() {
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center px-6 gap-4 sticky top-0 z-40" data-name="Header">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-[13px] text-slate-400 flex-1">
        <span className="text-[#2563a8] font-medium">NexusCRM</span>
        <span className="text-slate-300">›</span>
        <span className="text-slate-700 font-semibold">Dashboard</span>
      </div>

      {/* Search */}
      <div className="relative max-w-[300px] w-full">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
          <IconSearch />
        </span>
        <input
          readOnly
          value=""
          placeholder="Buscar en CRM…"
          className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-[13px] text-slate-700 bg-slate-50 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
        />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <button className="relative w-9 h-9 flex items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 transition-colors">
          <IconBell />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
        </button>
        <button className="flex items-center gap-2 bg-[#1a3d6b] hover:bg-[#0f2240] text-white text-[13px] font-semibold px-3.5 py-2 rounded-lg transition-colors">
          <IconPlus />
          Nueva actividad
        </button>
        <Avatar initials="JM" gradient="linear-gradient(135deg,#c8a558,#a8873a)" size="sm" />
      </div>
    </header>
  );
}

// ── KPI Grid ─────────────────────────────────────────────────
function KPISection() {
  return (
    <div className="grid grid-cols-3 gap-4 xl:grid-cols-6" data-name="KPI Grid">
      <KPICard label="Contactos activos" value="1,248" change="8.2% vs mes ant."  changeType="up"   accentColor="#2563a8" bgColor="#dbeafe" icon={<IconUser />}       />
      <KPICard label="Leads este mes"    value="84"    change="13.5% vs mes ant." changeType="up"   accentColor="#c8a558" bgColor="#fef9c3" icon={<IconTarget />}    />
      <KPICard label="Pipeline activo"   value="$248K" change="4.7% vs mes ant."  changeType="up"   accentColor="#16a34a" bgColor="#dcfce7" icon={<IconBriefcase />}  />
      <KPICard label="Ventas cerradas"   value="$82K"  change="21.4% vs mes ant." changeType="up"   accentColor="#d97706" bgColor="#ffedd5" icon={<IconTrendUp />}    />
      <KPICard label="Tickets abiertos"  value="23"    change="3 sin respuesta"   changeType="down" accentColor="#dc2626" bgColor="#fee2e2" icon={<IconTicket />}     />
      <KPICard label="Campañas activas"  value="5"     change="Igual mes ant."    changeType="flat" accentColor="#7c3aed" bgColor="#f3e8ff" icon={<IconMegaphone />}  />
    </div>
  );
}

// ── Pipeline barra chart ─────────────────────────────────────
function PipelineSection() {
  const stages = [
    { label: 'Prospección',  opps: 32, amount: '$28,400',  pct: 30, color: '#0284c7' },
    { label: 'Calificación', opps: 24, amount: '$45,200',  pct: 45, color: '#7c3aed' },
    { label: 'Propuesta',    opps: 18, amount: '$63,100',  pct: 60, color: '#c8a558' },
    { label: 'Negociación',  opps: 11, amount: '$72,800',  pct: 75, color: '#d97706' },
    { label: 'Cierre',       opps:  6, amount: '$39,000',  pct: 90, color: '#16a34a' },
  ];
  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden" data-name="Pipeline">
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
        <h3 className="text-[14px] font-['Inter:Bold',sans-serif] font-bold text-slate-800">
          Pipeline de Ventas
        </h3>
        <a href="#" className="text-[12px] text-[#2563a8] font-semibold hover:underline">Ver todo →</a>
      </div>
      <div className="p-5 flex flex-col gap-4">
        {stages.map(s => (
          <div key={s.label}>
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-[13px] font-medium text-slate-700">{s.label}</span>
              <div className="flex gap-3">
                <span className="text-[12px] text-slate-400">{s.opps} oportun.</span>
                <span className="text-[12px] font-semibold text-slate-700">{s.amount}</span>
              </div>
            </div>
            <ProgressBar pct={s.pct} color={s.color} />
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Actividades recientes ────────────────────────────────────
function RecentActivities() {
  const items = [
    { icon: <IconPhone />,   bg: '#dbeafe', title: 'Llamada con Carlos Ruiz',        time: 'Hace 15 min',  tag: 'Llamada',  tc: 'blue'   },
    { icon: <IconMail />,    bg: '#f3e8ff', title: 'Email enviado a Tecno S.A.',      time: 'Hace 1h',      tag: 'Email',    tc: 'purple' },
    { icon: <IconCalendar/>, bg: '#dcfce7', title: 'Reunión: Demo producto',          time: 'Hace 3h',      tag: 'Reunión',  tc: 'green'  },
    { icon: <IconCheck />,   bg: '#fef9c3', title: 'Tarea completada: Follow-up',     time: 'Hace 5h',      tag: 'Tarea',    tc: 'yellow' },
    { icon: <IconClipboard/>,bg: '#f1f5f9', title: 'Nota: Interés en plan Pro',       time: 'Ayer 18:30',   tag: 'Nota',     tc: 'gray'   },
    { icon: <IconPhone />,   bg: '#fee2e2', title: 'Llamada perdida — Ana López',     time: 'Ayer 14:00',   tag: 'Llamada',  tc: 'red'    },
  ];
  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden" data-name="Actividades Recientes">
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
        <h3 className="text-[14px] font-['Inter:Bold',sans-serif] font-bold text-slate-800">
          Actividades Recientes
        </h3>
        <a href="#" className="text-[12px] text-[#2563a8] font-semibold hover:underline">Ver todas →</a>
      </div>
      <div className="px-5 divide-y divide-slate-50">
        {items.map((a, i) => (
          <div key={i} className="flex items-center gap-3 py-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                 style={{ background: a.bg, color: '#1e293b' }}>
              {a.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[13px] font-medium text-slate-800 truncate">{a.title}</div>
              <div className="text-[11px] text-slate-400 mt-0.5">{a.time}</div>
            </div>
            <Badge color={a.tc}>{a.tag}</Badge>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Top Clientes ─────────────────────────────────────────────
function TopClients() {
  const rows = [
    { name: 'Tecno S.A.',      val: '$34,200', status: 'Activo',     bc: 'green'  },
    { name: 'Global Corp',     val: '$28,100', status: 'Activo',     bc: 'green'  },
    { name: 'NetSol Ltda.',    val: '$19,800', status: 'Prospecto',  bc: 'blue'   },
    { name: 'MegaTrade',       val: '$17,500', status: 'Activo',     bc: 'green'  },
    { name: 'DataPoint S.A.',  val: '$12,400', status: 'Inactivo',   bc: 'gray'   },
  ];
  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden" data-name="Top Clientes">
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
        <h3 className="text-[14px] font-['Inter:Bold',sans-serif] font-bold text-slate-800">
          Top Clientes
        </h3>
        <a href="#" className="text-[12px] text-[#2563a8] font-semibold hover:underline">Ver más →</a>
      </div>
      <table className="w-full">
        <thead>
          <tr className="bg-slate-50">
            <th className="px-5 py-2.5 text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wide">Empresa</th>
            <th className="px-5 py-2.5 text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wide">Valor</th>
            <th className="px-5 py-2.5 text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wide">Estado</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {rows.map((r) => (
            <tr key={r.name} className="hover:bg-slate-50 transition-colors">
              <td className="px-5 py-3 text-[13px] font-semibold text-slate-800">{r.name}</td>
              <td className="px-5 py-3 text-[13px] font-semibold text-slate-700">{r.val}</td>
              <td className="px-5 py-3">
                <Badge color={r.bc}>{r.status}</Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── Leads por fuente ─────────────────────────────────────────
function LeadsSource() {
  const rows = [
    { label: 'Sitio Web',    pct: 38, color: '#1a3d6b' },
    { label: 'Referidos',    pct: 27, color: '#c8a558' },
    { label: 'LinkedIn',     pct: 18, color: '#0e76a8' },
    { label: 'Llamada fría', pct: 10, color: '#7c3aed' },
    { label: 'Email',        pct:  7, color: '#16a34a' },
  ];
  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden" data-name="Leads por Fuente">
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
        <h3 className="text-[14px] font-['Inter:Bold',sans-serif] font-bold text-slate-800">
          Leads por Fuente
        </h3>
      </div>
      <div className="p-5 flex flex-col gap-3.5">
        {rows.map((r) => (
          <div key={r.label}>
            <div className="flex justify-between mb-1.5">
              <span className="text-[13px] text-slate-600 font-medium">{r.label}</span>
              <span className="text-[12px] font-semibold text-slate-700">{r.pct}%</span>
            </div>
            <ProgressBar pct={r.pct * 2.5 > 100 ? 100 : r.pct * 2.5} color={r.color} />
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Tickets urgentes ─────────────────────────────────────────
function UrgentTickets() {
  const tickets = [
    { id: '#1042', title: 'Error en módulo de facturación',     priority: 'Crítico', pc: 'red',    age: '2h'  },
    { id: '#1039', title: 'No puede acceder al portal cliente', priority: 'Alto',    pc: 'orange', age: '5h'  },
    { id: '#1037', title: 'Solicitud de integración API',       priority: 'Medio',   pc: 'yellow', age: '1d'  },
    { id: '#1035', title: 'Consulta sobre precios enterprise',  priority: 'Bajo',    pc: 'blue',   age: '2d'  },
    { id: '#1033', title: 'Actualización de datos de cuenta',   priority: 'Bajo',    pc: 'gray',   age: '3d'  },
  ];
  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden" data-name="Tickets Urgentes">
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
        <h3 className="text-[14px] font-['Inter:Bold',sans-serif] font-bold text-slate-800">
          Tickets Urgentes
        </h3>
        <a href="#" className="text-[12px] text-[#2563a8] font-semibold hover:underline">Ver todos →</a>
      </div>
      <div className="px-5 divide-y divide-slate-50">
        {tickets.map((tk) => (
          <div key={tk.id} className="flex items-center gap-3 py-3">
            <span className="text-[11px] font-bold text-slate-400 w-10 flex-shrink-0">{tk.id}</span>
            <span className="flex-1 text-[13px] font-medium text-slate-700 truncate">{tk.title}</span>
            <Badge color={tk.pc}>{tk.priority}</Badge>
            <span className="text-[11px] text-slate-400 flex-shrink-0">{tk.age}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Tabla de Leads recientes ──────────────────────────────────
function LeadsTable() {
  const leads = [
    { name: 'Carlos Ruiz',    company: 'Tecno S.A.',    source: 'Sitio Web', status: 'Calificado',    sc: 'blue',  score: 87, assigned: 'JM' },
    { name: 'Ana López',      company: 'Innova LLC',    source: 'LinkedIn',  status: 'Nuevo',         sc: 'navy',  score: 62, assigned: 'RP' },
    { name: 'Pedro Vargas',   company: 'GlobalNet',     source: 'Referido',  status: 'Contactado',    sc: 'purple',score: 74, assigned: 'CG' },
    { name: 'María Fernández',company: 'DataPoint S.A.',source: 'Email',     status: 'En negociación',sc: 'gold',  score: 91, assigned: 'JM' },
    { name: 'Luis Torres',    company: 'MegaTrade',     source: 'Llamada',   status: 'Descartado',    sc: 'gray',  score: 23, assigned: 'RP' },
    { name: 'Sofía Méndez',   company: 'NetSol',        source: 'Sitio Web', status: 'Calificado',    sc: 'blue',  score: 78, assigned: 'CG' },
  ];
  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden" data-name="Tabla de Leads">
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
        <h3 className="text-[14px] font-['Inter:Bold',sans-serif] font-bold text-slate-800">
          Leads Recientes
        </h3>
        <div className="flex items-center gap-2">
          <div className="relative">
            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
              <IconSearch />
            </span>
            <input readOnly placeholder="Buscar lead…"
              className="pl-7 pr-3 py-1.5 border border-slate-200 rounded-lg text-[12px] text-slate-600 bg-slate-50 w-[180px]" />
          </div>
          <select className="py-1.5 px-2.5 border border-slate-200 rounded-lg text-[12px] text-slate-600 bg-slate-50">
            <option>Todos</option>
            <option>Nuevos</option>
            <option>Calificados</option>
          </select>
          <a href="#" className="text-[12px] text-[#2563a8] font-semibold hover:underline">Ver todo →</a>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50">
              {['Nombre', 'Empresa', 'Fuente', 'Estado', 'Score', 'Asignado', ''].map(h => (
                <th key={h} className="px-5 py-2.5 text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wide whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {leads.map((l) => (
              <tr key={l.name} className="hover:bg-slate-50 transition-colors">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-2.5">
                    <Avatar initials={l.name.split(' ').map(w=>w[0]).join('').slice(0,2)}
                            gradient="linear-gradient(135deg,#2563a8,#1a3d6b)" size="sm" />
                    <span className="text-[13px] font-semibold text-slate-800">{l.name}</span>
                  </div>
                </td>
                <td className="px-5 py-3 text-[13px] text-slate-600">{l.company}</td>
                <td className="px-5 py-3 text-[13px] text-slate-500">{l.source}</td>
                <td className="px-5 py-3"><Badge color={l.sc}>{l.status}</Badge></td>
                <td className="px-5 py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-16">
                      <ProgressBar pct={l.score}
                        color={l.score >= 80 ? '#16a34a' : l.score >= 60 ? '#d97706' : '#dc2626'} />
                    </div>
                    <span className="text-[12px] font-semibold text-slate-700">{l.score}</span>
                  </div>
                </td>
                <td className="px-5 py-3">
                  <div className="w-7 h-7 rounded-full bg-[#1a3d6b] text-white text-[11px] font-bold flex items-center justify-center">
                    {l.assigned}
                  </div>
                </td>
                <td className="px-5 py-3">
                  <button className="text-slate-400 hover:text-slate-600">
                    <IconMoreH />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── Pipeline Kanban ───────────────────────────────────────────
const kanbanCols = [
  {
    title: 'Prospección', color: '#0284c7', total: '$28,400',
    cards: [
      { title: 'Licencia ERP anual',       company: 'Tecno S.A.',  val: '$12,000', prob: 20, days: 3, owner: 'JM' },
      { title: 'Consultoría cloud',         company: 'NetSol',      val: '$8,400',  prob: 15, days: 7, owner: 'RP' },
      { title: 'Soporte premium',           company: 'DataPoint',   val: '$8,000',  prob: 25, days: 1, owner: 'CG' },
    ],
  },
  {
    title: 'Propuesta', color: '#c8a558', total: '$63,100',
    cards: [
      { title: 'Módulo de reportes',        company: 'Global Corp', val: '$24,600', prob: 55, days: 5, owner: 'JM' },
      { title: 'Integración CRM-ERP',       company: 'MegaTrade',   val: '$38,500', prob: 60, days: 2, owner: 'RP' },
    ],
  },
  {
    title: 'Negociación', color: '#d97706', total: '$72,800',
    cards: [
      { title: 'Plataforma e-commerce',     company: 'Tecno S.A.',  val: '$42,000', prob: 72, days: 4, owner: 'JM' },
      { title: 'Rediseño portal cliente',   company: 'Innova LLC',  val: '$30,800', prob: 78, days: 6, owner: 'CG' },
    ],
  },
  {
    title: 'Cierre', color: '#16a34a', total: '$39,000',
    cards: [
      { title: 'Licencia anual corporativa',company: 'Global Corp', val: '$39,000', prob: 90, days: 1, owner: 'JM' },
    ],
  },
];

function KanbanCard({ card }) {
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-3.5 cursor-pointer hover:shadow-md transition-shadow">
      <div className="text-[12px] font-semibold text-slate-800 mb-1">{card.title}</div>
      <div className="text-[11px] text-slate-500 mb-2">{card.company}</div>
      <div className="h-1 bg-slate-100 rounded-full mb-2.5">
        <div className="h-full rounded-full bg-[#c8a558]" style={{ width: `${card.prob}%` }} />
      </div>
      <div className="flex items-center justify-between">
        <span className="text-[12px] font-bold text-slate-700">{card.val}</span>
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] text-slate-400">{card.days}d</span>
          <div className="w-5 h-5 rounded-full bg-[#1a3d6b] text-white text-[9px] font-bold flex items-center justify-center">
            {card.owner}
          </div>
        </div>
      </div>
    </div>
  );
}

function PipelineKanban() {
  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden" data-name="Pipeline Kanban">
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
        <h3 className="text-[14px] font-['Inter:Bold',sans-serif] font-bold text-slate-800">
          Oportunidades — Vista Kanban
        </h3>
        <div className="flex gap-2">
          <button className="text-[12px] font-semibold text-slate-500 px-3 py-1.5 rounded-lg hover:bg-slate-100">Lista</button>
          <button className="text-[12px] font-semibold text-[#1a3d6b] bg-blue-50 px-3 py-1.5 rounded-lg">Tablero</button>
        </div>
      </div>
      <div className="p-4 flex gap-3 overflow-x-auto">
        {kanbanCols.map((col) => (
          <div key={col.title} className="min-w-[220px] flex-shrink-0">
            <div className="bg-slate-50 border border-slate-200 rounded-t-lg px-3 py-2.5 flex items-center justify-between border-b-0">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ background: col.color }} />
                <span className="text-[12px] font-semibold text-slate-700">{col.title}</span>
              </div>
              <span className="text-[11px] font-bold text-slate-500">{col.total}</span>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-b-lg p-2 flex flex-col gap-2 min-h-[120px]">
              {col.cards.map((card) => (
                <KanbanCard key={card.title} card={card} />
              ))}
              <button className="flex items-center gap-1.5 text-[11px] text-slate-400 hover:text-slate-600 py-1 px-2 hover:bg-white rounded-md transition-colors">
                <IconPlus /> Agregar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Sección Calendario próximo ────────────────────────────────
function UpcomingCalendar() {
  const events = [
    { time: '09:00',  title: 'Demo con Tecno S.A.',           type: 'Reunión',   tc: 'blue'   },
    { time: '11:30',  title: 'Llamada de seguimiento Carlos',  type: 'Llamada',   tc: 'green'  },
    { time: '14:00',  title: 'Revisión propuesta Global Corp', type: 'Reunión',   tc: 'blue'   },
    { time: '16:00',  title: 'Envío de cotización NetSol',     type: 'Tarea',     tc: 'yellow' },
  ];
  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden" data-name="Próximo Calendario">
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
        <h3 className="text-[14px] font-['Inter:Bold',sans-serif] font-bold text-slate-800">
          Hoy — 9 Mar 2026
        </h3>
        <a href="#" className="text-[12px] text-[#2563a8] font-semibold hover:underline">Calendario →</a>
      </div>
      <div className="px-5 divide-y divide-slate-50">
        {events.map((e, i) => (
          <div key={i} className="flex items-center gap-3.5 py-3">
            <span className="text-[12px] font-bold text-slate-400 w-11 flex-shrink-0">{e.time}</span>
            <div className="w-1 self-stretch rounded-full" style={{ background: e.tc === 'blue' ? '#2563a8' : e.tc === 'green' ? '#16a34a' : '#d97706' }} />
            <span className="flex-1 text-[13px] font-medium text-slate-700">{e.title}</span>
            <Badge color={e.tc}>{e.type}</Badge>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Dashboard Page ────────────────────────────────────────────
function DashboardPage() {
  return (
    <main className="flex-1 overflow-y-auto bg-slate-50" data-name="Dashboard Page">
      <div className="px-7 py-6 flex flex-col gap-6">

        {/* Page header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[24px] font-['Inter:Bold',sans-serif] font-bold text-slate-900 tracking-[-0.5px]">
              Panel de Control
            </h1>
            <p className="text-[13px] text-slate-500 mt-0.5">Resumen general del CRM — Marzo 2026</p>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 bg-white border border-slate-200 text-slate-600 text-[13px] font-medium px-3.5 py-2 rounded-lg hover:bg-slate-50 transition-colors">
              <IconCalendar /> Este mes
            </button>
            <button className="flex items-center gap-2 bg-[#1a3d6b] text-white text-[13px] font-semibold px-3.5 py-2 rounded-lg hover:bg-[#0f2240] transition-colors">
              <IconPlus /> Nueva actividad
            </button>
          </div>
        </div>

        {/* KPIs */}
        <KPISection />

        {/* Row 1: Pipeline chart + Actividades */}
        <div className="grid grid-cols-[7fr_5fr] gap-4">
          <PipelineSection />
          <RecentActivities />
        </div>

        {/* Row 2: Leads source + Top clients + Tickets */}
        <div className="grid grid-cols-3 gap-4">
          <LeadsSource />
          <TopClients />
          <UrgentTickets />
        </div>

        {/* Kanban */}
        <PipelineKanban />

        {/* Row 3: Leads table + Calendar */}
        <div className="grid grid-cols-[7fr_5fr] gap-4">
          <LeadsTable />
          <UpcomingCalendar />
        </div>

      </div>
    </main>
  );
}

// ── Root Container ────────────────────────────────────────────
export default function Container() {
  return (
    <div
      className="flex bg-slate-50 font-['Inter',sans-serif]"
      style={{ width: 1493, minHeight: 1169 }}
      data-name="CRM NexusCRM"
      tabIndex="-1"
    >
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0">
        <Header />
        <DashboardPage />
      </div>
    </div>
  );
}
