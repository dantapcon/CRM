// ── NexusCRM · Campañas ──────────────────────────────────────
function Badge({color,children}){const c={blue:'bg-blue-100 text-blue-700',green:'bg-green-100 text-green-700',red:'bg-red-100 text-red-700',yellow:'bg-yellow-100 text-yellow-700',orange:'bg-orange-100 text-orange-700',purple:'bg-purple-100 text-purple-700',gray:'bg-slate-100 text-slate-600',navy:'bg-blue-50 text-blue-900',gold:'bg-amber-100 text-amber-800'};return<span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold whitespace-nowrap ${c[color]??c.gray}`}>{children}</span>;}
function Avatar({initials,gradient,size='sm'}){const s={sm:'w-8 h-8 text-xs',md:'w-10 h-10 text-sm'};return<div className={`${s[size]} rounded-full flex items-center justify-center font-bold text-white flex-shrink-0`}style={{background:gradient??'linear-gradient(135deg,#1a3d6b,#2563a8)'}}>{initials}</div>;}
function ProgressRing({pct,color,size=56}){const r=22;const circ=2*Math.PI*r;const dash=circ*(pct/100);return<svg width={size}height={size}viewBox="0 0 56 56"className="-rotate-90"><circle cx="28"cy="28"r={r}fill="none"stroke="#e2e8f0"strokeWidth="4"/><circle cx="28"cy="28"r={r}fill="none"stroke={color}strokeWidth="4"strokeDasharray={`${dash} ${circ}`}strokeLinecap="round"/><text x="28"y="32"textAnchor="middle"className="rotate-90"style={{transformOrigin:'28px 28px',fontSize:'11px',fontWeight:'700',fill:color}}>{pct}%</text></svg>;}
function IcoSearch(){return<svg width="14"height="14"viewBox="0 0 24 24"fill="none"stroke="currentColor"strokeWidth="2"><circle cx="11"cy="11"r="8"/><line x1="21"y1="21"x2="16.65"y2="16.65"/></svg>}
function IcoPlus(){return<svg width="14"height="14"viewBox="0 0 24 24"fill="none"stroke="currentColor"strokeWidth="2.5"><line x1="12"y1="5"x2="12"y2="19"/><line x1="5"y1="12"x2="19"y2="12"/></svg>}
function IcoBell(){return<svg width="16"height="16"viewBox="0 0 24 24"fill="none"stroke="currentColor"strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>}
function IcoSettings(){return<svg width="15"height="15"viewBox="0 0 24 24"fill="none"stroke="currentColor"strokeWidth="2"><circle cx="12"cy="12"r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>}
function IcoMore(){return<svg width="15"height="15"viewBox="0 0 24 24"fill="none"stroke="currentColor"strokeWidth="2"><circle cx="5"cy="12"r="1"/><circle cx="12"cy="12"r="1"/><circle cx="19"cy="12"r="1"/></svg>}

const NAV=[
  {g:'Principal',      items:[{l:'Dashboard',a:false,b:null,ico:'📊'}]},
  {g:'Ventas & CRM',   items:[{l:'Contactos',a:false,b:null,ico:'👤'},{l:'Cuentas',a:false,b:null,ico:'🏢'},{l:'Leads',a:false,b:'12',ico:'🎯'},{l:'Oportunidades',a:false,b:null,ico:'💼'},{l:'Actividades',a:false,b:'5',ico:'✅'},{l:'Calendario',a:false,b:null,ico:'📅'}]},
  {g:'Comercial',      items:[{l:'Productos',a:false,b:null,ico:'📦'},{l:'Cotizaciones',a:false,b:'3',ico:'📋'},{l:'Facturas',a:false,b:null,ico:'🧾'}]},
  {g:'Marketing',      items:[{l:'Campañas',a:true,b:null,ico:'📣'}]},
  {g:'Soporte',        items:[{l:'Tickets',a:false,b:'8',ico:'🎫'},{l:'Documentos',a:false,b:null,ico:'📁'}]},
  {g:'Análisis',       items:[{l:'Reportes',a:false,b:null,ico:'📈'}]},
  {g:'Administración', items:[{l:'Equipo',a:false,b:null,ico:'👥'},{l:'Configuración',a:false,b:null,ico:'⚙️'}]},
];
function Sidebar(){return(<aside className="w-[260px] min-h-screen bg-[#0f2240] text-slate-400 flex flex-col flex-shrink-0"><div className="px-5 py-5 border-b border-white/[0.08]"><div className="flex items-center gap-2.5"><div className="w-[34px] h-[34px] rounded-[8px] flex items-center justify-center font-bold text-white"style={{background:'linear-gradient(135deg,#2563a8,#c8a558)'}}>N</div><div><div className="text-[17px] font-bold text-white tracking-[-0.4px]">NexusCRM</div><div className="text-[10px] text-[#c8a558] font-semibold tracking-widest uppercase">Enterprise Suite</div></div></div></div><nav className="flex-1 py-2 overflow-y-auto">{NAV.map(g=>(<div key={g.g}><div className="px-5 pt-4 pb-1.5 text-[10px] font-semibold tracking-[0.1em] uppercase text-slate-600">{g.g}</div>{g.items.map(item=>(<a key={item.l} href="#"className={`flex items-center gap-2.5 px-5 py-[9px] text-[13px] font-medium transition-colors ${item.a?'bg-[rgba(37,99,168,0.35)] text-white border-r-[3px] border-[#c8a558]':'text-slate-400 hover:bg-white/[0.06] hover:text-slate-200'}`}><span>{item.ico}</span><span>{item.l}</span>{item.b&&<span className="ml-auto bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">{item.b}</span>}</a>))}</div>))}</nav><div className="px-5 py-4 border-t border-white/[0.08]"><div className="flex items-center gap-2.5"><Avatar initials="JM" gradient="linear-gradient(135deg,#c8a558,#a8873a)"/><div><div className="text-[12px] font-semibold text-slate-200">Juan Martínez</div><div className="text-[11px] text-slate-500">Administrador</div></div><button className="ml-auto text-slate-500"><IcoSettings/></button></div></div></aside>);}
function Header({title}){return(<header className="h-16 bg-white border-b border-slate-200 flex items-center px-6 gap-4 sticky top-0 z-40"><div className="flex items-center gap-1.5 text-[13px] flex-1"><span className="text-[#2563a8] font-medium">NexusCRM</span><span className="text-slate-300">›</span><span className="text-slate-700 font-semibold">{title}</span></div><div className="relative max-w-[280px] w-full"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"><IcoSearch/></span><input readOnly placeholder="Buscar campañas…"className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-[13px] bg-slate-50"/></div><div className="flex items-center gap-2"><button className="relative w-9 h-9 flex items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100"><IcoBell/><span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"/></button><Avatar initials="JM" gradient="linear-gradient(135deg,#c8a558,#a8873a)"/></div></header>);}
function KPI({label,value,color,bg,icon,sub}){return(<div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm relative overflow-hidden"style={{borderTop:`3px solid ${color}`}}><div className="absolute top-4 right-4 w-9 h-9 rounded-lg flex items-center justify-center text-base"style={{background:bg}}>{icon}</div><div className="text-[26px] font-bold text-slate-800 leading-tight">{value}</div><div className="text-[12px] text-slate-500 font-medium mt-1">{label}</div>{sub&&<div className="text-[11px] text-green-600 font-semibold mt-1">{sub}</div>}</div>);}

const campaigns=[
  {ico:'📧',name:'Campaña Renovación Q1 2026',type:'Email',status:'Activa',sc:'green',sent:3200,open:47,click:18,conv:6.2,leads:198,ing:'$2,400',owner:'RP',date:'1 Mar 2026'},
  {ico:'📱',name:'Promo Software CRM Pro',type:'WhatsApp',status:'Activa',sc:'green',sent:850,open:71,click:32,conv:9.4,leads:80,ing:'$1,100',owner:'JM',date:'5 Mar 2026'},
  {ico:'🎯',name:'Retargeting Enterprise',type:'Display',status:'Pausada',sc:'yellow',sent:12500,open:8,click:3.2,conv:1.8,leads:225,ing:'$4,800',owner:'CG',date:'15 Feb 2026'},
  {ico:'📧',name:'Newsletter Marzo',type:'Email',status:'Enviada',sc:'blue',sent:5400,open:38,click:12,conv:3.1,leads:167,ing:'$0',owner:'RP',date:'10 Mar 2026'},
  {ico:'🔗',name:'LinkedIn B2B Reach',type:'LinkedIn',status:'Activa',sc:'green',sent:2100,open:54,click:21,conv:7.8,leads:164,ing:'$3,200',owner:'JM',date:'8 Mar 2026'},
  {ico:'📧',name:'Seguimiento Demos',type:'Email',status:'Borrador',sc:'gray',sent:0,open:0,click:0,conv:0,leads:0,ing:'$0',owner:'CG',date:'—'},
];

function CampaignCard({c}){
  return(
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <div className="px-5 py-4 border-b border-slate-100">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-start gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center text-xl flex-shrink-0">{c.ico}</div>
            <div>
              <div className="text-[13px] font-bold text-slate-800 leading-tight">{c.name}</div>
              <div className="flex items-center gap-2 mt-1"><Badge color={c.type==='Email'?'blue':c.type==='WhatsApp'?'green':c.type==='LinkedIn'?'navy':c.type==='Display'?'purple':'gray'}>{c.type}</Badge><Badge color={c.sc}>{c.status}</Badge></div>
            </div>
          </div>
          <button className="text-slate-400 hover:text-slate-600 flex-shrink-0"><IcoMore/></button>
        </div>
      </div>
      <div className="px-5 py-4">
        <div className="grid grid-cols-2 gap-3 mb-4">
          {[{l:'Enviados',v:c.sent.toLocaleString()},{l:'Leads',v:c.leads},{l:'Ingresos',v:c.ing},{l:'Fecha',v:c.date}].map(s=>(
            <div key={s.l}>
              <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wide">{s.l}</div>
              <div className="text-[14px] font-bold text-slate-800">{s.v}</div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="text-center">
              <ProgressRing pct={c.open} color="#2563a8" size={52}/>
              <div className="text-[10px] text-slate-400 mt-0.5">Apertura</div>
            </div>
            <div className="text-center">
              <ProgressRing pct={c.click} color="#c8a558" size={52}/>
              <div className="text-[10px] text-slate-400 mt-0.5">Clics</div>
            </div>
            <div className="text-center">
              <ProgressRing pct={c.conv} color="#16a34a" size={52}/>
              <div className="text-[10px] text-slate-400 mt-0.5">Conversión</div>
            </div>
          </div>
          <Avatar initials={c.owner} gradient="linear-gradient(135deg,#1a3d6b,#2563a8)"/>
        </div>
      </div>
    </div>
  );
}

function CampaignsPage(){
  return(
    <main className="flex-1 overflow-y-auto bg-slate-50">
      <div className="px-7 py-6 flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <div><h1 className="text-[24px] font-bold text-slate-900 tracking-[-0.5px]">Campañas</h1><p className="text-[13px] text-slate-500 mt-0.5">6 campañas · 3 activas</p></div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 bg-white border border-slate-200 text-slate-600 text-[13px] font-medium px-3.5 py-2 rounded-lg">📊 Analíticas</button>
            <button className="flex items-center gap-2 bg-[#1a3d6b] text-white text-[13px] font-semibold px-3.5 py-2 rounded-lg"><IcoPlus/>Nueva campaña</button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          <KPI label="Campañas activas"  value="3"      color="#2563a8" bg="#dbeafe" icon="📣" sub="↑ 1 vs sem. ant"/>
          <KPI label="Total enviados"    value="24,050" color="#7c3aed" bg="#f3e8ff" icon="📤" sub="este mes"/>
          <KPI label="Tasa apertura"     value="43.6%"  color="#c8a558" bg="#fef9c3" icon="👁" sub="↑ 2.1% promedio"/>
          <KPI label="Leads generados"   value="834"    color="#16a34a" bg="#dcfce7" icon="🎯" sub="↑ 18%"/>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex gap-1">
            {['Todas','Activas','Enviadas','Pausadas','Borradores'].map(t=>(
              <button key={t} className={`px-3.5 py-1.5 text-[12px] font-semibold rounded-lg transition-colors ${t==='Todas'?'bg-[#1a3d6b] text-white':'bg-white border border-slate-200 text-slate-500 hover:bg-slate-100'}`}>{t}</button>
            ))}
          </div>
          <div className="ml-auto flex gap-2">
            <select className="py-1.5 px-3 border border-slate-200 rounded-lg text-[12px] text-slate-600 bg-white"><option>Todos los tipos</option><option>Email</option><option>WhatsApp</option><option>LinkedIn</option></select>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {campaigns.map((c,i)=><CampaignCard key={i} c={c}/>)}
        </div>
      </div>
    </main>
  );
}

export default function Container(){
  return(
    <div className="flex bg-slate-50 font-['Inter',sans-serif]"style={{width:1493,minHeight:900}}tabIndex="-1">
      <Sidebar/><div className="flex flex-col flex-1 min-w-0"><Header title="Campañas"/><CampaignsPage/></div>
    </div>
  );
}
